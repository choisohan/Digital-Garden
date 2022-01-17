---
layout: page
title: Art Journals
permalink: /journals
---
<html lang="en">
<body>






<div style="width: 100%; text-align:center ;">

<h1 style = "margine-bottom: 50px"> ✨📔</h1>


{% for page in site.pages %}
  {% if page.status contains 'published' %}
        <span class = 'item' style ="display: flex; flex-direction: column; font-align: center;  margin-bottom: 10px" >
      <span style = "magine: 0px; padding: 0px"><a  target="_self" href = '{{ site.baseurl }} / {{page.url}}' style= "font-size : 30px" > * {{page.title}} </a></span>
      </span>
  {% endif %}
{% endfor %}
</div>
</body>
</html>
