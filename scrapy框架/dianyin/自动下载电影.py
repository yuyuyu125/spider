import pandas as pd
import re
import os
import chardet
da=pd.read_excel(r'D:\pythonProject\scrapy框架\dianyin\dianyin\spiders\movie.xlsx')
dict=da[['movie_name','download']].set_index('movie_name').to_dict()['download']
data=da['movie_name']
name=input('输入电影名字')
pattern='.*%s.*'%name
li=[]
for item in data:
    match=re.search(pattern,item)

    if match:
        movie=item

        d_name=dict[item]
ans=input('您搜索的电影名字是否为'+movie+'\n'+'输入是下载')
if ans=='是':
    os.system(r'"E:\Thunder\Program\ThunderStart.exe" {}'.format(d_name))







# s
# d_name=dict[name]
# print(d_name)