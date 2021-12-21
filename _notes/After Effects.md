---
title: After Effects
---

### Basic Bouncing Expression
```
amp = .06; // amplitude
freq = 2; // frequency 
decay = 7; // decay (the more the value, the faster oscillations fade)
//----------------------------------
n = 0; 
if (numKeys > 0){ 
  n = nearestKey(time).index; 
  if (key(n).time > time){ 
    n--; 
  } 
}
if (n == 0){ 
  t = 0; 
}else{ 
  t = time - key(n).time; 
} 

if (n > 0){ 
  v = velocityAtTime(key(n).time - thisComp.frameDuration/10); 
  value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t); 
}else{ 
  value; 
}
```

### Path Loop Expression
```
try{
timeStart = thisProperty.key(1).time;
duration = thisProperty.key(thisProperty.numKeys).time-timeStart;
pingPong = false; //change to true value if you want to loop animationn back & forth 
quant=Math.floor((time-timeStart)/duration);
  if(quant<0) quant = 0
  if(quant%2 == 1 && pingPong == true){   t = 2*timeStart+ (quant+1)*duration - time;
}
else{
  t = time-quant*duration;
}
}
catch(err){
  t = time;
}
thisProperty.valueAtTime(t)
```

# Tutorials
- https://www.youtube.com/user/gareso/videos
- https://www.youtube.com/channel/UC-L0yvYPpGQZD3PHDLKiUpg/videos
- https://www.schoolofmotion.com/
- https://courses.motiondesign.school/
- https://material.io/design/motion/understanding-motion.html#principles


# Plugins
- [Modulation](https://aescripts.com/modulation/)
- [Lockdown2](https://aescripts.com/lockdown/) 
- [Transfusion](https://aescripts.com/transfusion/) #[[machine learning]]