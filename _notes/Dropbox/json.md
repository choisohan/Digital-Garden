---
title: json
---

Example
```json
{
    "name": "Joker",
    "city": "Gotham",
    "isVillain": true,
    "friends": []
  }
```


# Load
## load json in javascript(ES6)
```js
import fs from 'fs'
const myData = JSON.parse(fs.readFileSync('./src/myData.json'));
console.log( myData )
```