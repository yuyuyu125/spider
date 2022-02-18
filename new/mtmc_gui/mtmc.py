import pyautogui as gui
import time
from random import choice
import cmd_dakai
import mtct_guanbi
from win32con import WM_INPUTLANGCHANGEREQUEST
import win32gui
import win32api
def set_english_inputer():
    # 0x0409为英文输入法的lid_hex的 中文一般为0x0804
    hwnd = win32gui.GetForegroundWindow()
    result = win32api.SendMessage(hwnd, WM_INPUTLANGCHANGEREQUEST, 0, 0x0409)
    if result == 0:
        print("英文输入法切换成功！")
def danji(road):
    r=None
    while r is None:
        r=gui.locateOnScreen(road)
    # center=gui.center(r)
    # gui.click(center)
    gui.click(road)
def move_to(road):
    r=None
    while r is None:
        r=gui.locateOnScreen(road)
    center=gui.center(r)
    gui.moveTo(center)
def get_locateOnScreen(road):
    b=[]
    b = [k for k in gui.locateAllOnScreen(road)]
    a=gui.locateOnScreen('./shangpin/jiexian.png')
    if a!=None and b!=[]:
        b=[k for k in b if k.top<a.top]
    return (b,a)
def click_shangpin(l):
    for k in l:
        cen=gui.center(k)
        gui.click(cen)
        time.sleep(6)
        danji('./shangpin/tuichu.png')
        time.sleep(2)
def click_series(road1,road2):
    danji(road1)
    time.sleep(5)
    if gui.locateOnScreen('./shangpin/kong.png')==None:
        while True:
            aa=get_locateOnScreen(road2)
            if len(aa[0])!=0:
                click_shangpin(aa[0])
            if aa[1]!=None:
                break
            gui.dragTo(aa[0][0])
            u=list(set([e.top for e in aa[0]]))
            q=int(abs(u[0]-u[1])*0.72)*2
            gui.scroll(-q)
            time.sleep(4)

def city_gui():
    danji(r'./sousuolan/sousuo.png')
    click_series(r'./sousuolan/wusu.png', r'./shangpin/wusu.png')
    danji(r'./shangpin/wusux.png')
    click_series(r'./sousuolan/1664.png', r'./shangpin/1664.png')
    danji(r'./shangpin/1664x.png')
    click_series(r'./sousuolan/lebao.png', r'./shangpin/qian.png')

    danji(r'./shangpin/tuichu.png')
    danji(r'./fenlei/fenlei.png')
    time.sleep(6)
    danji(r'./fenlei/rupin.png')
    time.sleep(6)
    move_to(r'./fenlei/jia.png')
    while gui.locateOnScreen(r'./fenlei/jiexian.png') == None:
        gui.scroll(-500)
        gui.moveRel(choice([1, -1]), choice([1, -1]))
    time.sleep(3)
    danji(r'./fenlei/jiushui.png')
    time.sleep(3)
    move_to(r'./fenlei/jia.png')
    while gui.locateOnScreen(r'./fenlei/jiexian.png') == None:
        gui.scroll(-500)
        gui.moveRel(choice([1, -1]), choice([1, -1]))
    time.sleep(2)
    danji(r'./chengshi/shouye.png')

set_english_inputer()
citynum=[['beijing','foshan','guangzhou'],['ylanfang','shenzhen'],['shanghai','wuhan']]
for city in citynum:
    mtct_guanbi.dakai_mtmc()
    cmd_dakai.cmd_mtmc()
    danji(r'./chengshi/querenxuanzhe.png')
    for w in city:
        danji(r'./chengshi/qiehuandian.png')
        time.sleep(1)
        danji(r'./chengshi/genghuandizhi.png')
        time.sleep(1)
        danji(r'./chengshi/qiehuan.png')
        time.sleep(0.5)
        danji(r'./chengshi/%s.png'%w)
        time.sleep(0.5)
        gui.write('%s'%w[0])

        move_to(r'./chengshi/shangpu.png')
        gui.doubleClick()
        time.sleep(2)
        while gui.locateOnScreen(r'./fenlei/caipu.png')==None:
            gui.scroll(-55)
            time.sleep(1)
            gui.doubleClick()
            time.sleep(2)
        if gui.locateOnScreen(r'./chengshi/shouye.png')!=None:
            danji(r'./chengshi/shouye.png')
        while gui.locateOnScreen(r'./sousuolan/queding.png')!=None:
            danji(r'./sousuolan/queding.png')
        city_gui()
    mtct_guanbi.guanbi()
    print('请关闭cmder和proxifier！')

