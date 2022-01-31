import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from numpy.linalg import eig
import csv
from sklearn.decomposition import PCA


variable = []
with open("merged.csv", "r+") as fin:
  for row in csv.reader(fin):
    for i in row:
      if (i == "name" or i == "region"):
        continue
      else:
        variable.append(i)
    break
datum = []
value = []
regions = []
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


sc = StandardScaler()
data_scaled = sc.fit_transform(datum)
matrix = np.cov(data_scaled.T)
eigenvalues, eigenvectors = eig(matrix)

pca_df2 = pd.DataFrame(data=data_scaled)
#print(pca_df2)
pca = PCA()

test = pca.fit_transform(data_scaled)

pca_df = pd.DataFrame(data = test, columns = variable)

#print(pca_df)

y = list(pca_df.columns)
#print(y)

#trying to see how plotting would work
# def myplot(score, coeff, labels=None):
#   xs = score[:, 0]
#   ys = score[:, 1]
#   n = coeff.shape[0]
#   scalex = 1.0 / (xs.max() - xs.min())
#   scaley = 1.0 / (ys.max() - ys.min())
# myplot(test, np.transpose(pca.components_[0:2, :]), y)

axis = np.transpose(pca.components_[0:2, :])
print(axis)
axis_p = pd.DataFrame(data = axis, columns=["x1", "y1"])
print(axis_p)
axis_p.to_csv("axisCorr.csv")
#pca_df["region"] = regions
# for i in range(12):
#   name = variable[i]
#   dict[name] = []
#   for j in range(236):
#     dict[name].append(pca_df[i][j])
#
# dict["region"] = regions

#print(pca_df)
#df = pd.DataFrame(dict)
#


max = -10
for eigenvalue in eigenvalues:
  value.append(eigenvalue)

n = len(value)

for i in range(n - 1):
  for j in range(0, n - i - 1):
    if value[j+1] > value[j]:
      value[j], value[j + 1] = value[j + 1], value[j]
      variable[j], variable[j+1]  = variable[j+1], variable[j]


variable = variable[:-4]
value = value[:-4]
max2 = -10

for eigenvector in eigenvectors:
  for numb in eigenvector:
    if(numb > max):
      max = numb

for eigenvector in eigenvectors:
  for numb in eigenvector:
    if(numb > max2 and numb != max):
      max2 = numb

dict = {"variable" : variable , "eigenvalue" : value}
df = pd.DataFrame(dict)
#df.to_csv('eigenvalue.csv')

#print(max)
#print(max2) #rserves currency(index : 9) and birthper100(index 3)
#print(eigenvectors) #gdp growth(inex : 8) and military expendition (index : 6)
