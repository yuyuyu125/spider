# -*- coding: utf-8 -*-
"""
Created on Wed Sep  1 16:59:57 2021

@author: 13966
"""


import requests
from bs4 import BeautifulSoup
import re
url='https://www.jobui.com/job/212890831/'
headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
a=requests.get(url,headers=headers).text
bs=BeautifulSoup(a,'html.parser')
bs1=bs.find('div',class_='hasVist cfix sbox fs16').get_text()
dizhi=bs.find('li',style='width: 100%;').get_text()


print(dizhi)