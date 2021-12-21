---
title: npm
---

## error code ELIFECYCLE
[StackOverflow](https://stackoverflow.com/questions/42308879/how-to-solve-npm-error-npm-err-code-elifecycle)

This is an OOM issue in most cases and comes from a lack of available memory.

1.  `npm cache clean --force`
	you can delete this folder instead
	C:\Users\{userName}\AppData\Roaming\npm-cache
2.  `delete node_modules folder`
3.  `delete package-lock.json file`
4.  `npm install npm@latest -g`
5.  `npm upgrade --force`
6.  `npm install`


# Trouble Shooting
### 1. loading dev server takes too long