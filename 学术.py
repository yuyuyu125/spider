import requests
import time
from playwright.sync_api import sync_playwright
import requests
import base64
import time

url='https://m.jw99.top/'
context=sync_playwright().start()
brower=context.chromium.launch()
page=brower.new_page()
page.route('z_stat.php?id=1253244193&web_id=1253244193',lambda route:route.fulfill(path='D:\pythonProject\js逆向\cookie.js'))
page.goto(url)
def get_cookie():
    result=page.evaluate('''() => {
    return window.encrypt
    }''')
    result=result.split(';')
    return result
cookie=get_cookie()
# print(cookie)
session=requests.Session()
url = "https://m.jw99.top/r=member/login"
headers = {
    'Host': 'm.jw99.top',
    'Connection': 'keep-alive',
    'Content-Length': '35',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua-mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'sec-ch-ua-platform': '"Windows"',
    'Origin': 'https://m.jw99.top',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://m.jw99.top/login',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
cookies = {
    'tyy_session': str(cookie[0].split('=')[-1]),
    'UM_distinctid': str(cookie[0].split('=')[-1]),
    'CNZZDATA1253244193': str(cookie[0].split('=')[-1]),
}
post_form = {
    'username': 'DB96367519',
    'password': '897490',
}
response2 = session.post(url, headers=headers, cookies=cookies, data=post_form)


urls = "https://m.jw99.top/e/action/ShowInfo.php"
headers = {
    'Host': 'm.jw99.top',
    'Connection': 'keep-alive',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Dest': 'document',
    'Referer': 'https://m.jw99.top/lit/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
params = {
    'classid': '58',
    'id': '134',
}
cookies = {
    'tyy_session': str(cookie[0].split('=')[-1]),
    'UM_distinctid': str(cookie[1].split('=')[-1]),
    'mjgvvup': 'DB96367519%897490',
    'CNZZDATA1253244193': str(cookie[2].split('=')[-1]),
}
response1 =session.get(urls, params=params, headers=headers, cookies=cookies,allow_redirects=False)
# print(response1.headers)

url = response1.headers['location']
headers = {
    'Host': '115.28.88.233:91',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Referer': 'https://m.jw99.top/lit/',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

response =session.get(url, headers=headers)
# print(response.cookies['loginid'])




# url = "http://yue.mmddf.top:8080/KNS/request/getucHandler.ashx"
# headers = {
#     'Host': 'yue.mmddf.top:8080',
#     'Connection': 'keep-alive',
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
#     'Accept': '*/*',
#     'Referer': 'http://yue.mmddf.top:8080/kns/brief/default_result.aspx',
#     'Accept-Encoding': 'gzip, deflate',
#     'Accept-Language': 'zh-CN,zh;q=0.9',
# }
# params = {
#     'action': 'getuc',
#     'uc': 'skin/kns/SiteFooter.ascx',
#     'dbPrefix': 'SCDB',
#     'rel': 'http://yue.mmddf.top:8080/kns/brief/default_result.aspx',
#     '__': 'Mon',
# }
# response = session.get(url, params=params, headers=headers)
# print(response.cookies)
# # NET_SessionId=response.cookies['ASP.NET_SessionId']
# # Ecp_ClientId=response.cookies['Ecp_ClientId']
# # Ecp_IpLoginFail=response.cookies['Ecp_IpLoginFail']
# # SID_epub=response.cookies['SID_epub']

import requests
url = "http://yue.mmddf.top:8080/KNS/request/getucHandler.ashx"
headers = {
    'Host': 'yue.mmddf.top:8080',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': '*/*',
    'Referer': 'http://yue.mmddf.top:8080/kns/brief/default_result.aspx',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
params = {
    'action': 'getuc',
    'uc': 'skin/kns/SiteFooter.ascx',
    'dbPrefix': 'SCDB',
    'rel': 'http://yue.mmddf.top:8080/kns/brief/default_result.aspx',
    '__': 'Mon',
}
response = requests.get(url, params=params, headers=headers)

# print(response.cookies)
NET_SessionId=response.cookies['ASP.NET_SessionId']
Ecp_ClientId=response.cookies['Ecp_ClientId']
Ecp_IpLoginFail=response.cookies['Ecp_IpLoginFail']
SID_epub=response.cookies['SID_epub']
# print(NET_SessionId,Ecp_ClientId,Ecp_IpLoginFail,SID_epub)


####loginlogin
url = "http://yue.mmddf.top:8080/KNS/request/getucHandler.ashx"
headers = {
    'Host': 'yue.mmddf.top:8080',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': '*/*',
    'Referer': 'http://yue.mmddf.top:8080/kns/brief/default_result.aspx',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
params = {
    'action': 'getuc',
    'uc': 'skin/kns/ResultHeader.ascx',
    'dbPrefix': 'SCDB',
    'rel': 'http://yue.mmddf.top:8080/kns/brief/default_result.aspx',
    '__': 'Mon',
}
response = session.get(url, params=params, headers=headers)
NET_SessionId1=response.cookies['ASP.NET_SessionId']
Ecp_ClientId1=response.cookies['Ecp_ClientId']
Ecp_IpLoginFail1=response.cookies['Ecp_IpLoginFail']
SID_epub1=response.cookies['SID_epub']
# print(response.text)


import requests
url = "http://yue.mmddf.top:8080/kns/Request/login.aspx"
headers = {
    'Host': 'yue.mmddf.top:8080',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': '*/*',
    'Referer': 'http://yue.mmddf.top:8080/kns/brief/default_result.aspx',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
params = {
    '': '',
    'td': int(time.time()),
}
cookies = {
    'ASP.NET_SessionId': str(NET_SessionId1),
    'Ecp_ClientId':str(Ecp_ClientId1),
    'Ecp_IpLoginFail': str(Ecp_IpLoginFail1),
    'SID_epub': str(SID_epub1),
}
response = session.get(url, params=params, headers=headers, cookies=cookies,allow_redirects=False)

url=response.headers['Location']
headers = {
    'Host': '115.28.88.233:89',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': '*/*',
    'Referer': 'http://yue.mmddf.top:8080/',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
response=session.get(url)

cookies1 = {
    'ASP.NET_SessionId':str(NET_SessionId),
    'Ecp_ClientId':str(Ecp_ClientId),
    'Ecp_IpLoginFail':str(Ecp_IpLoginFail),
    'SID_epub': 'SID_epub',
    'RsPerPage': '20',
}

headers = {
    'Proxy-Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Referer': 'http://yue.mmddf.top:8080/kns/brief/brief.aspx?curpage=2&RecordsPerPage=20&QueryID=0&ID=&turnpage=1&tpagemode=L&dbPrefix=SCDB&Fields=&DisplayMode=listmode&PageName=ASP.brief_default_result_aspx',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

params = (
    ('curpage', '3'),
    ('RecordsPerPage', '20'),
    ('QueryID', '0'),
    ('ID', ''),
    ('turnpage', '1'),
    ('tpagemode', 'L'),
    ('dbPrefix', 'SCDB'),
    ('Fields', ''),
    ('DisplayMode', 'listmode'),
    ('PageName', 'ASP.brief_default_result_aspx'),
)

response122 =session.get('http://yue.mmddf.top:8080/kns/brief/brief.aspx', headers=headers, params=params, cookies=cookies, verify=False)
print(response122.text)
#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.get('http://yue.mmddf.top:8080/kns/brief/brief.aspx?curpage=3&RecordsPerPage=20&QueryID=0&ID=&turnpage=1&tpagemode=L&dbPrefix=SCDB&Fields=&DisplayMode=listmode&PageName=ASP.brief_default_result_aspx', headers=headers, cookies=cookies, verify=False)
