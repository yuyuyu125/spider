
import json
import jsonpath
count=0 #计数器
list=['url']
datass =''  #存储去空格后的text
datas=open('content(1).txt','r',encoding='utf-8').readlines() #读取文件
for data in datas:
    datass+=data.strip()  #去空格

data_json=json.loads(datass)    #json转换成字典
for value in data_json.values():    #提取值
    for key in value:                  #提取键
        if key!='':
            list.append(key)                                #去空值
import pymongo
import xlsxwriter
import pymysql
from dbutils.pooled_db import PooledDB
import re
# 数据库设置
url202 = 'mongodb://192.168.0.202:27027/'
url203 = 'mongodb://192.168.0.203:27027/'
database = 'zzl'
table = 'clinicaltrials'
POOL203 = PooledDB(
    creator=pymysql,  # 使用链接数据库的模块
    maxconnections=0,  # 连接池允许的最大连接数，0和None表示不限制连接数
    mincached=1,  # 初始化时，链接池中至少创建的空闲的链接，0表示不创建
    maxcached=0,  # 链接池中最多闲置的链接，0和None不限制
    maxshared=0,
    # 链接池中最多共享的链接数量，0和None表示全部共享。PS: 无用，因为pymysql和MySQLdb等模块的 threadsafety都为1，所有值无论设置为多少，_maxcached永远为0，所以永远是所有链接都共享。
    blocking=True,  # 连接池中如果没有可用连接后，是否阻塞等待。True，等待；False，不等待然后报错
    maxusage=None,  # 一个链接最多被重复使用的次数，None表示无限制
    setsession=[],  # 开始会话前执行的命令列表。如：["set datestyle to ...", "set time zone ..."]
    ping=4,
    # ping MySQL服务端，检查是否服务可用。# 如：0 = None = never, 1 = default = whenever it is requested, 2 = when a cursor is created, 4 = when a query is executed, 7 = always
    host='192.168.0.203',
    port=3306,
    user='root',
    password='root512513',
    database='zzl',
    charset='utf8mb4'
)


def read_data():
    db = POOL203.connection()
    cursor = db.cursor()  # pymysql.cursors.DictCursor返回指点类型
    cursor.execute(f"SELECT number from `test`")
    result = cursor.fetchall()
    db.close()
    return result


def delete_white(str):
    str = re.sub('\s+', ' ', str)  # 空白格式归一化
    for x in ['\u3000', '\u2003', '\xa0']:
        str = str.replace(x, ' ')
    return str


def read_mongo(number):
    myclient = pymongo.MongoClient(url202)
    mydb = myclient[database]
    mycol = mydb[table]
    return mycol.find({"Saved": number})


def delete_white(str):
    str = re.sub('\s+', ' ', str)  # 空白格式归一化
    for x in ['\u3000', '\u2003', '\xa0']:
        str = str.replace(x, ' ')
    return str

def get_url_list():
    url_list = []
    for index, url in enumerate(read_data()):
        url_list.append(url[0])
        print('1:', index)
    return url_list


dict={}
def get_result_list(url_list):
    result_list = []
    for index, number in enumerate(url_list):
        temp_result = [item for item in read_mongo(number)][0]['detail']['record']
        # result_list.append(temp_result['detail']['record'])
        for i in list:
            for key in temp_result:
                if i=='url':
                    if i not in dict:
                        dict[delete_white(i)] = []
                    dict[delete_white(i)].append(delete_white(temp_result.get(i,'')))
                else:
                    if i not in dict:
                        dict[delete_white(i)] = []
                    print(temp_result[key])
                    dict[delete_white(i)].append(delete_white(temp_result[key].get(i,'')))
            if index>5:
                break
    print(dict)


        # for i in list:
        #     if i not in dict:
        #         dict[i]=[]
        #     dict[i].append(result_list.get(i,''))






    return result_list
sun_dict = {}
url_list = get_url_list()
result_list = get_result_list(url_list)
