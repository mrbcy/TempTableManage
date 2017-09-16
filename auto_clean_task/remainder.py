#-*- coding: utf-8 -*-
import sys

import datetime
import requests
import json
import re
from impala.dbapi import connect
from autoreport.mail import send_mail


def func():
    conn = connect(host='10.8.8.21', port=10015, auth_mechanism='PLAIN', database='tmp')
    cursor = conn.cursor()
    cursor.execute('SHOW TABLES')
    results = cursor.fetchall()
    # 获得所有的临时表名
    print("获取临时表名...")
    table_names = ["tmp." + str(x[0]) for x in results]
    # print(table_names)

    # 加载需要保留的临时表
    print("读取系统配置文件...")
    valid_records = load_record_info()

    # 获得将被保留的临时表
    print("正在筛选被保留的临时表...")
    keep_table_names = do_record_filter(valid_records, table_names)

    # 发送提醒
    print("开始发送提醒...")
    send_reminder(keep_table_names)


def send_reminder(keep_table_names):
    text = "Hi，各位，又到了每周临时表自动删除的时间，下面的表将会被保留：\n\n"
    for table_name in keep_table_names:
        text += "- " + table_name + "\n"
    text += "\n其他临时表会在今天下班后被删除。如有需要，[点此立即备案](http://10.8.8.111:8080/TempTable) \n"
    msg = {
        "msgtype": "markdown",
        "markdown": {
            "title": "临时表自动删除提醒",
            "text": text
        }
    }
    # 开始发送
    headers = {'content-type': 'application/json; charset=utf-8'}
    url = 'https://oapi.dingtalk.com/robot/send?access_token=6eec158e1e09ef9bd80f3c6fed53b87a7aa2ff3120f7a013d17fdae14c537ad0'
    s = json.dumps(msg)
    r = requests.post(url, data=s, headers = headers)
    print(r.text)


def do_record_filter(valid_records, table_names):
    """
    取出将被保留的临时表
    :param valid_records:
    :param table_names:
    :return:
    """
    keep_table_names = []

    for table_name in table_names:
        # 看一下哪个正则能跟它匹配
        for record in valid_records:
            table_exp = record['tableExp']
            table_exp = table_exp.replace("\\", "\\\\")
            table_pattern = re.compile(table_exp)
            match = table_pattern.match(table_name)
            if match is not None:
                keep_table_names.append(table_name)
                break

    return list(set(keep_table_names))


def load_record_info():
    r = requests.get(url='http://10.8.8.111:3000/tableList')
    if r.status_code != 200:
        send_mail(["chenyang@guanghe.tv"], "临时表自动清理出错", "连接后台服务器失败", files='', html=False)
        sys.exit(0)

    # 解析出已经备案过的表名
    record_list = json.loads(r.text)
    valid_records = []

    # 删除已经过期的备案表
    for record in record_list:
        date_time = datetime.datetime.strptime(record['expiredDate'][:10], '%Y-%m-%d')
        date_time = date_time + datetime.timedelta(days=1)
        now = datetime.datetime.now()
        if now > date_time:
            print("记录{0}已经过期".format(record['_id']))
            requests.delete(url='http://10.8.8.111:3000/tableList/' + str(record['_id']))
            print("记录{0}已被删除".format(record['_id']))
        else:
            valid_records.append(record)

    return valid_records


if __name__ == '__main__':
    func()
