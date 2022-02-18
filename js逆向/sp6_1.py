from playwright.sync_api import sync_playwright
import requests
import base64
import time
import  hashlib
url='https://spa6.scrape.center'
index_url='https://spa6.scrape.center/api/movie/?limit=10&offset=0&token={token}'
'/api/movie/ZWYzNCN0ZXVxMGJ0dWEjKC01N3cxcTVvNS0takA5OHh5Z2ltbHlmeHMqLSFpLTAtbWIx'
context=sync_playwright().start()
brower=context.chromium.launch()
page=brower.new_page()
page.route('chunk-19c920f8.c3a1129d.js',lambda route:route.fulfill(path='./spa6.js'))
page.goto(url)
def get_token():
    result=page.evaluate('''() => {
    return window.encrypt("%s")
    }'''%('/api/movie'))
    return result
token=get_token()
URL=index_url.format(token=token)
resp=requests.get(URL)
# print(resp.json())
def get_detail():

    for i in range(1,101):

        e='ef34#teuq0btua#(-57w1q5o5--j@98xygimlyfxs*-!i-0-mb'
        a=e+str(i)
        detail=base64.b64encode(a.encode('utf-8')).decode('utf-8')
        detail_url='/api/movie/'+detail
        list = [detail_url]
        timestamp = str(int(time.time()))
        list.append(timestamp)
        s1 = hashlib.sha1(','.join(list).encode('utf-8')).hexdigest()
        token = base64.b64encode(','.join([s1, timestamp]).encode('utf-8')).decode('utf-8')
        resp1=requests.get('https://spa6.scrape.center/api/movie/'+detail+'/?token='+token)
        list=[]
        print(resp1.json())

get_detail()