---
layout: page
title: "Home"
class: home
---

<!-- # Hi, I'm Yuheng Zhao -->

<div class="columns" markdown="1">

<div class="intro" markdown="1">
Hello! I am Yuheng Zhao, a PhD candidate in Department of Data science at [Fudan University](https://www.fudan.edu.cn/en/). I am supervised by Prof. [Siming Chen](http://simingchen.me/) in [FDUVIS Lab](https://fduvis.net/). Before that, I received my master degree with first class honors from [The Hong Kong University of Science and Technology (HKUST)](https://hkust.edu.hk/) in 2021, with major in Data-driven Modeling, advised by Prof. [Wong Kwok Yee Michael](https://people.phys.ust.hk/phkywong/). I have also taken a research internship at Huawei advised by Dr. [Yu Zhang](https://zhangyu94.github.io/).

My research interest lies in harnessing the confluence of Visualization, Human-Computer Interaction, Data
            Science, and Artificial Intelligence to enhance data expression and comprehension. Specifically, I am
            focused on visual analytics for social media, Human-AI Collaboration, and
            immersive visualization. Lately, my primary focus has been on intelligent visual analytics enhanced by language models.

<div class="news-section">
  <b>💬 News</b>
  {% for item in site.data.news %}
    <div class="news-item">
      <div class="news-content">- {{ item.message }}</div>
      <span class="time-span"><time datetime="{{ item.date | date: "%Y-%m-%d" }}">{{ item.date | date: "%b %d, %y" }}</time></span>
    </div>
  {% endfor %}
</div>

</div>

<div class="me" markdown="1">
<picture>
  <source srcset='/images/yuheng.webp' type='image/webp' />
  <img
    src='/images/yuheng.jpg'
    alt='Yuheng Zhao'>
</picture>

{:.no-list}
* <a href="mailto:{{ site.email }}"> <i class="fas fa-envelope"></i> {{ site.email }}</a>
* <a href="https://scholar.google.com/citations?user=aK_a-JoAAAAJ&hl=en"> <i class="fas fa-fw fa-graduation-cap"></i> Google Scholar</a> 
* <a href="https://twitter.com/YuhengZhao_"><i class="fab fa-twitter"></i> Twitter</a>

</div>


</div>

## 🍒 <a href="{{ "/projects/" | relative_url }}">Projects</a>

<div class="featured-projects">
  {% assign sorted_projects = site.data.projects | sort: 'highlight' %}
  {% for project in sorted_projects %}
    {% if project.highlight %}
      {% include project.html project=project %}
    {% endif %}
  {% endfor %}
</div>
<a href="{{ "/projects/" | relative_url }}" class="button">
  <i class="fas fa-chevron-circle-right"></i>
  Show More Projects
</a>

## 📖 <a href="{{ "/publications/" | relative_url }}">Publications</a>

<div class="featured-publications">
  {% assign sorted_publications = site.publications | sort: 'year' | reverse %}
  {% for pub in sorted_publications %}
    {% if pub.highlight %}
      <a href="{{ pub.pdf }}" class="publication">
        <strong>{{ pub.title }}</strong>
        <br>
        <span class="authors">
          {% for author in pub.authors %}
            {% if author == "Yuheng Zhao" %}
              <strong><u>{{ author }}</u></strong>{% unless forloop.last %}, {% endunless %}
            {% else %}
              {{ author }}{% unless forloop.last %}, {% endunless %}
            {% endif %}
          {% endfor %}
        </span>.
        <br><i>{% if pub.venue %}{{ pub.venue }}, {% endif %}{{ pub.year }}</i>.
        {% for award in pub.awards %}
          <br/>
          <span class="award">
            <i class="fas fa-{% if award == "Best Paper Award" %}trophy{% else %}award{% endif %}" aria-hidden="true"></i>
            {{ award }}
          </span>
        {% endfor %}
      </a>
    {% endif %}
  {% endfor %}
</div>

<!-- <div class="featured-publications">
  {% assign sorted_publications = site.publications | sort: 'year' | reverse %}
  {% for pub in sorted_publications %}
    {% if pub.highlight %}
      <a href="{{ pub.pdf }}" class="publication">
        <strong>{{ pub.title }}</strong>
        <br><span class="authors">{% for author in pub.authors %}{{ author }}{% unless forloop.last %}, {% endunless %}{% endfor %}</span>.
        <br><i>{% if pub.venue %}{{ pub.venue }}, {% endif %}{{ pub.year }}</i>.
        {% for award in pub.awards %}<br/><span class="award"><i class="fas fa-{% if award == "Best Paper Award" %}trophy{% else %}award{% endif %}" aria-hidden="true"></i> {{ award }}</span>{% endfor %}
      </a>
    {% endif %}
  {% endfor %}
</div> -->

<a href="{{ "/publications/" | relative_url }}" class="button">
  <i class="fas fa-chevron-circle-right"></i>
  Show All Publications
</a>