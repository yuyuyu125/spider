import requests
url='http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=cname'
headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
for i in range(1,10):
    data={
      'cname': '广州',
    'pid':'',
    'pageIndex': str(i),
    'pageSize': '10'    }
    resp=requests.post(url,data=data)
    li=resp.json()
    li1=li['Table1']
    for item in li1:
        name=item['storeName']
        address=item['addressDetail']
        print(name,address)
    # for item in li:
    
    #     dizhi=li['Table1']
    #     print(dizhi)