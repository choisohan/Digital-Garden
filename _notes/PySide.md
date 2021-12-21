---
title: PySide
---

tag : [[python]]

# 1. Make Tabs
```python

from PySide2.QtCore import *
from PySide2.QtWidgets import *
from PySide2.QtGui import *
from shiboken2 import wrapInstance


widget = QtWidgets.QWidget() #widget is self
widget.resize(800, 500)

grid = QtWidgets.QGridLayout(widget)
widget.setLayout(grid)

widget.tabGroup = QtWidgets.QTabWidget(widget)


tab1 = QtWidgets.QWidget(widget.tabGroup)
grid_tab = QtWidgets.QGridLayout(tab1)
tab1.setLayout(grid_tab)
widget.tabGroup.addTab(tab1, "test1")

tab2 = QtWidgets.QWidget(widget.tabGroup)
tab2.setLayout(grid_tab)
widget.tabGroup.addTab(tab2, "test2")


widget.show()
app.exec_()


```


# 2. Read Files
```python
#select file
fileBrowser = QtWidgets.QFileDialog().getOpenFileName()
#select directory
folderBrowser = QtWidgets.QFileDialog().getExistingDirectory()


#when it's closed
if QtWidgets.QFileDialog.Accepted:
	#return selected file
	print QtWidgets.QFileDialog().selectedFiles()
	#return selected directory
	print QtWidgets.QFileDialog().directoryUrl()

```

# 3. Save a File
```python
browser = QtWidgets.QFileDialog()
        browser.setNameFilters(["*.txt"])

        caption = 'Save New Map.txt'
        filter_mask = "*.txt"
        directory = Store_xmlPath #'./'
        filenames = QFileDialog.getSaveFileName(None,caption, directory, filter_mask)[0]
        
        with open(filenames, 'w') as yourFile:
            yourFile.write("hi")
```
