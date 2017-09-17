#-*- coding: utf-8 -*-
import os
import sys

import datetime
import traceback

import requests
import json
import re
from impala.dbapi import connect
from autoreport.mail import send_mail


def func():
    # 获得所有的临时表名
    print("获取临时表名...")
    f = open("remove_tables.txt", "r")
    table_names = f.readlines()
    table_names = [x.replace('\n', '') for x in table_names]
    f.close()
    os.remove('remove_tables.txt')
    # print(table_names)

    # 加载需要保留的临时表
    print("读取系统配置文件...")
    valid_records = load_record_info()

    # 获得将被保留的临时表
    print("正在筛选被保留的临时表...")
    keep_table_names = do_record_filter(valid_records, table_names)

    # 将要删除的临时表写入文件
    print("正在删除临时表...")
    conn = connect(host='10.8.8.21', port=10015, auth_mechanism='PLAIN', database='tmp')
    cursor = conn.cursor()
    remove_tables = filter(lambda x: x not in keep_table_names, table_names)

    # 删除计数
    cnt = 0
    for t in remove_tables:
        cursor.execute('DROP TABLE tmp.cy_cy')
        print("\t" + t + "已被删除...")
        cnt += 1

    # 发送提醒
    print("开始发送提醒...")
    send_reminder(cnt)


def send_reminder(remove_cnt):
    text = "本周临时表自动清理任务已经结束，本次共清理 " + str(remove_cnt) + " 张临时表"
    msg = {
        "msgtype": "text",
        "text": {
            "content": text
        }
    }
    # 开始发送
    headers = {'content-type': 'application/json; charset=utf-8'}
    url = 'https://oapi.dingtalk.com/robot/send?access_token=46f2744149451ad59f125a9510b8a92f860b710506f02e24c79e5795fc6234e1'
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
    try:
        func()
    except Exception as e:
        to = ['chenyang@guanghe.tv']
        subject = "临时表自动清理出错"
        msg = '错误信息：\n' + str(traceback.format_exc())
        send_mail(to, subject, msg, files='', html=False)
