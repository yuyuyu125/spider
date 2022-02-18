# -*- coding: utf-8 -*-


import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


data = pd.read_excel("600276_main_report.xls")
data = data.iloc[:, 0:23]
data.drop(columns=['Unnamed: 1','Unnamed: 2'], inplace=True)


x=data.iloc[5,1:]

xx=data.iloc[1,1:]

xa=np.array(xx)
df=xa.tolist()


plt.rcParams['font.sans-serif']=['SimHei']
plt.rcParams['axes.unicode_minus'] = False

#


plt.hist(x=data.iloc[5,1:], color='blue', edgecolor='black')
plt.xlabel('营业总收入(元)')
plt.ylabel('频数')
plt.title('近五年营业总收入直方图')

plt.show()


plt.hist(x=df, color='blue', edgecolor='black' )
plt.xlabel('净利润(元)')
plt.ylabel('频数')
plt.title('近五年净利润直方图')
plt.show()



