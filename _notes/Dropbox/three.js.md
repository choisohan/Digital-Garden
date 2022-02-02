---
---

[---
title: three.js
---

# 📚Reference
- https://threejsfundamentals.org/
- https://discoverthreejs.com/
- https://threejs-journey.xyz/
- https://github.com/designcourse/threejs-webpack-starter.git
- https://threejs.org/examples/
- https://github.com/google-ar/three.ar.js

# 🐤How to Start

```command
git clone https://github.com/designcourse/threejs-webpack-starter
npm i
npm i --save dat.gui
npm i --save gsap@3.5.1
npm run dev

```



# 🐰Load 3D asset

Save the file in static / models
```javascript
//https://threejs.org/docs/#examples/en/loaders/GLTFLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Objects
const gltfLoader = new GLTFLoader()

gltfLoader.load(
    '/models/scene_001.glb',
    (gltf) =>
    {
        scene.add(gltf.scene);

    }
)

```

- instead of importing whole scene, you can import as loop as well
```javascript
const children = [...gltf.scene.children]
        for(const child of children)
        {
            scene.add(child)
        }

```

# Load Texture
https://threejs.org/docs/#api/en/loaders/TextureLoader
```js
const texture = new THREE.TextureLoader().load('textures/land_ocean_ice_cloud_2048.jpg' )

```



# 🏃‍♀️Frame Update
```javascript
//Clock
// consistent speed for different computer
const clock = new THREE.Clock()

//animation
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    mesh.rotation.x +=.01 * elapsedTime
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
    
}
tick()

```

## Rendering on Demand
tag : optimize
[https://threejs.org/manual/?q=deman#en/rendering-on-demand](https://threejs.org/manual/?q=deman#en/rendering-on-demand)




### Get Object by name
```javascript
var object = scene.getObjectByName( "objectName", true );
```

### Generate Particles on geometry
tag : [[Particle]]
```javascript
/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)

const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.02
particlesMaterial.sizeAttenuation = true

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
```


### Particles on Procedural  geometry 
tag : [[bufferGeometry]]
```javascript
// buffer Geometry
// https://threejs.org/docs/#api/en/core/BufferGeometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 500

const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
{
    positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values

```

```javascript

```

```javascript

```





# 🍱UI
## 1. Full Screen

```javascript
*{
    margin:0;
    padding:0;
}

.webgl
{
    position:fixed;
    top:0;
    left:0;
    outline:none;
}

html,
body{
    
    overflow:hidden;
}
```

```javascript
window.addEventListener('resize',()=>
{
    //update sizes
    sizes.width= window.innerWidth
    sizes.height= window.innerHeight

    camera.aspect = sizes.width/ sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)

})


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
renderer.setSize(sizes.width, sizes.height)

```

```javascript
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

```





# 👀Find Object
## 1. find object by name
```javascript
scene.traverse (function (object)
{
    if (object instanceof THREE.Particle)
    {
        if (object.name === 'q10')
            // do what you want with it.
    }
});
	
```

## 2. get all Child names by traverse()

```javascript
gltfLoader.load(
    '/models/scene_001.glb',
    (gltf) =>
    {
        const root = gltf.scene
        root.traverse(function(child){
            console.log(child.name);
        });
    }
)

```


# 🏡Scene
## Change Background Color 
```javascript
scene.background = new THREE.Color( 'grey' );
```

```javascript

```



# 🎥Camera

## 1. ObitControl
```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

```

```javascript
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ...

const tick = () =>
{
    // ...

    // Update controls
    controls.update()

    // ...
}

```

## 2.  Use  the Camera from 3D file
```javascript

```

# 🕯️Light
```javascript

//create a light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
//update value
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5

```


# 🎈Shader

## 1. Webpack configuratin to import glsl
tag : [[webpack]]

```javascript
//add this to webpack.config.js

{
    test: /\.(glsl|vs|fs|vert|frag)$/,
    exclude: /node_modules/,
    use: [
        'raw-loader'
    ]
}

```

##
```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;    
    attribute vec3 position;
    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;
    }
    `,
    fragmentShader: `
    precision mediump float;
    void main(){
        gl_FragColor =vec4(1.0,0.0,0.0,1.0);
    }
    `,
    uniforms:{

    }
})
```



## 2. Import custom shader
tag : [[GLSL]],[[shader]]
- glsl example dir : node_modules\three\src\renderers\shaders\ShaderLib
```javascript
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

