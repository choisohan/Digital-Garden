---
title: OpenCV for Unity
---

# Image & webcam input
## What is Texture and Mat?


## import image
```c#
Texture2D imgTexture = Resources.Load ("matchshapes") as Texture2D;
```

## get webcam
```c#
WebCamTexture WebCamTexture;
WebCamDevice[] devices;
public int cam_num;

void Start () {	
	Renderer renderer = GetComponent<Renderer>();
	WebCamDevice[] devices = WebCamTexture.devices;
	WebCamTexture = new WebCamTexture(devices[cam_num].name);
	renderer.material.mainTexture = WebCamTexture;
	WebCamTexture.Play();
}
```

## CV type
```c#
```

## Copy or Set
```c#
redMat.copyTo(rgbaMat,rgbaMat);
```


---
# image Processing
## Basic Code

## GaussianBlur
```c#
Imgproc.GaussianBlur (rgbMat, rgbMat, new Size (0, 0), 20);
//(input_img,output_img, new Sizer(0, 0), blur strength)
```

## threshold
```c#
Imgproc.threshold (imgMat, imgMat, 0, 255, Imgproc.THRESH_BINARY | Imgproc.THRESH_OTSU);
//0= dark, 255 =bright
//only work on gray mat !!
```

## invert image
```c#
Core.bitwise_not(finalMat, finalMat);
```

## FindContour
```c#
Mat srcHierarchy = new Mat ();
List<MatOfPoint> srcContours = new List<MatOfPoint> ();

Imgproc.findContours (srcMat, srcContours, srcHierarchy, Imgproc.RETR_CCOMP, Imgproc.CHAIN_APPROX_NONE);
//Mat image, List<MatOfPoint> contours, Mat hierarchy, int mode, int method, Point offset)
```

- https://docs.opencv.org/3.4/dd/d6a/tutorial_js_filtering.html
- https://www.pyimagesearch.com/2015/05/25/basic-motion-detection-and-tracking-with-python-and-opencv/


---
# Color
## inverting image
```c#
//inverting image
Core.bitwize_not(inputMat, outputMat);
```

## converting
```c#
Imgproc.cvtColor(inputMat, outputMat, Imgproc.COLOR_RGBA2RGB)

#COLOR_RGBA2RGB
#COLOR_RGBA2GRAY ...
```

## Blending two images
```c#
```


## Copy To
```c#
MatSource.copyTo (intoThisMat, SourceMaskMat);
```

## RGB Channel spliting
```c#
List<Mat> rgbMat_channel = new List<Mat>(3);
Core.split(rgbaMat, rgbMat_channel);
Imgproc.cvtColor(rgbMat_channel[0], rgbaMat, Imgproc.COLOR_GRAY2RGBA);
```

---

# Draw on Img
## Contour
```c#
double contourArea(Mat contour)
```


```c#
```


```c#
```


```c#
```