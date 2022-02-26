---
title: wit.ai
---

https://github.com/wit-ai/node-wit

# Install
`npm i wit-node`

```js
import  Wit  from 'node-wit'
const client = new Wit.Wit({
  accessToken: process.env.WIT_TOKEN, // server access token
  logger: new Wit.log.Logger(Wit.log.DEBUG)
});


client.message('set an alarm tomorrow at 7am');
```

# Quick Start
[Quick Start](https://wit.ai/docs/quickstart)

# Groceries
1. Intents
2. Entities
3. Traits

