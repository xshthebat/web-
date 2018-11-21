

# css属性的继承、初识值、计算值、当前值、应用值可继承的css值

## css属性

我觉得大部分学习前端的人应该都没有按照教科书一般的来学习css，可能是类似搭积木一样，需要什么拿什么，所以可能最对一些基本的概念没有很好的理解，这里列出的是一些css属性的关键概念：

- css属性初始值
- css属性计算值
- css属性应用值
- css属性当前值
- css属性继承

大部分css属性都可以有这个值：inherit 继承父级值 ：initial 初始值，

**inherit 继承父级值**

1. 对于可继承属性而言，直接继承父级的属性，直接父级元素没有设置的话会一级级往上继承，如果都没有就是默认值；
2. 对于非继承属性而已，这个还是要慎用，当然也可以用，可以继承父级元素的属性，但是父级元素可能没有这个属性，所以避免这种情况考虑使用initial初始值比较合理

## 初始值

在 每个CSS属性 定义的概述中已经给出的 初始值 针对不同的 继承或非继承属性 有着不同的含义.

对于继承属性, 初始值 只能 被用于没有指定值的根元素上【因为不是根元素都会继承其他的父元素指定值】.

对于非继承属性 ,初始值可以被用于 任意 没有指定值的元素上.

在CSS3中允许作者使用 initial 关键词明确的设定初始值

## 计算值

一个CSS属性的 计算值 (computed value) 通过以下方式从指定的值计算而来：

处理特殊的值 inherit 和 initial，以及
进行计算，以达到属性摘要中“计算值”行中描述的值。
计算属性的"计算值"通常包括将相对值转换成绝对值(如 em 单位或百分比)。

例如，如一个元素的属性值为 font-size:16px 和 padding-top:2em, 则 padding-top 的计算值为 32px (字体大小的2倍).

然而，有些属性的百分比值会转换成百分比的计算值(这些元素的百分比相对于需要布局后才能知道的值，如 width, margin-right, text-indent, 和 top)。另外，line-height 属性值如是没有单位的数字，则该值就是其计算值。这些计算值中的相对值会在 应用值 确定后转换成绝对值。

计算值的最主要用处是 继承 , 包括 inherit 关键字。

*getComputedStyle() DOM API 返回的 解析值, 可能是 计算值或 应用值。*

##  应用值

CSS 属性的应用值（used value）是完成所有计算后最终使用的值，可以由 window.getComputedStyle 获取。尺寸 (例如 width, line-height) 单位为像素, 简写属性 (例如 background) 与组成属性相符 (例如 background-color，display) 与 position 、float相符，每个 CSS 属性都有值。

### **详情**

计算出CSS属性的最终值有三个步骤。首先，指定值specified value 取自样式层叠 (选取样式表里权重最高的规则), 继承 (如果属性可以继承则取父元素的值)，或者默认值。然后，按规范算出 计算值computed value (例如， span 指定 position: absolute 后display 变为 block)。最后，计算布局(尺寸比如 auto 或 百分数 换算为像素值 )， 结果即 应用值used value。这些步骤是在内部完成的，脚本只能使用 window.getComputedStyle 获得最终的应用值。

### **举例**

没有明确的宽度。指定的宽度: auto (默认). 计算的宽度: auto. 应用的宽度: 998px (举例而言)。
明确的宽度: 50%. 指定的宽度: 50%. 计算的宽度: 50%. 应用的宽度: 447px
明确的宽度: inherit. 指定的宽度: 50%. 计算的宽度: 50%. 应用的宽度: 221px .

**与计算值的区别**

CSS 2.0 只定义了 计算值 computed value 作为属性计算的最后一步。 CSS 2.1 引进了定义明显不同的的应用值，这样当父元素的计算值为百分数时子元素可以显式地继承其高宽。 对于不依赖于布局的 CSS 属性 (例如 display, font-size, line-height)计算值与应用值一样，否则就会不一样 (引自 CSS 2.1 Changes: Specified, computed, and actual values):

## 实际值 

一个CSS属性的实际值（actual value）是应用值（used value）被应用后的近似值。例如，一个用户代理可能只能渲染一个整数像素值的边框（实际值），并且该值可能被强制近似于边框的计算宽度值。

## 继承与非继承

每个 CSS 属性定义 的概述都指出了这个属性是默认继承的 ("Inherited: Yes") 还是默认不继承的 ("Inherited: no")。这决定了当你没有为元素的属性指定值时该如何计算值。

**继承**

当元素的一个 继承属性 （inherited property ）没有指定值时，则取父元素的同属性的 计算值 computed value 。只有文档根元素取该属性的概述中给定的初始值（initial value）（这里的意思应该是在该属性本身的定义中的默认值）。以下是继承的一些属性

