---
title: Github
---
tag : [[git]]
- [ ] 
## 💻 Base Commands
```command
- git clone https://github.com/repoURL
- git init
- git init -y
- git commit -m "comment"
- git remote add origin https://github.com/repoURL
- git remote -v
- git push -f origin master
- git branch -m main
- git branch checkout "branch name"         //enter
- git checkout -b "new branch name"       //create and checkout
- git merge "this branch"           //merge this into main branch
- git 
- git push -u origin main
- git show --summary       //return summary
```

## gitIgnore
*.format  //ignore certain format files
folder/*   //ignore all files in this folder


## removing chached index files
```command
git rm -r --cached .  
git add .
git commit -m 'Removing ignored files'
```

## Manage Branch
```command
git branch //return all branch list
git checkout --orphan gh-pages //create the new branch called "gh-pages" and move in
git checkout master //go back to master
git checkout gh-pages // move into gh-pages
git branch -d gh-pages //delete branch
```

## 👨‍🔧 trouble shoots
1. "remote origin already exists."
```command
git remote set-url origin https://github.com/repoURL
```

2. Updates were rejected because the tip of your current branch is behind
```command
git push -f origin main
```

3. Please tell me who you are
```command
git config --global user.email "id@Email.com"
git config --global user.name "name"
```

4. It looks like either your git installation or your git-subtree installation is broken.
-> unstall current version of git(2.32.0 in this case) and install previous version (git 2.30) instead


## How to add to exisitng github
```command
git remote add origin https://github.com/repoURL.git
```

## Worktree
```command
git worktree prune //delete prune worktree
```






# Building Static Site
## 🧰Builder
### [[Jekyll]]
= markdown to website


## 👨‍🚀Hosting

### Gitpage
- Free
- You can't publish the private repository. if you want, you should check netlify option

### Hosting with [[Netlify]]
- Free
