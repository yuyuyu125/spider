# -*- coding: utf-8 -*-
"""
Created on Wed Sep  1 14:53:43 2021

@author: 13966
"""
import requests
from bs4 import BeautifulSoup
import re
import openpyxl
import time
lst=[]
def send_html(page):    
    url='https://www.jobui.com/jobs?jobKw=%E9%87%91%E8%9E%8D&cityKw=%E5%B9%BF%E5%B7%9E&jobType=%E5%AE%9E%E4%B9%A0&n={}'.format(page)
    headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
    a=requests.get(url,headers=headers).text
    return a
def get_html(a):
    bs=BeautifulSoup(a,'html.parser')
    bs1=bs.find_all('div',class_='c-job-list')
    
    
    for item in bs1:
        name=item.find('h3').text
        ms=item.find('div',class_='job-desc')
        miaoshu=ms.find_all('span')
        gs_name=item.find('a',class_='job-company-name')['title']
        id=item.find('a',class_='job-name')['href']
        id1='https://www.jobui.com/'+id
        
        headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36','Cookie':'jobui_p=1630478242029_94288541; AXUDE_jobuiinfo=ApWBmamJlL; jobui_user_passport=yk163047825852264; job-subscribe-guide=1; jobui_user_searchURL=http%3A%2F%2Fm.jobui.com%2Fjobs%3FjobKw%3D%25E9%2587%2591%25E8%259E%258D%26cityKw%3D%25E5%2585%25A8%25E5%259B%25BD%26degreeType%3D%25E4%25B8%25AD%25E6%258A%2580%26sortField%3Dlast; jobui_area=%25E5%25B9%25BF%25E5%25B7%259E; jobui_area_tmp=%25E5%25B9%25BF%25E5%25B7%259E; Hm_lvt_8b3e2b14eff57d444737b5e71d065e72=1630478242,1630504947; PHPSESSID=d3qpdgnocvee20vv7ot5efqqc7; TN_VisitCookie=122; TN_VisitNum=26; Hm_lpvt_8b3e2b14eff57d444737b5e71d065e72=1630519640'}
        a=requests.get(id1,headers=headers).text
        bs=BeautifulSoup(a,'html.parser')


        dizhi=bs.find('li',style='width: 100%;')
        if dizhi is not None:
            dizhi1=dizhi.get_text()
        else:
            dizhi1=' 没有地址'
        
        
        
        
        
        
        #print(name,miaoshu[0].text,miaoshu[1].text,miaoshu[2].text,bs2)
        lst.append([name,miaoshu[0].text,miaoshu[1].text,miaoshu[2].text,dizhi1])
        
def save(lst):
    wb=openpyxl.Workbook()
    sheet=wb.active
    for item in lst:
        sheet.append(item)
    wb.save('招聘信息1.xlsx')
def start(pages):
    for page in range(1,pages+1):
        resp=send_html(page)
        get_html(resp)
        time.sleep(2)
    save(lst)
if __name__ == '__main__':    
    pages=5
    start(pages)    
    print('完成从')



      
    
    
