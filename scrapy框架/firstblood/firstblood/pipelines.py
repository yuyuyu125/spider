# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymysql

class FirstbloodPipeline(object):
    def __init__(self):
        self.connect=pymysql.connect(
            host='localhost',
            port=3306,
            db='python',
            user='root',
            password='123456'


        )
        self.cursor=self.connect.cursor()

    def process_item(self, item, spider):
        try:
            self.cursor.execute("""select * from aun where au=%s""",item[au])
            repetition=self.cursor.fetchone() #查重
            if repetition:
                pass
            else:

                self.cursor.execute('insert into aun(au)VALUES ("{}")'.format(item['au']))
            self.connect.commit()
        except Exception as Error:
            log(Error)

        return item
    def close_spider(self,spider):
        print('结束爬虫')
        self.cursor.close()
        self.connect.close()
class TxtPipeline(object):
    fp=None
    def open_spider(self,spider):
        self.fp=open('ss.txt','w',encoding='utf-8')

    def process_item(self, item, spider):
        au=item['au']
        self.fp.write(au+'\n')
        return item
    def close_spider(self,spider):
        self.fp.close()

