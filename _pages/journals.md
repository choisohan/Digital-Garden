---
layout: page
title: Art Journals
permalink: /journals
---
<html lang="en">
<body>






<div style="width: 100%; text-align:center ;">

<h1 style = "margine-bottom: 50px"> ✨📔</h1>


{% for page in site.notes %}
  {% if page.tags contains 'journal' %}
        <span class = 'item' style ="display: flex; flex-direction: column; font-align: center;  margin-bottom: 10px" >
      <span style = "magine: 0px; padding: 0px"><a href = '{{ site.baseurl }} / {{page.url}}' style= "font-size : 30px" target="_self" > * {{page.title}} </a></span>
      </span>
  {% endif %}
{% endfor %}
</div>
</body>
</html>
