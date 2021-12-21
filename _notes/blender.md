---
---

[---
title: blender
---](<---
title: blender
---

## How to change background color


## Navigate

![[Pasted image 20210722133840.png]]

## How to bake light map

1. Set renderer as "Cycle"
2. Shader Editor -%3E Add  image texture node
3. On img texture node, click "New"
4. Select this node and geometry to bake
5. On left pannel, Go to Scene Property
6. Find "Bake" and push bake
7. When it's done, go to texture editor and select the new map
8. save it

### To bake multi udim maps
addon -> https://asgerlanghoff.gumroad.com/

1. Open UV editor
2. Create new image texture from the top
3. On side menu, click "image"
4. select "UDIM TILES" and click "Fill Tile" on the bottom
5. add more tiles with button "+"
6. Save the image file on desirable directory
7. Fianally bake from Scene Propertie windows
8. After Baking, click "Save" on uv Editor - Image


if you want to bake only single object among multiples objects, you can just select that one and press "bake to udim tiles". Other tile object will be ignored and only selected object will be updated.


## How to freeze transformation
ObjectMode : Object > Apply > All Transformation>)

## How to change background color


## Navigate

![[Pasted image 20210722133840.png]]


## Displacement map 
![[Pasted image 20211011134819.png]]
![[Pasted image 20211011134909.png]]

Eevee ignores displacement as default but you can enable this by below
### Creating Shell shader with vertex attribute
Tutorial https://www.youtube.com/watch?v=YudUfp0N2QU
Download This -> https://bbbn19.gumroad.com/l/WDCRp
* How to use this example displacment shader to your project.
1. On Geometry, add "Array". Set as Count: 100, turn on constant offset instead of relative and Distance Z: 1000
2. 5. Append Geometry Node and apply it by adding geometry node modifier in the same tap
3.  Append material from the file and apply
4. Go to object data propertie and add Vertex Colors "Col"
5. you can switch the height texture and adjust height with layer distance in geometry node.