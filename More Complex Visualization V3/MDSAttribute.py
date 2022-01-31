import math

from sklearn.manifold import MDS
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from numpy.linalg import eig
import csv
from numpy import linalg as LA
from scipy import stats

variable = []
regions = []
value = []

with open("correlationfull.csv", "r+") as fin:
  for row in csv.reader(fin):
    for i in row:
      if (i == "name" or i == "region"):
        continue
      else:
        variable.append(i)
    break


variable.pop(0)
n = len(variable)

asdc = []
correlation = []
with open("correlationfull.csv", "r+") as fin:
  headerline = fin.readline()
  for row in csv.reader(fin):
    row.pop(0)
    each = []
    asd = []
    for i in range(n):
        each.append(1 - abs(float(row[i])))
    correlation.append(each)

# for i in range(n):
#   for j in range(n):
#     x = correlation[i][j]
#     distance = math.sqrt(((x - 0) ** 2) + ())

test = LA.norm(correlation, axis=1 )
print(test)
d = pd.DataFrame(correlation)
#d.to_csv('check.csv')
model = MDS(n_components=2, metric=True, random_state=0, dissimilarity='precomputed')
#sc = StandardScaler()
#data_scaled = sc.fit_transform(correlation)
data = model.fit_transform(correlation)
mds_df = pd.DataFrame(data = data, columns = ["P1", "P2"])
mds_df["variable"] = variable
print(mds_df)
mds_df.to_csv('mdscorrData.csv')