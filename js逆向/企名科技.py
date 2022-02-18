import requests
import execjs
import json
url='https://vipapi.qimingpian.cn/DataList/productListVip'
headers={
'Accept':'application/json, text/plain, */*',
'Accept-Encoding':'gzip, deflate, br',
'Accept-Language':'zh-CN,zh;q=0.9',
'Connection':'keep-alive',
'Content-Length':'168',
'Content-Type':'application/x-www-form-urlencoded',
'Host':'vipapi.qimingpian.cn',
'Origin':'https://www.qimingpian.cn',
'sec-ch-ua':'" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
'sec-ch-ua-mobile':'?0',
'sec-ch-ua-platform':'"Windows"',
'Sec-Fetch-Dest':'empty',
'Sec-Fetch-Mode':'cors',
'Sec-Fetch-Site':'same-site',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
}
data={
'time_interval':'',
'tag':'',
'tag_type':'and',
'province':'',
'lunci':'',
'page':'2',
'num':'20',
'unionid':'mEFiJaeiiRH2WVyz5NDWvFiS/i3ui+73Wgr1POjsrQ6OcRhzkvGrSzAcUvBcTuV9eJWqqIs6kiQsM8IbOYgM5A==',
}
resp=requests.post(url=url,data=data,headers=headers)
wo=(resp.json()['encrypt_data'])
with open('qmkj.js','r',encoding='utf-8') as f:
    s=f.read()
ress=execjs.compile(s).call('o',wo)
rea=json.loads(ress)
print(rea)