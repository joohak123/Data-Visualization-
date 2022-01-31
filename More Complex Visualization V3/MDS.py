from sklearn.manifold import MDS
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from numpy.linalg import eig
import csv
variable = []
regions = []
datum = []
value = []

with open("merged.csv", "r+") as fin:
  for row in csv.reader(fin):
    for i in row:
      if (i == "name" or i == "region"):
        continue
      else:
        variable.append(i)
    break
with open("merged.csv", "r+") as fin:
  headerline = fin.readline()
  for row in csv.reader(fin):
    smallerData = []
    for i in range(len(row)):
      if i == 0:
        continue
      elif i == 2:
        regions.append(row[i])
      else:
        smallerData.append(row[i])
    datum.append(smallerData)

model = MDS(n_components=2, metric=True, random_state=0, dissimilarity='euclidean')
sc = StandardScaler()
data_scaled = sc.fit_transform(datum)
data = model.fit_transform(data_scaled)
mds_df = pd.DataFrame(data = data, columns = ["P1", "P2"])
mds_df["region"] = regions
print(mds_df)
#mds_df.to_csv('mdsData.csv')