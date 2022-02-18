# -*- coding: utf-8 -*-
"""
Created on Tue Sep  7 21:03:10 2021

@author: 13966
"""

from selenium import webdriver
from lxml import etree
bro = webdriver.Chrome(executable_path='./chromedriver')
bro.get('https://www.baidu.com/')
text=bro.page_source
a=etree.HTML(text)
print(a)