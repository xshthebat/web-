# display

## display的所有属性

```css
/* CSS 1 */
display: none;
display: inline;
display: block;
display: list-item;
/* CSS 2.1 */
display: inline-block;
display: table;
display: inline-table;
display: table-cell;
display: table-column;
display: table-column-group;
display: table-footer-group;
display: table-header-group;
display: table-row;
display: table-row-group;
display: table-caption;
/* CSS 2.1 */
/* CSS 3 */
display: inline-list-item;
display: flex;
display: box;
display: inline-flex;
display: grid;
display: inline-grid;
display: ruby;
display: ruby-base;
display: ruby-text;
display: ruby-base-container;
display: ruby-text-container;
/* CSS 3 */
/* Experimental values */
display: contents;
display: run-in;
/* Experimental values */
/* Global values */
display: inherit;
display: initial;
display: unset;
```

### 外部值

所谓外部值，就是说这些值只会直接影响一个元素的外部表现，而不影响元素里面的儿子级孙子级元素的表现。

#### display: block; 

个值大家不陌生，我们最熟悉的`<div>`缺省就是这个值，最基本的块级元素，属于`css`入门初学者都知道的概念，只要是容器类型的元素基本都是这个值。除`<div>`之外，还有`<h1>`到`<h6>`，`<p>`，`<form>`，`<header>`，`<footer>`，`<section>`，`<article>`天生都是这个值。

#### display: inline;

这个值大家也不陌生，行内元素嘛，只要是个行内元素都是这个值，最典型的是`<span>`，还有`<a>`，`<img>`，以及古代`html`语言当中的`<b>`，`<i>`都属于这一类型。

#### display: run-in;

个值有点奇怪，通常没人用它，但你可以知道它。因为除了`IE`和`Opera`支持它以外，其他所有主流浏览器包括`Chrome`, `Safari`, `Firefox`全都对它置若罔闻。这东西说白了也没什么神秘，它的意思就是说如果我们命令一个元素`run-in`，中文意思就是『`闯入`』！那么这个元素就直接闯入下一行。比如说这样：

![](/home/xsh/桌面/160f40fdf1cba7ae.png)

```html
<div class="a">aaa</div>
<div class="b">bbb</div>
.a {
  font-size: 36px;
  display: run-in;
}
```

### 内部值

#### display: flow;

含义不清，实验室阶段产品，`Chrome`不支持。如果还不够说服你暂时不要碰它的话，试着理解以下英文原文：

#### display: flow-root;(清除浮动)

不同于刚才谈到的`flow`，现在用`flow-root`的渐渐多起来了，因为它可以撑起被你`float`掉的块级元素的高度。外容器本来是有高度的，就像这样：

![](/home/xsh/桌面/160f40fdf201058f.png)

```css
<div class="container container1">
      <div class="item"></div>
      Example one
    </div>
    .container {
        border: 2px solid #3bc9db;
        border-radius: 5px;
        background-color: #e3fafc;
        width: 400px;
        padding: 5px;
    }
    .item {
        height: 100px;
        width: 100px;
        background-color: #1098ad;
        border: 1px solid #0b7285;
        border-radius: 5px;
    }
```

#### display: table;

这一个属性，以及下面的另外`8`个与`table`相关的属性，都是用来控制如何把`div`显示成`table`样式的，因为我们不喜欢`<table>`这个标签嘛，所以我们想把所有的`<table>`标签都换成`<div>`标签。`<div>`有什么好？无非就是能自动换行而已，但其实你完全可以做一个`<table><tr><td>`标签，把它全都替换成`display: block;`也可以自动折行，只不过略微麻烦而已。

#### display: flex;

