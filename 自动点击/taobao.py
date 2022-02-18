from lxml import etree
from selenium import webdriver
import requests
from hashlib import md5
from PIL import Image
import time
bro=webdriver.Chrome(executable_path='D:\pythonProject\爬虫\chromedriver.exe')
bro.get('https://www.taobao.com/')
input=bro.find_element_by_id('q')
input.send_keys('球鞋')
bro.find_element_by_css_selector('#J_TSearchForm > div.search-button > button').click()