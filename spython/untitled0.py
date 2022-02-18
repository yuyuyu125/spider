import requests
import json
import openpyxl
wk=openpyxl.Workbook()
sheet=wk.create_sheet()

url='https://club.jd.com/comment/productPageComments.action?callback=fetchJSON_comment98&productId=4564158&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1'
headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
resp=requests.get(url,headers=headers)
r=resp.text
re=r.replace('fetchJSON_comment98(','').replace(');','')
json=json.loads(re)
nei=json['comments']
for item in nei:
    pl=item['content']
    color=item['productColor']
    print(color)
    print(pl)
    print('')
    sheet.append([color,pl])
    wk.save('C:/Users/13966/Desktop/xuexi/kh.xlsx')
    