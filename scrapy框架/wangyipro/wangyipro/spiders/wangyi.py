import scrapy
from selenium import webdriver
from wangyipro.items import WangyiproItem
class WangyiSpider(scrapy.Spider):
    name = 'wangyi'
    #allowed_domains = ['https://news.163.com']
    start_urls = ['https://news.163.com/']
    wy_urls=[]
    def __init__(self):
        self.bro=webdriver.Chrome()
    def parse(self, response):
        li=response.xpath('//div[@class="ns_area list"]/ul/li')
        list=[2,3,5]
        for i in list:
            href=li[i].xpath('./a/@href').extract_first()
            self.wy_urls.append(href)
        for url in self.wy_urls:
            yield scrapy.Request(url=url,callback=self.parse_i)
    def parse_i(self,response):
        li=response.xpath('/html/body/div/div[3]/div[4]/div[1]/div[1]/div/ul/li/div/div')

        for i in li:
            item=WangyiproItem()
            title=i.xpath('.//h3/a/text()').extract_first()
            new_url=i.xpath('.//h3/a/@href').extract_first()
            print(title,new_url)
            item['title']=title
            yield scrapy.Request(url=new_url,callback=self.parse_ii,meta={'item':item})
    def parse_ii(self,response):
        item=response.meta['item']
        ss=response.xpath('//*[@id="content"]//text()').extract()
        content=''.join(ss)
        item['content']=content
        yield item
    def closed(self,spider):
        self.bro.quit()





