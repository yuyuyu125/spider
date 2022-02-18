from selenium import webdriver
import time
bro=webdriver.Chrome()
bro.get('https://www.wanmen.org/')
bro.find_element_by_xpath('//*[@id="root"]/div[3]/div[2]/div/div/div[3]').click()
time.sleep(3)
bro.find_element_by_xpath('//*[@id="root"]/div[15]/div[2]/div/div[2]/svg/use').click()
bro.find_element_by_xpath('//*[@id="root"]/div[1]/div[1]/div[2]/div/div[2]/ul/li[1]/a').click()
