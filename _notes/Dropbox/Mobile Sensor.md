---
title: Mobile Sensor
---
# Table
1. [[Mobile Sensor#Request Permission]]
2. [[Mobile Sensor#Before Start]]
3.  [[Mobile Sensor#Orientation]]
4.  [[Mobile Sensor#Geolocation]]
---

# Request Permission
https://github.com/sensor-js/sensor-js.github.io/blob/master/demo.html
```js
// Request permission for iOS 13+ devices
button.onclick = function(){
    if ( DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function" ) {
        DeviceMotionEvent.requestPermission();
    }
}
```
---
# Before Start

## Chrome Emulation
Chrome -> Developer Tools -> Performance -> Bottom Tap -> Click Three Dot -> "Sensor"

## Something won't work..
👉Deprecated Feature Used
getCurrentPosition() and watchPosition() <u>no longer work on insecure origins.</u> To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.

👉Chrome no longer supports obtaining the user's location using the HTML5 Geolocation API from pages delivered by non-secure connections. The only solution is to host from HTTPS and remove all HTTP requests from third parties. Check your network tab in developer mode to filter out HTTP calls, this also includes images (which was the trouble in my case).



---
# Orientation
There are at least three different way of getting device orientation.
- [AbsoluteOrientationSensor](https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor)
- [DeviceOrientation](https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event)
- [Accelerometer](https://developer.mozilla.org/en-US/docs/Web/API/Accelerometer
)

the problem is absolute- is not working in my iphone, so I am going to omit this part on this doc.

![ https://medium.com/@aurelie.lebec ](https://miro.medium.com/max/354/1*HTYtAEbZ7pV1FP5ARdiGiw.png)

# Get Mobile Orientation Value with Sensor API
```js
window.addEventListener("deviceorientation", (evt)=>{
	orientation = {x : evt.alpha, y: evt.beta , z: evt.gamma }
});
```





# Geolocation
![](https://s3.us-east-2.amazonaws.com/journeynorth.org/images/graphics/mclass/Lat_Long.gif)


## GetCurrentPosition()
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
```js
```
## WatchPosition()
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition

```js
var location = {latitude : 0,longitude: 0  };
navigator.geolocation.watchPosition( success,error );

function success(pos){
	location.latitude = pos.coords.latitude;
	location.longitude = pos.coords.longitude;
}

function error(err){
	console.warn('ERROR(' + err.code + '): ' + err.message);
}
```




# Reference


- https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs
- https://developer.chrome.com/docs/devtools/device-mode/
- https://web.dev/generic-sensor/
- https://www.sitepoint.com/how-to-simulate-mobile-devices-with-device-mode-in-chrome/
- https://kongmunist.medium.com/accessing-the-iphone-accelerometer-with-javascript-in-ios-14-and-13-e146d18bb175
- [https://sensor-js.xyz/demo.html](https://sensor-js.xyz/demo.html)
- [https://github.com/sensor-js/sensor-js.github.io/blob/master/demo.html](https://github.com/sensor-js/sensor-js.github.io/blob/master/demo.html)
- Test on Mobile phone -> https://sensor-js.xyz/demo.html
- https://stackoverflow.com/questions/56514116/how-do-i-get-deviceorientationevent-and-devicemotionevent-to-work-on-safari
- https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API/Using_the_Permissions_API
- https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor
- https://stackoverflow.com/questions/48293914/geolocation-in-javascript-on-ios-safari