

# CSS多列

## 简介

CSS Grid(网格) 布局（又称为 “Grid(网格)” ），是一个二维的基于网格的布局系统它的目标是完全改变我们基于网格的用户界面的布局方式。CSS 一直用来布局我们的网页，但一直以来都存在这样或那样的问题。一开始我们用表格（table），然后是浮动（float），再是定位（postion）和内嵌块（inline-block），但是所有这些方法本质上都是只是 hack 而已，并且遗漏了很多重要的功能（例如垂直居中）。Flexbox 的出现很大程度上改善了我们的布局方式，但它的目的是为了解决更简单的一维布局，而不是复杂的二维布局（实际上 Flexbox 和 Grid 能结合在一起工作，而且配合得非常好）。Grid(网格) 布局是第一个专门为解决布局问题而创建的 CSS 模块，我们终于不需要想尽办法hack 页面布局样式了。

## 基础知识和浏览器支持

你必须使用 `display: grid` 将容器元素定义为一个 grid(网格) 布局，使用 [`grid-template-columns`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows) 和 [`grid-template-rows`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows) 设置 列 和 行 的尺寸大小，然后通过 [`grid-column`](http://www.css88.com/archives/8510#prop-grid-column-row) 和 [`grid-row`](http://www.css88.com/archives/8510#prop-grid-column-row) 将其子元素放入这个 grid(网格) 中。与 flexbox 类似，网格项（grid items）的源顺序无关紧要。你的 CSS 可以以任何顺序放置它们，这使得使用 媒体查询（media queries）重新排列网格变得非常容易。定义整个页面的布局，然后完全重新排列布局以适应不同的屏幕宽度，这些都只需要几行 CSS ，想象一下就让人兴奋。Grid(网格) 布局是有史以来最强大的CSS模块之一。

截至2017年3月，许多浏览器都提供了对 CSS Grid 的原生支持，而且无需加浏览器前缀：Chrome（包括 Android ），Firefox，Safari（包括iOS）和 Opera 。 另一方面，Internet Explorer 10和11支持它，但是是一个过时的语法实现。 Edge 已经宣布支持，但还没有到来。（愚人码头注：翻译这篇文章时，Edge 16 已经支持）

### 桌面(Desktop) 浏览器

| Chrome | Opera | Firefox | IE   | Edge | Safari |
| ------ | ----- | ------- | ---- | ---- | ------ |
| 57     | 44    | 52      | 11*  | 16   | 10.1   |

### 手机(Mobile) / 平板(Tablet)浏览器

| iOS Safari | Opera Mobile | Opera Mini | Android | Android Chrome | Android Firefox |
| ---------- | ------------ | ---------- | ------- | -------------- | --------------- |
| 10.3       | No           | No         | 62      | 62             | 57              |

除了微软之外，浏览器厂商似乎还没有对 Grid(网格) 搞自己的一套实现（比如加前缀），直到规范完全成熟。这是一件好事，因为这意味着我们不必担心学习多个语法。

在生产中使用 Grid 只是时间问题。 但现在是学习的时候了。

## 重要术语

在深入了解 Grid(网格) 的概念之前，理解术语是很重要的。由于这里涉及的术语在概念上都很相似，如果不先记住 Grid(网格) 规范定义的含义，很容易混淆它们。但是别担心，术语并不多。

### 网格容器(Grid Container)

应用 `display: grid` 的元素。这是所有**网格项**（Grid Items）的直接父级元素。在这个例子中，`container`就是 **网格容器(Grid Container)**。

```css
<div class="container">
  <div class="item item-1"></div>
  <div class="item item-2"></div>
  <div class="item item-3"></div>
</div>
```

### 网格项(Grid Item)

网格容器（Grid Container）的子元素（例如直接子元素）。这里 `item` 元素就是网格项(Grid Item)，但是 `sub-item` 不是。

```js
<div class="container">
  <div class="item"></div> 
  <div class="item">
    <p class="sub-item"></p>
  </div>
  <div class="item"></div>
</div>
```

### 网格线(Grid Line)

构成网格结构的分界线。它们既可以是垂直的（“列网格线(column grid lines)”），也可以是水平的（“行网格线(row grid lines)”），并位于行或列的任一侧。例如，这里的黄线就是一条列网格线。

![](/home/xsh/桌面/markdown/imgs/grid-line.png)



### 网格轨道(Grid Track)

两条相邻网格线之间的空间。你可以把它们想象成网格的列或行。下图是第二条和第三条 行网格线 之间的 网格轨道(Grid Track)。

![](/home/xsh/桌面/markdown/imgs/grid-track.png)



### 网格单元格(Grid Cell)

![](/home/xsh/桌面/markdown/imgs/grid-cell.png)

### 网格区域(Grid Area)

4条网格线包围的总空间。一个 网格区域(Grid Area) 可以由任意数量的 网格单元格(Grid Cell) 组成。下图是 行网格线1和3，以及列网格线1和3 之间的网格区域。

![](/home/xsh/桌面/markdown/imgs/grid-area.png)

## Grid(网格) 属性目录

### 网格容器(Grid Container) 属性

- [display](https://www.css88.com/archives/8510#prop-display)
- [grid-template-columns](https://www.css88.com/archives/8510#prop-grid-template-columns-rows)
- [grid-template-rows](https://www.css88.com/archives/8510#prop-grid-template-columns-rows)
- [grid-template-areas](https://www.css88.com/archives/8510#prop-grid-template-areas)
- [grid-template](https://www.css88.com/archives/8510#prop-grid-template)
- [grid-column-gap](https://www.css88.com/archives/8510#prop-grid-column-row-gap)
- [grid-row-gap](https://www.css88.com/archives/8510#prop-grid-column-row-gap)
- [grid-gap](https://www.css88.com/archives/8510#prop-grid-gap)
- [justify-items](https://www.css88.com/archives/8510#prop-justify-items)
- [align-items](https://www.css88.com/archives/8510#prop-align-items)
- [justify-content](https://www.css88.com/archives/8510#prop-justify-content)
- [align-content](https://www.css88.com/archives/8510#prop-align-content)
- [grid-auto-columns](https://www.css88.com/archives/8510#prop-grid-auto-columns-rows)
- [grid-auto-rows](https://www.css88.com/archives/8510#prop-grid-auto-columns-rows)
- [grid-auto-flow](https://www.css88.com/archives/8510#prop-grid-auto-flow)
- [grid](https://www.css88.com/archives/8510#prop-grid)

### 网格项(Grid Items) 属性

- [grid-column-start](https://www.css88.com/archives/8510#prop-grid-column-row-start-end)
- [grid-column-end](https://www.css88.com/archives/8510#prop-grid-column-row-start-end)
- [grid-row-start](https://www.css88.com/archives/8510#prop-grid-column-row-start-end)
- [grid-row-end](https://www.css88.com/archives/8510#prop-grid-column-row-start-end)
- [grid-column](https://www.css88.com/archives/8510#prop-grid-column-row)
- [grid-row](https://www.css88.com/archives/8510#prop-grid-column-row)
- [grid-area](https://www.css88.com/archives/8510#prop-grid-area)
- [justify-self](https://www.css88.com/archives/8510#prop-justify-self)
- [align-self](https://www.css88.com/archives/8510#prop-align-self)

## 父元素 网格容器(Grid Container) 属性

### display

将元素定义为网格容器，并为其内容建立新的 *网格格式上下文*。

值：

- **grid** ：生成一个块级网格
- **inline-grid** ：生成一个内联网格
- **subgrid** ：如果你的网格容器本身是另一个网格的网格项（即嵌套网格），你可以使用这个属性来表示
    你希望它的行/列的大小继承自它的父级网格容器，而不是自己指定的。

如果你想要设置为**网格容器**元素本身已经是**网格项**（嵌套网格布局），用这个属性指明这个容器内部的**网格项**的行列尺寸直接**继承**其父级的**网格容器**属性。

```css
.container {
    display: grid | inline-grid | subgrid;
}
```

注意：在 网格容器(Grid Container) 上使用`column`，`float`，`clear`， `vertical-align` 不会产生任何效果。

### grid-template-columns / grid-template-rows(定义列行)

使用空格分隔的值列表，用来定义网格的列和行。这些值表示 网格轨道(Grid Track) 大小，它们之间的空格表示网格线。值：
– <track-size>： 可以是长度值，百分比，或者等份网格容器中可用空间（使用 `fr` 单位）
– <line-name>：你可以选择的任意名称

```css
.container {
    grid-template-columns: <track-size> ... | <line-name> <track-size> ...;
    grid-template-rows: <track-size> ... | <line-name> <track-size> ...;
}
```

当你在 网格轨道(Grid Track) 值之间留出空格时，网格线会自动分配数字名称：

```CSS
.container{
    grid-template-columns: 40px 50px auto 50px 40px;
    grid-template-rows: 25% 100px auto;
}
```

![](/home/xsh/桌面/markdown/imgs/grid-numbers.png)



但是你可以明确的指定网格线(Grid Line)名称，即 <line-name> 值。请注意网格线名称的括号语法：

```CSS
.container {
    grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
    grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```

![](/home/xsh/桌面/markdown/imgs/grid-names.png)

请注意，一条网格线(Grid Line)可以有多个名称。例如，这里的第二条 行网格线(row grid lines) 将有两个名字：row1-end 和row2-start ：

```CSS
.container{
    grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}
```

如果你的定义包含多个重复值，则可以使用 `repeat()` 表示法来简化定义：

```CSS
.container {
    grid-template-columns: repeat(3, 20px [col-start]) 5%;
}
.container {
    grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start] 5%;
}
```

`fr` 单元允许你用等分网格容器剩余可用空间来设置 网格轨道(Grid Track) 的大小 。例如，下面的代码会将每个网格项设置为网格容器宽度的三分之一：

```CSS
.container {
    grid-template-columns: 1fr 1fr 1fr;
}
```

```css
.container {
    grid-template-columns: 1fr 50px 1fr 1fr;
}
```

### grid-template-areas

通过引用 [`grid-area`](http://www.css88.com/archives/8510#prop-grid-area) 属性指定的 网格区域(Grid Area) 名称来定义网格模板。重复网格区域的名称导致内容跨越这些单元格。一个点号（`.`）代表一个空的网格单元。这个语法本身可视作网格的可视化结构。

值：

- **<grid-area-name>**：由网格项的 [`grid-area`](http://www.css88.com/archives/8510#prop-grid-area) 指定的网格区域名称
- **.**（点号） ：代表一个空的网格单元
- **none**：不定义网格区域

```js
.container {
  grid-template-areas: 
    " | . | none | ..."
    "...";
}
```

```js
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}
 
.container {
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```

上面的代码将创建一个 4 列 3 行的网格。整个顶行将由 **header** 区域 组成。中间一排将由两个 **main** 区域，一个是空单元格，一个 **sidebar** 区域组成。最后一行全是 **footer** 区域组成。

![](/home/xsh/桌面/markdown/imgs/grid-template-areas.png)



你的声明中的每一行都需要有相同数量的单元格。

你可以使用任意数量的相邻的 点`.` 来声明单个空单元格。 只要这些点`.`之间没有空隙隔开，他们就表示一个单一的单元格。

注意你 **不是** 用这个语法来命名网格线，只是命名**网格区域**。当你使用这种语法时，区域两端的网格线实际上是自动命名的。如果你的网格区域的名字是 **foo**，该区域的起始 行网格线 和起始 列网格线 的名称将是 **foo-start**，而最后一行 行网格线 和最后一列 列网格线 的名字是 **foo-end**。这意味着一些网格线可能有多个名字，如上例中最左边的网格线，它将有三个名称：header-start，main-start 和 footer-start 

### grid-template

用于定义 [`grid-template-rows`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows) ，[`grid-template-columns`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows) ，[`grid-template-areas`](http://www.css88.com/archives/8510#prop-grid-template-areas) 缩写 (shorthand) 属性。

值：

- **none**：将所有三个属性设置为其初始值
- **subgrid**：将[`grid-template-rows`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows)，[`grid-template-columns`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows) 的值设为 `subgrid`，[`grid-template-areas`](http://www.css88.com/archives/8510#prop-grid-template-areas)设为初始值
- **<grid-template-rows> / <grid-template-columns>**：将 [`grid-template-columns`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows) 和 [`grid-template-rows`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows) 设置为相应地特定的值，并且设置[`grid-template-areas`](http://www.css88.com/archives/8510#prop-grid-template-areas)为`none`

```css
.container {
  grid-template: none | subgrid | <grid-template-rows> / <grid-template-columns>;
}
```

```css
.container {
  grid-template:
    [row1-start] "header header header" 25px [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}
```

等价于：

```CSS
.container {
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;
  grid-template-areas: 
    "header header header" 
    "footer footer footer";
}
```

由于 [`grid-template`](http://www.css88.com/archives/8510#prop-grid-template) 不会重置 *隐式* 网格属性（[`grid-auto-columns`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows)， [`grid-auto-rows`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows)， 和 [`grid-auto-flow`](http://www.css88.com/archives/8510#prop-grid-auto-flow)），
这可能是你想在大多数情况下做的，建议使用 [`grid`](http://www.css88.com/archives/8510#prop-grid) 属性而不是 [`grid-template`](http://www.css88.com/archives/8510#prop-grid-template)

### grid-column-gap / grid-row-gap

指定网格线(grid lines)的大小。你可以把它想象为设置列/行之间间距的宽度。值：

- <line-size> ：长度值

```css
.container {
  grid-column-gap: <line-size>;
  grid-row-gap: <line-size>;
}
```

示例：

```CSS
.container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}
```

![](/home/xsh/桌面/markdown/imgs/grid-column-row-gap.png)

### grid-gap

[`grid-column-gap`](http://www.css88.com/archives/8510#prop-grid-column-row-gap) 和 [`grid-row-gap`](http://www.css88.com/archives/8510#prop-grid-column-row-gap) 的缩写语法

值：

- <grid-row-gap> <grid-column-gap>：长度值

```CSS
CSS 代码:.container {  grid-gap: <grid-row-gap> <grid-column-gap>;}
```

示例：

```CSS
CSS 代码:.container{  grid-template-columns: 100px 50px 100px;  grid-template-rows: 80px auto 80px;   grid-gap: 10px 15px;}
```

如果[`grid-row-gap`](http://www.css88.com/archives/8510#prop-grid-column-row-gap)没有定义，那么就会被设置为等同于 [`grid-column-gap`](http://www.css88.com/archives/8510#prop-grid-column-row-gap) 的值。例如下面的代码是等价的：

```CSS
CSS 代码:.container{  /* 设置 [`grid-column-gap`](http://www.css88.com/archives/8510#prop-grid-column-row-gap) 和 [`grid-row-gap`](http://www.css88.com/archives/8510#prop-grid-column-row-gap) */    grid-column-gap: 10px;  grid-column-gap: 10px;    /* 等价于 */    grid-gap: 10px 10px;   /* 等价于 */    grid-gap: 10px;}
```

### justify-items

沿着 行轴线(row axis) 对齐 网格项(grid items) 内的内容（相反的属性是 [`align-items`](http://www.css88.com/archives/8510#prop-align-items) 沿着列轴线对齐）。该值适用于容器内的所有网格项。

值：

- **start**：将内容对齐到网格区域(grid area)的左侧
- **end**：将内容对齐到网格区域的右侧
- **center**：将内容对齐到网格区域的中间（水平居中）
- **stretch**：填满网格区域宽度（默认值）

```CSS
CSS 代码:.container {    justify-items: start | end | center | stretch;}
```

示例：

```CSS
CSS 代码:.container {  justify-items: start;} 
```

![左对齐，justify-items 设置为 start 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-items-start.png)

```CSS
CSS 代码:.container{  justify-items: end;}
```

![右对齐，justify-items 设置为 end 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-items-end.png)

```CSS
CSS 代码:.container{  justify-items: center;}
```

![居中对齐，justify-items 设置为 center 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-items-center.png)

```CSS
CSS 代码:.container{  justify-items: stretch;}
```

![拉伸，justify-items 设置为 stretch 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-items-stretch.png)

这些行为也可以通过单独网格项(grid items) 的 [`justify-self`](http://www.css88.com/archives/8510#prop-justify-self) 属性设置。

### align-items

沿着 列轴线(column axis) 对齐 网格项(grid items) 内的内容（相反的属性是 [`justify-items`](http://www.css88.com/archives/8510#prop-justify-items) 沿着行轴线对齐）。该值适用于容器内的所有网格项。

值：

- **start**：将内容对齐到网格区域(grid area)的顶部
- **end**：将内容对齐到网格区域的底部
- **center**：将内容对齐到网格区域的中间（垂直居中）
- **stretch**：填满网格区域高度（默认值）

```CSS
CSS 代码:.container {  align-items: start | end | center | stretch;}
```

示例：

```CSS
CSS 代码:.container {  align-items: start;}
```

![顶部对齐，align-items 设置为 start 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-items-start.png)

```CSS
CSS 代码:.container {  align-items: end;}
```

![底部对齐，align-items 设置为 end 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-items-end.png)

```CSS
CSS 代码:.container {  align-items: center;}
```

![居中对齐，align-items 设置为 center 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-items-center.png)

```CSS
CSS 代码:.container {  align-items: stretch;}
```

![拉伸，align-items 设置为 stretch 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-items-stretch.png)

这些行为也可以通过单独网格项(grid items) 的 [`align-self`](http://www.css88.com/archives/8510#prop-align-self) 属性设置。

### justify-content

有时，你的网格合计大小可能小于其 网格容器(grid container) 大小。 如果你的所有 网格项(grid items) 都使用像 `px` 这样的非灵活单位设置大小，在这种情况下，您可以设置网格容器内的网格的对齐方式。 此属性沿着 行轴线(row axis) 对齐网格（相反的属性是 [`align-content`](http://www.css88.com/archives/8510#prop-align-content) ，沿着列轴线对齐网格）。

值：

- **start**：将网格对齐到 网格容器(grid container) 的左边
- **end**：将网格对齐到 网格容器 的右边
- **center**：将网格对齐到 网格容器 的中间（水平居中）
- **stretch**：调整 网格项(grid items) 的宽度，允许该网格填充满整个 网格容器 的宽度
- **space-around**：在每个网格项之间放置一个均匀的空间，左右两端放置一半的空间
- **space-between**：在每个网格项之间放置一个均匀的空间，左右两端没有空间
- **space-evenly**：在每个栅格项目之间放置一个均匀的空间，左右两端放置一个均匀的空间

```CSS
CSS 代码:.container {  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;    }
```

示例：

```CSS
CSS 代码:.container {  justify-content: start;}
```

![左侧对齐，justify-content 设置为 start 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-content-start.png)

```CSS
CSS 代码:.container {  justify-content: end;}
```

![右侧对齐，justify-content 设置为 end 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-content-end.png)

```CSS
CSS 代码:.container {  justify-content: center;}
```

![居中对齐，justify-content 设置为 center 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-content-center.png)

```CSS
CSS 代码:.container {  justify-content: stretch;}
```

![拉伸，justify-content 设置为 stretch 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-content-stretch.png)

```CSS
CSS 代码:.container {  justify-content: space-around;}
```

![justify-content 设置为 space-around 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-content-space-around.png)

```CSS
CSS 代码:.container {  justify-content: space-between;}
```

![justify-content 设置为 space-between 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-content-space-between.png)

```CSS
CSS 代码:.container {  justify-content: space-evenly;}
```

![justify-content 设置为 space-evenly 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-content-space-evenly.png)

### align-content

有时，你的网格合计大小可能小于其 网格容器(grid container) 大小。 如果你的所有 网格项(grid items) 都使用像 `px` 这样的非灵活单位设置大小，在这种情况下，您可以设置网格容器内的网格的对齐方式。 此属性沿着 列轴线(column axis) 对齐网格（相反的属性是 [`justify-content`](http://www.css88.com/archives/8510#prop-justify-content) ，沿着行轴线对齐网格）。

值：

- **start**：将网格对齐到 网格容器(grid container) 的顶部
- **end**：将网格对齐到 网格容器 的底部
- **center**：将网格对齐到 网格容器 的中间（垂直居中）
- **stretch**：调整 网格项(grid items) 的高度，允许该网格填充满整个 网格容器 的高度
- **space-around**：在每个网格项之间放置一个均匀的空间，上下两端放置一半的空间
- **space-between**：在每个网格项之间放置一个均匀的空间，上下两端没有空间
- **space-evenly**：在每个栅格项目之间放置一个均匀的空间，上下两端放置一个均匀的空间

```CSS
CSS 代码:.container {  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  }
```

示例：

```CSS
CSS 代码:.container {  align-content: start; }
```

![顶部对齐，align-content 设置为 start 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-content-start.png)

```CSS
CSS 代码:.container {  align-content: end;   }
```

![底部对齐，align-content 设置为 end 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-content-end.png)

```CSS
CSS 代码:.container {  align-content: center;    }
```

![居中对齐，align-content 设置为 center 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-content-center.png)

```CSS
CSS 代码:.container {  align-content: stretch;   }
```

![拉伸，align-content 设置为 stretch 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-content-stretch.png)

```CSS
CSS 代码: .container {  align-content: space-around;  }
```

![align-content 设置为 space-around 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-content-space-around.png)

```CSS
CSS 代码:.container {  align-content: space-between; }
```

![align-content 设置为 space-between 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-content-space-between.png)

```CSS
CSS 代码:.container {  align-content: space-evenly;  }
```

![align-content 设置为 space-evenly 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-content-space-evenly.png)

### grid-auto-columns / grid-auto-rows

指定任何自动生成的网格轨道(grid tracks)（又名隐式网格轨道）的大小。在你明确定位的行或列（通过 [`grid-template-rows`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows) / [`grid-template-columns`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows)），超出定义的网格范围时，隐式网格轨道被创建了。

值：
– <track-size>：可以是长度值，百分比，或者等份网格容器中可用空间（使用 `fr` 单位）

```CSS
CSS 代码:.container {  grid-auto-columns: <track-size> ...;  grid-auto-rows: <track-size> ...;}
```

为了说明如何创建隐式网格轨道，请考虑一下以下的代码：

```CSS
CSS 代码:.container {  grid-template-columns: 60px 60px;  grid-template-rows: 90px 90px}
```

![网格模板](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-auto.png)

生成了一个2×2的网格。

但现在想象一下，你使用 [`grid-column`](http://www.css88.com/archives/8510#prop-grid-column-row) 和 [`grid-row`](http://www.css88.com/archives/8510#prop-grid-column-row) 来定位你的网格项（grid items），像这样：

```CSS
CSS 代码:.item-a {  grid-column: 1 / 2;  grid-row: 2 / 3;}.item-b {  grid-column: 5 / 6;  grid-row: 2 / 3;}
```

![隐式网格轨道示例](http://newimg88.b0.upaiyun.com/newimg88/2017/12/implicit-tracks.png)

我们告诉 `.item-b` 从第 5 条列网格线开始到第 6 条列网格线结束，但我们从来没有定义过 第5 或 第6 列网格线。
因为我们引用的网格线不存在，所以创建宽度为 0 的隐式网格轨道以填补空缺。我们可以使用 [`grid-auto-columns`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows) 和 [`grid-auto-rows`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows) 来指定这些隐式轨道的大小：

```CSS
CSS 代码:.container {  grid-auto-columns: 60px;} 
```

![隐式网格轨道示例](http://newimg88.b0.upaiyun.com/newimg88/2017/12/implicit-tracks-with-widths.png)

### grid-auto-flow

如果你有一些没有明确放置在网格上的网格项(grid items)，**自动放置算法** 会自动放置这些网格项。该属性控制自动布局算法如何工作。

值：

- **row**：告诉自动布局算法依次填充每行，根据需要添加新行
- **column**：告诉自动布局算法依次填入每列，根据需要添加新列
- **dense**：告诉自动布局算法在稍后出现较小的网格项时，尝试填充网格中较早的空缺

```CSS
CSS 代码:.container {  grid-auto-flow: row | column | row dense | column dense}
```

请注意，`dense` 集可能导致你的网格项出现乱序。

示例：

考虑以下 HTML :

```HTML
HTML 代码:<section class="container">    <div class="item-a">item-a</div>    <div class="item-b">item-b</div>    <div class="item-c">item-c</div>    <div class="item-d">item-d</div>    <div class="item-e">item-e</div></section>
```

你定义一个有 5 列和 2 行的网格，并将 [`grid-auto-flow`](http://www.css88.com/archives/8510#prop-grid-auto-flow) 设置为 `row`（也就是默认值）：

```CSS
CSS 代码:.container {  display: grid;  grid-template-columns: 60px 60px 60px 60px 60px;  grid-template-rows: 30px 30px;  grid-auto-flow: row;}
```

将网格项放在网格上时，只能为其中的两个指定位置：

```CSS
CSS 代码:.item-a {  grid-column: 1;  grid-row: 1 / 3;}.item-e {  grid-column: 5;  grid-row: 1 / 3;}
```

因为我们把 [`grid-auto-flow`](http://www.css88.com/archives/8510#prop-grid-auto-flow) 设成了 `row` ，所以我们的网格看起来会是这样。**注意** 我们没有进行定位的网格项（`item-b`，`item-c`，`item-d`）会这样排列在可用的行中：

![自动放置算法](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-auto-flow-row.png)

相反地，如果我们把 [`grid-auto-flow`](http://www.css88.com/archives/8510#prop-grid-auto-flow) 设成了 `column` ，`item-b`，`item-c`，`item-d`会沿着列向下排列：

```CSS
CSS 代码:.container {  display: grid;  grid-template-columns: 60px 60px 60px 60px 60px;  grid-template-rows: 30px 30px;  grid-auto-flow: column;}
```

![自动放置算法](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-auto-flow-column.png)

## grid

在一个声明中设置所有以下属性的简写： [`grid-template-rows`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows), [`grid-template-columns`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows), [`grid-template-areas`](http://www.css88.com/archives/8510#prop-grid-template-areas), [`grid-auto-rows`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows), [`grid-auto-columns`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows), 和 [`grid-auto-flow`](http://www.css88.com/archives/8510#prop-grid-auto-flow) 。它还将[`grid-column-gap`](http://www.css88.com/archives/8510#prop-grid-column-row-gap) 和 [`grid-column-gap`](http://www.css88.com/archives/8510#prop-grid-column-row-gap)设置为初始值，即使它们不可以通过[`grid`](http://www.css88.com/archives/8510#prop-grid)属性显式地设置。

值：

- **none**：将所有子属性设置为其初始值
- <grid-template-rows> / <grid-template-columns>：将 [`grid-template-rows`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows) 和 [`grid-template-columns`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows)分别设置为指定值，将所有其他子属性设置为其初始值
- <grid-auto-flow> [<grid-auto-rows> [ / <grid-auto-columns>] ] ：分别接受所有与 [`grid-auto-flow`](http://www.css88.com/archives/8510#prop-grid-auto-flow) ，[`grid-auto-rows`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows) 和 [`grid-auto-columns`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows) 相同的值。如果省略了 [`grid-auto-columns`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows) ，它被设置为由 [`grid-auto-rows`](http://www.css88.com/archives/8510#prop-grid-auto-columns-rows) 指定的值。如果两者都被省略，他们就会被设置为初始值

```CSS
CSS 代码:.container {    grid: none | <grid-template-rows> / <grid-template-columns> | <grid-auto-flow> [<grid-auto-rows> [/ <grid-auto-columns>]];}
```

例子：

以下两个代码块是等效的：

```CSS
CSS 代码:.container {  grid: 200px auto / 1fr auto 1fr;}
CSS 代码:.container {  grid-template-rows: 200px auto;  grid-template-columns: 1fr auto 1fr;  grid-template-areas: none;}
```

以下两个代码块也是等效的：

```CSS
CSS 代码:.container {  grid: column 1fr / auto;}
CSS 代码:.container {  grid-auto-flow: column;  grid-auto-rows: 1fr;  grid-auto-columns: auto;}
```

它也接受一个更复杂但相当方便的语法来一次设置所有内容。您可以 [`grid-template-areas`](http://www.css88.com/archives/8510#prop-grid-template-areas)，[`grid-template-rows`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows)和[`grid-template-columns`](http://www.css88.com/archives/8510#prop-grid-template-columns-rows)，并所有其他的子属性都被设置为它们的初始值。这么做可以在它们网格区域内相应地指定网格线名字和网格轨道的大小。用最简单的例子来描述：

```CSS
CSS 代码:.container {  grid: [row1-start] "header header header" 1fr [row1-end]        [row2-start] "footer footer footer" 25px [row2-end]        / auto 50px auto;}
```

等价于：

```CSS
CSS 代码:.container {  grid-template-areas:     "header header header"    "footer footer footer";  grid-template-rows: [row1-start] 1fr [row1-end row2-start] 25px [row2-end];  grid-template-columns: auto 50px auto;    }
```

## 子元素 网格项(Grid Items) 属性



### grid-column-start / grid-column-end / grid-row-start / grid-row-end

通过指定 网格线(grid lines) 来确定网格内 网格项(grid item) 的位置。 [`grid-column-start`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) / [`grid-row-start`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) 是网格项目开始的网格线，[`grid-column-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) / [`grid-row-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) 是网格项结束的网格线。

值：

- **<line>** ：可以是一个数字引用一个编号的网格线，或者一个名字来引用一个命名的网格线
- **span <number>** ：该网格项将跨越所提供的网格轨道数量
- **span <name>** ：该网格项将跨越到它与提供的名称位置
- **auto** ：表示自动放置，自动跨度，默认会扩展一个网格轨道的宽度或者高度

```CSS
CSS 代码:.item {    grid-column-start: <number> | <name> | span <number> | span <name> | auto    grid-column-end: <number> | <name> | span <number> | span <name> | auto    grid-row-start: <number> | <name> | span <number> | span <name> | auto    grid-row-end: <number> | <name> | span <number> | span <name> | auto}
```

示例：

```CSS
CSS 代码:.item-a {    grid-column-start: 2;    grid-column-end: five;    grid-row-start: row1-start    grid-row-end: 3} 
```

![网格项位置，grid-column-start，grid-column-end，grid-row-start，grid-row-end 的示例](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-start-end-a.png)

```CSS
CSS 代码:.item-b {    grid-column-start: 1;    grid-column-end: span col4-start;    grid-row-start: 2    grid-row-end: span 2}
```

![网格项位置，grid-column-start，grid-column-end，grid-row-start，grid-row-end 的示例](https://cdn.css-tricks.com/wp-content/uploads/2016/11/grid-start-end-b.png)

如果没有声明指定 [`grid-column-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) / [`grid-row-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end)，默认情况下，该网格项将占据1个轨道。

项目可以相互重叠。您可以使用 `z-index` 来控制它们的重叠顺序。

### grid-column / grid-row

分别为 [`grid-column-start`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) + [`grid-column-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) 和 [`grid-row-start`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) + [`grid-row-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) 的缩写形式。

值：

- <start-line> / <end-line>：每个网格项都接受所有相同的值，作为普通书写的版本，包括跨度

```CSS
CSS 代码:.item {    grid-column: <start-line> / <end-line> | <start-line> / span <value>;    grid-row: <start-line> / <end-line> | <start-line> / span <value>;}
```

示例：

```CSS
CSS 代码:.item-c {    grid-column: 3 / span 2;    grid-row: third-line / 4;}
```

![网格项位置缩写形式](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-start-end-c.png)

如果没有声明分隔线结束位置，则该网格项默认占据 1 个网格轨道。



### grid-area

为网格项提供一个名称，以便可以 被使用网格容器 [`grid-template-areas`](http://www.css88.com/archives/8510#prop-grid-template-areas) 属性创建的模板进行引用。 另外，这个属性可以用作[`grid-row-start`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) + [`grid-column-start`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) + [`grid-row-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) + [`grid-column-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end)的缩写。

值：

- <name>：你所选的名称
- <row-start> / <column-start> / <row-end> / <column-end>：数字或分隔线名称

```CSS
CSS 代码:.item {    grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;}
```

示例：

作为为网格项分配名称的一种方法：

```CSS
CSS 代码:.item-d {    grid-area: header}
```

作为[`grid-row-start`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) + [`grid-column-start`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) + [`grid-row-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) + [`grid-column-end`](http://www.css88.com/archives/8510#prop-grid-column-row-start-end) 属性的缩写形式

```CSS
CSS 代码:.item-d {    grid-area: 1 / col4-start / last-line / 6}
```

![网格区域](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-start-end-d.png)

### justify-self

沿着 行轴线(row axis) 对齐 网格项 内的内容（ 相反的属性是 [`align-self`](http://www.css88.com/archives/8510#prop-align-self) ，沿着列轴线(column axis)对齐）。此值适用于单个网格项内的内容。

值：

- **start**：将内容对齐到网格区域的左侧
- **end**：将内容对齐到网格区域的右侧
- **center**：将内容对齐到网格区域的中间（水平居中）
- **stretch**：填充整个网格区域的宽度（这是默认值）

示例：

```CSS
CSS 代码:.item-a {    justify-self: start;}
```

![左对齐，将 justify-self 设置为 start 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-self-start.png)

```CSS
CSS 代码:.item-a {  justify-self: end;}
```

![右对齐，将 justify-self 设置为 end 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-self-end.png)

```CSS
CSS 代码:.item-a {    justify-self: center;}
```

![水平居中对齐，将 justify-self 设置为 center 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-self-center.png)

```CSS
CSS 代码:.item-a {    justify-self: stretch;}
```

![填充宽度，将 justify-self 设置为 stretch 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-justify-self-stretch.png)

要为网格中的所有网格项设置 行轴线(row axis) 线上对齐方式，也可以在 网格容器 上设置 [`justify-items`](http://www.css88.com/archives/8510#prop-justify-items)属性。

### align-self

沿着 列轴线(column axis) 对齐 网格项 内的内容（ 相反的属性是 [`justify-self`](http://www.css88.com/archives/8510#prop-justify-self) ，沿着 行轴线(row axis) 对齐）。此值适用于单个网格项内的内容。

值：

- **start**：将内容对齐到网格区域的顶部
- **end**：将内容对齐到网格区域的底部
- **center**：将内容对齐到网格区域的中间（垂直居中）
- **stretch**：填充整个网格区域的高度（这是默认值）

```CSS
CSS 代码:.item{  align-self: start | end | center | stretch;}
```

示例：

```CSS
CSS 代码:.item-a {    align-self: start;}
```

![顶部对齐，将 align-self 设置为 start 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-self-start-13.png)

```CSS
CSS 代码:.item-a {  align-self: end;}
```

![底部对齐，将 align-self 设置为 end 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-self-end.png)

```CSS
CSS 代码:.item-a {    align-self: center;}
```

![垂直居中对齐，将 align-self 设置为 center 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-self-center.png)

```CSS
CSS 代码:.item-a {    align-self: stretch;}
```

![填充高度，将 align-self 设置为 stretch 的例子](http://newimg88.b0.upaiyun.com/newimg88/2017/12/grid-align-self-stretch.png)

要为网格中的所有网格项设置 列轴线(column axis) 上的对齐方式，也可以在 网格容器 上设置 [`align-items`](http://www.css88.com/archives/8510#prop-align-items)属性。

## 列子

```html
<html lang="en">

<head>
    <style>
        .container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: 50px 350px 50px;
            grid-gap: 5px;
            grid-template-areas: ". h h h h h h h h h h ." "c c c c c c c c c c m m" ". f f f f f f f f f f .";
        }

        @media screen and (max-width: 640px) {
            .container {
                grid-template-areas: "m m m m m m h h h h h h" "c c c c c c c c c c c c" "f f f f f f f f f f f f";
            }
        }

        .header {
            grid-area: h;
        }

        .menu {
            grid-area: m;
        }

        .content {
            grid-area: c;
        }

        .footer {
            grid-area: f;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">HEADER</div>
        <div class="menu">MENU</div>
        <div class="content">CONTENT</div>
        <div class="footer">FOOTER</div>
    </div>
</body>
<!-- <script src="./index.js"></script> -->

</html>
```

![](/home/xsh/桌面/markdown/imgs/1_NDx9-qlf2I3YHv5Kjs4HOQ.gif)

