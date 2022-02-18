# -*- coding: utf-8 -*-

"""
@Time : 2021/7/15
@Author : allenwan
@File : script
@Description : 
"""
import json
import sys
import re
from math import ceil
from mitmproxy import ctx
from urllib import parse
from datetime import datetime as dt
sys.path.append(r'C:\Summary\交接文档\work')
from common.db import ssql_custom as ssql

def request(flow):
    pass


def response(flow):
    dates = dt.now().strftime('%Y-%m-%d')
    # citySign = 'https://mall.meituan.com/api/c/poi/location/lbs'

    if flow.request.url.count('api/c/poi/location/lbs'):
        result = []
        text = flow.response.text
        jsons = json.loads(text)
        # print(jsons)
        poiViews = jsons['data']['poiViews']
        if poiViews:
            for data in poiViews:
                address = data.get('address')
                poiId = data['poiId']
                poiName = data['poiName']
                cityId = data['cityId']
                cityName = data['cityName']
                result.append([cityId, cityName, poiName, poiId, address, dates])
            ctx.log.info(str(result))
            ssql.write_fileslist_sqlbase(result, 'CarlsbergMonitor.dbo.mtmcStoreInfo')

    if '/sku/search/' in flow.request.url:
        keyWordPattern = re.compile('keyword=(.*?)&')
        rawKey = re.search(keyWordPattern, flow.request.url).group(1)
        keyWord = parse.unquote(rawKey)
        poiPattern = re.compile('poiId=(.*?)&')
        poiId = re.search(poiPattern, flow.request.url).group(1)
        result = []
        text = flow.response.text
        jsons = json.loads(text)
        data = jsons['data']
        count = 1
        if data:
            totalCount = data['total']
            offset = data['offset']
            limit = data['limit']
            totalPage = ceil(totalCount / limit)
            page = offset / limit + 1
            prodList = data['skuListAreaVOs']
            for prods in prodList:
                skuItem = prods['skuItem']
                skuId = skuItem['skuId']
                picUrl = skuItem['picUrl']
                skuTitle = skuItem['skuTitle']['text']
                skuSubTitle = skuItem['skuSubTitle']['text']
                sellUnit = skuItem['sellUnit']['text']
                sellPrice = skuItem['sellPrice']['text']
                dashPrice = ''
                if skuItem.get('dashPrice'):
                    dashPrice = skuItem['dashPrice']['text']
                sellStatus = '在售'
                sellButton = skuItem['sellButton']['status']
                if sellButton != 1:
                    sellStatus = '售罄'
                buyUnit = skuItem['buyUnit']
                skuBarCode = skuItem['skuBarCode']
                sellingPoint = ''
                sellingPointList = skuItem.get('sellingPoints')
                if sellingPointList:
                    for items in sellingPointList:
                        sellingPoint += items['text'] + '|'
                result.append(
                    [keyWord, poiId, page, count, skuId, picUrl, skuTitle, skuSubTitle, sellUnit, sellPrice, dashPrice,
                     sellStatus, buyUnit, skuBarCode, sellingPoint, totalPage, dates])
                count += 1
            ctx.log.info(str(result))
            ssql.write_fileslist_sqlbase(result, 'CarlsbergMonitor.dbo.mtmcSearchResult')
        else:
            ctx.log.info(keyWord + '在' + str(poiId) + '无搜索结果')

    if '/detail/v5' in flow.request.url:
        result = []
        text = flow.response.text
        jsons = json.loads(text)
        data = jsons['data']
        poiId = data['poiId']
        skuId = data['skuId']
        skuTitle = data['skuTitle']['text']
        skuSubTitle = data['skuSubTitle']['text']
        sellUnit = data['sellUnit']['text']
        sellPrice = data['sellPrice']['text']
        dashPrice = ''
        if data.get('dashPrice'):
            dashPrice = data['dashPrice']['text']
        sales = ''
        if data.get('sales'):
            sales = data['sales']['text']
        groupTagTextList = data.get('groupTagTextList')
        groupTag = ''
        if groupTagTextList:
            for groupTags in groupTagTextList:
                tags = ''
                title = groupTags['title']
                textList = groupTags.get('textList')
                if textList:
                    for texts in textList:
                        # for textss in texts['text']['text'].spilt(';'):
                        #     tags += title + ':' + textss + ';'
                        tags += title + ':' + texts['text']['text'] + ';'
                groupTag += tags
        skuInfo = data.get('skuInfo')
        propertys = ''
        if skuInfo:
            propertyMap = skuInfo['propertyMap']
            if propertyMap:
                for propertyDict in propertyMap:
                    key = propertyDict['key']['text']
                    value = propertyDict['value']['text']
                    propertys += key + ':' + value + ','
        result.append([poiId, skuId, skuTitle, skuSubTitle, sellUnit, sellPrice, dashPrice, sales, groupTag, propertys, dates])
        ssql.write_fileslist_sqlbase(result, 'CarlsbergMonitor.dbo.mtmcProductDetail')
        ctx.log.info(str(result))

    if flow.request.url.count('api/c/poi/location/lbs'):
        result = []
        text = flow.response.text
        jsons = json.loads(text)
        # print(jsons)
        poiViews = jsons['data']['poiViews']
        if poiViews:
            for data in poiViews:
                address = data.get('address')
                poiId = data['poiId']
                poiName = data['poiName']
                cityId = data['cityId']
                cityName = data['cityName']
                result.append([cityId, cityName, poiName, poiId, address, dates])
            ctx.log.info(str(result))
            ssql.write_fileslist_sqlbase(result, 'CarlsbergMonitor.dbo.mtmcCateStoreInfo')

    if 'category/list/v4' in flow.request.url:
        poiPattern = re.compile('poiId=(.*?)&')
        poiId = re.search(poiPattern, flow.request.url).group(1)
        result = []
        text = flow.response.text
        jsons = json.loads(text)
        data = jsons['data']
        count = 1
        if data:
            poiCategories = data['poiCategories']
            for cates in poiCategories:
                cate1Id = cates['id']
                cate1Name = cates['name']
                subPoiCategories = cates['subPoiCategories']
                for subCates in subPoiCategories:
                    cate2Id = subCates['id']
                    cate2Name = subCates['name']
                    result.append(
                        [poiId, count, cate1Id, cate1Name, cate2Id, cate2Name, dates])
                count += 1
            ctx.log.info(str(result))
            ssql.write_fileslist_sqlbase(result, 'CarlsbergMonitor.dbo.mtmcCateList')

    if 'sku/list/category' in flow.request.url:
        poiPattern = re.compile('poiId=(.*?)&')
        poiId = re.search(poiPattern, flow.request.url).group(1)
        cate1IdPattern = re.compile('firstCategoryId=(.*?)&')
        cate1Id = re.search(cate1IdPattern, flow.request.url).group(1)
        cate2IdPattern = re.compile('categoryId=(.*?)&')
        cate2Id = re.search(cate2IdPattern, flow.request.url).group(1)
        result = []
        text = flow.response.text
        jsons = json.loads(text)
        data = jsons['data']
        counts = 1
        if data:
            itemList = data['itemList']
            for items in itemList:
                skuItem = items['skuItem']
                proTitle = skuItem['skuTitle']['text']
                skuId = skuItem['skuId']
                skuSubTitle = skuItem['skuSubTitle']['text']
                sellUnit = skuItem['sellUnit']['text']
                sellPrice = skuItem['sellPrice']['text'].replace('¥', '')
                dashPrice = ''
                dashPrices = skuItem.get('dashPrice')
                if dashPrices:
                    dashPrice = dashPrices['text'].replace('¥', '')
                memberPrices = skuItem.get('memberPrice')
                memberPrice = ''
                if memberPrices:
                    memberPrice = memberPrices['text'].replace('¥', '')
                coups = ''
                v2Tags = skuItem.get('v2Tags')
                if v2Tags:
                    for tags in v2Tags:
                        styleText = tags.get('styleText')
                        if styleText:
                            coupInfo = styleText['text']
                            coups += coupInfo + '||'
                sellStatus = '在售'
                sellButton = skuItem['sellButton']['status']
                if sellButton != 1:
                    sellStatus = '售罄'
                counts += 1
                result.append([counts, poiId, proTitle, skuId, skuSubTitle, sellUnit, sellPrice, memberPrice, dashPrice, coups, dates, sellStatus, cate1Id, cate2Id])
            ssql.write_fileslist_sqlbase(result, 'CarlsbergMonitor.dbo.mtmcCateSearchResult')
            ctx.log.info(str(result))