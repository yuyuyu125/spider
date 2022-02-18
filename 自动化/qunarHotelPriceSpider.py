
import sys
import time
import requests
import datetime
from datetime import datetime as dt
import os
requests.packages.urllib3.disable_warnings()

base_path = os.path.abspath(__file__)
folder = os.path.dirname(base_path)
pf=os.path.dirname(folder)
dpf=os.path.split(pf)[0]
sys.path.append(dpf)
# from common.db import ssql_custom as ssql
# from common.common_function import format_headers

insertTb = 'CLMonitor.dbo.qunarHotelPriceInfo'


def main(hotelName, hotelId):
    inputParas = {}
    inputParas['hotelName'] = hotelName
    inputParas['hotelId'] = hotelId
    cityUrl = hotelId.split('_')[0]
    paras = {"seq":"","cityUrl":"","checkInDate":"","checkOutDate":"","keywords":"","extra":{}}
    url = 'https://touch.qunar.com/hotelcn/api/hotelprice'
    dateTypeList = [
        [(dt.now() + datetime.timedelta(days=30)).strftime('%Y-%m-%d'),
         (dt.now() + datetime.timedelta(days=31)).strftime('%Y-%m-%d'), 'thirtyDays'],
        [(dt.now() + datetime.timedelta(days=14)).strftime('%Y-%m-%d'),
         (dt.now() + datetime.timedelta(days=15)).strftime('%Y-%m-%d'), 'fourteenDays'],
        [(dt.now() + datetime.timedelta(days=7)).strftime('%Y-%m-%d'),
         (dt.now() + datetime.timedelta(days=8)).strftime('%Y-%m-%d'), 'sevenDays'],
        [dt.now().strftime('%Y-%m-%d'), (dt.now() + datetime.timedelta(days=1)).strftime('%Y-%m-%d'), 'currenDay']]
    for dates in dateTypeList:
        paras['checkInDate'] = dates[0]
        paras['checkOutDate'] = dates[1]
        inputParas['typeName'] = dates[2]
        paras['seq'] = hotelId
        paras['cityUrl'] = cityUrl
        paras['keywords'] = hotelName
        resp = requests.post(url, json=paras, headers=format_headers('..\..\common\headers\qunarHoterHeader'),
                             verify=False)
        jsons = resp.json()
        parseJson(jsons, inputParas)
        time.sleep(2)
        print('   ' + hotelName + '在' + paras['checkInDate'] + '至' + paras['checkOutDate'] + '时间的价格信息抓取完毕')


