import pandas as pd
import numpy as np
a=pd.read_excel('panda.xlsx',sheet_name='Sheet1')
b=pd.read_excel('panda.xlsx',sheet_name='Sheet2')
a.info()
a.describe() #汇总统计
a.rename(columns={'学号':'学号1'}) #重命名标签 inplace=True直接在原表进行
a.drop_duplicates()
a['学号'].map(lambda x:x*2) #添加映射
a.apply(lambda x:x*2) #逐行或者逐列执行操作 axis，默认是行
a.applymap(lambda x:x*2) #每个元素都执行
# a['新']=a['学号'].map(str)+a['姓名'].map(str) 两列文本连接
print(a)
d=pd.merge(a,b,how='left',on='姓名') #连接表 vlookup
tsb=pd.pivot_table(a,index=['学号'],aggfunc=np.sum,margins=True)#aggfunc=np.sum求和的意思，np.size是求个数,默认是平均值,margins=True是总计
print(tsb)