敲黑板，划重点！作为新一代的前端工程师，这个属性你必须烂熟于胸衣中，哦，错了，是胸中。`display: flex;`以及与它相关联的一系列属性：`flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `align-items`, `align-content`，并且包括所有这些属性的取值，都是你需要反复研磨的。`2009`年诞生的这个属性可以说是不亚于`css`界一场蒸汽机诞生一样的工业革命，它的诞生标志着马车一样的`float`被彻底抛进历史的垃圾堆

#### display: grid;

会`flex`很吊吗？会`grid`更吊哦！也许这就是下次前端面试的重点哦！

`grid`布局，中文翻译为`网格布局`。学习`grid`布局有两个重点：一个重点是`grid`布局引入了一个全新的单位：`fr`，它是`fraction`（`分数`）的缩写，所以从此以后，你的兵器库里除了`px`, `em`, `rem`, `百分比`这些常见兵器以及`vw`, `vh`这些新式武器之外，又多了一样旁门暗器`fr`，要想用好`grid`，必须充分掌握`fr`。另一个重点是`斜杠操作符`，这可不是`分数`哦。它表示的是`起始位置`和`结束位置`。比如说`3 / 4`，这可不是`四分之三`的意思，这是指一个元素从第`3`行开始，到第`4`行结束，但又不包括第`4`行

同样，与`grid`相关联的也有一大堆旁门属性，是在学习`display: grid;`的同时必须掌握的。包括`grid`, `grid-column-start`, `grid-column-end`, `grid-row-start`, `grid-row-end`, `grid-template`, `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `grid-gap`, `grid-column-gap`, `grid-row-gap`, `grid-auto-columns`, `grid-auto-rows`, `grid-auto-flow`, `grid-column`, `grid-row`。不能详述，关于这个写起来又是一大篇文章。详情还是参考csstrick上[这篇文章](https://link.juejin.im/?target=https%3A%2F%2Fcss-tricks.com%2Fsnippets%2Fcss%2Fcomplete-guide-grid%2F)，讲得非常细致非常清楚。

#### display: ruby;

`ruby`这个取值对于我们亚洲人来说其实是非常有用的一个东西，但是目前除了`Firefox`以外其它浏览器对它的支持都不太好。简而言之，`display: ruby;`的作用就是可以做出下面这样的东西

很好的东西，对吧？如果可以用的话，对我国的小学教育可以有极大的促进。但可惜我们现在暂时还用不了。

`ruby`这个词在英语里的意思是`红宝石`，但在日语里是`ルビ`，翻译成中文是`旁注标记`的意思，我们中文的旁注标记就是汉语拼音。可以想见，这个标准的制定者肯定是日本人，如果是我们中国人的话，那这个标签就不是`ruby`，而是`pinyin`了。还有一个`ruby`语言，发明者也是一个日本人，和`html`里这个`ruby`是两码事，不要搞混了。

`ruby`的语法大致如下：

#### display: subgrid;

`2015`年`8`月`6`日，`W3C`的级联样式单（`CSS`）工作组（`Cascading Style Sheets Working Group`）发布了`CSS网格布局模块第一级`（`CSS Grid Layout Module Level 1`）的工作草案。在这个草案里规定了上一节我们讲到的`display: grid;`的方案。而`display: subgrid;`是属于`2017`年`11`月`9`日发布的非正式的 [CSS网格布局模块第二级](https://link.juejin.im/?target=https%3A%2F%2Fdrafts.csswg.org%2Fcss-grid-2%2F)的内容。所以这是一个非常新的草案，并且围绕它的争议从来也没有断过。

`subgrid`总的思想是说大网格里还可以套小网格，互相不影响。但如果`grid`里可以再套`subgrid`的话，那我`subgrid`里还想再套`subgrid`怎么办？`subsubgrid`吗？况且，到底是`grid: subgrid;`还是`display: subgrid;`这个也没有达成共识，关于此一系列的争议

### 列表值

#### display: list-item;

`display: list-item;`和`display: table;`一样，也是一帮痛恨各种`html`标签，而希望只使用`<div>`来写遍一切`html`的家伙搞出来的鬼东西，实际使用极少，效果就是这样：

看，你用`<ul><li>`能实现的效果，他可以用`<div>`实现出来，就是这个作用。

### 属性值

属性值一般是附属于主值的，比如主值里设置了`display: table;`，就可以在子元素里使用`display: table-row-group;`等等属性，不过并不绝对。关于它们的作用，主要参考主值就够了。

#### display: table-row-group;

#### display: table-header-group;

#### display: table-footer-group;

#### display: table-row;

#### display: table-cell;

这个属性有必要详细说说，因为它完全可以单独应用，用在高度不固定元素的垂直居中上

#### display: table-column-group;

#### display: table-column;

#### display: table-caption;

#### display: ruby-base;

#### display: ruby-text;

#### display: ruby-base-container;

#### display: ruby-text-container;

### 显示值

#### display: contents;

![](/home/xsh/桌面/160f40ffa60fcd3e.png)

你给中间那个`div`加上`display: contents;`之后，它就变成这样了：

![](/home/xsh/桌面/160f40ffdc10bfdb.png)

这就是`display: contents;`的作用，它让子元素拥有和父元素一样的布局方式，仅此而已。

#### display: none;(和visibility:hidden区别,opacity:0)(重排和重绘制)

1、display:none的子孙节点消失，这是由于元素从渲染树中消失造成，visibility:hidden会子孙节点消失是由于继承性，可以设置visibility：visible让子孙节点显示； 

  2、display：none不占据任何空间；visibility：hidden仍占据空间； 

  3、display:none会引起回流和重绘，visibility:hidden会引起重绘。

**opacity:0**

这种方法和visibility:hidden的一个共同点是元素隐藏后依旧占据着空间，但我们都知道，设置透明度为0后，元素只是隐身了，它依旧存在页面中。

### 混合值(bfc)

#### display: inline-block;

#### display: inline-table;

#### display: inline-flex;

#### 

### 全局值

#### display: inherit;

继承父元素的`display`属性。

#### display: initial;

不管父元素怎么设定，恢复到浏览器最初始时的`display`属性。

#### display: unset;

`unset`混合了`inherit`和`initial`。如果父元素设值了，就用父元素的设定，如果父元素没设值，就用浏览器的缺省设定。直接看图最明白：



