import scrapy
from book.items import BookItem

class BooksSpider(scrapy.Spider):
    name = 'books'
    #allowed_domains = ['books.toscrape.com']
    start_urls = ['http://books.toscrape.com/']
    count=1
    def parse(self, response):
        print(response.css('article.product_pod'))
        for book in response.css('article.product_pod'):
            item = BookItem()
            item['name']=book.xpath('./h3/a/@title').extract()[0]
            item['price']=book.xpath('./div[2]/p[1]/text()').extract()[0]
            yield item
        next=response.css('ul.pager li.next a::attr(href)').extract_first()


        if next:
            url = response.urljoin(next)
            print('第%d页爬取成功' % (self.count))
            self.count += 1
            yield scrapy.Request(url,callback=self.parse)
