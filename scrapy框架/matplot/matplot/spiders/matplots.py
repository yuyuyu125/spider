import scrapy
from scrapy.linkextractors import  LinkExtractor

class MatplotsSpider(scrapy.Spider):
    name = 'matplots'
    #allowed_domains = ['matplotlib.org/2.0.2/examples/index.html']
    start_urls = ['http://matplotlib.org/examples/index.html/']

    def parse(self, response):
        # le=LinkExtractor(restrict_css='div.toctree-wrapper.li.toctree-12')
        # links=le.extract_links((response))
        # print(links)
        print(response.text)