const material = new THREE.RawShaderMaterial({
    vertexShader: '',
    fragmentShader: ''
		//transparent:true
})

```

## 3. Send Attribute from JS to vertex.glsl
on script
```javascript
//this is for script.js
//Created attribute called 'aRandom'
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

```

on vertex.glsl
```glsl
// ... this is how to call the attribute to vertex.glsl
attribute float aRandom;

void main()
{
    // ...
    modelPosition.z += aRandom * 0.1;

    // ...
}

```

## 4. Send Attribute from vertex.glsl to frag.glsl

on vertex.glsl
```glsl
//declare vertex.glsl
attribute float aRandom;
varying float vRandom;

void main()
{
   vRandom = aRandom
}

```

on fragment.glsl
```glsl

// call value from vertex.glsl into fragment.glsl
precision mediump float;

varying float vRandom;

void main()
{
    gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
}
```

## 5. Send Unifrom value from JS to glsl
on script
```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        frequency: { value: 10 }
				uFrequency: { value: new THREE.Vector2(10, 5) }
    }
})
```

on vertex.glsl
```glsl
uniform float uFrequency;
uniform vec2 uFrequency;
```

### 6. Animating uniform value
```javascript
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    // ...
}
```

### 7. Set Texture
1) Set the value on script
```javascript
const material = new THREE.RawShaderMaterial({
    // ...
    uniforms:
    {
        // ...
        uTexture: { value: flagTexture }
    }
})
```

2) Need to send uv from vertex.glsl to fragment.glsl
```glsl
// vertex.glsl, get uv and send it as vUv to fragment.glsl
attribute vec2 uv;

varying vec2 vUv;

void main()
{
    // ...

    vUv = uv;
}
```

3) Fianlly fragment.glsl can fetch texture and uv to display
```glsl
//fetch in fragement.glsl 
precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor;
}
```


# 👋Input
## 1. Get Mouse Position in the browser
```javascript
const mouse = new THREE.Vector2();
window.addEventListener( 'mousemove', onMouseMove, false );

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

```

tag : [[Raycaster]]
```javascript
//https://threejs.org/docs/index.html#api/en/core/Raycaster

const raycaster = new THREE.Raycaster();


function Get_Selected_Object(){
    raycaster.setFromCamera(mouse,camera);
    const intersects = raycaster.intersectObjects( imported );

    for(let i =0; i < intersects.length; i++){
        return intersects[i].object.name
    }
}



//hover
function mouseHover(){
    //console.log(Get_Selected_Object())
    
}


function onMouseDown(){
    console.log(Get_Selected_Object())
    //console.log("clicked!", mouse)
}



```


## 2. Microphone Input
- [ ] Microphone input 
```javascript

```

## 3. webXR
![[webXR with Three.js]]



```javascript

```

- 

```javascript

```



```javascript

```



```javascript

```



```javascript

```




```javascript

```



```javascript

```




```javascript

```



```javascript

```




```javascript

```



```javascript

```




```javascript

```



```javascript

```

- 

```javascript

```



```javascript

```

- 

```javascript

```



```javascript

```




```javascript

```



```javascript

```




```javascript

```



```javascript

```



```javascript

```



```javascript

```

-](<---
title: three.js
---

# 📚Reference
- https://threejsfundamentals.org/
- https://discoverthreejs.com/
- https://threejs-journey.xyz/
- https://github.com/designcourse/threejs-webpack-starter.git
- https://threejs.org/examples/
- https://github.com/google-ar/three.ar.js





# 🐤How to Start

```command
git clone https://github.com/designcourse/threejs-webpack-starter
npm i   //install npackage and all dependencies
npm i --save dat.gui
npm i --save gsap@3.5.1

code .  //open visual script code
npm run dev

```
[[npm]]





# 🐰Load 3D asset

Save the file in static / models
```javascript
//https://threejs.org/docs/#examples/en/loaders/GLTFLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Objects
const gltfLoader = new GLTFLoader()

gltfLoader.load(
    '/models/scene_001.glb',
    (gltf) =%3E
    {
        scene.add(gltf.scene);

    }
)

```

- instead of importing whole scene, you can import as loop as well
```javascript
const children = [...gltf.scene.children]
        for(const child of children)
        {
            scene.add(child)
        }

