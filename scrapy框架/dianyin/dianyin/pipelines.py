# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymysql
import openpyxl

class DianyinPipeline:
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
            self.cursor.execute("""select movie_name from movie where movie_name=%s""", item['movie_name'])
            repetition = self.cursor.fetchone()  # 查重
            if repetition:
                pass
            else:

                self.cursor.execute('insert into movie(movie_name,download) \
                VALUES (%s,%s)',(item['movie_name'],item['download']))
            self.connect.commit()
        except Exception as Error:
            print(Error)

        return item

    def close_spider(self, spider):
        print('结束爬虫')
        self.cursor.close()
        self.connect.close()
class TxtPipeline(object):
    def __init__(self):
        self.wb=openpyxl.Workbook()
        self.ws=self.wb.active
        self.ws.append(['movie_name','download'])

    def process_item(self, item, spider):
        line=[item['movie_name'],item['download']]
        self.ws.append(line)
        self.wb.save('movie.xlsx')
        return item
    # def close_spider(self,spider):
    #     self.fp.close()

