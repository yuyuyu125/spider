import pymysql
from dbutils.pooled_db import PooledDB
import time

POOL = PooledDB(
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
    host='localhost',
    port=3306,
    user='root',
    password='123456',
    database='python',
    charset='utf8mb4'
)

table_name = ''
table_taskname = ''


def read_data(min, max):
    db = POOL.connection()
    cursor = db.cursor(pymysql.cursors.DictCursor)  # pymysql.cursors.DictCursor返回指点类型
    cursor.execute(f"select * from `意大利任务表` where id>{min} and id<={max} and `success` is null")
    result = cursor.fetchall()
    db.close()
    return result


def check_null(min):
    db = POOL.connection()
    cursor = db.cursor()  # pymysql.cursors.DictCursor返回指点类型
    cursor.execute(f"select * from `意大利任务表` where `id` = {min}")
    result = cursor.fetchall()
    db.close()
    return result


def update_insert(id, data, num):
    # SQL 插入语句
    update_sql = f'''update `意大利任务表` set
                    `success`={num}
                    where `id`={id}
                     '''
    while True:
        try:
            db = POOL.connection()
            cursor = db.cursor()
            insert_mongo(data)
            cursor.execute(update_sql)
            # 提交到数据库执行
            db.commit()
            # 关闭数据库连接
            break
        except Exception as e:
            db.rollback()
            print(e)
            time.sleep(3)
        finally:
            db.close()


def update_data(id, num):
    # SQL 插入语句
    update_sql = f'''update `意大利任务表` set
                    `success`={num}
                    where `id`={id}
                     '''

    while True:
        try:
            db = POOL.connection()
            cursor = db.cursor()
            cursor.execute(update_sql)
            # 提交到数据库执行
            db.commit()
            # 关闭数据库连接
            break
        except Exception as e:
            db.rollback()
            print(e)
            time.sleep(3)
        finally:
            db.close()


def insert_data(data, page):
    # 打开数据库连接
    db = POOL.connection()
    # SQL 插入语句
    insert_sql = f'''insert into `{table_taskname}`(`id`,`page`)
                    values(%s,%s)
                     '''
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    while True:
        try:
            db = POOL.connection()
            cursor = db.cursor()
            for ls in data:
                cursor.execute(
                    insert_sql, (
                        ls,
                        page
                    )
                )
            db.commit()
            break
        except Exception as e:
            db.rollback()
            print(e)
            time.sleep(3)
        finally:
            db.close()


def new_table():
    # 打开数据库连接
    db = POOL.connection()

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # 如果数据表已经存在使用 execute() 方法删除表。
    cursor.execute(f"DROP TABLE IF EXISTS `意大利`")

    # 创建数据表SQL语句
    sql = f"""CREATE TABLE `意大利` (
        `id` int primary key auto_increment,
        `TIPOLOGIA DISPOSITIVO` varchar(32),
        `IDENTIFICATIVO DI REGISTRAZIONE BD/RDM` varchar(32),
        `ISCRITTO AL REPERTORIO` varchar(32),
        `CODICE ATTRIBUITO DAL FABBRICANTE/ASSEMBLATORE` varchar(32),
        `NOME COMMERCIALE E MODELLO` varchar(32),
        `CND` varchar(128),
        `CLASSE CE` varchar(32),
        `DATA PRIMA PUBBLICAZIONE` varchar(32),
        `DATA FINE IMMISSIONE IN COMMERCIO` varchar(32),
        `RUOLO AZIENDA` varchar(32),
        `DENOMINAZIONE` varchar(32),
        `CODICE FISCALE` varchar(32),
        `PARTITA IVA/VAT NUMBER` varchar(32),
        `NAZIONE` varchar(32),
        `key1` varchar(128),
        `key2` text,
        `key3` varchar(32),
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"""
    cursor.execute(sql)
    db.close()


def distinct():
    # 打开数据库连接1
    db = POOL.connection()
    # SQL 插入语句
    insert_sql = f'''delete from `{table_name}`
where id in (select id from (select id FROM `{table_name}` WHERE id NOT IN ( SELECT MIN(id) AS id FROM `{table_name}` GROUP BY 순번))as temp)
                     '''
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    try:
        cursor.execute(insert_sql)
        db.commit()
        # 关闭数据库连接
        db.close()
    except Exception as e:
        db.rollback()
        print(e)
        time.sleep(3)
    finally:
        db.close()


if __name__ == '__main__':
    new_table()
