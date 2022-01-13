---
title: SVG
---

# Vocabularies
- viewBox


- ClipPath
- Mask
https://css-tricks.com/masking-vs-clipping-use/
```
```
 - filter
 - filterunits
 - (filterRes)[https://stackoverflow.com/questions/53145883/how-to-use-a-simple-svg-filter-on-safari-with-acceptable-performance-and-without ]A value of 1 means that the source for the filter will be treated as a single pixel....The sad news is that filterRes has been removed from the SVG standard in version 2.0. WebKit was very fast to adapt this part of SVG 2.0 and decided to remove it in the next version. If we rely on filterRes, the same problem will appear again soon.





# Tip and Tricks


# Hide #Eraser CSS
```css
path[id^="ERASER"] {
  stroke-width:0
}
```
## filter cutoff on mobile safari

it is so simple to fix the problem after you figure it out so thanks for the -50% x and y position. because many say add to width and height but noone said oh yeah move the start position of the filter to avoid trimmimg
...
If you're trying to do this in inline SVG in HTML, Safari has a bug where the filter doesn't make the whole svg element larger, so the cutoff is still there. The solution is to add an invisible element into the SVG (e.g. rect with fill-opacity="0") with the same x/y/width/height attributes -> (link)[https://stackoverflow.com/questions/6555600/gaussian-blur-cutoff-at-edges]


# How to read external SVG file's innerHTML elements
```js
var svg;

function preload(){

}
//https://stackoverflow.com/questions/53723079/how-to-read-and-change-elements-inside-the-svg-file-included-using-image-tag-in
function setup(){
   var xhr = new XMLHttpRequest();
  var svg = select("#svg");
  svg = document.querySelector('#svg')
  
   xhr.open("GET", svg.getAttribute("src"));
    xhr.send();
    xhr.onreadystatechange = function() {
      console.log(document.querySelectorAll("path"))
      
    }
  var cnv = createCanvas(300,300);
  background("pink")
}

```
[ ] clean up 


# extra
[[paper.js]]
