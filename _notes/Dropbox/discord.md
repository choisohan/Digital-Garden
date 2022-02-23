---
title: discord
---

# Creating [[Discord Bot]]

# [[Webhook]]
## Get Webhook URL
1. Your server -> Left Click on Channel -> Setting -> Integrations -> Webhooks
2. Create New Webhook and copy the **URL**


## Webhook with [[Github]]
https://gist.github.com/jagrosh/5b1761213e33fc5b54ec7f6379034a22
Your Github Repo -> Settings -> Webhook -> Add webhook
- payload URL : `URL`+`/github` 
- Content type : application.json


## Webhook with [[Netlify]]
Your Netlify Project -> Deploys -> Notification -> Deploy notifications -> On right button-> Click Outgoing webhooks
- payload URL : `URL`+`/slack` 

## Webhook with [[heroku]]
Your heroku Project -> on Left Top `More` -> View Webhooks -> create webhook
