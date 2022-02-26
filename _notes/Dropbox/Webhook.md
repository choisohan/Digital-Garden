---
title: Webhook
---


# Webhook with [[Github]]
https://gist.github.com/jagrosh/5b1761213e33fc5b54ec7f6379034a22
Your Github Repo -> Settings -> Webhook -> Add webhook
- payload URL : `URL`+`/github` 
- Content type : application.json


# Webhook with [[Netlify]]
Your Netlify Project -> Deploys -> Notification -> Deploy notifications -> On right button-> Click Outgoing webhooks
- payload URL : `URL`+`/slack` 

Nop😩, this method doesn't work according to this [article](https://dev.to/netcell/webhook-notification-from-netlify-to-discord-39ol), it's better crate slack intergration but--- slack intergration is only for netlify paid plane.

so! to connect, use [[zapier]]


# Webhook with [[heroku]]
Your heroku Project -> on Left Top `More` -> View Webhooks -> create webhook

# Webhook 
