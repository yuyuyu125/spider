import requests
import pymysql
from lxml import etree
url='https://ggzy.jiangxi.gov.cn/web/xwzx/007001/{}.html'
headers={
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
}

connect=pymysql.connect(
            host='localhost',
            port=3306,
            db='python',
            user='root',
            password='123456'
 )

for i in range(1,6):
    resp=requests.get(url=url.format(i),headers=headers)
    re=etree.HTML(resp.text)
    li = re.xpath('/html/body/div[3]/div[2]/div[2]/div[1]/ul/li')

    for x in li:

        title=x.xpath('.//a/@title')[0]
        urls=x.xpath('.//a/@href')[0]
        print(urls)
        if urls.split('.')[-1]=='pdf':
            time=''
            content=''
            break
        else:
            urlss='https://ggzy.jiangxi.gov.cn'+urls
            resp_1=requests.get(urlss,headers=headers)
            res=etree.HTML(resp_1.text)
            time=res.xpath('/html/body/div[2]/div[2]/div[1]/p/text()')[0].strip()
            content=res.xpath("normalize-space(string(.//div[@class='ewb-detail-box']))")
        insert_sql='''insert into `jiangxi`(`title`,`time`,`content`)
                    values(%s,%s,%s)
                     '''
        cursor = connect.cursor()
        cursor.execute(
            insert_sql, (
    title,time,content
            )
        )
        connect.commit()



