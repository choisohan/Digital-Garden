---
title: jekyll
---

# Requirement
- [[Ruby]]

# Install
```
gem install jekyll bundler
```

# Configuration


# Front Matter
[offical document](https://jekyllrb.com/docs/permalinks/)



# Run Server
```
bundle exec jekyll serve
```
http://localhost:4000

live server
```ruby
jekyll serve --watch
```


# How to add Search Bar with [[Lunr.js]]
https://lunrjs.com/guides/upgrading.html




# Write markdown for jekyll

## 1. How  to resize the image
```md
![](assets/image.jpg]{: width="250" }
```

## 2. How to add empty space
1. use `---` for horizontal space
2. update style.css and edit 
```css
hr { height: 200px; }
h1{margin-top: 150px; margin-bottom: 20px;}
h2{margin-top: 15px; margin-bottom: 15px;}
h3{margin-top: 10px; margin-bottom: 10px;}
h4{margin-top: 7px; margin-bottom: 7px;}
h5{margin-top: 5px; margin-bottom: 5px;}
h6{margin-top: 2px; margin-bottom: 2px;}
```

## 3.  How to add video with markdown
1. Add this on deafult.html layout
```js
const videos = document.querySelectorAll("video");
videos.forEach(v=>{
  v.muted=true;  
  v.autoplay=true; 
  v.loop=true; 
  v.controls=true; 
})

```

2. This is how to add video 
```html
<video><source src="assets/bobo/Hanging_A_004_low.mp4"></video>
```

## 4. Add caption under image
1. Add this on deafult.html layout
```js
const images = document.getElementsByTagName("img");
for(var i = 0; i<images.length; i++){
	const img = images[i].cloneNode(true)
	const parent = images[i].parentElement;
	console.log(parent)
	const fig= document.createElement("figure");
	const figCaption = document.createElement("figcaption")
	figCaption.innerText = images[i].alt;
	fig.style.textAlign = 'center'
	fig.append(img);
	fig.append(figCaption)
	parent.replaceChild(fig , images[i])
}
```

```css
figcaption{	text-align :center; }
```

2. This is code on markdown
```md
![my caption](image.jpg)
```



## 5. Two column
note : markdown doens't support column so you should use html and css

1. in default.html layout, add new class
```css
.horizontal{
  display: flex;
}
.horizontal img, .horizontal video{
  width: 100%;
}
```

2. and use like this
```md

<div class ="horizontal" markdown= "1">

<span><video><source src="assets/bobo/1022_2_Trim2.mp4"> </video></span>
<span><img src = "assets/bobo/0911_shapeEditor.gif"></span>

</div>

```

---


# Troubleshoot

## 1. Invalid argument ..... jpg 
* Reason : Images are not working. fffff
*  How to Fix : save the image on => `Digital-Garden\assets`


# Extra
- [[How to Customize Digital Garden with Jekyll]]