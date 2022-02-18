# -*- coding: utf-8 -*-
"""
Created on Mon Sep  6 16:30:32 2021

@author: 13966
"""
from lxml import etree
from selenium import webdriver
import requests
from hashlib import md5
from PIL import Image
import time
class Chaojiying_Client(object):

    def __init__(self, username, password, soft_id):
        self.username = username
        password =  password.encode('utf8')
        self.password = md5(password).hexdigest()
        self.soft_id = soft_id
        self.base_params = {
            'user': self.username,
            'pass2': self.password,
            'softid': self.soft_id,
        }
        self.headers = {
            'Connection': 'Keep-Alive',
            'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
        }

    def PostPic(self, im, codetype):
        """
        im: 图片字节
        codetype: 题目类型 参考 http://www.chaojiying.com/price.html
        """
        params = {
            'codetype': codetype,
        }
        params.update(self.base_params)
        files = {'userfile': ('ccc.jpg', im)}
        r = requests.post('http://upload.chaojiying.net/Upload/Processing.php', data=params, files=files, headers=self.headers)
        return r.json()

    def ReportError(self, im_id):
        """
        im_id:报错题目的图片ID
        """
        params = {
            'id': im_id,
        }
        params.update(self.base_params)
        r = requests.post('http://upload.chaojiying.net/Upload/ReportError.php', data=params, headers=self.headers)
        return r.json()

bro=webdriver.Chrome(executable_path='./chromedriver')
bro.get('https://www.gushiwen.cn/')

# chaojiying = Chaojiying_Client('1396641320', '19990625a', '922221')	#用户中心>>软件ID 生成一个替换 96001
# im = open('gsw.jpg', 'rb').read()													#本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
# print(chaojiying.PostPic(im, 1902))
#yzm=chaojiying.PostPic(im, 1902)	



bro.find_element_by_css_selector('body > div.main1 > div > div.right > div.son1 > a:nth-child(6)').click()
ids=bro.find_element_by_id('email')
ids.send_keys('15812575345')
idss=bro.find_element_by_id('pwd')
idss.send_keys('19990625a')


yzm1=bro.find_element_by_xpath('//*[@id="imgCode"]')
bro.save_screenshot('ss.png')
location=yzm1.location
size=yzm1.size

rangle=(
int(location['x']*1.25),int(location['y']*1.25),int(location['x']*1.25+size['width']*1.25),int(location['y']*1.25+size['height']*1.25))
i=Image.open('./ss.png')
code_img_name='gsw.png'
frame=i.crop(rangle)
frame.save(code_img_name)
     
chaojiying = Chaojiying_Client('1396641320', '19990625a', '922221')	#用户中心>>软件ID 生成一个替换 96001
im = open('gsw.png', 'rb').read()													#本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
print(chaojiying.PostPic(im, 1902))
yzm=chaojiying.PostPic(im, 1902)['pic_str']
qqq=bro.find_element_by_id('code')
qqq.send_keys(yzm)
time.sleep(5)



bro.find_element_by_id('denglu').click()


