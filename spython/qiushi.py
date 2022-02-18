# -*- coding: utf-8 -*-
"""
Created on Mon Aug 30 09:37:55 2021

@author: 13966
"""

import requests
import re
headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
list=[]
count=0
for i in range(1,3):
    url='https://www.qiushibaike.com/video/page/{}/'
    r=requests.get(url.format(i),headers=headers)
    r1=re.findall(r'<source src="(.*)" type=\'video/mp4\' />',r.text)

    for item in r1:
        list.append('http:'+item)
for item in list:
    resp=requests.get(item,headers=headers)
    count+=1
    with open(r'D:\spyder_work/'+str(count)+'.mp4','wb') as file:
            file.write(resp.content)
print('下载完成')


