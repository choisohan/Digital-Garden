---
title: cron
---

this page is about node-cron
https://www.npmjs.com/package/cron

# Basic Code
```js

var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
job.start();

```

# Cron Patterns
https://crontab.guru/examples.html


| Use | Pattern  |
|---|---|
|Every day 9:00 AM  | 0 9 * * * |
| Every Monday 9:00 AM | 0 9 * * MON|  