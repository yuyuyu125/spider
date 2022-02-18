# -*- coding: utf-8 -*-
"""
Created on Thu Nov  4 17:39:44 2021

@author: 86940
"""

import mpl_finance as mpf
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
 


fig = plt.figure(figsize=(12,8))
ax = fig.add_subplot(111)

data_0 = pd.read_csv(r'000153.csv', encoding='GB2312')
data_0 = data_0[data_0['涨跌幅']!='None']

date_0 = []
highs = []
lows = []
opens = []
closes = []

for index, row in data_0.iterrows():
    date_0.append(row[0][0:7])

date = pd.DataFrame(date_0)
date.columns=['日期']

data_1 = date.join(data_0['收盘价'])
da=data_1.groupby('日期').mean()
data_close = data_1.groupby('日期')['收盘价'].apply(list)
data_1 = date.join(data_0['最高价'])
data_high = data_1.groupby('日期')['最高价'].apply(list)
data_1 = date.join(data_0['最低价'])
data_low = data_1.groupby('日期')['最低价'].apply(list)
data_1 = date.join(data_0['开盘价'])
data_open = data_1.groupby('日期')['开盘价'].apply(list)
dates = []

for index,value in data_close.items():
    dates.append(index)
    closes.append(value[0])
    
for index,value in data_high.items():
    highs.append(max(value))
    
for index,value in data_low.items():
    lows.append(min(value))
    
for index,value in data_open.items():
    opens.append(value[-1])
    
plt.rcParams['font.sans-serif']=['SimHei']
plt.rcParams['axes.unicode_minus'] = False

ohlc = list(zip(np.arange(0,len(opens)), opens, closes, highs, lows))
mpf.candlestick2_ochl(ax, opens, closes, highs, lows, width=0.6, colorup='r', colordown='g')
ax.set_xlim(0,len(dates))
ax.set_xticks(np.arange(0,len(dates),20))
ax.set_xticklabels([dates[index] for index in ax.get_xticks()])
ax.set_xlabel('月份', fontsize = 15)
ax.set_ylabel('价格', fontsize = 15)
ax.set_title('600276k线图')
plt.show()