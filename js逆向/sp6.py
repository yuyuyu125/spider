import requests
import  hashlib
import base64
from typing import List,Any
import time

url='https://spa6.scrape.center/api/movie/?limit=10&offset=10&token={token}'
LIMIT=10
MAX=10
def get_token(list:List[Any]):
    timestamp=str(int(time.time()))
    list.append(timestamp)
    s1=hashlib.sha1(','.join(list).encode('utf-8')).hexdigest()
    token=base64.b64encode(','.join([s1,timestamp]).encode('utf-8')).decode('utf-8')
    return token
list=['/api/movie']
token=get_token(list=list)
index_url=url.format(token=token)
resp=requests.get(index_url)
print(resp.json())

