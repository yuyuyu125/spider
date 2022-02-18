import base64
import requests
e='ef34#teuq0btua#(-57w1q5o5--j@98xygimlyfxs*-!i-0-mb'
a=e+'1'
detail=base64.b64encode(a.encode('utf-8')).decode()
detail_url='https://spa6.scrape.center/detail/'+detail
print(detail_url)
resp=requests.get(detail_url)
print(resp.text)