```


## DracoLoader
You may get this messege when you compress 3D file with compression
"THREE.GLTFLoader: No DRACOLoader instance provided."
if so, you should use [DracoLoader](https://threejs.org/docs/#examples/en/loaders/DRACOLoader) 

```javascript
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
gltfLoader.setDRACOLoader(dracoLoader)
```


# 👀Find Object
## 1. find object by name
```javascript
scene.traverse (function (object)
{
    if (object instanceof THREE.Particle)
    {
        if (object.name == 'q10'){
            // do what you want with it.
		}
    }
});
	
```

## 2. get all Child names by traverse()

```javascript
gltfLoader.load(
    '/models/scene_001.glb',
    (gltf) =>
    {
        const root = gltf.scene
        root.traverse(function(child){
            console.log(child.name);
        });
    }
)

```


## 3. Access to 3D file's Properties
```javascript
gltfLoader.load(
    '/models/scene_001.glb',
    (gltf) =>
    {
        const root = gltf.scene
		// 1. return all child names
        root.traverse(function(child){
            console.log(child.name);
        });
		
		//2. return only Mesh names
		if(child.isMesh){
			console.log(child.name)
		}
		
		
    }
)

```









# 🏃‍♀️Frame Update
```javascript
//Clock
// consistent speed for different computer
const clock = new THREE.Clock()

//animation
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    mesh.rotation.x +=.01 * elapsedTime
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
    
}
tick()

```




### Get Object by name
```javascript
var object = scene.getObjectByName( "objectName", true );
```

### Generate Particles on geometry
tag : [[Particle]]
```javascript
/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)

const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.02
particlesMaterial.sizeAttenuation = true

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
```


### Particles on Procedural  geometry 
tag : [[bufferGeometry]]
```javascript
// buffer Geometry
// https://threejs.org/docs/#api/en/core/BufferGeometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 500

const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

for(let i = 0; i %3C count * 3; i++) // Multiply by 3 for same reason
{
    positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values

```

```javascript

```

```javascript

```












# 🍱UI
## 1. Full Screen

```javascript
*{
    margin:0;
    padding:0;
}

.webgl
{
    position:fixed;
    top:0;
    left:0;
    outline:none;
}

html,
body{
    
    overflow:hidden;
}
```

```javascript
window.addEventListener('resize',()=>
{
    //update sizes
    sizes.width= window.innerWidth
    sizes.height= window.innerHeight

	 // Update perspective camera

	 camera.aspect = sizes.width / sizes.height

	 camera.updateProjectionMatrix()



	 // Update orthographic camera distortion update

	 cameraHUD.left=-sizes.width/2;

	 cameraHUD.right=sizes.width/2;

	 cameraHUD.top=sizes.height/2;

	 cameraHUD.bottom= -sizes.height/2;

	 cameraHUD.updateProjectionMatrix()
	
	// Update render
    renderer.setSize(sizes.width, sizes.height)

})


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
renderer.setSize(sizes.width, sizes.height)

```

```javascript
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

```




# Canvas
[3DLabel](https://threejsfundamentals.org/threejs/lessons/threejs-canvas-textures.html), [billboard](https://threejsfundamentals.org/threejs/lessons/threejs-billboards.html)
```javascript

const canvas = document.querySelector('canvas.webgl')

function createLabel(){
	const canvas = makeLabelCanvas(size, name);
	const texture = new THREE.CanvasTexture(canvas);

	
	
	// option 1 : 3D label
	const labelMaterial = new THREE.MeshBasicMaterial({
		 map: texture,
		 side: THREE.DoubleSide,
		 transparent: true,
	 });
	 const labelGeometry = new THREE.PlaneGeometry(1, 1);
	 const label = new THREE.Mesh(labelGeometry, labelMaterial);


	// option 2: 2D sprite label
	const labelMaterial = new THREE.SpriteMaterial({
		map: texture,
		side: THREE.DoubleSide,
		transparent: true,
	});
	const label = new THREE.Sprite(labelMaterial);
	
	
}
```

# HUD(Head-up display )
[stackOverflow](https://stackoverflow.com/questions/12667507/drawing-ui-elements-directly-to-the-webgl-area-with-three-js)
Billboards / Sprite
```javascript


// We will use 2D canvas element to render our HUD.  
var hudCanvas = document.createElement('canvas');

// Again, set dimensions to fit the screen.
hudCanvas.width = width;
hudCanvas.height = height;

// Get 2D context and draw something supercool.
var hudBitmap = hudCanvas.getContext('2d');
hudBitmap.font = "Normal 40px Arial";
hudBitmap.textAlign = 'center';
hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
hudBitmap.fillText('Initializing...', width / 2, height / 2);

// Create the camera and set the viewport to match the screen dimensions.
var cameraHUD = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 30 );

