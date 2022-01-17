---
title: Making Of Digital Garden
---

Based on [Setting up your own digital garden with Jekyll](https://maximevaillancourt.com/blog/setting-up-your-own-digital-garden-with-jekyll)


# Style
_sass/_style.scss -> body style
_sass/_code.scss -> code
 _includes/notes_graph.html -> graph visualizer
 _inclues/link-previews.html -> 
 

# Using Dropbox for _note
1 . you should exclude dropbox's own cache files
this is _config.yml you can 
```yml
exclude:
- _includes/notes_graph.json
- _notes/Dropbox/.dropbox.cache
- _notes/Dropbox/.obsidian
- _notes/Dropbox/.trash
- _notes/Dropbox/.dropbox
- _notes/Dropbox/desktop.ini
- _notes/Dropbox/_Templates
```

2. git ignore
```
#dropbox
.trash
_OnlyMe
_Templates
_Dropbox/.drobox.cache
.ignore
.dropbox*
desktop.ini

```



# Adding gallery layout
https://jekyllcodex.org/without-plugins/





# D3 graph tweak
