# link和＠import的区别

在html设计制作中，css有四种引入方式。

## 方式一： 内联样式

内联样式，也叫行内样式，指的是直接在 HTML 标签中的 style 属性中添加 CSS。 

```html
<div style="display: none;background:red"></div>
```

这通常是个很糟糕的书写方式，它只能改变当前标签的样式，如果想要多个 <div> 拥有相同的样式，你不得不重复地为每个 <div> 添加相同的样式，如果想要修改一种样式，又不得不修改所有的 style 中的代码。很显然，内联方式引入 CSS 代码会导致 HTML 代码变得冗长，且使得网页难以维护。

## 方式二： 嵌入样式

嵌入方式指的是在 HTML 头部中的 `<style>` 标签下书写 CSS 代码。 

```html
<head>
    <style>

    .content {
        background: red;
    }

    </style>
</head>
```

嵌入方式的 CSS 只对当前的网页有效。因为 CSS 代码是在 HTML 文件中，所以会使得代码比较集中，当我们写模板网页时这通常比较有利。因为查看模板代码的人可以一目了然地查看 HTML 结构和 CSS 样式。因为嵌入的 CSS 只对当前页面有效，所以当多个页面需要引入相同的 CSS 代码时，这样写会导致代码冗余，也不利于维护。

## 方式三：链接样式

链接方式指的是使用 HTML 头部的 标签引入外部的 CSS 文件。 

```html
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
```

这是最常见的也是最推荐的引入 CSS 的方式。使用这种方式，所有的 CSS 代码只存在于单独的 CSS 文件中，所以具有良好的可维护性。并且所有的 CSS 代码只存在于 CSS 文件中，CSS 文件会在第一次加载时引入，以后切换页面时只需加载 HTML 文件即可。



## 方式四：导入样式

导入方式指的是使用 CSS 规则引入外部 CSS 文件。 

```css
<style>
    @import url(style.css);
</style>
```

或者写在css样式中

```css
@charset "utf-8";
@import url(style.css);
*{ margin:0; padding:0;}
.notice-link a{ color:#999;}
```

## **link和@import的区别？**

区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。

区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。 
所以会出现一开始没有css样式，闪烁一下出现样式后的页面(网速慢的情况下)

区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。

区别4：link支持使用Javascript控制DOM去改变样式；而@import不支持

### 扩展(link的作用)

**HTML** 中**<link>**元素规定了外部资源与当前文档的关系。 这个元素可用来为导航定义一个关系框架。这个元素最常于链接[样式表](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS)。



