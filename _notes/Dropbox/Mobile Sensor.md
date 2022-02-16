---
title: Mobile Sensor
---

- https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs
- https://developer.chrome.com/docs/devtools/device-mode/
- https://web.dev/generic-sensor/
- https://www.sitepoint.com/how-to-simulate-mobile-devices-with-device-mode-in-chrome/
- Test on Mobile phone -> https://sensor-js.xyz/demo.html

# Emulate Mobile sensor on Chrome
Chrome -> Developer Tools -> Performance -> Bottom Tap -> Click Three Dot -> "Sensor"

- Location

- Orientation  


# Get Mobile Orientation Value
https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event
```js
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        // alpha: rotation around z-axis
        var rotateDegrees = event.alpha;
        // gamma: left to right
        var leftToRight = event.gamma;
        // beta: front back motion
        var frontToBack = event.beta;

        handleOrientationEvent(rotateDegrees , frontToBack, leftToRight);
    }, true);
}

var handleOrientationEvent = function(rotateDegrees , frontToBack, leftToRight) {
    // do something amazing
    console.log( rotateDegrees , frontToBack, leftToRight)
};
```