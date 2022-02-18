import datetime, sys, time
from datetime import datetime as dt
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import os
from lxml import etree
class WebDriverChrome(object):

    def __init__(self):
        self.driver = self.StartWebdriver()

    def StartWebdriver(self):
        options = webdriver.ChromeOptions()
        # options.add_argument("--user-data-dir=" + "C:/Users/allen/AppData/Local/Google/Chrome/User Data/")
        options.add_argument("start-maximized")
        options.add_experimental_option('useAutomationExtension', False)
        options.add_argument('--disable-gpu')
        options.add_argument('disable-infobars')
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option("useAutomationExtension", False)
        driver = webdriver.Chrome(options=options)
        with open('stealth.min.js') as f:
            js = f.read()
        driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
            "source": js
        })
        return driver

    def RunStart(self):
        self.driver.get('https://bot.sannysoft.com')
        # time.sleep(10)
        # self.driver.quit()
    def parse(self):
        self.driver.get('https://hotels.ctrip.com/hotels/listPage?cityename=guangzhou&city=32&checkin=2021/11/27&checkout=2021/11/28')
        name=self.driver.find_element_by_id('keyword')
        name.send_keys('广东金融学院')
        self.driver.find_element_by_xpath('//*[@id="ibu_hotel_container"]/div/div[1]/ul/li[5]/button/i').click()
        for i in range(1,4):
            try:

                self.driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
                time.sleep(1.5)
                self.driver.find_element_by_xpath('//*[@id="ibu_hotel_container"]/div/section/div[2]/ul/div[2]/div/span').click()
            except:
                print('无搜索更多酒店按钮')
                continue









chrome=WebDriverChrome()
chrome.driver.get('https://www.ctrip.com/')
statuCode = input('input ok')

while 1:
    if statuCode == 'ok':
        break
    else:
        print('输入错误')
chrome.parse()
ul=chrome.driver.page_source
html=etree.HTML(ul)
li=html.xpath('//*[@id="ibu_hotel_container"]/div/section/div[2]/ul/li[@class="list-item-target"]')

for i in li:
    name = i.xpath(".//span[@class='name font-bold']/text()")
    if i.xpath('//*[@id="ibu_hotel_container"]/div/section/div[2]/ul/li[8]/div/div/div/div[2]/div[2]/div[2]/span/text()')=='售完':
        vip_price='该酒店已售罄'
        pinfen=i.xpath(".//span[@class='real font-bold']/text()")

    else:
        try:
            if  i.xpath("./div/div/div/div[2]/div[2]/div[1]/p/span[2]/span[2]/text()")[0]=='起':
                vip_price=i.xpath("./div/div/div/div[2]/div[2]/div[1]/p/span[2]/span[1]/text()")[0]


                '//*[@id="ibu_hotel_container"]/div/section/div[2]/ul/li[5]/div/div/div/div[2]/div[2]/div[1]/p/span[2]/span[1]'
            else:
                vip_price=i.xpath("./div/div/div/div[2]/div[2]/div[1]/p/span[2]/span[2]/text()")[0]
        except:
            vip_price='无价格'
        try:
            pinfen=i.xpath(".//span[@class='real font-bold']/text()")[0]
        except:
            pinfen='无'
    print(name,vip_price,pinfen)
'//*[@id="ibu_hotel_container"]/div/section/div[2]/ul/li[5]/div/div/div/div[2]/div[2]/div[1]/p/span[2]/span[1]'
'//*[@id="ibu_hotel_container"]/div/section/div[2]/ul/li[7]/div/div/div/div[2]/div[2]/div[1]/p/span[2]/span[2]'
'//*[@id="ibu_hotel_container"]/div/section/div[2]/ul/li[8]/div/div/div/div[2]/div[2]/div[2]/span/text()'
'//*[@id="ibu_hotel_container"]/div/section/div[2]/ul/li[6]/div/div/div/div[2]/div[2]/div[1]/p/span[2]/span[1]'



