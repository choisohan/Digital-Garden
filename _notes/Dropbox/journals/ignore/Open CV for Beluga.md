---
title: Open CV for Beluga
---
# logic of it

1.  get Mat
2.  background substract
3.  gausian blur & threshold


```c#
#if !(PLATFORM_LUMIN && !UNITY_EDITOR)

using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using OpenCVForUnity.CoreModule;
using OpenCVForUnity.ImgprocModule;
using OpenCVForUnity.UnityUtils;
using OpenCVForUnity.UnityUtils.Helper;
using OpenCVForUnity.VideoModule;
using System.Collections.Generic;

namespace OpenCVForUnityExample
{
    /// <summary>
    /// </summary>
    [RequireComponent (typeof(WebCamTextureToMatHelper))]
    public class ComicFilterExample : MonoBehaviour
    {

        private List<Point> bigPoints;
        public List<Vector2> bigPoints_vector2;
        private Vector2 myVector2;
        private List<Vector2> myList = new List<Vector2>();
        private List<int> list_of_i;
        private List<MatOfPoint> bigContours;
        
        [Range (0, 255)]
        public float thresh = 50.0f;
        public RawImage bgRawImage;
        Texture2D texture;
        Mat grayMat;
        WebCamTextureToMatHelper webCamTextureToMatHelper;
        Mat bgMat;
        Mat fgMaskMat;
        Mat bgMaskMat;
        Mat redMat;
        Mat darkMat;
        Mat rgbMat;
        Mat fgmaskMat;
        Mat maskMat;
        Mat lineMat;
        Mat dstMat;
        Mat hsvMat;
        Mat finalMat;
        Mat thresholdMat;
        Texture2D bgTexture;
        FpsMonitor fpsMonitor;
        BackgroundSubtractorMOG2 backgroundSubstractorMOG2;
        byte[] grayPixels;
        byte[] maskPixels;

        const int MAX_NUM_OBJECTS = 50;
        const int MIN_OBJECT_AREA = 20 * 20;

        ColorObject white = new ColorObject ("white");
        ColorObject black = new ColorObject ("black");
        ColorObject red = new ColorObject ("yellow");

    
        void Start ()
        {

            fpsMonitor = GetComponent<FpsMonitor> ();
            backgroundSubstractorMOG2 = Video.createBackgroundSubtractorMOG2 ();
            webCamTextureToMatHelper = gameObject.GetComponent<WebCamTextureToMatHelper> ();
            webCamTextureToMatHelper.Initialize ();

            List<Vector2> bigPoints_vector2 = new List<Vector2> () ; 
        }



        public void OnWebCamTextureToMatHelperInitialized ()
        {

            float detectionCount = 99f;

            Mat webCamTextureMat = webCamTextureToMatHelper.GetMat ();
            texture = new Texture2D (webCamTextureMat.cols (), webCamTextureMat.rows (), TextureFormat.RGBA32, false);
            gameObject.GetComponent<Renderer> ().material.mainTexture = texture;
            gameObject.transform.localScale = new Vector3 (webCamTextureMat.cols (), webCamTextureMat.rows (), 1);

            if (fpsMonitor != null) {
                fpsMonitor.Add ("width", webCamTextureMat.width ().ToString ());
                fpsMonitor.Add ("height", webCamTextureMat.height ().ToString ());
                fpsMonitor.Add ("orientation", Screen.orientation.ToString ());
                fpsMonitor.consoleText = "SPACE KEY or TOUCH SCREEN: Reset backgroud image.";
            }


            float width = webCamTextureMat.width ();
            float height = webCamTextureMat.height ();
                                    
            float widthScale = (float)Screen.width / width;
            float heightScale = (float)Screen.height / height;
            if (widthScale < heightScale) {
                Camera.main.orthographicSize = (width * (float)Screen.height / (float)Screen.width) / 2;
            } else {
                Camera.main.orthographicSize = height / 2;
            }


            bgMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC4);
            fgMaskMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC1);
            bgMaskMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC1);
            redMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC3, new Scalar (255,255,0));

            darkMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC4, new Scalar (0, 0, 0, 255));
            bgTexture = new Texture2D (bgMat.cols (), bgMat.rows (), TextureFormat.RGBA32, false);
            grayMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC1);


            rgbMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC3);


            maskMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC4);
            lineMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC1);
            dstMat = new Mat (webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC1);
            
            grayPixels = new byte[grayMat.cols () * grayMat.rows () * grayMat.channels ()];
            maskPixels = new byte[maskMat.cols () * maskMat.rows () * maskMat.channels ()];
            hsvMat = new Mat ();
            thresholdMat = new Mat ();

            finalMat = new Mat(webCamTextureMat.rows (), webCamTextureMat.cols (), CvType.CV_8UC3);



        }


        void Update ()

        {

            if (webCamTextureToMatHelper.IsPlaying () && webCamTextureToMatHelper.DidUpdateThisFrame ()) {

                Mat rgbaMat = webCamTextureToMatHelper.GetMat ();
                


                ///backgroundSubtractor
                backgroundSubstractorMOG2.apply (rgbaMat, fgMaskMat);
                Core.bitwise_not (fgMaskMat, fgMaskMat);

                rgbaMat.setTo (new Scalar (0, 0, 0, 255), fgMaskMat);   //number makes alpha black

                //GRAY MODE
                Imgproc.cvtColor (rgbaMat, grayMat, Imgproc.COLOR_RGBA2GRAY);
                Imgproc.GaussianBlur (grayMat, grayMat, new Size (0, 0), 10);
                Imgproc.threshold (grayMat, grayMat, 0, 255, Imgproc.THRESH_BINARY | Imgproc.THRESH_OTSU);
                Imgproc.cvtColor (grayMat, rgbMat, Imgproc.COLOR_GRAY2RGB);

                //contour 
                List<MatOfPoint> bigContours = new List<MatOfPoint> ();

                List<Point> bigPoints = new List<Point> ();

                List<MatOfPoint> srcContours = new List<MatOfPoint> ();
                Mat srcHierarchy = new Mat ();

                Mat finalMat = webCamTextureToMatHelper.GetMat ();


                Imgproc.findContours (grayMat, srcContours, srcHierarchy, Imgproc.RETR_CCOMP, Imgproc.CHAIN_APPROX_NONE);

                for (int i = 0; i < srcContours.Count; i++){

                    double cntSize = Imgproc.contourArea(srcContours[i]);

                    //CONTOUR ONLY WHEN AREA IS BIG ENOUGH

                    if (cntSize> 10000) {

                        Imgproc.drawContours (finalMat, srcContours, i, new Scalar (0, 0, 0), 2, 8, srcHierarchy, 0, new Point ());

                        double returnVal = Imgproc.matchShapes (srcContours [0], srcContours [i], Imgproc.CV_CONTOURS_MATCH_I1, 0);

                        Point point = new Point ();

                        float[] radius = new float[1];
                        Imgproc.minEnclosingCircle (new MatOfPoint2f (srcContours [i].toArray ()),   point, radius);

                        bigContours.Add(srcContours[i]);
                        

                        //return values

                        bigPoints.Add(point);

                        for (int p = 0; p < bigPoints.Count; p++)
                        {
                            float posX = (float)bigPoints[p].x ;
                            float posY = (float)bigPoints[p].y;

                            bigPoints_vector2.Add(new Vector2(posX,posY));
                            //Debug.Log(bigPoints_vector2.Count);

                            for (int f = 0; f < bigPoints_vector2.Count; f++){

                            }
                            
                        }

                    }
                    else{
                        
                    }

                }

                //

                Utils.fastMatToTexture2D (finalMat, texture);
            }
        }

        void LateUpdate()
        {
            //reseting 
            bigPoints_vector2 = new List<Vector2>();

        }



        private void findFgMaskMat (Mat fgMat, Mat bgMat, float thresh = 13.0f)
        {
            Mat diff1 = new Mat ();
            Core.absdiff (fgMat, bgMat, diff1);
            Mat diff2 = new Mat ();
            Core.absdiff (bgMat, fgMat, diff2);
            Mat diff = diff1 + diff2;

            Imgproc.threshold (diff, diff, thresh, 0, Imgproc.THRESH_TOZERO);

            Imgproc.cvtColor (diff, fgMaskMat, Imgproc.COLOR_RGBA2GRAY);

            Imgproc.threshold (fgMaskMat, fgMaskMat, 10, 0, Imgproc.THRESH_TOZERO);

            Imgproc.threshold (fgMaskMat, fgMaskMat, 0, 255, Imgproc.THRESH_BINARY);

            diff1.Dispose ();
            diff2.Dispose ();
            diff.Dispose ();
        }

        private void setBgTexture (Mat bgMat)
        {
            Utils.matToTexture2D (bgMat, bgTexture);
            
            bgRawImage.texture = bgTexture;
            bgRawImage.rectTransform.localScale = new Vector3 (1.0f, (float)bgMat.height () / (float)bgMat.width (), 1.0f);
        }


        private void morphOps (Mat thresh)
        {
            //create structuring element that will be used to "dilate" and "erode" image.
            //the element chosen here is a 3px by 3px rectangle
            Mat erodeElement = Imgproc.getStructuringElement (Imgproc.MORPH_RECT, new Size (3, 3));
            //dilate with larger element so make sure object is nicely visible
            Mat dilateElement = Imgproc.getStructuringElement (Imgproc.MORPH_RECT, new Size (8, 8));

            Imgproc.erode (thresh, thresh, erodeElement);
            Imgproc.erode (thresh, thresh, erodeElement);

            Imgproc.dilate (thresh, thresh, dilateElement);
            Imgproc.dilate (thresh, thresh, dilateElement);
        }


        private void trackFilteredObject (ColorObject theColorObject, Mat threshold, Mat HSV, Mat cameraFeed)
        {


            List<ColorObject> colorObjects = new List<ColorObject> ();
            Mat temp = new Mat ();
            threshold.copyTo (temp);
            //these two vectors needed for output of findContours
            List<MatOfPoint> contours = new List<MatOfPoint> ();
            Mat hierarchy = new Mat ();
            //find contours of filtered image using openCV findContours function
            Imgproc.findContours (temp, contours, hierarchy, Imgproc.RETR_CCOMP, Imgproc.CHAIN_APPROX_SIMPLE);

            //use moments method to find our filtered object
            bool colorObjectFound = false;
            if (hierarchy.rows () > 0) {
                int numObjects = hierarchy.rows ();

                //                      Debug.Log("hierarchy " + hierarchy.ToString());

                //if number of objects greater than MAX_NUM_OBJECTS we have a noisy filter
                if (numObjects < MAX_NUM_OBJECTS) {
                    for (int index = 0; index >= 0; index = (int)hierarchy.get (0, index) [0]) {

                        Moments moment = Imgproc.moments (contours [index]);
                        double area = moment.get_m00 ();

                        //if the area is less than 20 px by 20px then it is probably just noise
                        //if the area is the same as the 3/2 of the image size, probably just a bad filter
                        //we only want the object with the largest area so we safe a reference area each
                        //iteration and compare it to the area in the next iteration.
                        if (area > MIN_OBJECT_AREA) {

                            ColorObject colorObject = new ColorObject ();

                            colorObject.setXPos ((int)(moment.get_m10 () / area));
                            colorObject.setYPos ((int)(moment.get_m01 () / area));
                            colorObject.setType (theColorObject.getType ());
                            colorObject.setColor (theColorObject.getColor ());

                            colorObjects.Add (colorObject);

                            colorObjectFound = true;

                        } else {
                            colorObjectFound = false;
                        }
                    }
                    //let user know you found an object
                    if (colorObjectFound == true) {
                        //draw object location on screen
                        drawObject (colorObjects, cameraFeed, temp, contours, hierarchy);

                    }

                } else {
                    Imgproc.putText (cameraFeed, "TOO MUCH NOISE!", new Point (5, cameraFeed.rows () - 10), Imgproc.FONT_HERSHEY_SIMPLEX, 1.0, new Scalar (255, 255, 255, 255), 2, Imgproc.LINE_AA, false);
                
                }

            }

        }


        private void drawObject (List<ColorObject> theColorObjects, Mat frame, Mat temp, List<MatOfPoint> contours, Mat hierarchy)
        {
            for (int i = 0; i < theColorObjects.Count; i++) {
                Imgproc.drawContours (frame, contours, i, theColorObjects [i].getColor (), 3, 8, hierarchy, int.MaxValue, new Point ());
                Imgproc.circle (frame, new Point (theColorObjects [i].getXPos (), theColorObjects [i].getYPos ()), 5, theColorObjects [i].getColor ());
                Imgproc.putText (frame, theColorObjects [i].getXPos () + " , " + theColorObjects [i].getYPos (), new Point (theColorObjects [i].getXPos (), theColorObjects [i].getYPos () + 20), 1, 1, theColorObjects [i].getColor (), 2);
                Imgproc.putText (frame, theColorObjects [i].getType (), new Point (theColorObjects [i].getXPos (), theColorObjects [i].getYPos () - 20), 1, 2, theColorObjects [i].getColor (), 2);

                Vector2 itemPos = new Vector2(theColorObjects [i].getXPos (),theColorObjects [i].getYPos ());

            }
        }



    }
}

#endif
```


# Follow Detector
```
using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using OpenCVForUnity.CoreModule;
using OpenCVForUnity.ImgprocModule;
using OpenCVForUnity.UnityUtils;
using OpenCVForUnity.UnityUtils.Helper;
using OpenCVForUnity.VideoModule;
using System.Collections.Generic;
namespace OpenCVForUnityExample
{
	[RequireComponent (typeof(WebCamTextureToMatHelper))]


	public class Follow_detector : MonoBehaviour {
		public GameObject myOBJ;
		ComicFilterExample ComicFilterExample;
		Vector3 posVector;
		public float posX;
		public float posY;
		public int ItemList;
		public List<Vector2> bigPoints_vector2;


		// Use this for initialization
		void Start () {

		}
		
		// Update is called once per frame
		void Update () {

			ComicFilterExample ComicFilterExample = myOBJ.GetComponent<ComicFilterExample>();

			List<Vector2> bigPoints_vector2 = ComicFilterExample.bigPoints_vector2;

			posX = bigPoints_vector2[0].x;
			posY = bigPoints_vector2[0].y *-1;
			transform.position = new Vector3(posX,posY,0);


			
		}
	}
}
```