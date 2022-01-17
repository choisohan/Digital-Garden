---
title: Math
---
https://www.w3schools.com/jsref/jsref_obj_math.asp

# Floor() / Fract()
as output the greatest integer less than or equal to x, denoted floor or ⌊x⌋
maps x to the least integer greater than or equal to x, denoted ceil or ⌈x⌉

|x|

# Sine / Cosine
https://math.stackexchange.com/questions/1671132/equation-for-a-smooth-staircase-function
$$x-\sin\left(x\right)$$
![](https://i.stack.imgur.com/LJGD3.png)



$$x-\sin\left(x\right)-\sin\left(x-\sin\left(x\right)\right) $$
![](https://i.stack.imgur.com/wds95.png)

$$x-\sin\left(x-\sin\left(x\right)\right)-\sin\left(x-\sin\left(x-\sin\left(x\right)\right)\right) $$
![](https://i.stack.imgur.com/OntF2.png)


###  Other smooth step Method
$$ h*(1/2\coth(a/2)\tanh(a((x/w-\operatorname{floor}(x/w))-0.5))+1/2+\operatorname{floor}(x/w)) $$
https://www.desmos.com/calculator/q86vbii9kt

# Sigmoid Function
$$  \frac{1}{1+e^{-x}}  $$

```javascript
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}
```


# Exp()
Exponential Function
Math.exp(x) returns the value of Ex

# Sqrt 

# Gausian 