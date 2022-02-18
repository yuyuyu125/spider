# -*- coding: utf-8 -*-
"""
Created on Fri Sep  3 20:46:12 2021

@author: 13966
"""

import  requests
import mysql.connector
from bs4 import BeautifulSoup
class doubanpc():
    mydb=mysql.connector.connect(host='localhost',user='root',passwd='123456',database='python')
    mycursor=mydb.cursor()
    def __init__(self):
        
        self.url='https://movie.douban.com/top250?start={0}&filter='
        self.headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
        
    def send_request(self,url):
         
         resp=requests.get(url,headers=self.headers)
         if resp.status_code == 200:
            return resp.text
    def get_html(self,resp):
        html=resp
        lst=[]
        bs=BeautifulSoup(html,'html.parser')
        div_h=bs.find('ol',class_='grid_view')
        li=div_h.find_all('li')
        for item in li:
            title=item.find('span',class_='title').text
            number = item.find('em',class_='').text
            miaoshu=item.find('p',class_='').text
            s=miaoshu.strip('').replace('\n','').replace(' ','')
            pf=item.find('span',class_='rating_num').text
         
            pyu=item.find('span',class_='inq')
            
        
            lst.append([number,title,pyu.text if pyu!=None else '',pf])
        self.mysql(lst)
            
    def mysql(self,lst):
        sql='insert into douban(排名,名字,评语,评分) values (%s,%s,%s,%s)'
        self.mycursor.executemany(sql,lst)#批量差人
        self.mydb.commit()#提交事务
        print('完成')
        
    def start(self):
        for i in range(10):
            fullurl=self.url.format(str(i*25))
            resp=self.send_request(fullurl)
            self.get_html(resp)
if __name__ == '__main__':
    douban=doubanpc()
    douban.start()