// Create also a custom scene for HUD.
var sceneHUD = new THREE.Scene();

// Create texture from rendered graphics.
var hudTexture = new THREE.Texture(hudCanvas) 
hudTexture.needsUpdate = true;

// Create HUD material.
var material = new THREE.MeshBasicMaterial( {map: hudTexture} );
material.transparent = true;

// Create plane to render the HUD. This plane fill the whole screen.
var planeGeometry = new THREE.PlaneGeometry( width, height );
var plane = new THREE.Mesh( planeGeometry, material );
sceneHUD.add( plane );

```

```javascript
//autoClear : Defines whether the renderer should automatically clear its output before rendering a frame.
renderer.autoClear = false;
renderer.render(scene, camera);
renderer.render(sceneHUD, cameraHUD); //overlay
```



# Multiple Camera for grid view
[Codepen Example](https://codepen.io/jdrew1303/pen/poyVOyG)
```js
renderer.setViewport( 0, 0,canvas.width, canvas.height );
renderer.render(scene, camera0);

renderer.setViewport(canvas.width/2., .0 ,canvas.width/2., canvas.height/2. );
renderer.render(scene, camera1);


```



# 🏡Scene
## Change Background Color 
```javascript
scene.background = new THREE.Color( 'grey' );
```



# 🎥Camera

## 1. ObitControl
```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

```

```javascript
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ...

const tick = () =>
{
    // ...

    // Update controls
    controls.update()

    // ...
}

```

## 2.  Use  the Camera from 3D file
```javascript

```

# 🕯️Light
```javascript

//create a light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
//update value
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5

```


# 🎈Shader

## 1. Webpack configuratin to import glsl
tag : [[webpack]]

```javascript
//add this to webpack.config.js

{
    test: /\.(glsl|vs|fs|vert|frag)$/,
    exclude: /node_modules/,
    use: [
        'raw-loader'
    ]
}

```

## 2. Import custom shader
tag : [[GLSL]],[[shader]]
- glsl example dir : node_modules\three\src\renderers\shaders\ShaderLib
```javascript
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

const material = new THREE.RawShaderMaterial({
    vertexShader: '',
    fragmentShader: ''
		//transparent:true
})

```

## 3. Send Attribute from JS to vertex.glsl
on script
```javascript
//this is for script.js
//Created attribute called 'aRandom'
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

```

on vertex.glsl
```glsl
// ... this is how to call the attribute to vertex.glsl
attribute float aRandom;

void main()
{
    // ...
    modelPosition.z += aRandom * 0.1;

    // ...
}

```

## 4. Send Attribute from vertex.glsl to frag.glsl

on vertex.glsl
```glsl
//declare vertex.glsl
attribute float aRandom;
varying float vRandom;

void main()
{
   vRandom = aRandom
}

```

on fragment.glsl
```glsl

// call value from vertex.glsl into fragment.glsl
precision mediump float;

varying float vRandom;

void main()
{
    gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
}
```

## 5. Send Unifrom value from JS to glsl
on script
```javascript
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms:
    {
        frequency: { value: 10 }
				uFrequency: { value: new THREE.Vector2(10, 5) }
    }
})
```

on vertex.glsl
```glsl
uniform float uFrequency;
uniform vec2 uFrequency;
```

### 6. Animating uniform value
```javascript
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    // ...
}
```

### 7. Set Texture
1) Set the value on script
```javascript
const material = new THREE.RawShaderMaterial({
    // ...
    uniforms:
    {
        // ...
        uTexture: { value: flagTexture }
    }
})
```

2) Need to send uv from vertex.glsl to fragment.glsl
```glsl
// vertex.glsl, get uv and send it as vUv to fragment.glsl
attribute vec2 uv;

varying vec2 vUv;

