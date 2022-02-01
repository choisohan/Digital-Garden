---
title: For Penguin
---

# Foreground subtracting(penguin)
```C#

using OpenCVForUnity.CoreModule;
using OpenCVForUnity.ImgprocModule;
using OpenCVForUnity.UtilsModule;
using System;

namespace OpenCVForUnityExample
{

    public class DeltaFunction
    {

        Mat grayMat;
        Mat maskMat;
        Mat screentoneMat;
        Mat grayDstMat;

        Mat grayLUT;
        Mat contrastAdjustmentsLUT;
        Mat kernel_dilate;
        Mat kernel_erode;
        Size blurSize;
        int blackThresh;
        bool drawMainLine;
        bool useNoiseFilter;
        


        public DeltaFunction(int blackThresh = 60, int grayThresh = 120, int thickness = 5, bool useNoiseFilter = true)
        {
            this.blackThresh = blackThresh;
            this.drawMainLine = (thickness != 0);
            this.useNoiseFilter = useNoiseFilter;

            grayLUT = new Mat(1, 256, CvType.CV_8UC1);
            byte[] lutArray = new byte[256];
            for (int i = 0; i < lutArray.Length; i++)
            {
                if (blackThresh <= i && i < grayThresh)
                    lutArray[i] = 255;
            }
            MatUtils.copyToMat(lutArray, grayLUT);

            if (drawMainLine)
            {
                kernel_dilate = new Mat(thickness, thickness, CvType.CV_8UC1, new Scalar(1));

                int erode = (thickness >= 5) ? 2 : 1;
                kernel_erode = new Mat(erode, erode, CvType.CV_8UC1, new Scalar(1));

                int blur = (thickness >= 4) ? thickness - 1 : 3;
                blurSize = new Size(blur, blur);

                contrastAdjustmentsLUT = new Mat(1, 256, CvType.CV_8UC1);
                byte[] contrastAdjustmentsLUTArray = new byte[256];
                for (int i = 0; i < contrastAdjustmentsLUTArray.Length; i++)
                {
                    int a = (int)(i * 1.5f);
                    contrastAdjustmentsLUTArray[i] = (a > byte.MaxValue) ? (byte)255 : (byte)a;

                }
                MatUtils.copyToMat(contrastAdjustmentsLUTArray, contrastAdjustmentsLUT);
            }
        }

        public void Process(Mat src, Mat dst, bool isBGR = false)
        {
            if (src == null)
                throw new ArgumentNullException("src == null");
            if (dst == null)
                throw new ArgumentNullException("dst == null");

            if (grayMat != null && (grayMat.width() != src.width() || grayMat.height() != src.height()))
            {
                grayMat.Dispose();
                grayMat = null;
                maskMat.Dispose();
                maskMat = null;
                screentoneMat.Dispose();
                screentoneMat = null;
                grayDstMat.Dispose();
                grayDstMat = null;
            }
            grayMat = grayMat ?? new Mat(src.height(), src.width(), CvType.CV_8UC1);
            maskMat = maskMat ?? new Mat(src.height(), src.width(), CvType.CV_8UC1);
            grayDstMat = grayDstMat ?? new Mat(src.height(), src.width(), CvType.CV_8UC1);

            if (screentoneMat == null)
            {
                // create a striped screentone.
                screentoneMat = new Mat(src.height(), src.width(), CvType.CV_8UC1, new Scalar(255));
                for (int i = 0; i < screentoneMat.rows() * 2.5f; i = i + 4)
                {
                    Imgproc.line(screentoneMat, new Point(0, 0 + i), new Point(screentoneMat.cols(), -screentoneMat.cols() + i), new Scalar(0), 1);
                }
            }

            if (src.type() == CvType.CV_8UC1)
            {
                src.copyTo(grayMat);
            }
            else if (dst.type() == CvType.CV_8UC3)
            {
                Imgproc.cvtColor(src, grayMat, (isBGR) ? Imgproc.COLOR_BGR2GRAY : Imgproc.COLOR_RGB2GRAY);
            }
            else
            {
                Imgproc.cvtColor(src, grayMat, (isBGR) ? Imgproc.COLOR_BGRA2GRAY : Imgproc.COLOR_RGBA2GRAY);
            }


            // binarize.
            Imgproc.threshold(grayMat, grayDstMat, blackThresh, 255.0, Imgproc.THRESH_BINARY);

            // draw striped screentone.
            Core.LUT(grayMat, grayLUT, maskMat);
            screentoneMat.copyTo(grayDstMat, maskMat);

            // draw main line.
            if (drawMainLine)
            {
                Core.LUT(grayMat, contrastAdjustmentsLUT, maskMat); // = grayMat.convertTo(maskMat, -1, 1.5, 0);

                if (useNoiseFilter)
                {
                    Imgproc.blur(maskMat, grayMat, blurSize);
                    Imgproc.dilate(grayMat, maskMat, kernel_dilate);
                }
                else
                {
                    Imgproc.dilate(maskMat, grayMat, kernel_dilate);
                }
                Core.absdiff(grayMat, maskMat, grayMat);
                Imgproc.threshold(grayMat, maskMat, 25, 255.0, Imgproc.THRESH_BINARY);
                if (useNoiseFilter)
                {
                    Imgproc.erode(maskMat, grayMat, kernel_erode);
                    Core.bitwise_not(grayMat, maskMat);
                    maskMat.copyTo(grayDstMat, grayMat);
                }
                else
                {
                    Core.bitwise_not(maskMat, grayMat);
                    grayMat.copyTo(grayDstMat, maskMat);
                }
            }


            if (dst.type() == CvType.CV_8UC1)
            {
                grayDstMat.copyTo(dst);
            }
            else if (dst.type() == CvType.CV_8UC3)
            {
                Imgproc.cvtColor(grayDstMat, dst, (isBGR) ? Imgproc.COLOR_GRAY2BGR : Imgproc.COLOR_GRAY2RGB);
            }
            else
            {
                Imgproc.cvtColor(grayDstMat, dst, (isBGR) ? Imgproc.COLOR_GRAY2BGRA : Imgproc.COLOR_GRAY2RGBA);
            }
        }

        public void Dispose()
        {
            foreach (var mat in new[] { grayMat, maskMat, screentoneMat, grayDstMat, grayLUT, kernel_dilate, kernel_erode, contrastAdjustmentsLUT })
                if (mat != null) mat.Dispose();

            grayDstMat =
            screentoneMat =
            maskMat =
            grayMat =
            grayLUT =
            kernel_dilate =
            kernel_erode =
            contrastAdjustmentsLUT = null;
        }
    }
}

```



