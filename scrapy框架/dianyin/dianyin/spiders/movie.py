import scrapy
from dianyin.items import DianyinItem

class MovieSpider(scrapy.Spider):
    name = 'movie'
    #allowed_domains = ['www.srapy.com']
    start_urls = ['https://www.ygdy8.net/html/gndy/dyzz/list_23_1.html']
    count=2
    count1=1
    def parse_down(self,response):
        item=response.meta['item']
        down=response.xpath('//div[@id="Zoom"]//a/@href').extract_first()
        item['download']=down


        yield item

    def parse(self, response):
        li=response.xpath('//*[@id="header"]/div/div[3]/div[3]/div[2]/div[2]/div[2]/ul//table')
        print('爬取第%s页成功'%self.count1)
        self.count1+=1
        for table in li:
            item = DianyinItem()
            movie_name=table.xpath('.//a/text()').extract_first()
            item['movie_name']=movie_name
            url='https://www.ygdy8.net/'+table.xpath('.//a/@href').extract_first()
            yield scrapy.Request(url, callback=self.parse_down, meta={'item':item})
        # ul=response.xpath('//table[@class="tbspan"]').extract()
        # for se in ul:
        #     item = DianyinItem()
        #     movie_name=se
        #     #print(movie_name)
        #     item['movie_name']=movie_name
        #
        #
        # url = response.xpath('//table[@class="tbspan"]//a/@href').extract()
        # for seu in url:
        #     urls = seu
        #     urlss = 'https://www.ygdy8.net' + urls
        #     yield scrapy.Request(urlss,callback=self.parse_down,meta={'item':item})
        if self.count<=15:

            durl='https://www.ygdy8.net/html/gndy/dyzz/list_23_{}.html'.format(self.count)
            self.count +=1
            yield scrapy.Request(durl,callback=self.parse)




