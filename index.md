---
layout: page
title: "Home"
class: home
---

<!-- # Hi, I'm Yuheng Zhao -->

<div class="columns" markdown="1">

<div class="intro" markdown="1">
Hello! I am Yuheng Zhao (赵宇恒).
I am an [ELLIS](https://ellis.eu/) Postdoctoral Fellow in the [Computational Behavior Lab](https://cbl.aalto.fi/) at Aalto University, working with [Prof. Antti Oulasvirta](https://users.aalto.fi/~oulasvir/). I received my Ph.D. in Statistics from the School of Data Science at Fudan University, supervised by Prof. [Siming Chen](http://simingchen.me/) in [FDUVIS Lab](https://fduvis.net/). I also completed a research internship advised by Dr. [Yu Zhang](https://zhangyu94.github.io/).

My research focuses on <span class="keyword">LLM-driven intelligent visual analytics</span>,  <span class="keyword">human-AI interaction</span> and <span class="keyword">AI4Science</span>. I combine methods from visualization, artificial intelligence, and human-computer interaction to build intelligent interfaces that help people understand complex data and coordinate with AI agents.

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

<div id="publications" class="section-title-row home-section-heading">
  <h3>📖 Publications</h3>
  <!--
  <div class="publication-toggle" role="group" aria-label="Publication display mode">
    <button type="button" class="active" data-publication-mode="selected" aria-pressed="true">Selected</button>
    <button type="button" data-publication-mode="full" aria-pressed="false">Full</button>
  </div>
  -->
</div>
  <p style="font-size:12px">* denoted equal contribution</p>

<div class="featured-publications">
  {% assign sorted_publications = site.publications | sort: "path" | reverse %}
  {% for pub in sorted_publications %}
    <div class="home-publication-item" data-home-publication data-highlight="{% if pub.highlight %}true{% else %}false{% endif %}">
      {% include publication.html pub=pub %}
    </div>
  {% endfor %}
</div>

<div id="award" class="section-title-row home-section-heading">
  <h3>🏆 Award</h3>
</div>

<div class="home-info-grid awards-funding">
  {% for section in site.data.awards %}
  <section>
    <h6>{{ section.section }}</h6>
    <ul>
      {% for item in section.items %}
      <li><span>{{ item.years }}</span> {{ item.name }}</li>
      {% endfor %}
    </ul>
  </section>
  {% endfor %}
</div>

<div id="service" class="section-title-row home-section-heading">
  <h3>✨ Service</h3>
</div>

<div class="home-info-grid academic-service">
  {% for section in site.data.service %}
  <section>
    <h6>{{ section.role }}</h6>
    {% for item in section.items %}
    <p>- {% if item.label %}<strong>{{ item.label }}:</strong> {% endif %}{{ item.text }}</p>
    {% endfor %}
  </section>
  {% endfor %}
</div>
