import time
import json
import requests
from lxml import etree
import re
import pymongo
baidy=[]
urls=[]
def get_cookies():
    url = "http://y654321.com/member.php"
    headers = {
        'Host': 'y654321.com',
        'Connection': 'keep-alive',
        'Content-Length': '69',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'Origin': 'http://y654321.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Referer': 'http://y654321.com/forum.php',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }
    params = {
        'mod': 'logging',
        'action': 'login',
        'loginsubmit': 'yes',
        'infloat': 'yes',
        'lssubmit': 'yes',
        'inajax': '1',
    }

    post_form = {
        'username': '15812575345',
        'password': '19990625.',
        'quickforward': 'yes',
        'handlekey': 'ls',
    }
    response = requests.post(url, params=params, headers=headers, data=post_form)
    return response.cookies
def get_url(page):
    # cookies=get_cookies()
    headers = {
        'Proxy-Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Referer': 'http://y654321.com/forum.php',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }
    for i in range(1,page+1):
        url='http://y654321.com/forum-108-{}.html'.format(i)
        resp=requests.get(url,headers=headers,verify=False)
        # print(resp.text)
        po=etree.HTML(resp.text)
        po1=po.xpath(".//a[@class='s xst']/@href")
        for i in po1[5:]:
            i='http://y654321.com/'+i
            urls.append(i)
    return urls
def download():
    client = pymongo.MongoClient(host='localhost', port=27017)
    db = client.test
    cllection = db.movie
    urls=get_url(1)
    cookies=get_cookies()
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Referer': 'http://y654321.com/forum.php',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }
    for url in urls:
        dict={}

        resp=requests.get(url=url,headers=headers,cookies=get_cookies(),verify=False)
        # print(resp.status_code)
        patn1='id="thread_subject">(.*?)</span>'
        patn2='"https://pan.baidu.com/s/(.*?)"'
        patn3='提取码: (.*?) '
        name=re.findall(patn1,resp.text,re.S)[0]
        lianjie='https://pan.baidu.com/s/'+re.findall(patn2,resp.text,re.S)[0]
        tiquma=re.findall(patn3,resp.text,re.S)[0]
        dict['name']=name
        dict['url']=lianjie
        dict['tiquma']=tiquma
        # baidy.append(dict)
        # biao=zip(bai,baidy)
        print(dict)
        result = cllection.insert_one(dict)
        time.sleep(1)
        # result = cllection.insert_one(biao)
# def charu():
#     biao=download()
#     client = pymongo.MongoClient(host='localhost', port=27017)
#     db = client.test
#     cllection = db.movie
#     result=cllection.insert_one(biao)



if __name__=='__main__':
    download()

