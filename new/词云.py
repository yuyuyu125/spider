import jieba
import pandas as pd
import numpy as np
import re
dd=pd.read_excel('评论.xlsx')

e=[11,22,33]

df=dd.values.tolist()
pattern=re.compile(r'[\u4e00-\u9fa5]')
stword=[]
fp=open(r'C:\Users\13966\Downloads\cn_stopwords.txt','r',encoding='utf-8')
for line in fp.readlines():
    stword+=str(line).strip('\n').split(',')
fp.close()
seg_list=''
pattern=re.compile(r'[\u4e00-\u9fa5]')
add_punc='，。、【】“”：；（）《》‘’{}？！⑦()、%^>℃：.”“^-——=擅长于的&#@￥'
for i in range(len(df)):
    word=jieba.cut(str(df[i]),cut_all=False)
    for x in word:

        if  x not in stword and pattern.match(x):
            seg_list+=x
            seg_list+=' '
print(seg_list)
vj='sss ccc sss 冲冲冲 世界级 还会'



import  wordcloud
import  numpy as np
import  matplotlib.pyplot as plt
import  PIL
import jieba
import re
font = r'C:\Windows\Fonts\simfang.ttf'
WC=wordcloud.WordCloud(width=1000,height=700,background_color='white',font_path=font)
con=WC.generate(seg_list)
plt.imshow(con)
plt.axis('off')
WC.to_file('词云图.png')