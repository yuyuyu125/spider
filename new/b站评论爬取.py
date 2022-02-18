import requests
import json
import pandas as pd
url='https://api.bilibili.com/x/v2/reply/main?&jsonp=jsonp&next={}&type=1&oid=549369080&mode=3&plat=1'
header={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
        'cookie': 'b_ut=-1; i-wanna-go-back=-1; bsource=search_baidu; _uuid=4A3CBA57-7391-FB810-262F-78E637F2863695547infoc; buvid3=1FB67382-6ECE-46D7-A1B5-3607D5BA3F89167638infoc; CURRENT_BLACKGAP=0; fingerprint=c7679b06c3acf876e38da9b4d31ad694; buvid_fp=1FB67382-6ECE-46D7-A1B5-3607D5BA3F89167638infoc; buvid_fp_plain=7190E085-7EB2-4867-8630-7FC582355F59143104infoc; _jct=7a449b904c3f11ecaf37d261c10b631c; SESSDATA=051fd1e5%2C1653211678%2C22fba%2Ab1; bili_jct=64d415e7ba22bd1e362de44a34c49c2c; DedeUserID=81259154; DedeUserID__ckMd5=fcb9af9312821c7f; sid=84ficzf6; bp_video_offset_81259154=596148401361212900; bp_t_offset_81259154=596148401361212900; innersign=1; CURRENT_FNVAL=976; video_page_version=v_new_home_3; blackside_state=1; rpdid=|(k|k)~ukJlY0J\'uYJ~Ylm~|l'}
df=[]
for i in range(100):
    resp=requests.get(url=url.format(i),headers=header)
    js=resp.json()
    if js['data']['replies']:
        for re in js['data']['replies']:
            df.append(re['content']['message'])

dff=pd.DataFrame(data=df)
dff.to_excel('评论.xlsx')
import jieba
stword=[]
pattern=re.compile(r'[\u4e00-\u9fa5]')
fp=open(r'C:\Users\13966\Downloads\cn_stopwords.txt','r',encoding='utf-8')
for line in fp.readlines():
    stword+=str(line).strip('\n').split(',')
fp.close()
seg_list=''
for i in range(len(df)):
    word=jieba.cut(df[i],cut_all=False)
    for i in word:
        if i not in stword and pattern.match(i):
            seg_list+=i
            seg_list+=' '
print(seg_list)
import  wordcloud
import  numpy as np
import  matplotlib.pyplot as plt
import  PIL
import jieba
import re

WC=wordcloud.WordCloud(width=1000,height=700)
con=WC.generate(seg_list)
plt.imshow(con)
plt.axis('off')
WC.to_file('词云图.png')
