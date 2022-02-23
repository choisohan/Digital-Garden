---
title: Notion API
---

```js
const allPages = await notion.request(payload)
const firstPageTitle = allPages.results[1].properties.Name.title[0].plain_text
//.properties.Name.title[0].plain_text ... so shitty 
```