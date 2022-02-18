import pyautogui as gui
import time
import pyperclip
def danji(road):
    r=None
    while r is None:
        r=gui.locateOnScreen(road)
    center=gui.center(r)
    gui.click(center)
def guanbi():
    gui.hotkey('ctrl', 'alt','w')
    danji('./guanbi/3.png')
    danji('./guanbi/shezhi.png')
    danji('./guanbi/tuichu.png')
    danji('./guanbi/queding.png')
def dakai_mtmc():
    danji('./guanbi/denglu.png')
    danji('./guanbi/xiaochengxu.png')
    danji('./guanbi/mtmc.png')