# DeltaExample.cs
(Working with hdrp's unlitShader)
```c#
#if !(PLATFORM_LUMIN && !UNITY_EDITOR)

using OpenCVForUnity.CoreModule;
using OpenCVForUnity.ImgprocModule;
using OpenCVForUnity.UnityUtils;
using OpenCVForUnity.UnityUtils.Helper;
using OpenCVForUnity.VideoModule;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace OpenCVForUnityExample
{
    /// <summary>
    /// Comic Filter Example
    /// An example of image processing (comic filter) using the Imgproc class.
    /// Referring to http://dev.classmethod.jp/smartphone/opencv-manga-2/.
    /// </summary>
    [RequireComponent(typeof(WebCamTextureToMatHelper))]
    public class DeltaExample : MonoBehaviour
    {

        //[Range(0, 255)]
        //public int thresh = 0 ;


        public bool cutout = true;
        public bool color = true;
        public bool threshold = true;
        public bool blur = true;
        public bool bitwise_not = true;



        [Range(0, 10)]
        public int addtime = 5;

        [Range(0f, 5f)]
        public float blurAmount = 2f;


        public bool fillHoles = true;


        [Range(0f, 10000f)]
        public float KillHoleSize = 50f;


        [Range(0f, 10000f)]
        public float FillHoleSize = 100f;


        [Range(0, 10)]
        public int contourThickness = 2;

        /// <summary>
        /// The comic filter.
        /// </summary>
        //ComicFilter comicFilter;
        //DeltaFunction DeltaFunction;

        /// <summary>
        /// The texture.
        /// </summary>
        Texture2D texture;
        Texture2D FreezeTexture;
        Mat FreezeMat;
        Mat DeltaMat;
        Mat WhiteMat; 
        
        /// <summary>
        /// The webcam texture to mat helper.
        /// </summary>
        WebCamTextureToMatHelper webCamTextureToMatHelper;
        BackgroundSubtractorMOG2 backgroundSubstractorMOG2;
        BackgroundSubtractor BackgroundSubtractor;

        /// <summary>
        /// The FPS monitor.
        /// </summary>
        FpsMonitor fpsMonitor;



        // Use this for initialization
        void Start()
        {
            fpsMonitor = GetComponent<FpsMonitor>();
            webCamTextureToMatHelper = gameObject.GetComponent<WebCamTextureToMatHelper>();
            backgroundSubstractorMOG2 = Video.createBackgroundSubtractorMOG2();


#if UNITY_ANDROID && !UNITY_EDITOR
            // Avoids the front camera low light issue that occurs in only some Android devices (e.g. Google Pixel, Pixel2).
            webCamTextureToMatHelper.avoidAndroidFrontCameraLowLightIssue = true;
#endif
            webCamTextureToMatHelper.Initialize();
        }

        /// <summary>
        /// Raises the web cam texture to mat helper initialized event.
        /// </summary>
        /// 
        private void FreezeFrame(Mat rgbaMat, Texture2D FreezeTexture)
        {
            Debug.Log("FreezeFrame!!");
            Utils.matToTexture2D(rgbaMat,FreezeTexture);
        }

        public void OnWebCamTextureToMatHelperInitialized()
        {
            Debug.Log("OnWebCamTextureToMatHelperInitialized");

            Mat webCamTextureMat = webCamTextureToMatHelper.GetMat();
            FreezeMat = new Mat(webCamTextureMat.rows(), webCamTextureMat.cols(), CvType.CV_8UC4);
            DeltaMat = new Mat(webCamTextureMat.rows(), webCamTextureMat.cols(), CvType.CV_8UC4);
            WhiteMat = new Mat(webCamTextureMat.rows(), webCamTextureMat.cols(), CvType.CV_8UC3, new Scalar(255, 255, 255));

            texture = new Texture2D(webCamTextureMat.cols(), webCamTextureMat.rows(), TextureFormat.RGBA32, false);
            FreezeTexture = new Texture2D(webCamTextureMat.cols(), webCamTextureMat.rows(), TextureFormat.RGBA32, false);
            

            Utils.fastMatToTexture2D(webCamTextureMat, texture);
            Utils.fastMatToTexture2D(webCamTextureMat, FreezeTexture);


            Material shaderMaterial = gameObject.GetComponent<Renderer>().material;
            shaderMaterial.SetTexture("_UnlitColorMap", texture); //_MainTex , _UnlitColorMap , _BaseColorMap
            //gameObject.GetComponent<Renderer>().material.mainTexture = texture;
            //gameObject.GetComponent<Renderer>().material.mainTexture = FreezeTexture;

            gameObject.transform.localScale = new Vector3(webCamTextureMat.cols(), webCamTextureMat.rows(), 1);

            Debug.Log("Screen.width " + Screen.width + " Screen.height " + Screen.height + " Screen.orientation " + Screen.orientation);

            if (fpsMonitor != null)
            {
                fpsMonitor.Add("width", webCamTextureMat.width().ToString());
                fpsMonitor.Add("height", webCamTextureMat.height().ToString());
                fpsMonitor.Add("orientation", Screen.orientation.ToString());
            }


            float width = webCamTextureMat.width();
            float height = webCamTextureMat.height();

            float widthScale = (float)Screen.width / width;
            float heightScale = (float)Screen.height / height;
            if (widthScale < heightScale)
            {
                //Camera.main.orthographicSize = (width * (float)Screen.height / (float)Screen.width) / 2;
            }
            else
            {
                //Camera.main.orthographicSize = height / 2;
            }

            int thickness = (Mathf.Max(width, height) <= 640) ? 3 : 5;
            //comicFilter = new ComicFilter(60, 120, thickness);
            //DeltaFunction = new DeltaFunction(60, 120, thickness);
        }
        /// <summary>
        /// Raises the web cam texture to mat helper disposed event.
        /// </summary>
        public void OnWebCamTextureToMatHelperDisposed()
        {
            Debug.Log("OnWebCamTextureToMatHelperDisposed");

            //comicFilter.Dispose();
            //DeltaFunction.Dispose();

            if (texture != null)
            {
                Texture2D.Destroy(texture);
                texture = null;
            }
        }

        /// <summary>
        /// Raises the web cam texture to mat helper error occurred event.
        /// </summary>
        /// <param name="errorCode">Error code.</param>
        public void OnWebCamTextureToMatHelperErrorOccurred(WebCamTextureToMatHelper.ErrorCode errorCode)
        {
            Debug.Log("OnWebCamTextureToMatHelperErrorOccurred " + errorCode);
        }

        // Update is called once per frame
        void Update()
        {
            if (webCamTextureToMatHelper.IsPlaying() && webCamTextureToMatHelper.DidUpdateThisFrame())
            {
                Mat rgbaMat = webCamTextureToMatHelper.GetMat();

                Utils.texture2DToMat(FreezeTexture, FreezeMat);
                //Core.subtract(rgbaMat, FreezeMat, DeltaMat);
                //Utils.fastMatToTexture2D(DeltaMat, texture);


                /* model 1 (gray)
                Mat Gray1 = new Mat();
                Mat Gray2 = new Mat();
                Imgproc.cvtColor(rgbaMat, Gray1, Imgproc.COLOR_RGBA2GRAY);
                Imgproc.cvtColor(FreezeMat, Gray2, Imgproc.COLOR_RGBA2GRAY);
                Core.absdiff(Gray1, Gray2, DeltaMat);
                Imgproc.cvtColor(DeltaMat, DeltaMat, Imgproc.COLOR_GRAY2RGBA);
                Utils.fastMatToTexture2D(DeltaMat, texture);
                */


                // model 2 (color)
                /*
                Mat RGB1 = new Mat();
                Mat RGB2 = new Mat();
                Imgproc.cvtColor(rgbaMat, RGB1, Imgproc.COLOR_RGBA2RGB);
                Imgproc.cvtColor(FreezeMat, RGB2, Imgproc.COLOR_RGBA2RGB);
                Core.absdiff(RGB1, RGB2, DeltaMat);
                Imgproc.cvtColor(DeltaMat, DeltaMat, Imgproc.COLOR_RGB2RGBA);
                */

                //model3 (RGB Channel)
                /*
                List<Mat> rgbMat_channel = new List<Mat>(3);
                List<Mat> FreezeMat_channel = new List<Mat>(3);
                Core.split(rgbaMat, rgbMat_channel);
                Core.split(FreezeMat, FreezeMat_channel);
                Mat DeltaMat_R = new Mat();
                Mat DeltaMat_G = new Mat();
                Mat DeltaMat_B = new Mat();
                Core.absdiff(rgbMat_channel[0], FreezeMat_channel[0], DeltaMat_R);
                Core.absdiff(rgbMat_channel[1], FreezeMat_channel[1], DeltaMat_G);
                Core.absdiff(rgbMat_channel[2], FreezeMat_channel[2], DeltaMat_B);
                Mat Delta_channel_combined = new Mat();
                Delta_channel_combined = DeltaMat_R + DeltaMat_G + DeltaMat_B;
                Imgproc.cvtColor(Delta_channel_combined, rgbaMat, Imgproc.COLOR_GRAY2RGBA);
                */

                /*

                //model4 (RGB Channel+ threashold + contour)
                List<Mat> rgbMat_channel = new List<Mat>(3);
                List<Mat> FreezeMat_channel = new List<Mat>(3);
                Core.split(rgbaMat, rgbMat_channel);
                Core.split(FreezeMat, FreezeMat_channel);
                Mat DeltaMat_R = new Mat();
                Mat DeltaMat_G = new Mat();
                Mat DeltaMat_B = new Mat();
                Core.absdiff(rgbMat_channel[0], FreezeMat_channel[0], DeltaMat_R);
                Core.absdiff(rgbMat_channel[1], FreezeMat_channel[1], DeltaMat_G);
                Core.absdiff(rgbMat_channel[2], FreezeMat_channel[2], DeltaMat_B);
                Mat Delta_channel_combined = new Mat();
                Delta_channel_combined = DeltaMat_R + DeltaMat_G + DeltaMat_B;
                //Core.compare(rgbMat_channel[0], FreezeMat_channel[0], DeltaMat_R,3);

                
                Mat d = Delta_channel_combined;
                Imgproc.GaussianBlur(d, d, new Size(0, 0), 2);
                d = d+d+d+d;
                Imgproc.threshold(d, d, 0, 255, Imgproc.THRESH_BINARY | Imgproc.THRESH_OTSU);

                //try filling the holes?
                Core.bitwise_not(d, d);
                List<MatOfPoint> srcContours = new List<MatOfPoint>();
                Mat srcHierarchy = new Mat();
                Imgproc.findContours(d, srcContours, srcHierarchy, Imgproc.RETR_CCOMP, Imgproc.CHAIN_APPROX_NONE);
                for (int i = 0; i < srcContours.Count; i++)
                {
                    //cv2.drawContours(des,[cnt], 0, 255, -1)
                    Imgproc.drawContours(d, srcContours, i, new Scalar(0, 0, 0), 2, 8, srcHierarchy, 0, new Point());
                }*/




                //Imgproc.GaussianBlur(rgbaMat, rgbaMat, new Size(0, 0), 2);
                //Mat FreezeMat_blur = new Mat();
                //Imgproc.GaussianBlur(FreezeMat, FreezeMat_blur, new Size(0, 0), 2);

                //model5 (RGB Channel+ threashold )
                List<Mat> rgbMat_channel = new List<Mat>(3);
                List<Mat> FreezeMat_channel = new List<Mat>(3);
                Core.split(rgbaMat, rgbMat_channel);
                Core.split(FreezeMat, FreezeMat_channel);
                Mat DeltaMat_R = new Mat();
                Mat DeltaMat_G = new Mat();
                Mat DeltaMat_B = new Mat();
                Core.absdiff(rgbMat_channel[0], FreezeMat_channel[0], DeltaMat_R);
                Core.absdiff(rgbMat_channel[1], FreezeMat_channel[1], DeltaMat_G);
                Core.absdiff(rgbMat_channel[2], FreezeMat_channel[2], DeltaMat_B);

                Mat Delta_channel_combined = new Mat();


                Delta_channel_combined = DeltaMat_R + DeltaMat_G + DeltaMat_B;

                Mat d = Delta_channel_combined;


                if (blur == true)
                {
                    Imgproc.GaussianBlur(d, d, new Size(0, 0), blurAmount);
                }


                for (int x=0; x <addtime; x++)
                {
                    d += d;
                }

                //if threshold is true
                if (threshold == true)
                {
                    Imgproc.threshold(d, d, 0, 255, Imgproc.THRESH_BINARY | Imgproc.THRESH_OTSU);

                    if (fillHoles == true)
                    {
                        ///adding contour
                        List<MatOfPoint> bigContours = new List<MatOfPoint>();
                        List<Point> bigPoints = new List<Point>();
                        List<MatOfPoint> srcContours = new List<MatOfPoint>();
                        Mat srcHierarchy = new Mat();
                        //Mat finalMat = webCamTextureToMatHelper.GetMat();

                        Imgproc.findContours(d, srcContours, srcHierarchy, Imgproc.RETR_CCOMP, Imgproc.CHAIN_APPROX_NONE);
                        for (int i = 0; i < srcContours.Count; i++)
                        {
                            double cntSize = Imgproc.contourArea(srcContours[i]);
                            //CONTOUR BY SIZE
                            if (cntSize > FillHoleSize)
                            {
                                Imgproc.drawContours(d, srcContours, i, new Scalar(255, 255, 255), contourThickness, 8, srcHierarchy, 0, new Point());
                            }

                            if (cntSize < KillHoleSize)
                            {
                                Imgproc.drawContours(d, srcContours, i, new Scalar(0, 0, 0), contourThickness, 8, srcHierarchy, 0, new Point());
                            }
                        }
                    }
                }

                //////////////////////////
                //if color is false
                if (color == false)
                {
                    Imgproc.cvtColor(WhiteMat, rgbaMat, Imgproc.COLOR_RGB2RGBA);
                }

                //if bitwire_not is true
                if (bitwise_not == true)
                {
                    Core.bitwise_not(d, d);
                }
                
                //if cutout is true
                if (cutout == true)
                {
                    
                    Scalar emptyScalar = new Scalar(0, 0, 0, 0);
                    rgbaMat.setTo(emptyScalar, d);
                }
                else
                {
                    //Imgproc.cvtColor(d, rgbaMat, Imgproc.COLOR_GRAY2RGBA);
                    Scalar emptyScalar = new Scalar(0, 0, 0, 255);
                    rgbaMat.setTo(emptyScalar, d);
                }


                Utils.fastMatToTexture2D(rgbaMat, texture);

            }
        }

        /// <summary>
        /// Raises the destroy event.
        /// </summary>
        void OnDestroy()
        {
            webCamTextureToMatHelper.Dispose();
        }

        /// <summary>
        /// Raises the back button click event.
        /// </summary>
        public void OnBackButtonClick()
        {
            SceneManager.LoadScene("OpenCVForUnityExample");
        }

        /// <summary>
        /// Raises the play button click event.
        /// </summary>
        public void OnPlayButtonClick()
        {
            webCamTextureToMatHelper.Play();
        }

        /// <summary>
        /// Raises the pause button click event.
        /// </summary>
        public void OnPauseButtonClick()
        {
            Debug.Log("Pause!");
            webCamTextureToMatHelper.Pause();
        }

        /// <summary>
        /// Raises the stop button click event.
        /// </summary>
        public void OnStopButtonClick()
        {
            webCamTextureToMatHelper.Stop();
        }

        /// <summary>
        /// Raises the change camera button click event.
        /// </summary>
        public void OnChangeCameraButtonClick()
        {
            webCamTextureToMatHelper.requestedIsFrontFacing = !webCamTextureToMatHelper.IsFrontFacing();
        }
        public void OnFreezeButtonClick()
        {
            Mat rgbaMat = webCamTextureToMatHelper.GetMat();
            //Imgproc.GaussianBlur(rgbaMat, rgbaMat, new Size(0, 0), 5);
            FreezeFrame(rgbaMat, FreezeTexture);
            //Debug.Log("Freeze!");
            //FreezeMat = webCamTextureToMatHelper.GetMat();
            //Utils.fastMatToTexture2D(FreezeMat, FreezeTexture);
            //Utils.texture2DToMat(FreezeTexture, FreezeMat);

        }

    }
}

#endif
```