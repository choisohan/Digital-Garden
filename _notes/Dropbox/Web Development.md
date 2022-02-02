---
title: Web Development
---

tag : [[jekyll]] , [[wordpress]] , [[react]]

# 
## [[webpack]] is a module [[bundler]]. 
- [📽️Creating and Understanding a Basic Webpack 5 Setup](https://www.youtube.com/watch?v=X1nxTjVDYdQ)
- [🔖Webpack summary wrtten by rajaraodv](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9)
- [🗃️Webpack configuration for Multi Page Application](https://skryvets.com/blog/2018/03/25/webpack-configuration-for-multi-page-application/)
- [🎟️Generating multiple HTML pages with HTMLWebpackPlugin](https://extri.co/2017/07/11/generating-multiple-html-pages-with-htmlwebpackplugin/)


```shell
npm i -D webpack webpack-cli  //build
npm install webpack-dev-server --save-dev //dev server

//transpiling
npm i @babel/core @babel/preset-env babel-loader  

```


## [[Node.js]] and [[Express]]
- [ ] node.js x express how to run server
- [[handlebar]] : [[template engine]]
[[package.json]] : this file holds various [[metadata]] relevant to the project. This file is used to give information to [[npm]] that allows it to identify the project as well as handle the project's [[dependencies]].

# Hosting with [[Github]] x [[Netlify]]

## Commit to [[Github]]

## How to [[Deploy]]

## link custom domain to netify
[step by step tutorial](https://www.youtube.com/watch?v=GvgpzcGcRbQ)



---





# 🖥️Cross browser Test

 As a web developer, it is your responsibility to make sure that not only do your projects work, but they work for all your users, no matter what browser, device, or additional assistive tools they are using. 

 ## Free Tools for cross browser test
|service | pro | con |
|--------|-----|-----|
|[Comparium](https://comparium.app/)|1000 screen shots, 40 live sessions monthly | Mac is not availble yet |
|[Lambdatest](https://www.lambdatest.com/) | 60min/month realtime browser testing. better machine than comparium| |

🤷‍♀️Using virtual machine is good to test but the problem for me is the machine is very slow to test high memory density site such as my perspectives project. 



---
# 📈Get Memory Usage
## console.log( performance.memory ) 
[Read this](https://trackjs.com/blog/monitoring-javascript-memory/)
```js
{
	totalJSHeapSize: 29400000, 
	usedJSHeapSize: 15200000, //this is updating per frame
	jsHeapSizeLimit: 1530000000
}
```
You can create your own memory stats funciton but you can use paulirish's script


## [Memory-stats.js](https://github.com/paulirish/memory-stats.js/blob/master/README.md)
Initial Set up
1. Copy the [[Chrome]] shortcut Icon on the PC
2. Right click -> Properties -> Target : " "
3. Add frag like `"...chrome.exe" --enable-precise-memory-info`
4. add [memory-stat.js](https://raw.githubusercontent.com/paulirish/memory-stats.js/master/memory-stats.js) into your project
5. Add this js lines
```js
var memStats = new MemoryStats();

//optional
memStats.domElement.style.position = 'absolute'
memStats.domElement.style.top = '50px'

document.body.appendChild(setup.memStats.domElement )
```
6. update
```js
funciton tick(){
	memStats.update();
}
```
## What is 'Memory Leak' ?
memory leaks can be defined as memory that is not required by an application anymore that for some reason is not returned to the operating system or the pool of free memory
..
JavaScript is one of the so called _garbage collected_ languages. Garbage collected languages help developers manage memory by periodically checking which previously allocated pieces of memory can still be "reached" from other parts of the application.

from [auth.0](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/)

---
# Post-Development Action List

## 👀Step by step Guide to submit new site to Google
[youtube tutorial ](https://www.youtube.com/watch?v=arSUE7-q41w)
- [[SEO]]  : Search Engine Optimization
- https://ahrefs.com/blog/google-search-console/#what-is-google-search-console

### 1. Add domain to [Google Search Console] (https://search.google.com/search-console/welcome) 
Google Search Console is one of the most poswerful , free [[SEO]] tools out there.

### 2. Link to [Google Analytics](https://analytics.google.com/)
1) (left bottom) Admin / Product Linking / Search Console Linking
2) Press Button 'Link' -> Choose Domain 

### 3. Submit [[XML Sitemap]] to Google Search Console
1. How to create xml sitemap with netlify -> [install plugin](https://app.netlify.com/teams/happping/plugins/@netlify/plugin-sitemap/install) , [offical doc](https://github.com/netlify-labs/netlify-plugin-sitemap#readme)
2. After new Build, automatically you can find the sitemap by `https://happping.co/sitemap.xml`
Copy this and go to **google search console / Sitemaps / Add a new sitemap**

### 🙋‍♀️"How long does it take for google to index a new site?"
From 4 days and up to 6 months.