---
title: CSS
---

# 1. Tag
```css
```






# 2. Class and ID
```css
```



# 3. Size Units
- vw, vh = viewport width and height

more info -> https://www.w3schools.com/cssref/css_units.asp


# 4. Position
```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
```



# 2. Aligh
```css

align-items:center; /* vertical alignment */
text-align :center; /* horizontal alignment */
justify-content: center;    /*body horizontal center*/
display : flex;

```

## Flex
https://www.w3schools.com/cssref/css3_pr_flex-basis.asp
```css
.main{
	display: flex;
}
.main div {
	flex-grow : 0;
	flex-shrink : 0;
	flex-basis : 50px; 

.
```
https://www.w3schools.com/css/css3_flexbox_container.asp
```css
flex-direction: column; /*change row */
```
https://css-tricks.com/snippets/css/a-guide-to-flexbox/




# 3. Background

## Background Image
```css

background-image: url(img_flwr.gif)

/* to have multiple background image*/ 
background-image: url(img_flwr.gif), url(paper.gif);

/*add more properies */
background: url(img_flwr.gif) right bottom no-repeat, url(paper.gif) left top repeat;

```


## Gradient
https://www.w3schools.com/css/css3_gradients.asp
https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient()
```css
/* Vertical*/
background-image: linear-gradient(red, yellow);
/* Horizontal*/ 
background-image: linear-gradient(to right, red , yellow);
```


## Background Position and repeat
```css
background-position: right bottom;
background-repeat: no-repeat;
```


## Background Size
```css
background-size: cover;
background-size: 50% 50%;
background-size: 25px 50px;
```

## Animating Background
https://freefrontend.com/css-animated-backgrounds/


# 4. Transition and Animation

```css
.box{
	transition : transform 1s ease-in-out; /* preset */
}

.box :hover{
	transform: translateX 100%;
}


```

Using animation gives more customizable transition
```css

/* define animation */
@keyframes myAnimation{
	33%{
		transform: translateX(33%);
	}
	66%{
		transform: translateX(66%);
	}
	100%{
		transform: translateX(100%);
	}

}

/* apply animation */ 
.box{
	animation : myAnimation 1s ease-in forwards;
	/* forwards means keep the last state*/
	
	/* loop animation*
	/* animation : myAnimation 1s ease-in inifite alternative; */
	
}
.box :hover{
	animation-play-state : paused; /* when it's hovered, it stop*/
}
```

css animation event
```js
myDiv.onanimationend=()=>{
    console.log("animation is finished")
}
```



# 5. Blend Mode
[Doc](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
```css
/* Keyword values */
mix-blend-mode: normal;
mix-blend-mode: multiply;
mix-blend-mode: screen;
mix-blend-mode: overlay;
mix-blend-mode: darken;
mix-blend-mode: lighten;
mix-blend-mode: color-dodge;
mix-blend-mode: color-burn;
mix-blend-mode: hard-light;
mix-blend-mode: soft-light;
mix-blend-mode: difference;
mix-blend-mode: exclusion;
mix-blend-mode: hue;
mix-blend-mode: saturation;
mix-blend-mode: color;
mix-blend-mode: luminosity;
```






# Scrollbar

### Hide Scrollbar
```css
body {
  overflow-y: hidden; /* Hide vertical scrollbar */
  overflow-x: hidden; /* Hide horizontal scrollbar */
}
```

### Style Scrollbar
https://www.digitalocean.com/community/tutorials/css-scrollbars
```css
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: orange;
}

*::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 20px;
  border: 3px solid orange;
}

```



### Grainy Gradients
https://css-tricks.com/grainy-gradients/



# prefix
```css
/*any element with prefix*/
div[id^="prefix"] {
}
```

# More
[[Creating Avatar Generator with CSS]]