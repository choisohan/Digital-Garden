---
title: n8n
---

# Hosting n8n
## Quick Guide to host n8n on [[heroku]]
https://github.com/sarveshpro/n8n-heroku
1. click button  'deploy to heroku'
2. config vars to edit
	- GENERIC_TIMEZONE : American/Vancouver -> [timezone](https://momentjs.com/timezone/)
	- N8N_BASIC_AUTH_USER : {your name}
	- N8N_BASIC_AUTH_PASSWORD : {your password}
3. later gonna ask credit card for vertification
4. deploy!



# Example Use
## get notification from github
[guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
1. Settings -> Developer Settings -> Personal tokens-> Create
2. Copy the URL and paste on 'github trigger' on n8n 


## Discord Trigger for n8n flow
[tutorial] (https://www.youtube.com/watch?v=QNn2VkonKag&list=PL1IyzCekgLc1hkHdiIRmLJ-SexoPpL1fd&index=2
- [ ] Discord Trigger for n8n flow(update please)

## get Gmail
1. Go to your gmail account settings -> Security -> 'Signing in to Google' -> App passwords -> create new app and generate password, copy and ready
2. Go ot n8n -> create Imap Trigger -> Credential for Imap :  New, Setting is below
	- User : { you } @gmail.com
	-  Password : { Paste the generated password}
	-  Host : imap.gmail.com
3. Add options -> ignore SSL issues : true
4. 