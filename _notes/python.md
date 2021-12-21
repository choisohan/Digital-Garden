---
title: python
---

[[jupyter notebook]]
[[visual studio code]]


# 1. Just Simple Variables
```python
#return if variable is string
isinstance(item,str)

#return if variable is number 
variable.isdigit()

#convert string to int
variable = "100"
int(variable)

#return the biggest number in the list
list =[100,2,3,4,5]
max(list)       #return 100


#merge two dictionaries
dict1={1:"apple",2:"banana"}
dict2={3:"kiwi",4:"pineapple"}
dict_merge = {}
dict_merge.update(dict1)
dict_merge.update(dict2)
print dict_merge

#keys and values from a dictionary
dic={1:"apple",2:"banana"}
dic.keys()    #return keys list as 1,2
dic.values()      #return values list as apple, banana


#capitalize first word on string
string ="min is super awesome"
#print string[0].capitalize()
print string[0].capitalize() + string[1:]


#return the count of list
len(list)
```

# 2. String to command Line
```python
import ast

string ="'this'"
print ast.literal_eval(string)

```


# 3. Read file as string
```python
path = ""
file = open(path)
print file.read()
```

# 4. Return file on the directory
```python
import os

path = "C:\myfolder"
for root, dirs, files in os.walk(path):
    for filename in files:
        print(filename)
```
- with file format 
```python
import glob, os

os.chdir(path)
for file in glob.glob("*.txt"):
    print(file)

```
