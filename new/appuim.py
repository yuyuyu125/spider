
from appium import webdriver
deploy = {
# 这些是必须要的
"platformName":"Android",
"platformVersion":"10",
"deviceName":"emulator-5554",
"appPackage":"com.netease.cloudmusic",
"appActivity":".activity.LoadingActivity",
#下面的随意
#禁止app在自动化后重置
"noReset":True,
# # 设置命令超时时间,单位秒
"newCommandTimeout":3600
}
driver = webdriver.Remote('http://127.0.0.1:4723/wd/hub',deploy)
driver.implicitly_wait(100)
# 开始自动操作app(XPATH  //元素类型（class值）[@属性='属性值'])
# 1、点击每日推荐
driver.find_element_by_xpath("//*[@text='每日推荐']").click()
# 2、获取前三首歌曲信息
# 歌曲名字
gequ = driver.find_elements_by_id('com.netease.cloudmusic:id/songName')[:3]
#打印歌曲
# 屏幕宽
width = driver.get_window_size()['width']
# 屏幕高
height = driver.get_window_size()['height']
for gequ in gequ:
    print(gequ.text)
print(width,height)
driver.quit()