**azimuth, border-collapse, border-spacing,**
**caption-side, color, cursor, direction, elevation,**
**empty-cells, font-family, font-size, font-style,**
**font-variant, font-weight, font, letter-spacing,**
**line-height, list-style-image, list-style-position,**
**list-style-type, list-style, orphans, pitch-range,**
**pitch, quotes, richness, speak-header, speaknumeral,**
**speak-punctuation, speak, speechrate,**
**stress, text-align, text-indent, texttransform,**
**visibility, voice-family, volume, whitespace,**
**widows, word-spacing**

**非继承**

当元素的一个 非继承属性 (在Mozilla code 里有时称之为 reset property ) 没有指定值时，则取属性的 初始值initial value （该值在该属性的概述里被指定）。
以下列出均为非继承

**display**、**margin**、**border**、**padding**、**background**、**height**、**min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi。display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi。**



### 有继承性的属性：

1、字体系列属性

font：组合字体

font-family：规定元素的字体系列

font-weight：设置字体的粗细

font-size：设置字体的尺寸

font-style：定义字体的风格

font-variant：设置小型大写字母的字体显示文本，这意味着所有的小写字母

均会被转换为大写，但是所有使用小型大写字体的字母与其余文本

相比，其字体尺寸更小。

font-stretch：允许你使文字变宽或变窄。所有主流浏览器都不支持。

font-size-adjust：为某个元素规定一个 aspect 值，字体的小写字母 "x"

的高度与"font-size" 高度之间的比率被称为一个字体的 aspect 值。

这样就可以保持首选字体的 x-height。

有继承性的属性：

2、文本系列属性

text-indent：文本缩进

text-align：文本水平对齐

text-shadow：设置文本阴影

line-height：行高

word-spacing：增加或减少单词间的空白（即字间隔）

letter-spacing：增加或减少字符间的空白（字符间距）

text-transform：控制文本大小写

direction：规定文本的书写方向

color：文本颜色

有继承性的属性：

3、元素可见性：visibility

4、表格布局属性：[caption-side](https://link.jianshu.com?t=http://www.runoob.com/cssref/pr-tab-caption-side.html)

[border-collapse](https://link.jianshu.com?t=http://www.runoob.com/cssref/pr-border-collapse.html)

[empty-cells](https://link.jianshu.com?t=http://www.runoob.com/cssref/pr-tab-empty-cellsp.html)

5、列表属性：[list-style-type](https://link.jianshu.com?t=http://www.runoob.com/cssref/pr-list-style-type.html)

[list-style-image](https://link.jianshu.com?t=http://www.runoob.com/cssref/pr-list-style-image.html)

list-style-position、list-style

6、设置嵌套引用的引号类型：[quotes](https://link.jianshu.com?t=http://www.runoob.com/cssref/pr-gen-quotes.html)

7、光标属性：cursor

8、还有一些不常用的；speak，page等属性，暂不讲解；

所有元素可以继承的属性：

1、元素可见性：visibility

2、光标属性：cursor

内联元素可以继承的属性:

1、字体系列属性

2、除text-indent、text-align之外的文本系列属性

块级元素可以继承的属性:

text-indent、text-align



### 无继承的属性

1、display

2、文本属性：[vertical-align](https://link.jianshu.com?t=http://www.runoob.com/cssref/pr-pos-vertical-align.html)

[text-decoration](https://link.jianshu.com?t=http://www.runoob.com/cssref/pr-text-text-decoration.html)

3、盒子模型的属性:宽度、高度、内外边距、边框等

4、背景属性：背景图片、颜色、位置等

5、定位属性：浮动、清除浮动、定位position等

6、生成内容属性:content、counter-reset、counter-increment

7、轮廓样式属性:outline-style、outline-width、outline-color、outline

8、页面样式属性:size、page-break-before、page-break-after

继承中比较特殊的几点

1、a 标签的字体颜色不能被继承

1、<h1>-<h6>标签字体的大下也是不能被继承的

因为它们都有一个默认值

### 常见问题

问题1：多种样式混合应用的优先级问题

当有多个规则都能应用于同一个元素时，权重越高的样式将被优先采用。

”important>内联 >ID>类 >标签 |伪类|属性选择 >伪对象 >继承 >通配符”

问题2：font-size的继承问题

font-size是可以被继承的。但是它的方式有一些特别。Font-size的子类继承的不是实际值，而是计算后的值。

下面是一个例子

<p>字体大小属性<em>继承特性</em>的演示代码</p>

`p { font-size:14px;}`

由于浏览器默认字体大小是16px，而p定义了字体14px，所以em继承了p的字体大小属性，也是14px；

```
p { font-size:85%;}
```

浏览器默认字体大小16px,而p定义了字体大小(16px X 85% = 13.6px). 13.6px这个值将被子元素em继承。

```
p { font-size:0.85em;}
```

浏览器默认字体大小16px,而p定义了字体大小(16px X 0.85 = 13.6px). 13.6px这个值将被子元素em继承。

```
body { font-size: 85%; }
```

h1 { font-size: 200%; }

h2 { font-size: 150%; }

浏览器默认字体大小16px,而body定义了字体大小(16px X 85% = 13.6px). 如果子元素没有指定字体大小13.6px这个值将被子元素继承