---
title: GLSL
---

To get syntax highlighting on [[visual studio code]]
install this extension ->[Shader languages support for VS Code](https://marketplace.visualstudio.com/items?itemName=slevesque.shader)

# baisic code
 vertex.glsl
```js
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;


void main()
{
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	//modelPosition.z += sin(modelPosition.x * 10.0) * 0.1; //curve displacement
	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;
	
	gl_Position = projectedPosition;
}
```

 fragment.glsl
```js
precision mediump float;

void main(){
	gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
}

```


# UV Coordinate
## Scale UV Coordinate
https://www.shadertoy.com/view/ts2SWt
```js
float scale = 2.0;
uv = (uv - float2(0.5)) * scale + float2(0.5);
```





# Draw pattern Example
```js
varying vec2 vUv;

void main()
{
    gl_FragColor = vec4(vUv, 1.0, 1.0);

}


//noise
float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

//circle
float circle  = distance(vUv, vec2(0.5));


//distorted circle
vec2 wavedUv = vec2(
    vUv.x + sin(vUv.y * 30.0) * 0.1,
    vUv.y + sin(vUv.x * 30.0) * 0.1
);
float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));


//  Classic Perlin 2D Noise 
//  by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}
```

# Particle's vertex shader
tag : [[Particle]]
```js
void main()
{

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    gl_PointSize = 2.0;
}
```

# Deformer with vertex.shader
- [example](https://threejs.org/examples/#webgl_materials_modified)


# Specular shader
```js
```

# Reflection shader
```javascript
```

# Iridecscent shader (or pearl)
[ref](https://stackoverflow.com/questions/11794277/glsl-shader-for-glossy-specular-reflections-on-an-cubemapped-surface),
[blender shader](https://www.youtube.com/watch?v=Y9j3LK8jMiw),
[shadertoy1](https://www.shadertoy.com/view/7dVGzz),
[shadertoy2](https://www.shadertoy.com/view/Ms33zj),
[shadertoy3](https://www.shadertoy.com/view/wlj3Dc),
[shadertoy4](https://www.shadertoy.com/view/MlcGWr)

```javascript
```



# Random
```javascript 
// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}
float noise = random(vUv)
```


[[Procedural Patterns]]

# perlin noise + iridescent Shader
```javascript
            shader.fragmentShader = shader.fragmentShader.replace(
                'void main() {',
                `
                vec2 hash( vec2 p ) // replace this by something better
                {
                    p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
                    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
                }
                
                float noise( in vec2 p )
                {
                    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
                    const float K2 = 0.211324865; // (3-sqrt(3))/6;
                
                    vec2  i = floor( p + (p.x+p.y)*K1 );
                    vec2  a = p - i + (i.x+i.y)*K2;
                    float m = step(a.y,a.x); 
                    vec2  o = vec2(m,1.0-m);
                    vec2  b = a - o + K2;
                    vec2  c = a - 1.0 + 2.0*K2;
                    vec3  h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
                    vec3  n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
                    return dot( n, vec3(70.0) );
                }
                //end

                void main() {`)

            shader.fragmentShader = shader.fragmentShader.replace(
                
                'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
                `

                //gray fractal noise
                //based on https://www.shadertoy.com/view/Msf3WH
                vec2 uv = vUv * 2.0;
                mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
                float _noise = noise(uv)  *.5;
                uv = m* uv;
                _noise += 0.25 * noise(uv);
                uv = m* uv;
                _noise += 0.124 * noise(uv);
                uv = m* uv;
                _noise += 0.0625* noise(uv);
                _noise = .5 + _noise*.5; 
                _noise *= smoothstep( 0.0, 0.005, abs(uv.x) );	

                //add iridescence color
                //based on https://www.shadertoy.com/view/MlcGWr
                vec4 _col = vec4(_noise);
                _col += sin(2.0 * sin(_col*22.0 +15.0) + uv.yxyy - uv.yyxy)/12.0;
                gl_FragColor = _col; 
                `
            )
            
        }
```

```glsl
```




# Dot Product

# Length()


# Blurry UV
```javascript
vec3 Blur (vec2 uv)
{
    const int radius = 1;
    
    vec3 color = vec3(0.0);
    float kernel = 0.0;
    vec2 uvScale = 1.75 / iChannelResolution[0].xy;
    
    for (int y = -radius; y <= radius; ++y)
    {
        for (int x = -radius; x <= radius; ++x)
        {
            float k = 1.0 / pow( 2.0, abs(float(x)) + abs(float(y)) );
            
            color += texture( iChannel0, uv + vec2(x,y) * uvScale ).rgb * k;
            kernel += k;
        }
    }
    
    return color / kernel;
}
```

## Pow(x,y)


## Grey Scale Height Map to Normal Map
```javascript
//https://www.shadertoy.com/view/MsScRt
//https://www.shadertoy.com/view/XtV3z3

vec3 bumpFromDepth(sampler2D map, vec2 uv, float scale) {
	scale /=10.0;
	vec2 step = vec2( 1. / 1024.0 ) ; //resolution

	float height = ( texture2D( map, uv) ).r; 
	vec2 dxy = height - vec2( texture2D( map, uv + vec2(step.x, 0.)).r,
	texture2D( map, uv +  vec2(.0, step.y) ).r
	 );
	return vec3(  normalize(vec3(dxy * scale / step, 1.0) )  );
}

```

## Blur
```javascript

//https://www.shadertoy.com/view/3ljBDd
#define TAU 6.28318530718
vec4 RadialBlur(in sampler2D map, vec2 uv, float radius){
	const float samples = 8.;
	vec2 offset;
	float angle = 0.0;
	vec4 col = vec4(.0);

	for(float angle = 0.0 ; angle < TAU; angle += (TAU/samples)){
		offset = vec2(cos(angle), sin(angle)) *radius*.1; 
		col += texture2D( map, uv  + offset );

	}
	return col/samples;
}

```


## fract() and floor() 

## pow()

## mod()
```js
```




## 2e2
