import time
from hashlib import md5
import random
import requests
#md5加密方法
# str='123456'
# md=md5()
# md.update(str.encode())
# mima=md.hexdigest()
# print(mima)
url='https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'
#请求头
headers={'Accept': 'application/json, text/javascript, */*; q=0.01',
'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
'Connection': 'keep-alive',
'Content-Length': '240',
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Cookie': 'OUTFOX_SEARCH_USER_ID=-833072994@119.147.183.51; SESSION_FROM_COOKIE=test; DICT_UGC=be3af0da19b5c5e6aa4e17bd8d90b28a|; JSESSIONID=abcBflElhciOLfyDD_n0x; OUTFOX_SEARCH_USER_ID_NCOO=173185870.9735733; _ntes_nnid=ded9b840159832662274db446e201ddb,1636617025559; ___rl__test__cookies=1636618614874',
'Host': 'fanyi.youdao.com',
'Origin': 'https://fanyi.youdao.com',
'Referer': 'https://fanyi.youdao.com/',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
'X-Requested-With': 'XMLHttpRequest'}
word=input('请输入要翻译的单词')
lts=str(int(time.time()*1000))
salt=lts+str(random.randint(0,9))
str_="fanyideskweb" + word + salt + "Y2FYu%TNSbMCxc3t2u^XT"
md=md5()
md.update(str_.encode())
sign=md.hexdigest()
#字典
data={
'i': word,
'from': 'AUTO',
'to': 'AUTO',
'smartresult': 'dict',
'client': 'fanyideskweb',
'salt': salt,
'sign': sign,
'lts': lts,
'bv': 'c795a332c678d5063a1ee5eb15253848',
'doctype': 'json',
'version': '2.1',
'keyfrom': 'fanyi.web',
'action': 'FY_BY_CLICKBUTTION',
}
resp=requests.post(url=url,data=data,headers=headers).json()

print(resp.get('translateResult')[0][0].get('tgt'))
