from jsonpath import jsonpath
import json
import requests
from lxml import etree
te=open('cj.txt','r',encoding='GBK').read()
headers={
    'Host': 'las.cnas.org.cn',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Dest': 'document',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',}
list=[]
tess=json.loads(te)
data=tess['data']
for i in data:
    id=i['uuid']

    url='https://las.cnas.org.cn/LAS_FQ/publish/queryOrgInfo1.action?id='+id
    list.append(url)
for i in list:
    resp=requests.get(i,headers=headers)
    break
ym=etree.HTML(resp.text)

zmbh=ym.xpath('//table[@class="common"]//tr[1]/td/span/text()')[0].strip()
try:
    bg=ym.xpath('//table[@class="common"]//tr[2]/td/span/text()')[0].strip()
except:
    bg=''
lxr=ym.xpath('//table[@class="common"]//tr[3]/td[1]/span/text()')[0].strip()
lxr_number=ym.xpath('//table[@class="common"]//tr[3]/td[2]/span/text()')[0].strip()
yzbm=ym.xpath('//table[@class="common"]//tr[4]/td[1]/span/text()')[0].strip()
try:
    cz_number=ym.xpath('//table[@class="common"]//tr[4]/td[2]/span/text()')[0].strip()
except:
    cz_number=''


