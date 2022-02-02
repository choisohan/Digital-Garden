---
title: javascript
---


[[three.js]]
[[p5.js]]
[[cannon.js]]
[[aframe]]
[[view.js]]
[[puppeteer.js]]
[[math.js]]
[### Hover shows up item
- [ ] 

# 1. Variable Types

## Conditional Variable
[Link](https://stackoverflow.com/questions/10926853/best-way-for-conditional-variable-assignment/53177047) 
```js
//Method 1: If the condition evaluates to true, the value on the left side of the column would be assigned to the variable. If the condition evaluates to false the condition on the right will be assigned to the variable. You can also nest many conditions into one statement.

var tmpVar = (true) ? 0 : 1 ; //if' it's true, 0 and else, 1

//Nesting example of method 1: Change variable A value to 0, 1, 2 and a negative value to see how the statement would produce the result.

var a = 1;
var b = a > 0? (a === 1? "A is 1" : "A is not 1") : (a === 0? "A is zero" : "A is negative");
```

## Array
### 1. How to merge two arrays
```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

var lastElement = array1[array1.length -1]
```

### 2. Check if item is in the array
```js
const Cities = ["Busan", "Seoul", "Jeju"]

if(Cities.includes("Busan")){
	console.log("This array contains Busan.")
}

//Get element
console.log(  Cities.slide(-1)  ) // Get the last element ["Jeju"]
```

### 3. Get item with index
❗ Don't use `array.at(0)` because this doesn't work in mobile / safari.
so you should stick with `array[0]`

Then how to get the last item of array?
`array[array.length-1]`

### 4. Get random Item from Array
```javascript

array[Math.floor(Math.random()*items.length)];

```

### 5. Issue with array
When I pushed the firebase items to the array, somehow I receive 0 length array.

more to read : [The weird parts of js arrays](https://www.chrisgeelhoed.com/arrays-in-javascript-some-weird-parts/)

### 5. getHtmlElements()'s not array?
because
```js
Array.from(document.querySelectorAll('input'));
//this turn html nodetree to array
```

### 6. Sorting array of number
```js
array.sort((a, b) => a-b );
```

## Dictionary
[pietschsoft](https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs) 
```js

var dict = {
  FirstName: "Chris",
  "one": 1,
  1: "some value"
};


for(var key in dict) {
  var value = dict[key];

  // do something with "key" and "value" variables
}


//get list of keys or values
Object.keys(dict)
Object.values(dict)
```

### Merge
```js
var mered = Object.assign({},user,avatar)
console.log(mered)

```


## String
```js
const myString ="This is Min."

//* Sorting
myString.charAt(4); //return s
myString.indexOf("h"); //return 2. the index of first character
myString.lastIndexOf("i") //return the last index of M
myString.indexOf("Min") //return 8. finding multiple character is ablable
myString.length; //return 12

//* Cut
myString.slice(8)  //return "Min". return the last section
myString.slice(5,6) // return "is"
myString.split(" ") //return array ["This","is","Min."]

//* Change
myString.toUpperCase(); // THIS IS MIN.
myString.toLowerCase(); // this is min.
myString.trim(); //reduce the unnecessary spacebar
myString.replace("Min","Tom") //return "This is Tom."


```

## Change the type
```js
//float to string
const f =40;					 //return 40
const s = f.toString()		//return "40"

//string to float
f = parseFloat(s);			//return 40 again
```

## Insert Variable into string
[Ref](https://medium.com/dailyjs/5-ways-to-convert-a-value-to-string-in-javascript-6b334b2fc778)
```js
var name = 'Min'
var greeting = `Hello. This is ${name}. Nice to meet you!`
```

## Formating Number
adding 0s
```javascript
n = 9;
String(n).padStart(4, '0'); // '0009'

n = 10;
String(n).padStart(4, '0'); // '0010'
```

Decimal
```js
var numb = 1.13424234324;
console.log(  numb.fixed(2)  ); 	// return 1.13
console.log(  numb.fixed(5)  ); 	// return 1.13424
```

## Test variable type
```js
const myString ="Min is Happy"

console.log(    typeof(myString)  ); // return string



function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

console.log(myString) //return true
```





# 2. Function
```js

function myFunction(input){
	return input * 2.0; ; 
}

console.log(myFunction(3.0)); //return 6.0
```

or you can write this way too

```js

const myFunction = (input) =>{
	return input * 2.0 ;
}

console.log(myFunction(3.0)); //return 6.0
```



# 3. Handling Files
[Doc](https://developer.mozilla.org/en-US/docs/Web/API/File/File)
```js
const file = new File(bits, name[, options]);
```

## Check image url
[discussion](https://stackoverflow.com/questions/55880196/is-there-a-way-to-easily-check-if-the-image-url-is-valid-or-not/55880263)
```javascript
async function checkImage(url){
     
     const res = await fetch(url);
     const buff = await res.blob();
    
     return buff.type.startsWith('image/')

}


checkImage('https://example.com/notAnImage.txt') // false
checkImage('https://example.com/image.png') // true

```

## Import the other JS script
https://github.com/jagermesh/html-magnifier  [[html magnifier ]]

```html
<script type="text/javascript" src="html-magnifier.js"></script>
```
to do this to js , this is the way

add export infront of function
```javascript
export function HTMLMagnifier(){
}

```

and import like this way
```js
const { HTMLMagnifier } = require('./html-magnifier.js');

var magnifier = new HTMLMagnifier();

magnifier.show();


```

Read [this](https://flexiple.com/javascript-require-vs-import/#:~:text=JavaScript%20module%20is%20a%20file,of%20require%20and%20import%20statements.) to understand require and import

```js
//two different way to import other js file
const {extraFunction} = require('./extra');
import { extraFunction } from "./extra";
```


## import Json File
```js
fetch('./icons/country.json', {method: 'GET'} ).then((data)=>{
	return(data.json()  )

}).then((json)=>
 console.log(json)
)
```

## Play Audio File
https://www.w3schools.com/jsref/met_audio_play.asp
https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
```js 
var myAudio = new Audio(url);

myAudio.play(); 
myAudio.pause();
myAudio.loop= true;


myAudio.volume = .2; 


```

reset and play
```js
audio.currentTime = 0;
audio.
```

##### play() failed because the user didn't interact with the document first.
-> Browser usually block playing audio before user interact, so add the button. That's.... only way



# 4. Get [[HTML]] Element

```html
<script>

document.addEventListener('DOMContentLoaded', function() {
    
let button = document.querySelectorAll( '.button' );
let story = document.querySelectorAll('.story');

button.forEach(function(e,i){
e.addEventListener( 'mouseenter', function(){
    for(n=0;n<story.length;n++){
        if(n==i){
            story[n].classList.add('show');
        }
        else if (story[n].classList.contains('show') ){
            
            story[n].classList.remove('show');
        }
        
    }




} );

});
});
</script>

<style>
.story{
display:none;
}
.story.show{
display:block;
}
</style>
```
## Get mouse hovered element
```js
hovered = document.body.querySelectorAll(':hover')[0]
```


## Get Html Element
```js
	entranceElement = document.querySelector(".entrance");
```


## Get hyperlink element and OnClick Event
```javascript
const linkElements = document.getElementsByTagName("a"); 

for(var i=0; i<linkElements.length; i++){

	if (linkElements[i].className == 'thumbnail') { 

		 linkElements[i].onclick = function(event){

			 alert("yes link clicked!"); 

		 }

	 } 

}
```

## Replace Html element by script

```js
const projectContainer = document.querySelector("#project-container");
var newHTML="<img src ='img.jpg'>
projectContainer.innerHTML = newHTML
```

## Append HTML element by script
``` js
var html = document.documentElement;
var body = document.body;

var node = document.createElement("LI"); // Create a <li> node  
var textnode = document.createTextNode("Water"); // Create a text node  
node.appendChild(textnode); // Append the text to <li>  
document.getElementById("myList").appendChild(node); // Append <li> to <ul> with id="myList"
```>)
## Append CSS style
tag : [[css]]
```javascript
// html and style
var style =`
html,
body{
    overflow-y:hidden;
    width:10000px;
    mouse-wheel:horizontal;
}
`
var styleSheet = document.createElement("style")
styleSheet.innerText = style;
document.body.appendChild(styleSheet);
``` 











# 5. Use CSS
tag : [[CSS]]
## Get CSS Style by script
```js
const myDiv = document.getElementById("myDiv")
const opacity = getComputedStyle(myDiv).getPropertyValue('opacity') ;

//getComputedStyle(Element).getPropertyValue(string)
```

## Append CSS Style by script
```js
// Your CSS as text
var styles = `
    .qwebirc-qui .ircwindow div { 
        font-family: Georgia,Cambria,"Times New Roman",Times,serif;
        margin: 26px auto 0 auto;
        max-width: 650px;
    }
    .qwebirc-qui .lines {
        font-size: 18px;
        line-height: 1.58;
        letter-spacing: -.004em;
    }

    .qwebirc-qui .nicklist a {
        margin: 6px;
    }
`

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
```


## Fade in and out Vanilla JS
```js
// ** FADE OUT FUNCTION **
function fadeOut(el) {
	el.style.opacity = 1;
	(function fade() {
		if ((el.style.opacity -= .1) < 0) {
			el.style.display = "none";
		} else {
			requestAnimationFrame(fade);
		}
	})();
};

// ** FADE IN FUNCTION **
function fadeIn(el, display) {
	el.style.opacity = 0;
	el.style.display = display || "block";
	(function fade() {
		var val = parseFloat(el.style.opacity);
		if (!((val += .1) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
};
```

## Fade in version 2(without white page flickering)
```css
.fadeOut{
	 transition:opacity 2s linear;
	 opacity: 0%;
}
```

```js
// Get all HyperLink Element and delay a second
const indexBody = document.querySelector(".indexBody");
const linkElements = document.getElementsByTagName("a"); 

for(var i=0; i<linkElements.length; i++){
    linkElements[i].onclick = function(event){
        event.preventDefault();
        var self = this;
        indexBody.classList.add("fadeOut")
        if(indexBody.style.opacity != 0){
            tick()
            function tick(){
                requestAnimationFrame(tick);
            }
        }
        else{
            window.location.href =self.href;
        }
    }
}


```


## Tweak CSS keyframe animation
[Doc](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule) , [Ref](https://stackoverflow.com/questions/18481550/how-to-dynamically-create-keyframe-css-animations)
```js

```


## Tweak Global CSS by Javascript
https://stackoverflow.com/questions/1409225/changing-a-css-rule-set-from-javascript
```js
function getCSSRule(ruleName) {
    ruleName = ruleName.toLowerCase();
    var result = null;
    var find = Array.prototype.find;

    find.call(document.styleSheets, styleSheet => {
        result = find.call(styleSheet.cssRules, cssRule => {
            return cssRule instanceof CSSStyleRule 
                && cssRule.selectorText.toLowerCase() == ruleName;
        });
        return result != null;
    });
    return result;
}

```
## Mouse Cursor Style
```js
document.body.style.cursor = "pointer"

//	options
//		default,move, progress, wait, crosshair, text

```
http://www.javascripter.net/faq/stylesc.htm






# 6. User interaction
## eventListener()
```js
window.addEvenetListener('mousedown',(e)=>{
	console.log('mouse is down')
	
	console.log(e.target.tagName) //return as "DIV" or "CANVAS"
} ,false)

window.addEventListener('mousemove',function(e){
	console.log(e.screenX/ window.innerWidth)
}, false)
```


## Check if it's mobile device
```js
var isMobile = false; //initiate as false

// device detection

if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)

 || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {

 isMobile = true;

}
```





# 7. Time
## tick
```js
function runScript(){
	console.log("this script will keep running")
}
window.requestAnimationFrame(runScript)
```


pass the frame clock
```js
function counter(clock){
	console.log(clock);// tick tocking 1,2,3,4,5....
}
window.requestAnimationFrame(count(clock))
```

pass the variable
```js
function runScript(x){
	console.log(x)
}
window.requestAnimationFrame(function(){runScript(x)})
```


## setInterval()
```js
async function doSomething(){
}

setInterval(doSomething(),1000) //update every 1 second
```](<---
title: javascript
---


[[three.js]]
[[p5.js]]
[[cannon.js]]
[[aframe]]
[[view.js]]
[[puppeteer.js]]


### Hover shows up item
- [ ] 


```html
%3Cscript%3E

document.addEventListener('DOMContentLoaded', function() {
    
let button = document.querySelectorAll( '.button' );
let story = document.querySelectorAll('.story');

button.forEach(function(e,i){
e.addEventListener( 'mouseenter', function(){
    for(n=0;n<story.length;n++){
        if(n==i){
            story[n].classList.add('show');
        }
        else if (story[n].classList.contains('show') ){
            
            story[n].classList.remove('show');
        }
        
    }




} );

});
});
</script>

<style>
.story{
display:none;
}
.story.show{
display:block;
}
</style>
```


## setInterval()
```js
async function doSomething(){
}

setInterval(doSomething(),1000) //update every 1 second
```

## Time out(delay)
```js
window.setTimeout(function(){console.log("timeout")},3000)
```

## Delay the page redirection
```js
// Get all HyperLink Element and delay a second

const linkElements = document.getElementsByTagName("a"); 

for(var i=0; i<linkElements.length; i++){

	 linkElements[i].onclick = function(event){

	 event.preventDefault();

	 var self = this;

	 setTimeout(function() {

		 window.location.href = self.href;

	 }, 1000);

  

	 }

}
```


## Make Horizontal Scroll
```js
// html and style
var html = document.documentElement; 
var body = document.body;

var style =`
html, body{
    overflow-x :scroll;
    overflow-y:hideen;
    width: 20000px;
}
`
var styleSheet = document.createElement("style")
styleSheet.innerText = style;
body.appendChild(styleSheet);


window.addEventListener('wheel', (env) =>{
    body.scrollLeft += env.deltaY;
    html.scrollLeft += env.deltaY;
})

```

## Scroll to Element
```js
htmlElement.scrollIntoView();
```
#  8. Promise
Promise can be confusing. **Promise() is used when you want sequential action, after something(A) happens, you can assign another action(B).** This is especially useful if you needs to access to the database, but the next code needs to be waited until the page receive the data.

```js
const getData = new Promise((resolve,reject)=>{
	var mydata = fireStore.getData() //this is dummy code;
	if(myData != null){resolve(myData)}
})

getData.then((data)=>{
	console.log("I received : ",data) ; 
})
```

and also you can merge with .then()
```js
const getData = new Promise((resolve,reject)=>{
	var mydata = fireStore.getData() //this is dummy code;
	if(myData != null){resolve(myData)}
}).then((data)=>{
	console.log("I received : ",data) ; 
})
```

furthermore you can even write this shortly
```js
Promise.resolve(fireStore.getData()).then((data)=>{
	console.log("I received : ",data) ; 
})
```


# Date
```js
//get date
Date( Date.now())
```


# 9. UI
## Slider


# 10. Useful Functions
## lerp
```js
function flerp(a,b,f){
	return a + f * (b - a);
}
```


## Wrap Long Text
```js
function wrapText(text, fontSize, width){
    var arrayOut =[];
    const maxChar = (width ) /fontSize;

    text = text.trim();
    text = text.split('\n')

    text.forEach(sentense =>{
        for(var n = maxChar; n < sentense.length;){
            //if it's longer, cut
            var indexCut = ( sentense.slice(0,n) ).lastIndexOf(" ")
            indexCut = Math.min(indexCut, maxChar);
            const a = sentense.slice(0,indexCut)
            const b = sentense.slice(indexCut)
            arrayOut.push( a.trim())
            sentense = ( b.trim() )  

        }
        arrayOut.push(sentense)
    })
    return arrayOut;
}


const myString =`Hi, This is Min! This function returns the array of strings`

wrapText(myString, 12, 200);

```



## Add Input Box
```js
//Creating Text
var textBox = document.createElement("input");
textBox.setAttribute('type','text');

//Creating Long Text(RichText)
var richTextInput = document.createElement("textarea");

//Creating Button
var bnt = document.createElement("BUTTON");
bnt.innerHTML = "Enter"

//Creating Slider
var newSlider = document.createElement("input");
newSlider.setAttribute('type', 'range');

//Creating Checkbox
var checkbox = document.createElement("input");
newSlider.setAttribute('type', 'checkbox');
var label = document.createElement("label");
label.setAttribute("for", checkbox);
label.innerHTML = "click this"
checkbox.onClick =function(){
	if(checkbox.onClick ==true){
		console.log("checked!")
	}
}

```

### Set Condition
```html
<textarea maxlength="50">
```


# Local Storage
https://blog.logrocket.com/localstorage-javascript-complete-guide/
```js
//save
var user ={name : "min" , birthmonth:"May"}
window.localStorage.setItem(JSON.stringify(user))

//get
console.log(window.localStorage.getItem('user'));
//return string as '{name : "min" , birthmonth:"May"}''
//but to use it, you should convert string to js object(array)
var data = JSON.parse(window.localStorage.getItem('user'));


```




# web version 8(namespaced) vs web version 8(modular, ESM)

# 11. Debug
### 1. Module parse failed: The top-level-await experiment is not enabled (set experiments.topLevelAwait: true to enabled it)

^f3d8d0

- Reason : There was no top-level await support in Node.js (yet)...Unfortunately, you could not use the `await` keyword without wrapping it in an `async` function.

- Solution 1 : convert `await` to `async/Promise` and
```js
//from this
const asyncMsg = await Promise.resolve('hello world'); console.log(msg);

//this
Promise.resolve('hello world').then((asyncMsg) => { console.log(msg); });
```

from [StefanJudis.com](https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/)




## Flag Library
https://github.com/lipis/flag-icons/tree/main/flags/1x1
https://github.com/lipis/flag-icons/blob/main/country.json

