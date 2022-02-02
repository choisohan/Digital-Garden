---
title: webpack
---



# Concept
## Package-lock.json





# Customize Configuration
🤦The most annoying part of my coding part is configuring the webpack.... ahhhh still don't know what to do. just randomly figure out and forget.

## 1. How to create multiple Entry points with single html template.
If you want to use the same html template for all the project folder.
* Project file structure is like this
- src
- - index.html
- - script.js
- - - canvas.js 
- projects
- - projectA
- - - script.js
- - projectB
- - - script.js 

```js
//webpack.common.js

/*
/ MULTI ENTRY POINTS
*/
const myEntryPoints = glob.sync('./Projects/**/*.js').reduce((entry, path) => {

    entry['main'] = './src/script.js';
    let pathName = path.replace(/(\.\/Projects\/|\.js)/g, ''); // remove `./src/`, `.js`
    pathName = pathName.replace('/script', '')
    entry[pathName] = path;
    
    return entry;
  }, {});

  console.log(myEntryPoints)


/*
/ MULTI HTML GENERATOR
*/
function generateHtmlPlugins () {
    const canvasPath = path.resolve(__dirname, "../src/canvas.html")
    const entryPoints_li = Object.keys(myEntryPoints)
    console.log(entryPoints_li)
    entryPoints_li.shift()
    console.log(entryPoints_li)

    return entryPoints_li.map(item => {
        const folderName = item
        const jsPath = myEntryPoints[item]
        const templatePath = path.resolve(__dirname,'../src/canvas.html' )
        const htmlpath= path.join(__dirname, "../dist/",item+".html")
        
        return new HtmlWebpackPlugin({
            filename: htmlpath , 
            template: templatePath,
            chunks:[item]
          })
    })
}
const htmlPlugins = generateHtmlPlugins()

```

```js


module.exports = {
    entry: myEntryPoints, 

    output:
    {
        filename: './[name]/script.js',
        path: path.resolve(__dirname, '../dist')
    },


    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            chunks:['main']
        }),
        new MiniCSSExtractPlugin()
    ].concat(htmlPlugins), // 👈Add this
	module:
	{
		// Omit
	}
}

```

### Tweak the code to use seperate htmls.
* Project file tree is like this
- src
- - index.html
- - script.js
- projects
- - projectA
- - - script.js
- - - canvas.js 
- - projectB
- - - script.js 
- - -  canvas.js 

```js
//from -> const myEntryPoints = glob.sync('./Projects/**/*.js')
const myEntryPoints = glob.sync('./Projects/**/script.js')

//from -> const templatePath = path.resolve(__dirname,'../src/canvas.html' )
const templatePath = path.resolve(__dirname,'../projects/'+ item +'/canvas.html' )
```


## Favicon
1. Install [Favicons Webpack Plugin](https://www.npmjs.com/package/favicons-webpack-plugin)
```shell
$ npm install --save-dev favicons favicons-webpack-plugin

```

2. webpack.common.js
```js
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

plugins: [
  new FaviconsWebpackPlugin('static/favicon.png')
]
```

---

#  👷‍Trouble Shooting
1.  ` [webpack-cli] Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.*** options has an unknown property 'disableHostCheck'. These properties are valid:
   object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, magicHtml?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, setupExitSignals?, static?, watchFiles?, webSocketServer? }`
   
   -> ??? Not usre but I muted inside of ** "devServer : {} "** at webpack.dev.js
   
   
   
   
2. `  Module Error (from ./node_modules/html-loader/dist/cjs.js):`