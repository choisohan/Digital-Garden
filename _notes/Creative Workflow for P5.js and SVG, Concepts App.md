---
title: Creative Workflow for P5.js and SVG, Concepts App
---
tag: [[p5.js]], [[SVG]], [[Concepts App]],[[Tip and Tricks, Tutorials]]


# Method A - svg canvas
## 1. itial Set up

1. load p5.svg.js script
```html
    <script src="https://unpkg.com/p5.js-svg@1.1.1"></script>
```


2. load svg image and create svg canvas
```js
var svg, path, layer
function preload() {
    svg = loadSVG('mySVG.svg');
}
function setup() {
    createCanvas(windowWidth, windowHeight,SVG);
	image(svg, 0, 0, windowWidth, windowHeight)
}
```




## 2. Sorting Layers and Brushes

1. First, get SVG body and layers
```js
var svgBody = document.querySelector('svg')[1];
var layers = svgBody.querySelectorAll('g')
```



2. Start loop,  find erasers and set them as mask
```js
const svgns = 'http://www.w3.org/2000/svg"; 
layers.forEach(l=>{
	// 1. Create mask layer
	var mask = document.createElementNS(svgns, 'mask');
	mask.id = l.id+'_mask';
	svg.prepend(mask);

	// 2. Add white background in mask layer to invert the eraser brush.
	var maskBG = document.createElementNS(svgns,'rect')
    maskBG.setAttribute("x", canvas.x);
    maskBG.setAttribute("y", canvas.y);
    maskBG.setAttribute("width", "100%");
    maskBG.setAttribute("height", '100%');
    maskBG.setAttribute("fill", "white");
    mask.append(maskBG) ;


	// 3. Get All pathes inside of the current layer
	var pathes = l.querySelectorAll('path')
	pathes.forEach(p=>{
		if( p.id.toString().includes('ERASER')){
			p.setAttribute("stroke",'black');// invert eraser brush
			mask.appendChild(p)
		}
		else{
			p.setAttribute('mask', 'url(#' + l.id +'_mask)')
		}
		// sorting eraser end..
	})
	l.setAttributeNS(null,"mask" , "url(#"+l.id+"_mask)");
})
// layerloop end
```

3. Sort airbrush as filter
```js
	pathes.forEach(p=>{
		// sorting eraser end..
	      var filter = p.getAttribute('filter')
	      if(filter){
	        p.removeAttributeNS(null,'filter');
	      //onsole.log()
	        var filterG = l.querySelector("."+ filter.substring(5,filter.length-1));
	      
	        
	        if(!filterG){
	          filterG= document.createElementNS(svgns,'g');
	          filterG.classList.add(filter.substring(5,filter.length-1));
	          l.appendChild(filterG);
	         filterG.setAttributeNS(null, "filter" , "url(#FILTER_airbrush_24)")
	 
	        }
	        
	          filterG.appendChild(p);      
	      }    
		// sorting airbrush end..
	})
	l.setAttributeNS(null,"mask" , "url(#"+l.id+"_mask)");
```

and add this to actually add a filter on `<defs>`

```js
// layerloop end
const defs = document.querySelectorAll("defs")
const filters = document.querySelectorAll('filter');//
filters.forEach(f=>{
	f.removeAttributeNS(null,"filterUnits"); //fixing visibility
	defs[1].querySelectorAll("filter").forEach(F=>{
	defs[0].appendChild(F)
})
```

you can tweak the code inside of filter like this.
```js
// grain noise
f.innerHTML=`
	   <feTurbulence type="turbulence" 
			baseFrequency="1" 
			numOctaves="2" 
			result="turbulence" />

		<feDisplacementMap in2="turbulence" 
			in="SourceGraphic" scale="50" 
			xChannelSelector="R"
			yChannelSelector="B" />
` 
})

```





4. Create styles and color pickers
```js
// layerloop end
pathes = svgBody.querySelectorAll('path'); //now eraser is not selected

var cols=[]
// 1. Sorting Colors
pathArray.forEach(p=>{
tags.forEach(tag=>{
  var col = p.getAttribute(tag);
  if(col!='none'){
	p.classList.add(tag+'_'+col.substring(1,col.length));
	if(!cols.includes(col)){
		cols.push(col)
  }
  }
})
})

//Create CSS Style
cols.forEach(c=>{
	tags.forEach(tag=>{
	  var code = '.'+tag+'_'+c.substring(1,c.length)+'{'+tag+':'+c+'}'
	  css.insertRule(code,0);
	
	})
	
	var picker= createColorPicker(c);
	var id = c.substring(1,c.length) ;
	picker.id("picker_"+id); 
	//creating a new picker end..
})


```



5. Each picker has an event so we can update the color dynamically.
We will use CSS to set the global color
```js
	//creating a new picker end..
	colPicker.changed(()=>{
	  updateColors(id);
	})  
```

```js

function updateColors(id){
  var picker = select("#picker_"+id)
  
  tags.forEach((tag)=>{
    var styleName = "."+tag+"_"+id;
    var rule = getCSSRule(styleName);
    if(rule){
      if(tag=='stroke'){rule.style.stroke=picker.value()}
      if(tag=='fill'){rule.style.fill=picker.value()}
    }
    
  })
}

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




6. Create Randomize Color Button
```js
var randBut = createButton('R')
randBut.mousePressed(()=>{
  var pickers = selectAll("input[type='color']")    
  pickers.forEach(picker=>{
    picker.value(randCol());// this needs new function
    var id = picker.id().substring(7, picker.id().length)
    updateColors(id);
  })
})
```

```js
const randpalette =()=>{
  var arr = [];
  arr.push(["f6bd60","f7ede2","f5cac3","84a59d","f28482"])
  arr.push( ["cb997e","ddbea9","ffe8d6","b7b7a4","a5a58d","6b705c"] )
	arr.push(["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"]);
  arr.push(["e63946","f1faee","a8dadc","457b9d","1d3557"])
  arr.push(["2b2d42","8d99ae","edf2f4","ef233c","d90429"])
  arr.push(["ccd5ae","e9edc9","fefae0","faedcd","d4a373"])
  arr.push(["463f3a","8a817c","bcb8b1","f4f3ee","e0afa0"])
  arr.push(["03045e","023e8a","0077b6","0096c7","00b4d8","48cae4","90e0ef","ade8f4","caf0f8"])
  arr.push(["606c38","283618","fefae0","dda15e","bc6c25"])
  
  return random(arr);
}

const randCol =()=>{
  return "#"+random(randpalette());
}
```





## A few thoughts
- Do I need p5 js? I just started on p5 js editor but it may not even neccessary. hmmm





# Method B - use path as drawing trail or guide




# 👨‍🎨 Before Drawing on the app
1. Don't use these -> Soft Eraser
2. instead of spray paint, use airbrush(for filter)