request_dict = {
    "list": {  # 列表页配置参数
        "session": False,  # 是否使用session会话，暂未实现
        "type": "post",  # 请求类型get,post
        "host": "http://www.ccgp-fujian.gov.cn/{bid}/",  # 列表页url前缀补充,详情请看参数说明
        "first_url": "http://www.ccgp-fujian.gov.cn/3500/noticelist/e8d2cd51915e4c338dc1c6ee2f02b127/?page=1",  # 第一页地址,详情请看参数说明
        "second_url": "http://www.ccgp-fujian.gov.cn/3500/?page={page}",  # 第二页url地址,详情请看参数说明
        "second_start": 2,  # 第二页开始页码
        "end": 200,  # 结束页码,与 pagesize和total_page_rule的组合二选一，共存时优先选择end
        "pagesize": 15,  # 单个页码结果数量大小，与 end参数 二选一，共存时优先选择end
        "total_page_rule": {  # 获取总结果数规则，与 end参数 二选一，共存时优先选择end
            "xpath": ".//tr[@class='gradeX']//a",  # 使用xpath解析
            "re": "",  # 使用re解析
            "json": "$..count"  # 使用jsonpath解析
        },
        "headers": {  # 请求头参数，请勿携带cookie等动态参数
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
        },
        "timeout": 60,  # 超时时间
        "payload": False,  # post表单是否为json数据
        "data": "",  # 与post配合使用，发送表单的数据,接收格式:str、dict、json_dict
        "rule": {  # 匹配规则,可自定义扩展
            "xpath": {  # 使用xpath 配置
                "url": ".//tr[@class='gradeX']//a",  # 列表页上的url
                "title": ".//tr[@class='gradeX']//a",  # 列表页上的title
                "publish_time": ".//tr[@class='gradeX']//td[5]",  # 列表页上的发布时间
                "item_no": ""  # 项目编号
            },
            "re": {  # 使用re 配置
                "url": "",  # 列表页上的url
                "title": "",  # 列表页上的title
                "publish_time": "",  # 列表页上的发布时间
                "item_no": ""  # 项目编号
            },
            "json": {  # 使用jsonpath 配置
                "url": "$..id",  # 列表页上的url
                "title": "$..name",  # 列表页上的title
                "publish_time": "$..publishData",  # 列表页上的发布时间
                "item_no": ""  # 项目编号
            }
        }
    },
    "detail": {  # 匹配正文内容
        "session": False,  # 是否使用session会话，暂未实现
        "origin_article": "福建省政府采购网",  # 网站名称
        "type": "get",  # 请求类型get,post
        "headers": {  # 请求头参数，请勿携带cookie等动态参数
            "User-Agent": ""
        },
        "timeout": 60,  # 超时时间
        "rule": {  # 匹配规则,可自定义扩展
            "xpath": {  # 使用xpath 配置
                "title": "",  # 标题
                "publish_time": "",  # 发布时间
                "author": "",  # 作者,发布机构
                "content": ".//div[@class='content']",  # 内容
                "item_no": ""  # 项目编号
            },
            "re": {  # 使用re 配置
                "title": "",  # 标题
                "publish_time": "",  # 发布时间
                "author": "",  # 作者,发布机构
                "content": "",  # 内容
                "item_no": ""  # 项目编号
            },
            "json": {  # 使用jsonpath 配置
                "title": "",  # 标题
                "publish_time": "",  # 发布时间
                "author": "",  # 作者,发布机构
                "content": "",  # 内容
                "item_no": ""  # 项目编号
            }
        }
    }
}
