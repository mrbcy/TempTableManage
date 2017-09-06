#-*- coding: utf-8 -*-
import re


def test_regex(regex, table_name):
    """
    测试正则表达式是否匹配表名
    :return:
    """
    table_pattern = re.compile(regex)
    match = table_pattern.match(table_name)
    if match is not None:
        print("该表会被保留")
    else:
        print("该表会被删除")


if __name__ == '__main__':
    regex = r"^tmp.users_tmp_(.*)"
    table_name = "tmp.users_tmp_20170906"
    test_regex(regex, table_name)
