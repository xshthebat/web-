CSS盒模型

## CSS盒模型是什么(box-sizing border-box ie|| content-box 标准|| inherit继承)

当对一个文档进行布局(laying out)的时候，浏览器渲染引擎会根据CSS-Box模型（CSS Basic Box model）将所有元素表示为一个矩形盒子（box)。CSS决定这些盒子的大小，位置以及属性（颜色，背景，边框尺寸...).

![](/home/xsh/桌面/markdown/imgs/79178-12f8c9590705a099.png)

在CSS中，使用标准**盒模型**描述这些矩形盒子中的每一个。这个模型描述了元素所占空间的内容。每个盒子有四个边：**外边距边**, **边框边**, **内填充边** 与 **内容边** 包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素





## 盒子模型区别

#### 我们在编写页面代码时应尽量使用标准的W3C模型(需在页面中声明DOCTYPE类型)，这样可以避免多个浏览器对同一页面的不兼容。

#### 因为若不声明DOCTYPE类型，IE浏览器会将盒子模型解释为IE盒子模型，FireFox等会将其解释为W3C盒子模型；**若在页面中声明了DOCTYPE类型，所有的浏览器都会把盒模型解释为W3C盒模型。**



![标准盒模型](/home/xsh/桌面/markdown/imgs/3534156-e2309fc21e18ce8d.webp)

![IE盒模型](/home/xsh/桌面/markdown/imgs/3534156-55b43078fcef0bec.webp)

IE模型(IE8及以下)和标准模型唯一的区别是内容计算方式的不同

js也是

html

```html
<div id="parent">
    <div id="box">
        <div id="child"></div>
    </div>
</div>
```

css

```css
#box {
    width: 400px;
    height: 400px;
    margin: 70px;
    padding: 20px;
    border: 5px solid black;
}
#child {
    width: 100%;
    height: 100%;
}
```

标准样式 

元素

![](/home/xsh/桌面/markdown/imgs/1277324224-5975afeb3aa16_articlex.png)

父元素

   ![](/home/xsh/桌面/markdown/imgs/343974597-5975af0eacab8_articlex.png)   

子元素

![](/home/xsh/桌面/markdown/imgs/2938292116-5975af9ca69e6_articlex.png)

标准模式，我们设置#box的宽高为400px，其对应的content（内容区）宽高为400px，

父元素的高度为#box内容区高度+上下border+上下padding，

结果为450px子元素的高度为#box内容区高度

然后我们再看下怪异模式

css添加代码

```css
div {
    box-sizing: border-box;
}
```

元素
![图片描述](/home/xsh/桌面/markdown/imgs/3085329987-5975b192a4225_articlex.png)

父元素
![图片描述](/home/xsh/桌面/markdown/imgs/1171677838-5975b1ba954bb_articlex.png)

子元素
![图片描述](/home/xsh/桌面/markdown/imgs/1730842966-5975b1d179912_articlex.png)

标准模式，我们设置#box的宽高为400px，其对应的content（内容区）宽高却是
width-上下padding-上下border，结果为350px;

父元素的高度为#box内容区高度+上下border+上下padding，结果为400px
子元素的高度为#box内容区高度350px

**标准盒模型中，css设置width为x，对应元素content便为x**
**而在怪异模式中，元素的content宽度是由x减左右padding，再减左右border得出的**





## box-sizing(设置css盒模型)

#### 

```css
box-sizing:border-box || content-box || inherit

```

- 当使用content-box时：页面将采用标准模式来解析计算，content-box也是默认模式
- 当使用border-box时，页面将采用怪异模式解析计算，怪异模式也称为IE模式
- 当使用inherit时：页面将从父元素继承box-sizing的值

### javascript如何设置获取盒模型对应的宽和高

