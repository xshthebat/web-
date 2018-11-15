# flex布局

## FFC

FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display 值为 flex 或者inline-flex 的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少 safari 和 chrome 还是OK的，毕竟这俩在移动端才是王道。

Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。

伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。

## flex背景及兼容性

lexbox 布局（也叫Flex布局，弹性盒子布局）模块目标在于提供一个更有效地布局、对齐方式，并且能够使父元素在子元素的大小未知或动态变化情况下仍然能够分配好子元素之间的间隙。

Flex布局的主要思想是使父元素能够调节子元素的高度、宽度和排布的顺序，从而能够最好地适应可用布局空间（能够适应不同的设备和不同大小的屏幕）。设定为flex布局的父元素（容器）能够放大子元素使之尽可能填充可用空间，也可以收缩子元素使之不溢出。

最重要的是，与传统布局中块状元素按照垂直方向摆放，行内元素按照水平方向摆放相比，flex布局是无方向的。传统布局在应对大型复杂的布局时缺乏灵活性，特别是在改变方向、改变大小、伸展、收缩等等方面。

**注**: Flex 布局比较适合小规模的布局，Gird布局面向更大规模的布局。

![](/home/xsh/桌面/markdown/imgs/8712d713c7d0b884a5cb9770efc422b4 (1).jpg)

基本兼容

首先看一下Flex布局的三个版本

- (new)是指标准中最近的语法(e.g. `display:flex;`)。
- (tweener)是指2011年以后非官方的临时版本(e.g. `display:flexbox;`)。
- (old)是指2009年以后的旧语法(e.g. `display:box;`)

##  flex布局介绍

### flex布局是什么

![](/home/xsh/桌面/markdown/imgs/0dd26d8e99257ff36443.png)

\

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。

```css
.box{
  display: flex;
}
```

行内元素也可以使用Flex布局。

```css
.box{
  display: inline-flex;
}
//zxx: flex和inline-flex区别在于，inline-flex容器为inline特性，因此可以和图片文字一行显示；flex容器保持块状特性，宽度默认100%，不和内联元素一行显示。
```

Webkit内核的浏览器，必须加上-webkit前缀。

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

这些盒子元素称为flex容器,子元素为flex子项



### 基本概念

Flex布局是一个完整的模块而不是一个单独的属性，它包括了完整的一套属性。其中有的属性是设置在容器（container，也可以叫做父元素，称为`flex container`）上，有的则是设置在容器的项目上（item，也可以叫做子元素，称为`flex items`）上。



如果我们可以说传统布局是建立在块状元素垂直流和行内元素水平流上的，那么flex布局就是建立在"flex-flow方向"上的，通过下图解释flex布局的主要思想。

![](/home/xsh/桌面/markdown/imgs/3416022087-57c681762836f_articlex.png)

在flex布局中，子元素要么按照主轴也就是`main axis`（从`main-start`到`main-end`）排布，要么按照交叉轴，也就是`cross axis`(从`cross-start`到`cross-end`)排布。

下面介绍几个概念：

- __main axis__: Flex 父元素的主轴是指子元素布局的主要方向轴，注意主轴不一定是水平的，它由属性`flex-direction`来确定主轴是水平还是垂直的（后面会介绍）
- __main-start|main-end__: 分别表示主轴的开始和结束，子元素在父元素中会沿着主轴从`main-start`到`main-end`排布。
- __main size__: 单个项目占据主轴的长度大小
- __cross axis__: 交叉轴，与主轴垂直。
- __cross-start|cross-end__: 分别表示交叉轴的开始和结束。子元素在交叉轴的排布从`cross-start`开始到`cross-end`。
- __cross size__: 子元素在交叉轴方向上的大小。

### 属性介绍

属性分作用于父元素的属性和作用于子元素的属性两部分介绍。

#### 父元素

##### display

用来定义父元素是一个 flex布局容器。如果设置为`flex`则父元素为块状元素，设置为`inline-flex`父元素呈现为行内元素。

```css
.container {
  display: flex; /* or inline-flex */
}
```

##### flex-direction

