---
title: Discord Bot
---


[Discord.js](https://discord.js.org/#/)


## Method 1. Replit x UptimeRobot
[Start from this] (https://youtu.be/SPTfmiYiuok)

### 1. Create Bot Profile
1. [discord developer portal](https://discord.com/developers/applications)
2. create a new application and create a bot
3. Auth2 URL Generator -> Scope : Bot -> Toggle all bot's permission
4. On the bottom, redirect to the generated URL
5. Invite the bot on your server
6. When you open the discord, you would find the bot's name but offline. We will turn it on with replit server

### 2. Start the new project on [Replit](https://replit.com/)
1. On discord Dev Portal, Bot, and Copy the Token
2. Go to replit, Create the new Python Project, and on the sidebar, go to secrets(Environment Variables)
3. Create `key : TOKEN`, `value : { from portal }`
4. Back to the main.py, to use the env key, you can do below
```python
import os
os.environ['TOKEN']
```

### 3. Initiate a Bot
- This is the basic code to turn on the bot. 
```python
import os
import discord

client = discord.Client({intents:["GUILDS","GUILD_MESSAGES"]})

@client.event
async def on_ready():
  print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
  if message.author == client.user:
    return

  if message.content.startswith('Hey'):
    await message.channel.send('Hello!')

client.run(os.environ['TOKEN'])
```

### 4. Run a bot continuously with [[UptimeRobot]]
Originally replit's web server will stop in an hour if you stop using it or close the window. so to make the bot alive continuously, you should wait it up every for awhile. We will use uptime robot to do so.

1. create file 'keep_alive.py'
```python
from flask import Flask
from threading import Thread

app = Flask('')

@app.route('/')
def home():
    return "Hello. I am alive!"

def run():
  app.run(host='0.0.0.0',port=8080)

def keep_alive():
    t = Thread(target=run)
    t.start()
```
2. Go back to main.py
``` python
from keep_alive import keep_alive

# run this before client run
keep_alive()
client.run(os.environ['TOKEN']
```
3. Now when you restart replit, you will get the window page, copy the url
4. go to uptimerobot.com and create account, create the new monitor
5.  type : https , paste the url. and all set up.





## Method 2.  Github x Heroku
https://www.youtube.com/watch?v=qv24S2L1N0k&t=285s
---

### Start Scripting
1. Create `.env` file
```
BOT_TOKEN = { copy and paste your discord bot token}
```
2. To use it, install dotenv package by `npm i dotenv` on terminal
3. on script file,
```js
require("dotenv").config()

//and start use the variable from .env like
const TOKEN = process.env.BOT_TOKEN;
```



### Deploy to [[Heroku]]
1. Create new app, connect to github repo
2. Push 'Enable Automatic Deploys'
3. Go to 'Settings' on the top -> Reveal Config Vars
4. add `BOT_TOKEN`
5. go to deploy -> deploy branch


### Trouble Shoot
1. Error: Cannot find module 'node:events'
-> Cannot find module 'node:events' Error Minimum required nodejs version is v16. ... So You just need to update nodejs to v16. 6. And Your error will be solved. [Install the latest node.js](https://nodejs.org/en/)

[install notion sdk ](https://github.com/makenotion/notion-sdk-js)
```
npm install @notionhq/client
```

## [](https://github.com/makenotion/notion-sdk-js#usage)


---
# Add more Features 

## How to use a replit [[Database]]
```python
from replit  import db 
```


## How to intergrate [[Notion API]] with discord 
[tutorial](https://youtu.be/Y7k0iJEaigk)
1. [Notion Developer Page](https://developers.notion.com) -> my integration
2. Create new interation -> Copy Secret Code
3 copy the notion database id which is in url
'notion.so/'+ this weird code+ '?=/'
4. On the same page of notion, go to share-> invite -> integration and invite the bot.

- https://prettystatic.com/notion-api-python/
- https://safelyy.notion.site/safelyy/Notion-API-Course-979b30c25adc4c7c8fa5391614162403


## How to intergrate with  [[github]] with discord


## Create Bot with [[Webhook]]
Using Webhook , you can create a bot without single code
- Discord Setting -> Integration -> Create Webhook , Copy the Webhook URL

## Using [[MongoDB]] x [[Robo 3T]]
https://www.youtube.com/watch?v=8no3SktqagY
https://www.youtube.com/watch?v=s61a9C9BH-8
1.  Create Cluster and Copy the generated password
2. Cluster -> Connect -> Connect using MongoDB Compass
3. Copy  `mongodb+srv://{Your-Cluster-Name}:password>@cluster0.xxxxx.mongodb.net/test
`
4. [Install Robo 3T](https://robomongo.org/)
5.  On Robo 3D, Create-> left side of From URI : paste the mongoDB code and change 'password' to generated password
6.  Press 'From URI' Button, Change the name , Save , Press Connect
7.  Now on Left side, you will see it's MongoDB is connected
8.  Left Mouse Click - > Create New Database -> Name : 'DiscordBotDB'
9.  Go to VS Code, install new package `npm i mongoose`
10.  import
```js
import mongoose from 'mongoose';
```
11. Go back go MongoDB -> Cluster Connect -> Connect your application -> Copy the code `mongodb+srv://{Your-Cluster-Name}:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
12. Replace `<password>` to your generated password and `myFirstDatabase` to the 'DiscordBotDB' from Robo 3T
13. Connect with this code
```js
mongoose.connect(process.env.MONGODB_SRV,{
	useNewUrlParser : true,
	useUnifiedTopology : true
}).then(()=>{
  console.log('connected to the database')
}).catch((err)=>{
  console.log(err)
})
```


## Send Scheduled Message with [[cron]]
[stackoverflow](https://stackoverflow.com/questions/53820970/how-can-i-send-a-message-every-day-at-a-specific-hour)

1. Install Cron `npm install cron`
- Cron is a tool that allows you to execute _something_ on a schedule.
2. 

## Clear Message
https://www.youtube.com/watch?v=INQgI-MQcj0


# Reference
- [Discord JS Guide](https://discordjs.guide/#before-you-begin)
- [Discord JS Doc]  (https://discord.js.org/#/docs/main/stable/general/welcome)

- [Discord Bot written in ES6 ](https://gist.github.com/sr229/7ba75240bdff6f5da3b5233ac4d92121)