def parseJson(jsons, paras):
    result = []
    spiderDates = dt.now().strftime('%Y-%m-%d')
    data = jsons['data']
    fromDate = data['fromDate']
    toDate = data['toDate']
    rooms = data['rooms']
    for items in rooms:
        roomeName = items['cluster']
        rtId = items['rtId']
        originPrice = items['originPriceDesc'].replace('￥', '')
        roomInfoList = ';'.join(items['roomInfoList'])
        ptDesc = items['ptDesc']
        vendorList = items['vendors']
        if vendorList:
            for vendors in vendorList:
                subRoomName = vendors['room']
                wrapperid = vendors['wrapperid']
                wrapperName = vendors['wrapperName']
                price = vendors['price']
                roomRtInfo = vendors['roomRtInfo']
                wrapperHotelId = vendors['hotelId']
                sellStatus = ''
                payTypeDesc = vendors['payTypeDesc']
                if payTypeDesc == '在线付':
                    sellStatus = '在售'
                else:
                    sellStatus = '售罄'
                tags = ''
                for item in roomRtInfo:
                    tag = item['tag']
                    tags += tag + ';'
                if tags:
                    tags = tags[:-1]
                activityList = vendors['activity']
                activityStr = ''
                for activitys in activityList:
                    label = activitys['label']
                    if label and label[0] != '¥':
                        activityStr += label + ';'
                if activityStr:
                    activityStr = activityStr[:-1]
                basicInfoList = vendors['basicInfoList']
                basicInfoStr = ''
                for basicInfos in basicInfoList:
                    desc = basicInfos['desc']
                    basicInfoStr += desc + ';'
                if basicInfoStr:
                    basicInfoStr = basicInfoStr[:-1]
                result.append(
                    [paras['hotelName'],  paras['hotelId'], fromDate, toDate, roomeName, rtId, originPrice, roomInfoList, ptDesc, wrapperid,
                     wrapperName, price,
                     wrapperHotelId, sellStatus, tags, activityStr, basicInfoStr, paras['typeName'], spiderDates, subRoomName])
    if not result and data.get('vendorsRoom'):
        vendorList = data['vendorsRoom']
        for vendors in vendorList:
            roomeName = vendors['room']
            rtId = vendors['roomId']
            originPrice = ''
            roomInfoList = ''
            ptDesc = ''
            wrapperid = vendors['wrapperid']
            wrapperName = vendors['wrapperName']
            price = vendors['price']
            roomRtInfo = vendors['roomRtInfo']
            wrapperHotelId = vendors['hotelId']
            sellStatus = ''
            payTypeDesc = vendors['payTypeDesc']
            if payTypeDesc == '在线付':
                sellStatus = '在售'
            else:
                sellStatus = '售罄'
            tags = ''
            for item in roomRtInfo:
                tag = item['tag']
                tags += tag + ';'
            if tags:
                tags = tags[:-1]
            activityList = vendors['activity']
            activityStr = ''
            for activitys in activityList:
                label = activitys['label']
                if label and label[0] != '¥':
                    activityStr += label + ';'
            if activityStr:
                activityStr = activityStr[:-1]
            basicInfoList = vendors['basicInfoList']
            basicInfoStr = ''
            for basicInfos in basicInfoList:
                desc = basicInfos['desc']
                basicInfoStr += desc + ';'
            if basicInfoStr:
                basicInfoStr = basicInfoStr[:-1]
            result.append(
                [paras['hotelName'], paras['hotelId'], fromDate, toDate, roomeName, rtId, originPrice, roomInfoList, ptDesc,
                 wrapperid,
                 wrapperName, price,
                 wrapperHotelId, sellStatus, tags, activityStr, basicInfoStr, paras['typeName'], spiderDates, roomeName])
    elif not result and not data.get('vendorsRoom'):
        print('   ' + paras['hotelName'] + '在' + fromDate + '至' + toDate + '无价格信息！！！！')
        result.append(
            [paras['hotelName'], paras['hotelId'], fromDate, toDate, '', '', '', '', '',
             '','', '','', '', '', '', '', paras['typeName'], spiderDates])
    ssql.write_fileslist_sqlbase(result, insertTb)


def run():
    dates = dt.now().strftime('%Y-%m-%d')
    sql = '''
    DELETE [CLMonitor].[dbo].[qunarHotelPriceInfo] 
    WHERE
        spiderDates = '{dates}' 
        AND hotelName IN ( SELECT hotelName FROM [CLMonitor].[dbo].[qunarHotelPriceInfo] WHERE spiderDates = '{dates}' GROUP BY hotelName HAVING COUNT ( DISTINCT ( typeName ) ) < 4 );

       SELECT
        a1.* 
    FROM
        ( SELECT hotelName, qunarId FROM CLMonitor.[dbo].hotelList where qunarId is not null and qunarId != '' GROUP BY hotelName, qunarId ) a1
        LEFT JOIN ( SELECT hotelName FROM [CLMonitor].[dbo].[qunarHotelPriceInfo] WHERE spiderDates = '{dates}' GROUP BY hotelName ) a2 ON a1.hotelName =    a2.hotelName 
    WHERE
        a2.hotelName IS NULL
        '''.format(dates=dates)
    taskList = ssql.sql_query(sql)
    count = 1
    for task in taskList:
        hotelName = task[0]
        hotelId = task[1]
        main(hotelName, hotelId)
        print(str(count) + '. ' + hotelName + '抓取成功')
        count += 1


if __name__ == '__main__':
    run()
