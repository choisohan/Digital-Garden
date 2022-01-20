---
title: Canvas
---

# 0.  How to begin
[Frank's Tutorial](https://www.youtube.com/watch?v=Yvz_axxWG4Y)

```html
<body>
	<canvas id = "canvas1"></canvas>
</body>

```

```css
#canvas1{
	position : absolute;
	background:black;
	width:100%;
	height:100%;
	top:0;
	left:0;
}
```

```js

//* Init
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d'); //console this to access drawing method
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//* Drawing something
function drawRect(){
	ctx.fillStyle = 'white';
	ctx.fillRect(10,20,150,50);
}

drawRect();


//* Fix ratio
window.addEventListener('resize', function(){
	canvas.width= window.innerWidth; 
	canvas.height= window.innerHeight;
	drawRect();
})


```

# 1.  Create Shapes

## Fill Color
[Ref](https://www.w3schools.com/tags/canvas_fillstyle.asp)
```js
ctx.fillStyle = "#FF0000";			//hex
ctx.fillStyle = 'hsl(0,100%,100%)' 	//hue, saturation, brightness
ctx.fillStyle = 'rgb(255,0,0)'		//red,green,blue
```

Fill with gradient
```js
var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
my_gradient.addColorStop(0, "black");  
my_gradient.addColorStop(1, "white");
ctx.fillStyle = my_gradient;
```

## Stroke Style
```js
ctx.strokeStyle = "green";
ctx.lineWidth = "5"
ctx.strokeRect(0,0,100,100);
```

## Transform
```js
ctx.fillStyle = 'white';
ctx.translate(10,50); //move x,y
ctx.fillRect(0,0,100,100);    
```

## Transform()
```js
ctx.transform(scaleX, skewX, skewY,scaleY, moveX, moveY)

//* first four variable order is so shitty....
//* To scale up, (x,0,0,y,0,0)
ctx.transform(1,0,0,1,0,0); //reset
```

```js
//this is better option
ctx.setTransform(scaleX, skewX, skewY,scaleY, moveX, moveY)
ctx.setTransform(1,0,0,1,0,0); //reset.
```
start with reset pose and tweak the values, also when the element was applied, finish with reset again to avoid other element get transformed


## Create Text
```js
ctx.font = "30px Arial";
ctx.fillStyle = "red";
ctx.textAlign = "center"; //left, right
ctx.textBaseline ='middle';  // top, bottom
ctx.fillText("Hello World", 10, 50); 		// string, x,y
canvas.style.letterSpacing = '10px' // https://jsfiddle.net/hg4pbsne/1/
//ctx.strokeText("Hello World", 10, 50); 	// stroke style
```

more style set up  https://www.w3schools.com/tags/canvas_font.asp

```js
```


# 2. Get User Input
```js

//* Get Mouse Input*
const mouse ={
	x :null,
	y: null}

canvas.addEventListener('mousemove',function(e){
	mouse.x = e.x;
	mouse.y = e.y;
	drawCircle();
})

function drawCircle(){
	ctx.fillStyle = 'blue';
	ctx.beginPath();
	ctx.arc(mouse.x,mouse.y,50,0, Math.PI * 2*);
	ctx.fill();
}
```

## if mouse is over the object
```js
```



# 3. Create Particles
[JS Doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
```js
//Define Particle Class
class Particle
	constructor(){
		this.x = mouse.x * canvas.width ;
		this.y = mouse.y * canvas.height ;
		this.size = Math.random() * 5 + 1;
		this.speedX = Math.random() + 3 - 1.5; // between -1.5 ~ +1.5
		this.speedY = Math.random() + 3 - 1.5;
	}
	update(){
		this.x += this.speedX;
		this.y += this.speedY;
		//*reduce size
		if(this.sizes>.2){
			this.size -= 0.1;
		}
		*//
	}
	draw(){
		ctx.fillStyle = 'blue';
		ctx.beginPath();
		ctx.arc(this.x,this.y,50,0, Math.PI * 2*);
		ctx.fill();
	}
}
```

```js
// Initiate
const particlesArray = [];

function init(){
	for	(let i =0; i<100; i++){
		particlesArray.push( new Particle() );
	}
}

init();


//Update
function updateParticles(){
	for(let i=0; i<particlesArray.length; i++){
		particlesArray[i].update();
		particlesArray[i].draw();
		
		/*kill particles
		if(particleArray[i].size < = .3){
			particles.splice(i,1);
			i--;
		}		
		*/
	}
}

function animate(){
	ctx.clearRect(0,0,canvas.width,canvas.height); //clear screen
	updateParticles();
	requestAnimationFrame(animate);
}


```


## Leave trails by fade-Out
```js
function animate(){
	//Fade Out
	ctx.fillStyle = 'rgba(0,0,0,0.1)'; // <- alpha
	ctx.FillRect(0,0,canvas.width, canvas.height);
	
	updateParticles();  
	requestAnimationFrame();
}

```

## Animate Hue
```js
let hue = 0; 
class Particle{
	//*... Omit *
	draw(){
		ctx.fillStyle = 'hsl('+ hue + '100%, 50%)'; // 1. set color space as HSL 
		
		//* Omit*
	}
} 

function animate(){
	hue++;
	updateParticles();  
	requestAnimationFrame();
```

## Get Distance between particles

$$
c= \sqrt{a} + \sqrt{b}
$$
```js

function updateParticles(){
	for(let i=0; i<particlesArray.length; i++){
		particlesArray[i].update();
		particlesArray[i].draw();
		
		// Calculate distance using Pythagorean theorem
		for( let j =i; i < particlesArray.length; i++){
			const dx = particlesArray[i].x - particlesArray[j].x;
			const dy = particlesArray[i].y - particlesArray[j].y;
			const distance = Math.sqrt(dx * dx + dy*dy);
			
			if( distance < 100){
				// Draw Constellation lines
				ctx.beginPath();
				ctx.strokeStyle = particlesArray[i].color;
				ctx.lineWidth = particlesArray[i].size / 3; 
				ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
				ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
				ctx.Stroke();
			}
			
		}
	}
}

```


# 4. Canvas with [[GLSL]]
[Doc](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Hello_GLSL)
```js
```


---

# 5. Using Canvas with Mobile Device
tag : [[Safari]] , [[mobile]] , [[ios]]]

### Solution 1 : using `window.width` instead of 'innerwidth'

https://stackoverflow.com/questions/42700396/canvas-element-not-rendering-on-ios-devices

```js
const isIOS = navigator.vendor.match(/apple/i) &&
    !navigator.userAgent.match(/crios/i) &&
    !navigator.userAgent.match(/fxios/i) &&
    !navigator.userAgent.match(/Opera|OPT\//);

function screenWidth(){
    return (!isIOS) ? window.innerWidth : window.width; 
}
function screenHeight(){
    return (!isIOS) ? window.innerHeight : window.height;
}

****
```



### Solution 2 : 