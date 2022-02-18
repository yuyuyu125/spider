# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymysql

class BookPipeline:
    def __init__(self):
        self.connect = pymysql.connect(
            host='localhost',
            port=3306,
            db='python',
            user='root',
            password='123456'

        )
        self.cursor = self.connect.cursor()
    def process_item(self, item, spider):
        try:
            self.cursor.execute("""select * from books where name=%s""",item['name'])
            repetition=self.cursor.fetchone() #查重
            if repetition:
                pass
            else:

                self.cursor.execute('insert into books(name,price)VALUES (%s,%s)',(item['name'],item['price']))
            self.connect.commit()
        except Exception as Error:
            log(Error)
        return item
    def close_spider(self,spider):
        print('结束爬虫')
        self.cursor.close()
        self.connect.close()