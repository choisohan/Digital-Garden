---
title: webXR with Three.js
---


# Set up your local dev environment
An easy way to get started is to use the **WebXR Emulator ** and  **WebServer for Chrome**. 

Even if you are setting up a remote server, using the emulator will allow you to ebug your pages in the desktop browser. It is highly recommended to do as much development using the emulator as possible before starting to test on a mobile device or vr headset.

- [webxr-api-emulator](https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=en)
- [web-server-for-chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en)

# Basic Code
## Enable webXR
``` javascript
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'


//XR
renderer.xr.enabled = true;

function  enableAR(){
    document.body.appendChild(ARButton.createButton(renderer))
}
function  enableVR(){
    document.body.appendChild(VRButton.createButton(renderer))
    renderer.setAnimationLoop(tick) ;
	//❗instead of window.requestAnimationFrame. Use this way.
}
function tick(){
}

enableVR()
```

## Controller
```javascript
let controller;
controller = renderer.xr.getController(0);
controller.addEventListener('select', onSelect);
scene.add(controller);

// this example is borrowed with slight modifications from three.js samples
    // https://threejs.org/examples/?q=webxr#webxr_ar_cones
    function onSelect() {
      const geometry = new THREE.ConeGeometry( 0.1, 0.2, 32 ).rotateX(Math.PI / 2);;
      const material = new THREE.MeshPhongMaterial({
        color      :  0xffffff * Math.random(),
        shininess  :  6,
        flatShading:  true,
        transparent: 1,
        opacity    : 0.8
      });
      mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld );
      mesh.quaternion.setFromRotationMatrix( controller.matrixWorld );
      
      scene.add(mesh);
    }
```


## Render Controllers
[Example](https://github.com/mrdoob/three.js/blob/master/examples/webxr_vr_ballshooter.html) 
[Example2](https://github.com/mrdoob/three.js/blob/master/examples/webxr_vr_handinput.html)

```js

```

### Controller

```js

```

### Controller Grip
- [ ] xr 

### Different way to access the controllers
```js
// different way to get controller.
this.session = this.renderer.xr.getSession();
this.inputSources = this.session.inputSources;

(this.inputSources).forEach(input => {
	var buttons = input.gamepad.buttons;
	buttons.forEach( button =>{
		//"pressed", "touched", "value"
		console.log(button)
	   // button.addEventListener("pressed",()=>{console.log(button)})
	})
});
```
based on -> [repo](https://github.com/paulmasson/paulmasson.github.io/blob/master/webxr-worlds/js/VRController.js)

---
# WebXRManager
[Doc](https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager)
[controller event list](https://developer.mozilla.org/en-US/docs/Web/API/XRInputSourceEvent)
event List
- select
- selectEnd
- selectstart
- squeeze
- squeezeend
- squeezestart

- [ ] wonder thumbstick input is not avialble for now?
---

# Check  if it's VR device
```js
console.log(navigator)
```
if it's vr, this will return as
`Navigator {xr: XRSystem....}`
but if it's not, xr is not included in dictionary
`Navigator { appCodeName: "Mozilla"...}`

so what you can do is like this
```js
if(navigator.xr){
	console.log("vr enable")
}
else{
	console.log("vr disable")
}
```

or you can do this
```js
var checkVR =() => { return 'xr' in navigator }
```


# Get the button of controller
- [ ] this doesn't work , maybe not supported yet. 
```js
function VRbuttonHandler(evt){
    var buttons = evt.data.gamepad.buttons ;
    var selected ;
    for (var i = 0; i < buttons.length; i++){
        var pressed = buttons[i].pressed; //pressed, touched, value;
        if(pressed){
            selected = i; 
        }
    }
   // return selected
   return selected
}

VR.controllers[1].addEventListener( 'selectstart' , (evt)=>{
	console.log(VRbuttonHandler(evt));//default index is 3
}  ); 
```


# Ref
https://medium.com/@darktears/adding-support-for-vr-inputs-with-webxr-and-three-js-235b40beb6f0