void main()
{
    // ...

    vUv = uv;
}
```

3) Fianlly fragment.glsl can fetch texture and uv to display
```glsl
//fetch in fragement.glsl 
precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor;
}
```

## Depth Shader Example
```javascript
function customShader(){
    const Material = new THREE.RawShaderMaterial({
        vertexShader:`
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;    
        attribute vec3 position;
        varying float vDepth;

        void main(){
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;
            vDepth = 1.0/-viewPosition.z;
        }
        `,
        fragmentShader:`
        precision mediump float;
        varying float vDepth;

        void main(){
            vec3 col = vec3(vDepth);
            gl_FragColor = vec4(col, 1.0) ;
        }
        `,
        uniforms:{

        }
    })
    return Material;
}

```





# 👋Input
## 1. Get Mouse Position in the browser
```javascript
const mouse = new THREE.Vector2();
window.addEventListener( 'mousemove', onMouseMove, false );

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

```

tag : [[Raycaster]]
```javascript
//https://threejs.org/docs/index.html#api/en/core/Raycaster

const raycaster = new THREE.Raycaster();


function Get_Selected_Object(){
    raycaster.setFromCamera(mouse,camera);
    const intersects = raycaster.intersectObjects( imported );

    for(let i =0; i < intersects.length; i++){
        return intersects[i].object.name
    }
}



//hover
function mouseHover(){
    //console.log(Get_Selected_Object())
    
}


function onMouseDown(){
    console.log(Get_Selected_Object())
    //console.log("clicked!", mouse)
}



```


[mouseover](http://stemkoski.github.io/Three.js/Mouse-Over.html) , [code](https://github.com/stemkoski/stemkoski.github.com/blob/f5c7120af8488d04255b3e4492f4fb214d80b6ff/Three.js/Mouse-Over.html)

[example](https://threejs.org/examples/webgl_interactive_cubes.html) , [code](https://github.com/mrdoob/three.js/blob/dev/examples/webgl_interactive_cubes.html)


https://threejsfundamentals.org/threejs/lessons/threejs-picking.html

## 2. keyboard Input
```javascript
```
https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Keyboard.html


## 3. Microphone Input
- [ ] Microphone input 
```javascript

```

## 3. webXR
![[webXR with Three.js]]







# Math

```javascript
//get distance
var distance = objectA.position.distanceTo(objectB.position );

```

- 


# Texture

```javascript

```


### animating texture array
```javascript

```


# Get Direction

```javascript
 var forward = new THREE.Vector3();
 selectedCam.getWorldDirection( forward )
 var up = selectedCam.up
 var right = up.cross(forward)
 var left = -right;
```



# keyboard input
```javascript
document.addEventListener("keydown", function(event){
    var keyCode = event.which;
    if(keyCode == 38){//forward

    }
    if(keyCode == 40){//backward

    }
    if(keyCode == 37){//left

    }
    if(keyCode == 39){//right

    }
}, false);


```


# GUI

```javascript

const params = {
    roughness: 0.0
}
const gui = new dat.GUI()
gui.add(params, 'roughness',0,1,.1).onChange( (value)=> obj.material.roughness= value}) )


//color is different
const paramCols = {
    color: 0xff0000
}

gui.addColor(paramCols, 'color')

```

# Debug
https://github.com/mrdoob/stats.js/
https://sbcode.net/threejs/stats-panel/

$ npm install stats.js

```javascript
//Frame rate
import Stats from 'three/examples/jsm/libs/stats.module'

const stats = Stats()
document.body.appendChild(stats.dom)

function tick(){
	stats.update()
}
```






# Skybox 
-> [document](https://threejsfundamentals.org/threejs/lessons/threejs-backgrounds.html)

```javascript
//this seems not to work in orthographic camera
const loader = new THREE.TextureLoader();
const texture = loader.load(
    'resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
    });
}
```

# Modify BUILT-IN shader
-> [PhysicalMaterial](https://threejs.org/docs/?q=physical#api/en/materials/MeshPhysicalMaterial)

```javascript
const material = new THREE.MeshPhysicalMaterial({
	map:img,
	roughness: 0,
	metalness: .75,
	reflectivity:1,
});


