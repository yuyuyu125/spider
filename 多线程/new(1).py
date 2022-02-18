import urllib.request
from lxml import etree

# https://sc.chinaz.com/tupian/meinvtupian.html
# https://sc.chinaz.com/tupian/meinvtupian_2.html
# https://sc.chinaz.com/tupian/meinvtupian_3.html

def creat_request(page):
    if page == 1:
        url = 'https://sc.chinaz.com/tupian/meinvtupian.html'
    else:
        url = 'https://sc.chinaz.com/tupian/meinvtupian_' + str(page) + '.html'

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'
    }
    request = urllib.request.Request(url=url,headers=headers)
    response = urllib.request.urlopen(request)
    return response

def get_content(response):
    content = response.read().decode('utf-8')
    return content

def down_load(page,content):
    tree = etree.HTML(content)
    name_list = tree.xpath('//div[@id="container"]/div/div/a/img/@alt')
    src_list = tree.xpath('//div[@id="container"]/div/div/a/img/@src2')

    for i in range(len(name_list)):
        url = 'https:' + src_list[i]
        name = name_list[i]
        # urllib.request.urlretrieve(url=url,filename= './photo/_'+ str(i) + name + '.jpg')
# 就是这里！！！！！！ 现在这种加了序号 也就是str（i）的 一页就可以下载40张
        urllib.request.urlretrieve(url=url,filename=name + '.jpg')
# 这种每页就只能下载下来39张    我没弄清楚是什么原因导致的= =！


if __name__ == '__main__':
    start_page = int(input("请输入起始页码"))
    end_page = int(input("请输入终止页码"))

    for page in range(start_page,end_page +1):
        response = creat_request(page)
        content = get_content(response)
        down_load(page,content)




