import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sb
from matplotlib import rcParams
import numpy as np
import csv



header = []
data = []
with open("co.csv", "r+") as fin:
  headerline = fin.readline()
  for row in csv.reader(fin):
     data = row
     print(data)
#
# dict = { "variable" : header , "correlationSum" : data}
# print(dict)
# df = pd.DataFrame(dict)
# df.to_csv('correlationSum.csv')
#data = pd.read_csv('correlationfull.csv') #read the data using pandas

#fieldnames = df_small.columns #names for testing purpose

#correlation_mat = df_small.corr() #use the correlation method in pandas

#correlation_mat.to_csv('correlationfull.csv') # save the file into csv



