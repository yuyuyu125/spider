import re

import requests
from lxml import etree
url='https://www.huya.com/g/lol'
header={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'

}
resp=requests.get(url=url,headers=header)
pat=r'<i class="js-num">(.*?)</i>'
text=re.findall(pat,resp.text,re.S|re.M)
print(text)
# data=etree.HTML(resp.text)
# # d=data.xpath('//i[@class="js-num"]/text()')
# # name=data.xpath('//i[@class="nick"]/text()')
# dd=data.xpath('//li[@class="game-live-item"]')
#
# for i in dd:
#     name=i.xpath('.//i[@class="nick"]/text()')[0]
#     d=i.xpath('.//i[@class="js-num"]/text()')[0]
#     f=i.xpath('.//a[@class="title"]/text()')[0]
#     print(name,f,d)
