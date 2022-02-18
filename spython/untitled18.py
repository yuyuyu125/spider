# -*- coding: utf-8 -*-
"""
Created on Fri Sep  3 11:15:01 2021

@author: 13966
"""
import requests
from bs4 import BeautifulSoup
import mysql.connector
class lianjiapc():
    mydb=mysql.connector.connect(host='localhost',user='root',passwd='123456',database='python')
    
    mycursor=mydb.cursor()
    def __init__(self):
        self.url='https://gz.lianjia.com/zufang/pg{0}rp2/'
        self.headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
    def send_request(self,url):
        
        resp=requests.get(url,headers=self.headers)
        if resp.status_code == 200:
            return resp.text
    def get_html(self,resp):
        lst=[]
        encoding='utf-8'
        html=resp
        bs=BeautifulSoup(html,'html.parser')
        div_h=bs.find_all('div',class_='content__list--item--main')
        for item in div_h:
            a=item.find('a',class_='twoline')
            if a is not None:
                a=a.text
            else:
                a=''
            b=item.find('p',class_='content__list--item--des').get_text()
            
            c=b.strip('').replace('\n','').replace(' ','')
            d=item.find('span',class_='content__list--item-price').text
            lst.append([a,c,d])
        self.mysql(lst)
    def mysql(self,lst):
        sql='insert into lianjian(a,c,d) values (%s,%s,%s)'#
        self.mycursor.executemany(sql,lst)#批量差人
        self.mydb.commit()#提交事务
        print('完成')
        
    
    def start(self):
        for i in range(1,2):
            fullurl=self.url.format(i)
            resp=self.send_request(fullurl)
            self.get_html(resp)
            
if __name__ == '__main__':
    lianjia=lianjiapc()
    lianjia.start()            