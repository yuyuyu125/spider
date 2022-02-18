# coding:utf-8
from ctypes import POINTER
import requests
session = requests.Session()
url = "https://las.cnas.org.cn/LAS_FQ/publish/externalQueryL1.jsp"
headers = {
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
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
session.get(url, headers=headers)




url = "https://las.cnas.org.cn/LAS_FQ/verify/getValidateCode.action"
headers = {
    'Host': 'las.cnas.org.cn',
    'Connection': 'keep-alive',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Dest': 'iframe',
    'Referer': 'https://las.cnas.org.cn/LAS_FQ/publish/externalQueryL1.jsp',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
params = {
    'fleshCode': '0.15488700375218323',
}
response = session.get(url, params=params, headers=headers)
with open('code.png','wb')as f:
    f.write(response.content)
from PIL import Image
Image.open('code.png').show()

url = "https://las.cnas.org.cn/LAS_FQ/publish/queryPublishLicenseList.action"
headers = {
    'Host': 'las.cnas.org.cn',
    'Connection': 'keep-alive',
    'Content-Length': '185',
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
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
post_form = {
    '': '',
    'labType': 'L',
    'choType': 'L',
    'orgState': '0',
    'searchLang': 'CH',
    'choL1': 'L10',
    'detail': 'xx',
    'orgAreaSel': '00',
    'chType': '1',
    'objName': '医疗器械',
    'authInterceptCode': input('验证码：'),
    'startIndex': '0',
    'sizePerPage': '100',
}
response = session.post(url, headers=headers, data=post_form)
print(response.text)
# id_list  = [item['uuid'] for item in response.json()['data']]
# for _id in id_list:
#     url = f'https://las.cnas.org.cn/LAS_FQ/publish/queryOrgInfo1.action?id={_id}'
#     response = session.get(url)
#     print(response.text)