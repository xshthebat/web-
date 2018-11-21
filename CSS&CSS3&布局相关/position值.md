# postion

 CSS **position**属性用于指定一个元素在文档中的定位方式。top，right，bottom和 left属性则决定了该元素的最终位置

## css定位类型

- **定位元素**是其[计算后](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value)位置属性为 `relative`, `absolute`, `fixed `或 `sticky` 的一个元素。
- **相对定位元素**是[计算后](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value)位置属性为 `relative `的元素。
- **绝对定位元素**是[计算后](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value)位置属性为 `absolute` 或 `fixed` 的元素。
- **粘性定位元素**是[计算后](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value)位置属性为 `sticky` 的元素

大多数情况下，[`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)和[`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 被设定为auto的绝对定位元素，按其内容大小调整尺寸。但是，被绝对定位的元素可以通过指定[`top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top)和[`bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom) ，保留[`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)未指定（即`auto`），来填充可用的垂直空间。它们同样可以通过指定[`left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left) 和 [`right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/right)并将[`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 指定为`auto`来填充可用的水平空间(绝对定位可用top,bottoｍ)来设置高度,宽度同理

Z-index 仅能在定位元素上奏效(除static)

### static(默认无定位)

该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 `top`, `right`, `bottom`, `left` 和 `z-index `属性无效

![](/home/xsh/桌面/markdown/imgs/2016-01-07_223349.png)



1. **背景和边框** —— 形成层叠上下文的元素的背景和边框。 层叠上下文中的最低等级。
2. **负z-index值** —— 层叠上下文内有着负z-index值的子元素。
3. **块级盒** —— 文档流中非行内非定位子元素。
4. **浮动盒** —— 非定位浮动元素。
5. **行内盒** —— 文档流中行内级别非定位子元素。
6. **z-index: 0** —— 定位元素。 这些元素形成了新的层叠上下文。
7. **正z-index值** —— 定位元素。 层叠上下文中的最高等级。

**谁大谁上**,**后来居上**

### relative(相对定位)

该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption 元素无效

在一个相对定位（position属性的值为relative）的元素上设置 `top`、 `right` 、 `bottom` 和 `left` 属性会使其偏离其正常位置。其他的元素的位置则不会受该元素的影响发生位置改变来弥补它偏离后剩下的空隙。

relative是相对正常文档流的位置进行偏移，原先占据的位置依然存在，也就是说它不会影响后面元素的位置。left表示相对原先位置右边进行偏移，top表示相对原先位置下边进行偏移。当left和right同时存在，仅left有效，当top和bottom同时存在仅top有效。relative的偏移是基于对象的margin左上侧的

### absolute(绝对定位)

不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并(自成一个bfc容器)若一直寻找则为body定位

### fixed(特殊的绝对定位)

不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。`fixed` 属性会创建新的层叠上下文。当元素祖先的 `transform`  属性非 `none` 时，容器由视口改为该祖先





```html
<div class="parent">
    <div class="son">
        我是fixed元素
    </div>
    <div class="other">
        我是其他元素
    </div>
</div>
```

```css
body {
    height: 2000px;
}
.son {
    position: fixed;
    left: 100px;
    top: 100px;
    width: 100px;
    height: 100px;
    background: #f00;
}
.other {
    height: 1000px;
}
```



这个例子里，body的滚动条滚动后，son元素的位置都是相对屏幕视口的位置。根据MDN的说明，改下代码的css部分添加parent元素样式:

```css
.parent {
    margin-top: 100px;
    height: 500px;
    overflow-y: auto;
    background: #ff0;
    transform: translate(0,0);
}
```

这个时候，会发现滚动body的滚动条的时候，son元素跟着parent一起走了。然而，滚动parent的滚动条，son元素并没有按照想象中那样固定在parent容器的一个位置上，而是表现为`absolute`的效果

### sticky(**粘性定位**)实验中

结合了 `position:relative` 和 `position:fixed` 两种定位功能于一体的特殊定位

盒位置根据正常流计算(这称为正常流动中的位置)，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。在所有情况下（即便被定位元素为 `table 时`），该元素定位均不对后续元素造成影响。当元素 B 被粘性定位时，后续元素的位置仍按照 B 未定位时的位置来确定。`position: sticky `对 `table` 元素的效果与 `position: relative `相同

粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位

sticky 不会触发 BFC

样式表 z－index 无效。行内 style 写有效

sticky 是容器相关的，也就说 sticky 的特性只会在他所处的容器里生效。这个比较抽象

body 设置 height：100% 的时候 sticky 元素停在某一个位置不动了

设定为 `position:sticky` 元素的任意父节点的 overflow 属性必须是 visible

如果 `position:sticky` 元素的任意父节点定位设置为 `position:relative | absolute | fixed`，则元素相对父元素进行定位，而不会相对 viewprot 定位

### inherit

规定应该从父元素继承 position 属性的值。

1. IE7-不支持

### initial

`initial` 关键字用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式。（IE 不支持该关键字）

最后罗列一下默认为 `inherited: Yes` 的属性：

- 所有元素可继承：visibility 和 cursor
- 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、 font-family、font-size、font-style、font-variant、font-weight、text- decoration、text-transform、direction
- 块状元素可继承：text-indent和text-align
- 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image
- 表格元素可继承：border-collapse

1. IE不支持

### unset

`unset` 关键字我们可以简单理解为不设置。其实，它是关键字 `initial` 和 `inherit` 的组合

什么意思呢？也就是当我们给一个 CSS 属性设置了 `unset` 的话：

1. 如果该属性是默认继承属性，该值等同于 `inherit`
2. 如果该属性是非继承属性，该值等同于 `initial`

举个例子，先列举一些 CSS 中默认继承父级样式的属性：

- 部分可继承样式: `font-size`, `font-family`, `color`, `text-indent`
- 部分不可继承样式: `border`, `padding`, `margin`, `width`, `height`

1. IE不支持，safari9-不支持，ios9.2-不支持，android4.4.4-不支持

### revert(ios支持)

表示样式表中定义的元素属性的默认值。若用户定义样式表中显式设置，则按此设置；否则，按照浏览器定义样式表中的样式设置；否则，等价于unset 

只有safari9.1+和ios9.3+支持



### 扩展CSS3 transform影响(transform限制position:fixed的跟随效果)

注意，这个特性表现，目前只在Chrome浏览器/FireFox浏览器下有，IE浏览器，包括IE11, `fixed`还是`fixed`的表现

### 

