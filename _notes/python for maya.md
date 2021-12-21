---
title: python for maya
---

tag : [[python]], [[maya]]

# 1. Store the value
```python
import maya.cmds as cmds

def example_window():
    
    default = cmds.optionVar(q='saved_value') or "default text"
    
    w = cmds.window()
    col = cmds.columnLayout()
    textfld = cmds.textField(text = default)
    
    def save_and_close(*_):
        cmds.optionVar(sv = ('saved_value', cmds.textField(textfld, q=True,  text=True)))
        cmds.deleteUI(w)
        
    btn = cmds.button('save and close', c= save_and_close)
    
    cmds.showWindow(w)
    
    
example_window()

```

```python
```

```python
```

```python
```

```python
```


```python
```



```python
```


```python
```


```python
```

```python
```

```python
```

```python
```

```python
```


```python
```