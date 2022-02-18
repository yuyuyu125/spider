import requests
import jsonpath
session = requests.Session()
url3='https://las.cnas.org.cn/LAS_FQ/publish/externalQueryL1.jsp'
headers3 = {
    'Host': 'las.cnas.org.cn',
    'Connection': 'keep-alive',
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
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
resp3=session.get(url=url3,headers=headers3)
url1='https://las.cnas.org.cn/LAS_FQ/verify/getValidateCode.action?fleshCode=0.1959407084990794'
headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
resp1=session.get(url=url1,headers=headers)

with open('code.png','wb') as df:
    df.write(resp1.content)
df.close()
inp=input('请输入验证码')
data={
    '': '',
    'labType': 'L',
    'choType': 'L',
    'orgState': '0',
    'searchLang': 'CH',
    'choL1': 'L10',
    'detail': 'xx',
    'orgAreaSel': '00',
    'chType': '1',
    'objName': '\u533B\u7597\u5668\u68B0',
    'authInterceptCode': inp,
    'startIndex': '0',
    'sizePerPage': '100'
}
headers1= {
    'Connection': 'keep-alive',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua-mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
    'sec-ch-ua-platform': '"Windows"',
    'Accept': '*/*',
    'Origin': 'https://las.cnas.org.cn',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://las.cnas.org.cn/LAS_FQ/publish/externalQueryL1.jsp',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
url2='https://las.cnas.org.cn/LAS_FQ/publish/queryPublishLicenseList.action?'
resp2=session.post(url=url2,headers=headers1,data=data)
print(resp2.text)

# import json
#
# from lxml import etree
# headers4={
#     'Host': 'las.cnas.org.cn',
#     'Connection': 'keep-alive',
#     'Cache-Control': 'max-age=0',
#     'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
#     'sec-ch-ua-mobile': '?0',
#     'sec-ch-ua-platform': '"Windows"',
#     'Upgrade-Insecure-Requests': '1',
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
#     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
#     'Sec-Fetch-Site': 'none',
#     'Sec-Fetch-Mode': 'navigate',
#     'Sec-Fetch-User': '?1',
#     'Sec-Fetch-Dest': 'document',
#     'Accept-Encoding': 'gzip, deflate, br',
#     'Accept-Language': 'zh-CN,zh;q=0.9',}
# list=[]
# tess=json.loads(resp2.text)
# data1=tess['data']
# for i in data1:
#     id=i['uuid']
#
#     url='https://las.cnas.org.cn/LAS_FQ/publish/queryOrgInfo1.action?id='+id
#     list.append(url)
# for i in list:
#     resp3=session.get(i,headers=headers4)
#     break
# ym=etree.HTML(resp3.text)
#
# zmbh=ym.xpath('//table[@class="common"]//tr[1]/td/span/text()')[0].strip()
# try:
#     bg=ym.xpath('//table[@class="common"]//tr[2]/td/span/text()')[0].strip()
# except:
#     bg=''
# lxr=ym.xpath('//table[@class="common"]//tr[3]/td[1]/span/text()')[0].strip()
# lxr_number=ym.xpath('//table[@class="common"]//tr[3]/td[2]/span/text()')[0].strip()
# yzbm=ym.xpath('//table[@class="common"]//tr[4]/td[1]/span/text()')[0].strip()
# try:
#     cz_number=ym.xpath('//table[@class="common"]//tr[4]/td[2]/span/text()')[0].strip()
# except:
#     cz_number=''
# try:
#     web_url=ym.xpath('//table[@class="common"]//tr[5]/td[1]/span/text()')[0].strip()
# except:
#     web_url=''
# email=ym.xpath('//table[@class="common"]//tr[5]/td[2]/span/text()')[0].strip()
# dz=ym.xpath('//table[@class="common"]//tr[6]/td[1]/span/text()')[0].strip()
# qx=ym.xpath('//table[@class="common"]//tr[7]/td[1]/span/text()')[0].strip()
# yg=ym.xpath('//table[@class="common"]//tr[8]/td[1]/span/text()')[0].strip()
# try:
#     rwbh=ym.xpath('//table[@class="fileTable"]//tr[2]/td[1]/text()')[0].strip()
# except:
#     rwbh=''
# pslx=ym.xpath('//table[@class="fileTable]"//tr[2]/td[2]/text()')[0].strip()
# date=ym.xpath('//table[@class="fileTable]"//tr[2]/td[3]/text()')[0].strip()
# gbzt=ym.xpath('//table[@class="fileTable]"//tr[2]/td[4]/text()')[0].strip()
# print(zmbh,bg,lxr,lxr_number,yzbm,cz_number,web_url,email,dz,qx,yg,rwbh,pslx,date,gbzt)
