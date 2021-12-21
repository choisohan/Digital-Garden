---
title: Procedural Patterns
---
## Circle
```javascript
float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);
```

##  Wave Pattern
```javascript
float wave(in vec2 uvCoord){
	float o = .2;
	o = sin(uvCoord.y* 100.0+ sin(uvCoord.x * 50.0));
	return o;
}

```


## Wave Warp
```javascript
//https://coderedirect.com/questions/278348/how-to-make-a-wave-warp-effect-in-shader

vec2 SineWave( in vec2 p , float scale , float strength){
	float pi = 3.14159;
	float y = sin( scale * pi *p.x + 0.0*pi/180.0) * 0.1 * strength; 
	return vec2(p.x, p.y + y);
}
```


# Noise

## Perlin noise
[Book of The Shader](https://thebookofshaders.com/11/)
[GLSL noise Lib](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)

```javascript
//  Classic Perlin 2D Noise 
//  by Stefan Gustavson
//
vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
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

float _noise = cnoise(vUv);

```

## Fractal Noise
https://thebookofshaders.com/13/
```javascript

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float random (in vec2 st) {
	return fract(sin(dot(st.xy,
						 vec2(12.9898,78.233)))*
		43758.5453123);
}


float noise (in vec2 st) {
	vec2 i = floor(st);
	vec2 f = fract(st);

	// Four corners in 2D of a tile
	float a = random(i);
	float b = random(i + vec2(1.0, 0.0));
	float c = random(i + vec2(0.0, 1.0));
	float d = random(i + vec2(1.0, 1.0));

	vec2 u = f * f * (3.0 - 2.0 * f);

	return mix(a, b, u.x) +
			(c - a)* u.y * (1.0 - u.x) +
			(d - b) * u.x * u.y;
}
#define OCTAVES 6
//Fractal Brownian Motion
float fbm (in vec2 st) {
	// Initial values
	float value = 0.0;
	float amplitude = .5;
	float frequency = 0.;
	//
	// Loop of octaves
	for (int i = 0; i < OCTAVES; i++) {
		value += amplitude * noise(st);
		st *= 2.;
		amplitude *= .5;
	}
	return value;
}
```


## Simplex Noise



## Voro noise (Celluar, Worey)
![](https://www.fatalerrors.org/images/blog/38b0f17b3f352af3d82b9230c5e27b3c.jpg)
```javascript
//https://thebookofshaders.com/edit.php#12/2d-voronoi.frag


vec2 random2( vec2 p ) {
	return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}


float voronoi( in vec2 uv ) {
	float o = .25; 
	//Tile
	vec2 floor_tile = floor(uv);
	vec2 fract_tile = fract(uv);

	vec2 m_point; 

	float minDist = 1.0;

	for(int y = -1; y <= 1; y++){
		for(int x = -1; x <=1; x++){
			vec2 neighbor = vec2(float(x), float(y));
			vec2 point = random2(floor_tile + neighbor);
			point = 0.5 + 0.5 * sin(6.2831*point); 
			vec2 diff = neighbor + point - fract_tile;
			float dist = length(diff);

			//minDist = min(minDist, dist);
			if(dist < minDist){
				minDist = dist;
				m_point = point; 
			}

		}
	}
	//option 1: Draw Distance Field
	o = minDist; 
	//option 2: random Fill
	o = dot(m_point,vec2(0.3,0.6));
	return o; 
}

voronoi(vUv)
```


```javascript
//3d voronoi
//https://thebookofshaders.com/edit.php#12/3d-cnoise.frag

vec3 voronoi3( in vec2 x ) {
    vec2 n = floor(x);
    vec2 f = fract(x);

    // first pass: regular voronoi
    vec2 mg, mr;
    float md = 8.0;
    for (int j= -1; j <= 1; j++) {
        for (int i= -1; i <= 1; i++) {
            vec2 g = vec2(float(i),float(j));
            vec2 o = random2( n + g );
            o = 0.5 + 0.5*sin(  6.2831*o );

            vec2 r = g + o - f;
            float d = dot(r,r);

            if( d<md ) {
                md = d;
                mr = r;
                mg = g;
            }
        }
    }

    // second pass: distance to borders
    md = 8.0;
    for (int j= -2; j <= 2; j++) {
        for (int i= -2; i <= 2; i++) {
            vec2 g = mg + vec2(float(i),float(j));
            vec2 o = random2( n + g );
            o = 0.5 + 0.5*sin(  6.2831*o );

            vec2 r = g + o - f;

            if ( dot(mr-r,mr-r)>0.00001 ) {
                md = min(md, dot( 0.5*(mr+r), normalize(r-mr) ));
            }
        }
    }
    return vec3(md, mr);
}


```
## Phasor noise
![](http://maverick.inria.fr/~Romain.Vergne/blog/data/research/fast-gabor-noise-image.jpg)



# Flow Field

# References
[Intro to Procedural Textures](http://www.upvector.com/?section=Tutorials&subsection=Intro%20to%20Procedural%20Textures)
[tuxalin / proceural shaders](https://github.com/tuxalin/procedural-tileable-shaders)