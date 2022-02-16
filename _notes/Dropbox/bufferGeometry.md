---
title: bufferGeometry
---

# Creating Plane
https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_indexed.html

```js
// Buffer Plan
this.geometry = new THREE.BufferGeometry();

const indices = [];
const vertices = [];
const normals = [];

const size = 1;
const segments = 1;

const halfSize = size / 2;
const segmentSize = size / segments;


for ( let i = 0; i <= segments; i ++ ) {
	const y = ( i * segmentSize ) - halfSize;
	for ( let j = 0; j <= segments; j ++ ) {
		const x = ( j * segmentSize ) - halfSize;
		vertices.push( x,  -y , 0);
		normals.push( 0, 0, 1 );
	}
}
// generate indices (data for element array buffer)
for ( let i = 0; i < segments; i ++ ) {
	for ( let j = 0; j < segments; j ++ ) {
		const a = i * ( segments + 1 ) + ( j + 1 );
		const b = i * ( segments + 1 ) + j;
		const c = ( i + 1 ) * ( segments + 1 ) + j;
		const d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );
		// generate two faces (triangles) per iteration
		indices.push( a, b, d ); // face one
		indices.push( b, c, d ); // face two
	}
}
this.geometry.setIndex( indices );
this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
this.geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
this.mesh = new THREE.Mesh(this.geometry , this.material );
```


# UV Coordinate with Buffer Geometry
https://stackoverflow.com/questions/19504337/three-js-buffergeometry-with-texture-coordinates
```js
const uvs = []

for ( let i = 0; i <= segments; i ++ ) {
	const y = ( i * segmentSize ) - halfSize;
	for ( let j = 0; j <= segments; j ++ ) {
		const x = ( j * segmentSize ) - halfSize;
		vertices.push( x,  y , 0);
		normals.push( 0, 0, 1 );
		uvs.push(x+0.5,y+.5);
	}
}

this.geometry.setAttribute( 'uv', new BufferAttribute( new Float32Array( uvs), 2 ) );
```