//base on 'node_modules\three\src\renderers\shaders\ShaderLib\meshphysical_frag.glsl.js'
material.onBeforeCompile = (shader) =>
	{
	
		//replace(A -> B )
		shader.fragmentShader = shader.fragmentShader.replace(
			'gl_FragColor = vec4( outgoingLight, diffuseColor.a )',
			`
				gl_FragColor = vec4(.3,.5,.2,1.0);
			`
			//on this A part needs to use  ''
			//but B is covered with ``,also needs to be careful,
			//therwise  you get ---> '{' : syntax error 
		)
	

	}
```


```javascript 
//if you keep getting '{' : syntax error,
//you can declare the variable beofore main() like this
shader.fragmentShader = shader.fragmentShader.replace(
	'void main() {',
	`
	float test(in float a){
		return a; 
	}
	void main() {`)

shader.fragmentShader = shader.fragmentShader.replace(

	'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
	`
	vec3 col = vec3(test(1.0));
	gl_FragColor = vec4( col, diffuseColor.a );
	`
)


```

## Adding custom uniforms
```javascript

const customUniforms = {
    uTime: { value: 0 }
}

material.onBeforeCompile = (shader) =>
{
	shader.uniforms.uTime = customUniforms.uTime;
	
	shader.fragmentShader = shader.fragmentShader.replace(
		'void main() {',
	 	`uniform float uTime;
		void main() {`
}


tick(){
	const elapsedTime = clock.getElapsedTime();
	customUniforms.uTime.value = elapsedTime;
}



```



# mousedown event 
mousedown, mouse up is not working with orbit controller, so needs to use pointer event instead

```javascript
var mouseHold =false;
window.addEventListener('pointerdown',()=>{
    mouseHold = true;
},false);

window.addEventListener('pointerup',()=>{
    mouseHold = false;
},false);
```

also mousemove is stop when mouse down, however pointerdown event work no matter what mouse is pressed
```javascript
window.addEventListener('mousemove',(event)=>{ /* stop when mouse pressed */ })
window.addEventListener('pointermove',(event)=>{ /* continuous */})
```


# How to optimize Performance
## 1. FPS drops when zooming in  => Fill Bound
- [link](https://stackoverflow.com/questions/50071894/debugging-low-fps-in-three-js)
### Reason 
There are almost always a ton more pixels than vertices. A single 1920x1080 screen is nearly 2 million pixels yet can be covered in a 3 vertex triangle or a 4 or 6 vertex quad (2 triangles). That means to cover the entire screen the vertex shader ran 3 to 6 times but the fragment shader ran 2 million times!!!
Sending too much work to the fragment shader is called being **fill bound**.
The easiest way to see if you're fill bound is to make your canvas tiny, like 2x1 pixels (or just size your browser window really small). If your app starts running fast it's likely fill bound.
If it's still running slow it could either be geometry bound (the vertex shader is doing too much work) or it's CPU bound (whatever work you're doing on the CPU is taking too long whether that's just calling WebGL commands or computing animation or collisions or physics or whatever).
In your case you likely are fill bound since you see when all the triangles are small it runs fast (because very few pixels are being drawn) vs when you're zoomed in and lots of triangles cover the screen then it runs slow (because too many pixels are being drawn).

### Solution
1)  z-buffer : This is a method of "avoiding overdraw". Overdraw is any pixel that is drawn more than once. If you draw a cube in the distance and then draw a sphere up close such that it covers the cube then for every pixel that was rendered for the cube it was "overdrawn" by the sphere pixels. That was a waste of time.


## 2. [[LOD]](Level of Detail)
https://threejs.org/docs/#api/en/objects/LOD

### Preparing LOD in [[Blender]]
1.  Naming convension
photographer_LOD0 : highest
photographer_LOD1 : mid
photographer_LOD2 : lower
...
you can create more if you want

2. Apply "decimate modifier"

### Set up LOD of three.js glb loader
```javascript
lod.update(camera)
```


### [[Mipmap]]
Automatically reduce the rendering detail. 
```javascript
texture.minFilter = THREE.NearestMipMapNearestFilter;
texture.magFilter = THREE.LinearMipMapLinearFilter;
```
Or you can set different textures into the mipmap slot
https://stackoverflow.com/questions/34040978/mipmap-a-planet-in-three-js
```javascript
texture.mipmaps[ 1 ] =texture_low;
```



```javascript

```

- 

```javascript

```



```javascript

```




```javascript

```



```javascript

```




```javascript

```



```javascript

```



```javascript

```



```javascript

```

->)


