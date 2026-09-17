# 📝 Personal Blogs Template

> Responsive, lightweight blog template built with clean HTML5, CSS3, and JavaScript hosted on GitHub Pages.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Hosted-222222?style=for-the-badge&logo=github)

---

## ⭐ Star Schema (Blog Analytics Model)

```
                            +-----------------------------------+
                            |           Dim_Article             |
                            +-----------------------------------+
                            | Article_Key (PK)                  |
                            | Title                             |
                            | Slug                              |
                            | Category                          |
                            +-----------------+-----------------+
                                              | 1
                                              |
                                              | N
+-----------------------+   +-----------------+-----------------+   +-----------------------+
|  Dim_Date             | 1 |       Fact_ArticleViews           | 1 |  Dim_Visitor          |
+-----------------------+---+-----------------------------------+---+-----------------------+
| DateKey (PK)          | N | View_Key (PK)                     | N | Visitor_Key (PK)      |
| FullDate              |   | DateKey (FK)                      |   | Device_Type           |
| Month / Year          |   | Article_Key (FK)                  |   | Country               |
+-----------------------+   | Visitor_Key (FK)                  |   +-----------------------+
                            | Read_Time_Seconds (Measure)       |
                            | Scroll_Depth_Pct (Measure)        |
                            +-----------------------------------+
```
