#! /usr/bin/env python
# -*- coding: utf-8 -*-

import pandas as pd
import json
import sys
import os
import glob

"""

JSONからSP処理用CSVデータへの変換

"""

list_size = 8

'''
[[0,0,..,0],[0,0,..,0],..,[0,0,..,0]] // list_size * list_sizeの行列
'''

li=[]
for i in range(list_size):
    li.append([])

for j in range(list_size):
    for i in range(list_size):
        li[j].append(0)

'''
ヘッダー用リスト作成
'''
list_columns=[]
for i in range(8):
    list_columns.append("C"+str(i))

'''
作成するCSVのインデックス用リスト
'''
list_index = []
for i in range(list_size):
    list_index.append("L"+str(i))
list=[]


def std_changer(name_list,json_name,class_name):

    """
    生徒のcsvデータ作成

    Parameters
    ----------
    name_list : str or list
        作成したい生徒の名前or名前のリスト
    json_name : str
        読み込むjsonの名前
    class_name : str
        生徒の所属クラス名
    """

    global list

    name = os.path.abspath(os.path.dirname(__file__))
    joined_path = os.path.join(name,json_name)
    path = os.path.normpath(joined_path)

    f = open(path,'r')
    json_data = json.load(f)

    if type(name_list) is list:
        for name_l in name_list :
            list.append(json_data[class_name][name]["cell_link_source"])
            list.append(json_data[class_name][name]["cell_link_target"])
            print(list[0])
            print(list[1])
            for j in range(len(list[0])):
                li[int(list[0][int(j)])][int(list[1][int(j)])] = 1
            df = pd.DataFrame(
            li,
            columns = list_columns,
            index = list_index
            )
            df.to_csv(name+'../../csv/'+name_l+".csv",encoding="shift-jis")
            for k in range(list_size):
                for l in range(list_size):
                    li[k][l]=0
            list = []

    elif type(name_list) is str:
        list.append(json_data["cell_link_source"])
        list.append(json_data["cell_link_target"])
        print(list[0])
        print(list[1])
        for j in range(len(list[0])):
            li[int(list[0][int(j)])][int(list[1][int(j)])] = 1
        df = pd.DataFrame(
        li,
        columns = list_columns,
        index = list_index
        )
        df.to_csv(name+'/../../csv/'+name_list+".csv",encoding="shift-jis")
        for k in range(list_size):
            for l in range(list_size):
                li[k][l]=0
        list = []
    else :
        print("err")

def tec_changer(t_name,json_name,class_name):

    """
    教師データのcsvデータ作成

    Parameters
    ----------
    json_name : str
        読み込むjsonの名前
    class_name : str
        教師の所属クラス名
    """

    global list

    name = os.path.abspath(os.path.dirname(__file__))
    joined_path = os.path.join(name,json_name)
    path = os.path.normpath(joined_path)

    f = open(path,'r')
    json_data = json.load(f)
    list.append(json_data[class_name][t_name]["cell_link_source"])
    list.append(json_data[class_name][t_name]["cell_link_target"])
    print(list[0])
    print(list[1])
    for j in range(len(list[0])):
        li[int(list[0][int(j)])][int(list[1][int(j)])] = 1
    df = pd.DataFrame(
    li,
    columns = list_columns,
    index = list_index
    )
    paths = name+'/../../csv/teacher_data/'
    sum_csv = '*.csv'
    sum_path = paths + sum_csv
    files = glob.glob(sum_path)
    if len(files) == 0:
        df.to_csv(paths+'teacher.csv',encoding="SHIFT-JIS")
    else :
        df.to_csv(paths+'teacher'+str(len(files))+'.csv',encoding="SHIFT-JIS")

#コマンドラインから呼びたい
if __name__ == '__main__':
    args = sys.argv
    print(args)
    if args[1] == '-s':
        std_changer(args[2],args[3],args[4])
    elif args[1] == '-t':
        tec_changer(args[2],args[3],args[4])
