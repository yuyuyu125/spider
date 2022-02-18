import urllib.request
import urllib.parse
import json

url = 'https://fanyi.baidu.com/sug'

data = {
    'kw' : 'spider'
}

data = urllib.parse.urlencode({
    'kw' : 'spider'
}).encode('utf-8')

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
}

# request = urllib.request.Request(url=url,data=data,headers=headers)
response = urllib.request.urlopen(url=url,data=data)
content = response.read().decode('utf-8')

obj = json.loads(content)
print(obj)