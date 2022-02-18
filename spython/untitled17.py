# -*- coding: utf-8 -*-
"""
Created on Tue Aug 31 13:31:13 2021

@author: 13966
"""
##请求中有中文，要编码
import requests
import json
import re
import openpyxl
def gettext():
    url='https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=2021-09-01&leftTicketDTO.from_station=BJP&leftTicketDTO.to_station=TJP&purpose_codes=ADULT'
    headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36','Cookie':'_uab_collina=163038760910663838903071; JSESSIONID=1081D39EB2F5E3AA3BDAB64F32CB2A06; BIGipServerotn=32506378.50210.0000; BIGipServerpool_passport=165937674.50215.0000; RAIL_EXPIRATION=1630720868449; RAIL_DEVICEID=YlWCPmpYMr_VZ8hVCvmGBwx1HUfjhnJ_Poxg9et2yEvw6aBgSMCro7sb16lZ_Py_N_R7uLguS4FnC4KRunSbkhWK5y8VMrm36kftp8BVE6qow78zf_X_aHMOJ2yvuNjdqG3lHH568daUEmhRIE6az6h4yz3oVWm5; route=9036359bb8a8a461c164a04f8f50b252; _jc_save_toDate=2021-08-31; _jc_save_wfdc_flag=dc; _jc_save_fromStation=%u5317%u4EAC%2CBJP; _jc_save_toStation=%u5929%u6D25%2CTJP; _jc_save_fromDate=2021-09-01'}
    a=requests.get(url,headers=headers)
    encoding='utf-8'
    return a
def get_json(a,city):
    json=a.json()
    b=json['data']['result']
    lst=[]
    city=get_city()
    for item in b:
        d=item.split('|')
        checi=d[3]
        start_di=city[d[6]]
        end_di=city[d[7]]
        lst.append([checi,start_di,end_di])
    #print(checi,start_di,end_di)
    #print(d)
    print(lst)
    return lst
        
    
    return b
def start():
    get_json(gettext(),get_city())
def get_city():
    url='https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.9201'
    headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
    c=requests.get(url,headers=headers)
    encoding = 'utf-8'
    d=re.findall('([\u4e00-\u9fa5]+)\|([A-Z]+)',c.text)
    d=dict(d)
    dict_s={}
    for item in d:
        dict_s[d[item]]=item
    return dict_s    
def save(lst):
    
    wb=openpyxl.Workbook()
    sheet=wb.active
    sheet.append(['车次','出发地','目的地'])
    for item in lst:
        sheet.append(item)
    wb.save('checi1.xlsx')
    
if __name__ == '__main__':
    start()
    save(get_json(gettext(),get_city()))
    #get_city()
    
    

