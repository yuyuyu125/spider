import pyautogui as gui
import time
import pyperclip
def cmd_mtmc():
    pyperclip.copy(r'mitmdump -s C:\Summary\交接文档\meituanmaicai_o20jsb\script.py')
    gui.hotkey('win', 'r')
    time.sleep(0.25)
    gui.write('cmder')
    time.sleep(0.25)
    gui.hotkey('enter')
    time.sleep(2)
    gui.hotkey('ctrl', 'v')
    time.sleep(0.25)
    gui.hotkey('enter')
    time.sleep(1.5)
    gui.hotkey('win', 'r')
    time.sleep(0.25)
    gui.write('Proxifier')
    time.sleep(0.25)
    gui.hotkey('enter')