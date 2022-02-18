import requests
import execjs
import time
node=execjs.get()
nodes=execjs.get()
ctx=node.compile(open('./医保局.js',encoding='utf-8').read())
# ctxs=nodes.compile(open('sssss.js',encoding='utf-8').read())
data_={"addr":"","regnCode":"110000","medinsName":"","sprtEcFlag":"","medinsLvCode":"","medinsTypeCode":"","pageNum":2,"pageSize":10}
def qingqiu():
    headers=ctx.call('getheader')
    headers['User-Agent']='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    headers["x-tif-paasid"]='undefined'
    headers["Content-Type"] = "application/json"
    headers["Host"] = "fuwu.nhsa.gov.cn"
    headers["Origin"] = "https://fuwu.nhsa.gov.cn"
    headers["Referer"] = "https://fuwu.nhsa.gov.cn/nationalHallSt/"
    numa='getdata({})'.format(data_)
    data=ctx.eval(numa)
    resp=requests.post(url='https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/fixed/queryFixedHospital',headers=headers,json=data).json()
    # print(resp.json())
    return resp
def jiemi():
    ccc='jiemi({})'.format(qingqiu())
    dd=ctx.eval(ccc)
    return dd
if __name__ == '__main__':
    print(jiemi())