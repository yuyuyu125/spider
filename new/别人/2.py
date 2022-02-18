# -*- coding: utf-8 -*-


import os
import pandas as pd
from sklearn import linear_model


path = r'C:\Users\13966\Documents\Tencent Files\1396641320\FileRecv\财务数据'
filenames = os.listdir(path)

# for filename in filenames:
#     print(filename)

    
max_increase = 0
number_increase = ''
max_profit = 0
number_profit = ''

for i in filenames:
    if "main_report.xls" in i :

        excel_path = r'C:\Users\13966\Documents\Tencent Files\1396641320\FileRecv\财务数据\\' + i
        f = open(excel_path,'rb')
        data = pd.read_excel(f)
        values_increase = data.iloc[2, 3:23]
        value_increase = 0
        for index,value in values_increase.items():
            if '--' not in value:
                count=0
                value_increase += float(value.replace('%', ''))
                count+=1
        value_increase=value_increase/count
        if value_increase > max_increase:
            max_increase = value_increase
            number_increase = i.replace('_main_report.xls', '')

        values_profit = data.iloc[12, 3:23]
        value_profit = 0
        for index,value in values_profit.items():
            if '--' not in value:
                value_profit += float(value.replace('%', ''))
        if value_profit > max_profit:
            max_profit = value_profit
            number_profit = i.replace('_main_report.xls', '')
print('近五年平均利润增长率最高的股票为'+number_increase)
print('近五年平均净利润率最高的股票为'+number_profit)