# -*- coding: utf-8 -*-
"""
Created on Mon Aug 30 12:15:30 2021

@author: 13966
"""
import os
import requests
import re
url='https://search.bilibili.com/all?keyword=%E4%BA%91%E9%A1%B6%E4%B9%8B%E5%BC%88&from_source=webtop_search&spm_id_from=333.851'
headers={'User-Agent': 'python-requests/2.24.0', 'Accept-Encoding': 'gzip, deflate', 'Accept': '*/*', 'Connection': 'keep-alive', 'Cookie': 'main_confirmation=fy711ESOQ26wjL18H9fDnQr1+83u8wWgW7zBkLlnyvM='}
r=requests.get(url)
pat='<li class="video-item matrix"><a href="(.*?)" title=".*?" target="_blank" class="img-anchor"><div class="img"><div class="lazy-img"><img alt="" src=""></div><span class="so-imgTag_rb">.*?</span><div class="watch-later-trigger watch-later"></div><span class="mask-video"></span></div><!----></a><div class="info">'
ree=re.findall(pat,r.text,re.S)
list=[]
for item in ree:
    list.append('http:'+item)
for i in range(len(list)): 
       download_cmd="you-get --format=flv480 "+ list[i]
       res=os.system(download_cmd)
       print('下载好了')



    