1. `dom.style.width/height` 只能取到行内样式的宽和高，style标签中和link外链的样式取不到。
2. `dom.currentStyle.width/height` 取到的是最终渲染后的宽和高，只有IE支持此属性。
3. `window.getComputedStyle(dom).width/height` 同（2）但是多浏览器支持，IE9以上支持。
4. `dom.getBoundingClientRect().width/height` 也是得到渲染后的宽和高，大多浏览器支持。IE9以上支持，除此外还可以取到相对于视窗的上下左右的距离

5. dom.offsetWidth/offsetHeight 　　这个就没什么好说的了，最常用的，也是兼容最好的。

拓展 各种获得宽高的方式

- 获取屏幕的高度和宽度（屏幕分辨率）： window.screen.height/width
- 获取屏幕工作区域的高度和宽度（去掉状态栏）： window.screen.availHeight/availWidth
- 网页全文的高度和宽度： document.body.scrollHeight/Width
- 滚动条卷上去的高度和向右卷的宽度： document.body.scrollTop/scrollLeft
- 网页可见区域的高度和宽度（不加边线）： document.body.clientHeight/clientWidth
- 网页可见区域的高度和宽度（加边线）： document.body.offsetHeight/offsetWidth

## BFC

### bfc定义

**块格式化上下文（Block Formatting Context，BFC）** 是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

我们常说的文档流其实分为定位流、浮动流和普通流三种。而**普通流其实就是指BFC中的FC**。

**FC**是formatting context的首字母缩写，直译过来是格式化上下文，它**是页面中的一块渲染区域**，有一套渲染规则，决定了其**子元素如何布局，以及和其他元素之间的关系和作用。**

常见的FC有BFC、IFC（行级格式化上下文），还有GFC（网格布局格式化上下文）和FFC（自适应格式化上下文），这里就不再展开了

### 产生bfc(根元素,float不为none,position:absolute|fixed,display:inline-block,table-cell,table-caption,flex,inline-flex,overflow不为visible)

- 根元素或包含根元素的元素
- 浮动元素（元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`）
- 绝对定位元素（元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block`）
- 表格单元格（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table-cell`，HTML表格单元格默认为该值）
- 表格标题（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-caption`，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table、``table-row`、 `table-row-group、``table-header-group、``table-footer-group`（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 `inline-table`）
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible` 的块元素

关于overflow:visible：

> overflow:visible的块盒就不产生BFC，不但不产生BFC，啥FC都不产生，它的子元素直接搞进自己外层的BFC鸟：：
> overflow:visible这个限制只对所谓的块盒（既包含块级盒、自己又是块级盒）存在，有些盒内部也能包含块级元素，但是它本身又不是块级元素（比如display为table-cell、inline-block、或者盒本身是flex item等），因为外面不是BFC，所以它们不论如何一定会给包含的块级盒创建一个新的BFC出来。

- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content`或 `strict` 的元素
- 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `flex` 或 `inline-flex`元素的直接子元素）
- 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-width) 不为 `auto，包括 ``column-count` 为 `1`）
- `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）。

### BFC规则(内部块垂直放置,box垂直方向距离margin决定,且相邻margin会重叠,每个元素margin-box左边和包含块border-box左边相接处即使浮动,bfc区域不会和float重叠,计算bfc高度,浮动元素也参与,里面的布局不会影响外面的布局)

![](/home/xsh/桌面/markdown/imgs/bfc.jpg)

1.内部的Box会在垂直方向，一个接一个地放置。bfc容器布局内部是从容器顶部开始

2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠

![](/home/xsh/桌面/markdown/imgs/20170723131806914.png)

3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。(块级元素单独成行) 

4.BFC的区域不会与float box重叠。

5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

6.计算BFC的高度时，浮动元素也参与计算

### BFC作用

1. 自适应两栏布局 （原理同文字环绕,bfc不和float重叠,每个元素的*margin-box*的左边， 与包含块*border-box*的左边相接触）

````html
<style>
    body {
        width: 300px;
        position: relative;
    }
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f66;
    }
    .main {
        height: 200px;
        background: #fcc;
        overflow: hidden;
    }
</style>
<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>
````

![](/home/xsh/桌面/markdown/imgs/1661171205-57c25a55e227f_articlex.png)





