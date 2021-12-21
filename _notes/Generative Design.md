---
title: Generative Design
---


# Canvas vs P5.JS ??
The HTML5 Canvas (I assume you’re referring to that, and not to one of the libraries out there called “Canvas.js”) is a feature provided by web browsers that provides an area inside a web page that JavaScript code can draw on. It provides a 2D and a 3D API.

p5.js is a library written in JavaScript that provides high-level drawing functionality. It and every other JavaScript drawing library internally uses HTML5 Canvas (or draws shapes by inserting objects directly into the page DOM, but I don’t know of any that do this).

p5.js is more convenient to use, and faster to learn. Using Canvas directly will let you write smaller, faster programs, and may let you use features not yet supported by p5.js.

-[answered by William Tracy](https://www.quora.com/What-is-your-opinion-on-p5-js-vs-Canvas)