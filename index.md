---
layout: page
title: "Home"
class: home
---

<!-- # Hi, I'm Yuheng Zhao -->

<div class="columns" markdown="1">

<div class="intro" markdown="1">
Hello! I am Yuheng Zhao (赵宇恒).
I received my Ph.D. in Statistics from the School of Data Science at Fudan University, supervised by Prof. [Siming Chen](http://simingchen.me/) in [FDUVIS Lab](https://fduvis.net/). I was also a visiting PhD student at the University of Edinburgh, supervised by Prof. [Benjamin Bach](https://benjbach.github.io/) in [VisHub](https://vishub.net/). I also completed a research internship advised by Dr. [Yu Zhang](https://zhangyu94.github.io/).

My research focuses on <span class="keyword">LLM-driven intelligent visual analytics</span> and <span class="keyword">human-AI collaboration</span>. I combine methods from visualization, artificial intelligence, and human-computer interaction to build intelligent interfaces that help people understand complex data and coordinate with AI agents.

<div class="news-section">
  <div class="news-heading">💬 News</div>
  <div class="news-list">
  {% for item in site.data.news %}
    <div class="news-item">
      <div class="news-content">{{ item.message }}</div>
      <span class="time-span"><time datetime="{{ item.date | date: "%Y-%m-%d" }}">{{ item.date | date: "%b %d, %y" }}</time></span>
    </div>
  {% endfor %}
  </div>
</div>

</div>


<div class="me" markdown="1">
<picture>
  <source srcset='/images/yuheng.webp' type='image/webp' />
  <img
    src='/images/yuheng.webp'
    alt='Yuheng Zhao'>
</picture>

{:.no-list}
* <a href="mailto:{{ site.email }}"> <i class="fas fa-envelope"></i> Email: {{ site.email }}</a>
* <a href="https://scholar.google.com/citations?user=aK_a-JoAAAAJ&hl=en"> <i class="fas fa-fw fa-graduation-cap"></i> Google Scholar: Yuheng Zhao</a> 
* <a href="https://twitter.com/YuhengZhao_"><i class="fab fa-twitter"></i> Twitter: YuhengZhao_</a>
* <a href="https://www.linkedin.com/in/yuheng-zhao-b246b91b5/"><i class="fab fa-linkedin"></i> LinkedIn: Yuheng Zhao</a>

</div>


</div>

<div id="publications" class="section-title-row">
  <h3><a href="{{ "/publications/" | relative_url }}">Publications</a></h3> (selected)
</div>
  <p style="font-size:12px">* denoted equal contribution</p>

<div class="featured-publications">
  {% assign sorted_publications = site.publications | sort: "path" | reverse %}
  {% for pub in sorted_publications %}
    {% if pub.highlight %}
      {% include publication.html pub=pub %}
    {% endif %}
  {% endfor %}
</div>

<a href="{{ "/publications/" | relative_url }}" class="button show-publications-button">
  <i class="fas fa-chevron-circle-right"></i>
  Show All Publications
</a>
