from lxml import etree
from bs4 import BeautifulSoup
import requests


url='https://www.amazon.com/hz/leaderboard/top-reviewers/ref=cm_cr_tr_link_next_2?page=2'
header={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}
resp=requests.get(url=url,headers=header)
data=BeautifulSoup(resp.text,'lxml')


tr=data.find('div',class_='a-box-inner')
tr1=tr.find('table',role='tab')
tr2=tr1.find_all('tr')[2:]

for trs in tr2:
    ss=trs.find_all('td')[2]
    href=ss.a.attrs["href"]
    print((href))



