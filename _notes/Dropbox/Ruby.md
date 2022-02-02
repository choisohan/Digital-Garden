---
title: Ruby
---
# [[Gem]]


# def, end
```rb
def #method  
end
```

# gsub(/ /, "" )
tag: [[regex]]
[reference](https://spampinatodev.medium.com/basic-regular-expressions-in-ruby-with-gsub-e6c67e501c88)
```rb
myString = "Min is happy"
myString.gsub( /p/ , "" )
# return "Min is hay".
# All of p were replaced to ""
```

## Shortcuts
```rb
# Reverse target
myString.gsub(/[^p]/,"*") # return *********pp*

# Range
myString.gsub(/[0-1]/ , "")
myString.gsub(/[A-Z]/ , "")
myString.gsub(/[a-z]/ , "")

# All Letters
myString.gsub(/[\w]/,"")
# All Spacing
myString.gsub(/[\W]/,"")

# All integers
myString.gsub(/[\d]/, "")
# Except integers
myString.gsub(/[\D]/, "")

# Make First Letter of the block get capitalized
myString.gsub(/\w+/) {|word| word.capitalize}


```