`flex-direction`定义flex布局的主轴方向。flex布局是单方向布局，子元素主要沿着水平行或者垂直列布局。

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
    //row横　column纵
}
```

- `row`: 行方向，`flex-direction`的默认值，在`ltr`(left to right， 从左到右)排版方式下从左到右排列，在`rtl`(right to left， 从右到左)排版方式下从右到左排列。
- `row-reverse`: 行反方向，在`ltr`中从右向左，在`rtl`中从左到右。
- `column`: 列方向，与`row`相似，只是从上到下。
- `column-reverse`: 列反方向，与`row-reverse`相似，只是从下到上。

##### flex-wrap



```css
flex-wrap: nowrap | wrap | wrap-reverse;
//不换行　换行　反向换行
```



默认情况下，flex布局中父元素会把子元素尽可能地排在同一行，通过设置`flex-wrap`来决定是否允许子元素这行排列。

###### nowrap

默认值，表示单行显示，不换行。于是很容易出现宽度溢出的场景，其渲染表现比较复杂，需要对CSS3宽度有一定了解，可以阅读“

理解CSS3 max/min-content及fit-content等width值

”这篇文章。具体表现如下（以水平布局举例）：

- flex子项最小内容宽度`min-content`之和大于flex容器宽度，则内容溢出，表现和`white-space:nowrap`类似。

- 如果flex子项最小内容宽度

  ```
  min-content
  ```

  之和小于flex容器宽度，则：

  - flex子项默认的`fit-content`宽度之和大于flex容器宽度，则flex子项宽度收缩，正好填满flex容器，内容不溢出。
  - flex子项默认的`fit-content`宽度之和小于flex容器宽度，则flex子项以`fit-content`宽度正常显示，内容不溢出。

在下面案例中，示意的图片默认有设置`max-width:100%`，flex子项div没有设置宽度，因此，flex子项最小宽度是无限小，表现为图片宽度收缩显示。如果我们取消`max-width:100%`样式，则此时flex子项最小宽度就是图片宽度，就可以看到图片溢出到了flex容器之外。

###### wrap

宽度不足换行显示。

###### wrap-reverse

宽度不足换行显示，但是是从下往上开始，也就是原本换行在下面的子项现在跑到上面。

##### flex-flow

`flex-flow`属性是`flex-direction`和`flex-wrap`的缩写，表示flex布局的flow流动特性，语法如下：

```css
flex-flow: <‘flex-direction’> || <‘flex-wrap’>
```

```css
.container {
    display: flex;
    flex-flow: row-reverse wrap-reverse;
}
```

`flex-flow`是`flex-direction`和`flex-wrap`属性的缩写形式。默认值是`row,nowrap`。

##### justify-content

`justify-content`属性定义了子元素沿主轴方向的对齐方式，用来当子元素大小最大的时候，分配主轴上的剩余空间。也可以当子元素超出主轴的时候用来控制子元素的对齐方式

```css
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
```

###### flex-start

默认值，朝主轴开始的方向对齐

###### flex-end

 朝主轴结束的方向对齐。

###### center

沿主轴方向居中。

###### space-between

沿主轴两端对齐，第一个子元素在主轴起点，最后一个子元素在主轴终点



![space-between分布效果示意](/home/xsh/桌面/markdown/imgs/space-between.svg)

###### space-around

主轴子元素之间均匀分布。要注意的是子元素看起来间隙是不均匀的，第一个子元素和最后一个子元素离父元素的边缘有一个单位的间隙，但两个子元素之间有两个单位的间隙，因为每个子元素的两侧都有一个单位的间隙。

around是环绕的意思，意思是每个flex子项两侧都环绕互不干扰的等宽的空白间距，最终视觉上边缘两侧的空白只有中间空白宽度一半。使用抽象图形示意如下：



![space-around分布效果示意](/home/xsh/桌面/markdown/imgs/space-around.svg)

###### space-evenly

evenly是匀称、平等的意思。也就是视觉上，每个flex子项两侧空白间距完全相等。使用抽象图形示意如下：

![space-evenly分布效果示意](/home/xsh/桌面/markdown/imgs/space-evenly.svg)

##### align-items

`align-items`中的`items`指的就是flex子项们，因此`align-items`指的就是flex子项们相对于flex容器在垂直方向上的对齐方式，大家是一起顶部对齐呢，底部对齐呢，还是拉伸对齐呢



`align-items`定义了子元素在交叉轴方向的对齐方向，这是在每个子元素仍然在其原来所在行的基础上所说的。可以看作是交叉轴上的`justify-content`属性;

```css
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

###### stretch

默认值。flex子项拉伸。在演示中我们可以看到白蓝径向渐变背景区域是上下贯穿flex容器的，就是因为flex子项的高度拉伸到容器高度导致。**如果flex子项设置了高度，则按照设置的高度值渲染，而非拉伸**。

###### flex-start

逻辑CSS属性值，与文档流方向相关。默认表现为容器顶部对齐。

###### flex-end

逻辑CSS属性值，与文档流方向相关。默认表现为容器底部对齐。

###### center

表现为垂直居中对齐。

###### baseline

