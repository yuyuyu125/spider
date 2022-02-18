import pymongo
client=pymongo.MongoClient(host='localhost',port=27017)
db=client.test
cllection=db.students
student={
    "id":'1',
    'name':'cj',
    'age':'20'
}
result=cllection.insert_one(student)
print(result)
print('插入成功')