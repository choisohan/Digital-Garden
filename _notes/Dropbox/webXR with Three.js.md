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


# 
## Check  if it's VR device
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