表现为所有flex子项都相对于flex容器的基线（[字母x的下边缘](https://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/)）对齐。

##### align-content

`align-content`是当父元素所包含的行在交叉轴方向有空余部分时如何分配空间。与`justify-content`在主轴上如何对单个子元素对齐很相似。

`align-content`可以看成和`justify-content`是相似且对立的属性，`justify-content`指明水平方向flex子项的对齐和分布方式，而`align-content`则是指明垂直方向每一行flex元素的对齐和分布方式。如果所有flex子项只有一行，则`align-content`属性是没有任何效果的。

```css
align-content: stretch | flex-start | flex-end | center | space-between | space-around | space-evenly;

```

###### stretch

默认值。每一行flex子元素都等比例拉伸。例如，如果共两行flex子元素，则每一行拉伸高度是50%。

###### flex-start

逻辑CSS属性值，与文档流方向相关。默认表现为顶部堆砌。(会拉伸)

###### flex-end

逻辑CSS属性值，与文档流方向相关。默认表现为底部堆放。(会拉伸)

###### center

表现为整体垂直居中对齐。(会拉伸)

###### space-between

表现为上下两行两端对齐。剩下每一行元素等分剩余空间。(会拉伸)

###### space-around

每一行元素上下都享有独立不重叠的空白空间。(会拉伸)

###### space-evenly

每一行元素都完全上下等分。(会拉伸)

#### 子元素属性

##### order

我们可以通过设置`order`改变某一个flex子项的排序位置。

```css
order: <integer>; /* 整数值，默认值是 0 */
```

所有flex子项的默认`order`属性值是0，因此，如果我们想要某一个flex子项在最前面显示，可以设置比0小的整数，如`-1`就可以了。

##### flex-grow(都设置按比分配大小,一个设置0不变,1占满,(0～1)/1按剩余分配)

`flex-grow`属性中的grow是扩展的意思，扩展的就是flex子项所占据的宽度，扩展所侵占的空间就是除去元素外的剩余的空白间隙。

```css
flex-grow: <number>; /* 数值，可以是小数，默认值是 0 */
```

`flex-grow`不支持负值，默认值是0，表示不占用剩余的空白间隙扩展自己的宽度。如果`flex-grow`大于0，则flex容器剩余空间的分配就会发生，具体规则如下：

- 所有剩余空间总量是1。

- 如果只有一个flex子项设置了

  ```
  flex-grow
  ```

  属性值：

  - 如果`flex-grow`值小于1，则扩展的空间就总剩余空间和这个比例的计算值。
  - 如果`flex-grow`值大于1，则独享所有剩余空间。

  具体可参见下面“grow案例1”。

- 如果有多个flex设置了

  ```
  flex-grow
  ```

  属性值：



  - 如果`flex-grow`值总和小于1，则每个子项扩展的空间就总剩余空间和当前元素设置的`flex-grow`比例的计算值。
  - 如果`flex-grow`值总和大于1，则所有剩余空间被利用，分配比例就是`flex-grow`属性值的比例。例如所有的flex子项都设置`flex-grow:1`，则表示剩余空白间隙大家等分，如果设置的`flex-grow`比例是1:2:1，则中间的flex子项占据一半的空白间隙，剩下的前后两个元素等分。



##### flex-shrink(按比缩小)

shrink是“收缩”的意思，`flex-shrink`主要处理当flex容器空间不足时候，单个元素的收缩比例。

```css
flex-shrink: <number>; /* 数值，默认值是 1 */
```

`flex-shrink`不支持负值，默认值是1，也就是默认所有的flex子项都会收缩。如果设置为0，则表示不收缩，保持原始的`fit-content`宽度。

`flex-shrink`的内核跟`flex-grow`很神似，`flex-grow`是空间足够时候如何利用空间，`flex-shrink`则是空间不足时候如何收缩腾出空间。总有点CP的味道。

两者的规则也是类似。已知flex子项不换行，且容器空间不足，不足的空间就是“完全收缩的尺寸”：

- 如果只有一个flex子项设置了

  ```
  flex-shrink
  ```

  ：

  - `flex-shrink`值小于1，则收缩的尺寸不完全，会有一部分内容溢出flex容器。
  - `flex-shrink`值大于等于1，则收缩完全，正好填满flex容器。

- 如果多个flex子项设置了

  ```
  flex-shrink
  ```

  ：

  - `flex-shrink`值的总和小于1，则收缩的尺寸不完全，每个元素收缩尺寸占“完全收缩的尺寸”的比例就是设置的`flex-shrink`的值。
  - `flex-shrink`值的总和大于1，则收缩完全，每个元素收缩尺寸的比例和`flex-shrink`值的比例一样。下面案例演示的就是此场景



#####  flex-basis

`flex-basis`定义了在分配剩余空间之前元素的默认大小。相当于对浏览器提前告知：浏览器兄，我要占据这么大的空间，提前帮我预留好。

```
flex-basis: <length> | auto; /* 默认值是 auto */
```

默认值是`auto`，就是自动。有设置`width`则占据空间就是`width`，没有设置就按内容宽度来。

如果同时设置`width`和`flex-basis`，就渲染表现来看，会忽略`width`。flex顾名思义就是弹性的意思，因此，实际上不建议对flex子项使用`width`属性，因为不够弹性。

**当剩余空间不足的时候，flex子项的实际宽度并通常不是设置的`flex-basis`尺寸，因为flex布局剩余空间不足的时候默认会收缩。**

##### flex

`flex`属性是`flex-grow`，`flex-shrink`和`flex-basis`的缩写。

```css
flex: none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```

其中第2和第3个参数（`flex-shrink`和`flex-basis`）是可选的。默认值为`0 1 auto`。

第2个flex子项设置`flex:none`或者`flex:auto`，我们看看实时布局效果会有怎样的变化：

- `flex`默认值等同于`flex:0 1 auto`；
- `flex:none`等同于`flex:0 0 auto`；
- `flex:auto`等同于`flex:1 1 auto`；

##### align-self

`align-self`指控制单独某一个flex子项的垂直对齐方式，写在flex容器上的这个`align-items`属性，后面是items，有个s，表示子项们，是全体；这里是self，单独一个个体。其他区别不大，语法几乎一样：

```css
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

唯一区别就是`align-self`多了个`auto`（默认值），表示继承自flex容器的`align-items`属性值。其他属性值含义一模一样，如下案例示意：

首先我们设置flex容器`baseline`对齐，然后点击下面的单选框，给第2个flex子项设置不同`align-self`属性值，观察其表现：

首先我们设置flex容器`baseline`对齐，然后点击下面的单选框，给第2个flex子项设置不同`align-self`属性值，观察其表现：

## 示例

### 示例一：水平垂直居中

我们从一个非常非常简单的例子开始，解决一个我们经常会遇到的问题：水平垂直居中。如果使用flex布局会非常简单。

```css
.parent {
  display: flex;
  height: 300px; /* 随意设定大小 */
}

.child {
  width: 100px;  /* 随意设定大小，比父元素要小 */
  height: 100px; /* 同上 */
  margin: auto;  /* 见证奇迹的时刻 */
}
```

这个主要原因是，在flex布局的父元素中设置`margin`为`auto`会自动吸收额外的空间，所以设置水平垂直的`margin`都为`auto`会使子元素在水平垂直方向上都完美居中。

### 示例二：响应式初体验

现在我们考虑用更多的属性。考虑有6个子元素，有固定的大小，但是我们希望他们能够在改变浏览器宽度的时候仍然可以在水平轴上完美地显示（注意在不使用媒体查询的前提下）。

```css
flex-container {
  /* 首先我们先创建一个flex布局上下文 */
  display: flex;
  
  /* 然后我们定义flex方向和是否允许子元素换行
   * 注意这与以下代码等价：
   * flex-direction: row;
   * flex-wrap: wrap;
   */
  flex-flow: row wrap;
  
  /* 然后我们定义在剩余空间上子元素如何排布 */
  justify-content: space-around;
}
```

### 示例三：响应式导航栏

让我们再尝试一些别的东西。假设我们有一个向右对齐的导航栏在我们网页的最上端，但是我们希望它在中屏上显示时为居中，在小屏上显示为单列。同样使用flex布局，实现起来会很简单。

```css
navigation {
  display: flex;
  flex-flow: row wrap;
  /* 这里设置对齐主轴方向的末端 */
  justify-content: flex-end;
}

/* 中屏 */
@media all and (max-width: 800px) {
  .navigation {
    /* 当在中屏上，设置居中，并设置剩余空间环绕在子元素左右 */
    justify-content: space-around;
  }
}

/* 小屏 */
@media all and (max-width: 500px) {
  .navigation {
    /* 在小屏上，我们不在使用行作为主轴，而以列为主轴 */
    flex-direction: column;
  }
}
```

### 示例四：移动优先的三栏布局

我们通过灵活使用flex布局尝试一些更好玩的布局。来做一个移动优先的3列布局并带有全屏宽的header和footer。

```css
wrapper {
  display: flex;
  flex-flow: row wrap;
}

/* 我们要告诉所有的子元素宽度 100% */
.header, .main, .nav, .aside, .footer {
  flex: 1 100%;
}
@media all and (min-width: 600px) {
  /* 我们要告诉两边的sidebar共享一个行 */
  .aside { flex: 1 auto; }
}

/* 大屏幕 */
@media all and (min-width: 800px) {
  /* 通过order设定各个面板的渲染顺序
   * 告诉主要面板元素占用侧栏两倍的空间
   */
  .main { flex: 2 0px; }
  
  .aside-1 { order: 1; }
  .main    { order: 2; }
  .aside-2 { order: 3; }
  .footer  { order: 4; }
}
```