2. 可以包含浮动元素——清除内部浮动解决父元素塌陷(清楚内部浮动)

3. 分属于不同的BFC时可以阻止margin重叠

4. 阻止文字换行

![](/home/xsh/桌面/markdown/imgs/20170723134335089.png)

子元素全部变成bfc

# 　IFC的产生

行内级格式化上下文用来规定行内级盒子的格式化规则。

先来看看如何生成一个 IFC ：

IFC 只有在一个块级元素中**仅包含**内联级别元素时才会生成。

### IFC

行内级格式化上下文用来规定行内级盒子的格式化规则。

先来看看如何生成一个 IFC ：

IFC 只有在一个块级元素中**仅包含**内联级别元素时才会生成。

line box默认情况下左边框与containing block的左边框接触，右边框与containing block的右边框接触。若存在floated兄弟盒子，则line box的宽度为containing block的宽度减去floated-box的outer-box的宽度。

![](/home/xsh/桌面/markdown/imgs/347002-20160319102342459-789553658.png)



#### 布局规则(水平一个个放置,垂直从包含块的顶部,只有水平padding,border,margin,垂直方向可能通过不同方式对其,vertical-align,baseline对齐,baseline对齐,float会占据IFC空间,当宽度多时,根据内部text-align确定,若宽度少,line box会被分割,若不能分割white-spalce,word-breaking机制被禁用.)

1. 内部的盒子会在水平方向，一个接一个地放置。
2. 这些盒子垂直方向的起点从包含块盒子的顶部开始。
3. 摆放这些盒子的时候，它们在水平方向上的 padding、border、margin 所占用的空间都会被考虑在内。
4. 在垂直方向上，这些框可能会以不同形式来对齐（vertical-align）：它们可能会使用底部或顶部对齐，也可能通过其内部的文本基线（baseline）对齐。
5. 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和存在的浮动来决定。
6. IFC中的 line box 一般左右边都贴紧其包含块，但是会因为float元素的存在发生变化。float 元素会位于IFC与与 line box 之间，使得 line box 宽度缩短。
7. IFC 中的 line box 高度由 CSS 行高计算规则来确定，同个 IFC 下的多个 line box 高度可能会不同（比如一行包含了较高的图片，而另一行只有文本）
8. 当 inline-level boxes 的总宽度少于包含它们的 line box 时，其水平渲染规则由 `text-align` 属性来确定，如果取值为 `justify`，那么浏览器会对 inline-boxes（注意不是inline-table 和 inline-block boxes）中的文字和空格做出拉伸。
9. 当一个 inline box 超过 line box 的宽度时，它会被分割成多个boxes，这些 boxes 被分布在多个 line box 里。如果一个 inline box 不能被分割（比如只包含单个字符，或 word-breaking 机制被禁用，或该行内框受 white-space 属性值为 nowrap 或 pre 的影响），那么这个 inline box 将溢出这个 line box
10. IFC`中的`line box`一般左右都贴紧整个`IFC`，但是会因为`float`元素而扰乱。`float`元素会位于`IFC`与与`line box`之间，使得`line box`宽度缩短。
11. IFC`中时不可能有块级元素的，当插入块级元素时（如`p`中插入`div`）会产生两个匿名块与`div`分隔开，即产生两个`IFC`，每个`IFC`对外表现为块级元素，与`div`垂直排列

### IFC的应用

1. 水平居中：当一个块要在环境中水平居中时，设置其为`inline-block`则会在外层产生`IFC`，通过`text-align`则可以使其水平居中。
2. 垂直居中：创建一个`IFC`，用其中一个元素撑开父元素的高度，然后设置其`vertical-align:middle`，其他行内元素则可以在此父元素下垂直居中。



 

## 扩展css实现三角形

```css
#item {
	width: 0;
	height: 0;
	border-left: 50px solid transparent; 
	border-right: 50px solid transparent;
	border-top: 50px solid transparent;
	border-bottom: 50px solid blue;
	background: white;
}
```

都是反向三角

