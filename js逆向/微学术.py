from playwright.sync_api import sync_playwright
import requests
import base64
import time
url='https://m.jw99.top/'
context=sync_playwright().start()
brower=context.chromium.launch()
page=brower.new_page()
page.route('z_stat.php?id=1253244193&web_id=1253244193',lambda route:route.fulfill(path='./cookie.js'))
page.goto(url)
def get_token():
    result=page.evaluate('''() => {
    return window.encrypt
    }''')
    result=result.split(';')
    return result
cookie=get_token()
print(str(cookie[0].split('=')[-1]))