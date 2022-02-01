---
title: Scripting with Unity
---

# Variable
## Private vs Public

```c#
public ;
private ;
[SerializeField] private float serialFloat ;
```

## Double
```c#
//convert Double into float
Double myDouble
float myFloat = (float)myDouble;
```

## List
```c#
//declare
List<Float> list_of_i;

//adding
List<Vector2> myList =new List<Vector2>();
myList.Add(new Vector2(30,3));
Debug.Log(myList[0]);

//looping for the element
int count = myList.count;

```

## Vector
```c#
```

## Game Object
```c#
public GameObject myOBJ;
GameObject.Find("Cube");
```

## Class Variable
```c#
[Serializable]
private class testClass
{
    public float _float;
}

[SerializeField] private testClass[] _test;

```

---

# Connecting two scripts
## resource script
```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Practive : MonoBehaviour {

	public float myFloat;

	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {


		myFloat = myFloat + 1f;
	}
}
```

## Another script receiving variable from the other
```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Receiver : MonoBehaviour {

	//public GameObject myOBJ;
	public float myFloat;
	public GameObject myGameOBJ;


	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		Practive Practive = myGameOBJ.GetComponent<Practive>();
		myFloat = Practive.myFloat;
		
	}
}
```

# Transform
```c#
transform.position = new Vector3(myFloat,0,0);
```

## Euler vs Quaternion
[Youtube](https://www.youtube.com/watch?v=3RQmzVGI8tQ)
[Quaternion.LookRotation](https://www.youtube.com/watch?v=n-2lq4-JdHk)
```c#
```

# Shader
## Adding Tint Color on Shader
```hlsl
Shader "Unlit/customUnLit"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
		_TintColor ("Tint", Color) = (1.0, 0.6, 0.6, 1.0)
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            // make fog work
            #pragma multi_compile_fog

            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                UNITY_FOG_COORDS(1)
                float4 vertex : SV_POSITION;
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
			float4 _TintColor;

            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                UNITY_TRANSFER_FOG(o,o.vertex);
                return o;
            }




            fixed4 frag (v2f i) : SV_Target
            {
                // sample the texture
                fixed4 col = tex2D(_MainTex, i.uv)* _TintColor;
                // apply fog
                UNITY_APPLY_FOG(i.fogCoord, col);
                return col;
            }
            ENDCG
        }
    }
}
```

# GUI
## Writing Custom Editor
[link](https://catlikecoding.com/unity/tutorials/editor/custom-list/)
```c#
[Header("")]

[Tooltip("")]
public float floattt;

[space(50)]
#this this vertical space

if (GUILayout.Button("Generate"))
        {
            //when button is pressed
            Debug.Log("Generated!");
        }

SerializedProperty meshProperty = serializedObject.FindProperty("facialGeo");
EditorGUILayout.PropertyField(meshProperty);
serializedObject.ApplyModifiedProperties();
```

# Input
## Get Click Point and Clicked Object Name
```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
//[ExecuteAlways]

public class touch3D : MonoBehaviour
{

    public Camera Cam;
    public bool isTouched = false;
    public Vector3 touchPos;
    public GameObject touchObject;

    // Update is called once per frame
    void Update()
    {
        ///// Get boll
        if (Input.GetMouseButtonDown(0))
        {
            isTouched = true;
        }
        if (Input.GetMouseButtonUp(0))
        {
            isTouched = false;
        }

        ///// Get Position
        if (isTouched ==true)
        {
            RaycastHit hit;
            Ray ray = Cam.ScreenPointToRay(Input.mousePosition);
            if (Physics.Raycast(ray, out hit))
            {
                touchPos = hit.point;
                touchObject = hit.transform.gameObject;

                transform.position = touchPos;
            }
        }


    }


}
```

# [[OpenCV for Unity]]
```c#
```


```c#
```


```c#
```


```c#
```


```c#
```



```c#
```


```c#
```


```c#
```


```c#
```


```c#
```


```c#
```



```c#
```


```c#
```


```c#
```


```c#
```


```c#
```


```c#
```