import scrapy
from firstblood.items import FirstbloodItem

class FirstSpider(scrapy.Spider):
    name = 'first'
    #allowed_domains = ['www.baidu.com']
    start_urls = ['https://movie.douban.com/top250?start={0}&filter=']
    offset=0
    count=1
    count1=1
    def parse(self, response):
        text = response.xpath('//*[@id="content"]/div/div[1]/ol/li')
        for div in text:
            self.count+=1
            item = FirstbloodItem()
            qu = div.xpath('./div/div[2]/div[2]/p[2]/span/text()').extract()
            # href = div.xpath('./div/div[2]/div[1]/a/@href').extract()[0]

            if qu:
                item['au']=qu[0]
            else:
                item['au']='第%d个为空'%((self.count))
            # yield scrapy.Request(href,callback=self.parse_ex,meta={'item':item})
            yield item
        if self.offset<250:
            self.offset+=25

            print('爬取第%d页'%(self.count1))
            self.count1 += 1
            url='https://movie.douban.com/top250?start={}&filter='.format(str(self.offset))

            yield scrapy.Request(url=url,callback=self.parse)

    # def parse_ex(self,response):
    #     item=response.meta['item']
    #     juqi=response.xpath('/html/body/div[3]/div[1]/div[3]/div[1]/div[3]/div/span[2]/text()[1]').extract()
    #
    #     item['juqi']=juqi
    #     print(item['juqi'])
    #     yield item

