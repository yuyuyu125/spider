import requests
from bs4 import BeautifulSoup
url='http://us.3forts.com/Client/inbound'
headers = {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Mobile Safari/537.36'}
Cookies={'Cookie':'wxuid=8ac705ec99b700cb56e9bf87962401687827c2f55524f8cfa77cd14fc7b0a6ee066f076ed449b51013c61a29a9673b94195d4696b2ac5716; ASP.NET_SessionId=p14vji00g5iurkpq1ffztsnt'}

data={
'page':'1',
'rows':'50',
'tid':'0',
'ended':'2',
'locked':'2',
'begindate':'',
'enddate':'',
'warehouseid':'',
'type':'',
'cabinet_number':'',
'keyword':'',
    }
resp=requests.post(url=url,data=data,headers=headers,cookies=Cookies)
li=resp.json()
print(li)