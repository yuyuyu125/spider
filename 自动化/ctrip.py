
import datetime, sys, time
from datetime import datetime as dt
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import os
base_path = os.path.abspath(__file__)
folder = os.path.dirname(base_path)
pf=os.path.dirname(folder)
dpf=os.path.split(pf)[0]
sys.path.append(dpf)
# from common.baseSpider import Base
# from common.db import ssql_custom as ssql

insert_tb = '[CLMonitor].[dbo].[ctripHotelInfo]'

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


    def get_url(self, hotelName, hotelId, startTime, endTime, typeName):
        self.hotelId = hotelId
        self.hotelName = hotelName
        self.typeName = typeName
        baseUrl = '''
        https://hotels.ctrip.com/hotels/detail/?hotelId={hotelId}&checkIn={startTime}&checkOut={endTime}&cityId=32&minprice=&mincurr=&adult=1&children=0&ages=&crn=1&curr=&fgt=&stand=&stdcode=&hpaopts=&mproom=&ouid=&shoppingid=&roomkey=&highprice=-1&lowprice=0&showtotalamt=&hotelUniqueKey=
        	'''
        return baseUrl.format(hotelId=hotelId, startTime=startTime, endTime=endTime)

    def price_clean(self,rawText):
        return rawText.replace('￥', '').replace(',', '')

    def pageExpansion(self):
        pass

    def parse(self):
        result = []
        dates = dt.now().strftime('%Y-%m-%d')
        roomList = self.driver.find_elements_by_class_name("roomlist-baseroom")
        if len(roomList) > 1:
            items = roomList[1]
        else:
            items = roomList[0]
        itemList= items.find_elements_by_class_name("roomlist-baseroom-card")
        for item in itemList:
            roomId = item.get_attribute('id')
            roomName = item.find_element_by_class_name('roomname').text
            saleList = item.find_elements_by_class_name('salecard')
            for sale in saleList:
                ubtRoomId = sale.get_attribute('ubt-roomid')
                try:
                    vendorLoc = sale.find_element_by_class_name('vendor-desc')
                    vendor = vendorLoc.text
                except Exception as e:
                    # print(e)
                    vendor = ''
                try:
                    priceDelete = self.price_clean(sale.find_element_by_class_name('price-delete').text)
                except:
                    priceDelete = ''
                roomDesc = sale.find_element_by_class_name('bedfacility').text + ' ' + sale.find_element_by_class_name('salecard-otherfacility').text + ' '  + sale.find_element_by_class_name('salecard-policy').text + ' ' + sale.find_element_by_class_name('promotion').text
                roomStatus = sale.find_element_by_class_name('book').text
                roomDesc = roomDesc.replace('\n', '')
                try:
                    discountInfo = sale.find_element_by_class_name('discount-tag').text
                except:
                    discountInfo = ''
                if roomStatus == '预订':
                    roomStatus = '可预订'
                else:
                    roomStatus = '售罄'
                if roomStatus == '可预订':
                    # js = """
                    #     var x = document.querySelectorAll("div.salecard > div > div > div.price-detail-panel");
                    #     var i;
                    #     for (i = 0; i < x.length; i++) {
                    #         x[i].style.display = "block";
                    #     }
                    # """
                    # # 调用js脚本
                    # self.driver.execute_script(js)
                    # ActionChains(self.driver).move_to_element(sale.find_element_by_class_name('price-display')).perform()
                    # time.sleep(1)
                    try:
                        setMenu = sale.find_element_by_class_name('price-detail-panel-meal').get_attribute('textContent')
                    except:
                        setMenu = ''
                else:
                    setMenu = ''
                priceDisplay = self.price_clean(sale.find_element_by_class_name('price-display').text)
                result.append([self.hotelName, self.hotelId, roomName, roomId, vendor, priceDelete, priceDisplay, ubtRoomId , self.typeName, dates, roomStatus, roomDesc, discountInfo, setMenu])
        # ssql.write_fileslist_sqlbase(result, insert_tb)
        print(result)
def main():
    chrome = WebDriverChrome()
    chrome.driver.get('https://www.ctrip.com/')
    statuCode = input('input ok')

    while 1:
        if statuCode == 'ok':
            break
        else:
            print('verify false')
    dates = dt.now().strftime('%Y-%m-%d')
    sql = """
      delete [CLMonitor].[dbo].[ctripHotelInfo] where dates = '{dates}' and hotelId in (select  hotelId from [CLMonitor].[dbo].[ctripHotelInfo] where dates = '{dates}' group by  hotelId
    having count(distinct(typeName)) <4)
	
	select a1.* from
      (select hotelName, ctripId from [CLMonitor].[dbo].[hotelList] where ctripId is not null and  ctripId !='' group by hotelName, ctripId)  a1 left join 
	  ( select hotelId from [CLMonitor].[dbo].[ctripHotelInfo] where dates = '{dates}' group by  hotelId) a2
	  on a1.ctripId = a2.hotelId 
	  where a2.hotelId is null
    """.format(dates =dates)
    taskList = [['广州长隆熊猫酒店', '15029384'], ['广州星河湾酒店', '396591']#,
                # ['广州融创万达嘉华酒店', '35504752'],
                # ['上海迪士尼乐园酒店', '4687218'],
                # ['珠海海泉湾海洋温泉酒店', '1508003'],
                # ['深圳威尼斯睿途酒店', '345037'],
                # ['深圳东部华侨城茵特拉根酒店', '371246'],
                # ['长隆酒店(广州长隆野生动物世界店)', '419302']
                ]
    # taskList = ssql.sql_query(sql)
    dateTypeList = [
                [(dt.now() + datetime.timedelta(days=30)).strftime('%Y-%m-%d'), (dt.now() +datetime.timedelta(days=31)).strftime('%Y-%m-%d'), 'thirtyDays'],
                [(dt.now() +datetime.timedelta(days=14)).strftime('%Y-%m-%d'), (dt.now() +datetime.timedelta(days=15)).strftime('%Y-%m-%d'),  'fourteenDays'],
                [(dt.now() +datetime.timedelta(days=7)).strftime('%Y-%m-%d'),(dt.now() +datetime.timedelta(days=8)).strftime('%Y-%m-%d'), 'sevenDays'],
                [dt.now().strftime('%Y-%m-%d'),(dt.now() +datetime.timedelta(days=1)).strftime('%Y-%m-%d'), 'currenDay']]

    count  =1
    for task in taskList:
        hotelName = task[0]

        hotelId = task[1]
        for dateType in dateTypeList:
            startTime = dateType[0]
            endTime = dateType[1]
            typeName = dateType[2]

            url = chrome.get_url(hotelName, hotelId, startTime, endTime, typeName)
            chrome.driver.get(url)
            try:
                WebDriverWait(chrome.driver, 20).until(
                    EC.presence_of_element_located((By.CLASS_NAME, 'roomlist-baseroom')))
            except:
                print(hotelName + '在' + startTime + '至' + endTime + '期间无房间信息')

                result = [[hotelName, hotelId, '', '', '', '', '', '' , typeName, dates, '售罄', '', '', '']]
                # ssql.write_fileslist_sqlbase(result, insert_tb)
                continue
            btns = chrome.driver.find_elements_by_xpath("//div[@class='saleroomlist-showMore']/div/span[text()='展开']")
            for btn in btns:
                btn.click()
                time.sleep(1)
            chrome.parse()
            print(str(count) + '. ' + hotelName + '在' + str(startTime) + '-->' + str(endTime) + '时间段抓取成功')
            count += 1
            # input('ok')
        chrome.driver.close()
        chrome.driver.quit()



if __name__ == "__main__":
    main()