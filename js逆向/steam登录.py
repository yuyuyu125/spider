import requests
import execjs
url='https://store.steampowered.com/login/getrsakey/'
header={
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'

}
data={
'donotcache': '1636991353064',
'username': '13966@qq.com'
}
resp=requests.post(url=url,data=data,headers=header).json()
publickey_exp=resp['publickey_exp']
publickey_mod=resp['publickey_mod']
#密码逆向
node=execjs.get()
ctx=node.compile(open('steam.js',encoding='utf-8').read())
funName='getPwd("{0}","{1}","{2}")'.format('123456',publickey_exp,publickey_mod)
pwd=ctx.eval(funName)
print(pwd)