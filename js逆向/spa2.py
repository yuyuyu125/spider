from playwright.sync_api import sync_playwright
import requests
import time
url='https://spa2.scrape.center'
index_url='https://spa2.scrape.center/api/movie/?limit={limit}&offset={offset}&token={token}'
MAX_PAGE=5
LIMIT=10
context=sync_playwright().start()
browser=context.chromium.launch()
page=browser.new_page()
page.route("/js/chunk-10192a00.243cb8b7.js",lambda route:route.fulfill(path='./chunk.js'))
page.goto(url)
def get_token(offest):
    result=page.evaluate('''() => {
    return window.encrypt("%s","%s")
    }'''%('/api/movie',offest))
    return result
for i in range(MAX_PAGE):
    offset=i*LIMIT
    token=get_token(offset)
    urls=index_url.format(limit=LIMIT,offset=offset,token=token)
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
        'Accept': 'application/json, text/plain, */*',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'sec-ch-ua-platform': '"Windows"',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://spa2.scrape.center/page/1',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }

    resp=requests.get(urls,headers=headers)
    print('resp',resp.json())