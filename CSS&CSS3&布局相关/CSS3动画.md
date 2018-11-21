# CSS3动画

构建css3动画的属性很简单，总的来说只有transform（变形），transition（过渡），和animation（动画）这三种。
所以这里，更少的从介绍语法的角度，而是从使用的角度来介绍css3动画

## 基础知识 - 三个属性

### transform（变形）（`transform`还支持3D变换，怎一酷字了得。由于某些不可告人的原因，这里就不展示了。故，`transform`部分到此结束。）

**直接改变大小和位置，显示改变的结构，没有过渡和形变时间**

1. 旋转rotate
   利用css变形属性可以将对应的属性旋转相对应的角度，可以顺时针旋转，逆时针（负值）旋转，可以3D旋转，3D旋转可以分别绕X轴，Y轴，Z轴旋转。
2. 缩放scale
   负值为先翻转，再缩放对应的倍数，可以在X,Y，Z上做缩放
3. 位移translate
   可以在X，Y轴上做平移，或者同时在x,y,z轴上做平移
4. 斜切skew
   能够让元素倾斜显示，本质上是可以让X，Y轴倾斜一定程度

### transition（过渡）

**平滑的改变CSS的值**。无论是点击事件，焦点事件，还是鼠标`hover`，只要值改变了，就是平滑的，就是动画。于是乎，只要一个整站通用的`class`，就可以很轻松的渐进增强地实现动画效果

`transiton`属性是下面几个属性的缩写：

- transition-property

  指定过渡的属性值，比如`transition-property:opacity`就是只指定`opacity`属性参与这个过渡。

- transition-duration

  指定这个过渡的持续时间

- transition-delay

  延迟过渡时间

- transition-timing-function

  指定过渡动画缓动类型，有`ease` | `linear` | `ease-in` | `ease-out` | `ease-in-out` | `cubic-bezier()`其中，`linear`线性过度，`ease-in`由慢到快，`ease-out`由快到慢，`ease-in-out`由慢到快在到慢。

```css
.trans {
    -webkit-transition-property: background-color;
    -webkit-transition-duration: 0.3s;
    -webkit-transition-timing-function: ease;
}
.trans:hover {
    background-color: #486AAA;
    color: #fff;
}
```

就跟CSS2的`background`属性一样，平时我们都不会像上面一样，把`transition`的属性一个一个摊开写，而是合并。

还是上面的例子，我们将transition属性合并，并扩展几个浏览器，如下CSS代码：

```js
.trans {
    ...
    -webkit-transition: background-color 0.3s ease;
    -moz-transition: background-color 0.3s ease;
    -o-transition: background-color 0.3s ease;
    transition: background-color 0.3s ease;
}
.trans:hover {
    background-color: #486AAA;
    color: #fff;
}
```

`transition`中的`transition-timing-function`属性让人心存芥蒂，其一堆`ease`相关的值（`linear` | `ease-in` | `ease-out` | `ease-in-out` | `cubic-bezier`），不太容易让人理解与记住。尤其其中cubic-bezier就是指[贝塞尔曲线](http://baike.baidu.com/view/60154.htm)，与复杂的数学扯上的关系，不禁勾起了高中时数学的梦魇。

其实呢，理一理，也还好。首先`cubic-bezier`这个基本上就不用鸟了，90%+的情况都用不到这个东西，所以，难得清闲，直接pass掉。`linear`很好记，线性嘛。至于`ease-in` | `ease-out` | `ease-in-out`，就是指缓动效果啦，说白了就是指开始时候慢慢动呢还是结束的时候慢慢动。那么`in`和`out`那个先慢慢动呢？啊，我们可以联想记忆，很好记的。我们都知道OOXX吧，`ease-in`中的`in`就表示进入，进入的时候显然一开始都是慢的，等瞄准就绪后才能快速冲刺进入，于是`ease-in`表示先慢后快；`ease-out`其`out`表示出来，出来肯定是先快后慢的，因为出来时临近洞口速度肯定要降下来，免得跑出来乱了节奏，于是`ease-out`表示先快后慢；最后，很好理解的，`ease-in-out`表示一进一出，也就是先慢后快再慢。

有些纯洁的人可能不太明白上面邪恶的文字表示的含义，没关系，我们可以看图说话，下面截自不同运动曲线下同一时间的截图，从中可以看到哪个先快，哪个先慢（注意：最后都是同时到达）

### animations

同样的也是一个过渡的过程，引入了帧的概念，定义keyframes动画，然后绑定一个或者多个动画。transition有点像他的简化版，animation也可以实现transition变化某个属性的功能并且可以去设置动画的播放时间（animation-duration），播放方式（animation-timing-function，播放速度），播放次数，播放方向（在不同次数，发生不同方向的动画，比如从左到右，然后从右到左），播放后的状态（会到初始状态，还是结束状态）控制动画状态（控制某物体暂停或执行动画）

```js
   0% {
        padding: 0;
    }
    50% {
        padding: 0 20px;
        background-color:rgba(190, 206, 235, 0.2);        
    }
    100% {
        padding: 0 100px;
        background-color:rgba(190, 206, 235, 0.9);
    }
}
.anim_box:hover {
    -webkit-animation-name: resize;
    -webkit-animation-duration: 1.5s;
    -webkit-animation-iteration-count: 4;
    -webkit-animation-direction: alternate;
    -webkit-animation-timing-function: ease-in-out;
}
```



### 浏览器支持情况

#### CSS Transitions

首次引入

- Safari 3.2: 13/11/2008
- Firefox 4.0: Late 2010
- Chrome 1.0: 02/09/2008
- Opera 10.5: 02/03/2010

#### CSS 2D Transformations

首次引入

- Safari 3.2: 13/11/2008
- Firefox 3.5: 30/06/2009
- Chrome 1.0: 02/09/2008
- Opera 10.5: 02/03/2010
- Internet Explore 9: 09/2010

#### CSS Animations

首次引入

- Safari 4.0: 11/06/2008
- Chrome 1.0: 02/09/2008

#### CSS 3D Transformations

首次引入

- Safari 4.0: 11/06/2008
- Chrome: 28/08/2010

## js控制动画

### 控制CSS Transition

触发元素的`transiton`(过渡)，切换元素的类名可以触发该元素的`transition`(过渡)

暂停元素的`transition`(过渡)， 在你想要暂停过渡点，用[`getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/window.getComputedStyle)和`getPropertyValue`获取该元素相应的CSS属性值，然后设置该元素的对应的CSS属性等于你刚才获取到的CSS属性值。

### 使用CSS回调函数

一些最有用但鲜为人知JavaScript技巧，就是利用监听Dom事件控制CSS `transitions`(过渡)和`animations`(动画)。如：与`animations`(动画)相关的`animationEnd`,`animationStart`和`animationIteration`；与`transitions`(过渡)相关的`transitonEnd`。你可能已经猜到它们是做什么的。这些动画事件分别是在元素的动画结束时，开始时，或者完成一次迭代时触发。

目前使用这些事件还需要添加浏览器前缀，所以在这个演示中，我们使用由Craig Buckler开发的叫`PrefixedEvent`的方法。该方法的参数有`element`(元素)，`type`(类型)和`callback`(回调)来实现跨浏览器的兼容

#### transitionstart

在`transitionstart`当事件被触发[CSS过渡](https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_transitions)实际上已经开始，任何之后即[`transition-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)已经结束。

#### transitioncancel

取消[CSS转换](https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_transitions)`transitioncancel`时会触发该事件

事件的事件处理程序`transitioncancel`。取消[CSS转换](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)时会发送此事件。

在以下情况下取消转换：

- [`transition-property`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property)应用于目标的属性的值已更改
- 该[`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)物业将设置为`"none"`。
- 转换在运行完成之前停止，例如通过将鼠标移离悬停转换元素。

#### transitionendend

CSS转换完成后`transitionend`会触发该事件。在完成之前移除转换的情况下，例如，如果移除或设置为，则不会生成事件。`transition-property`display`"none"`

#### animationiteration

 **animationiteration**动画的迭代结束时会触发**该**事件。对于具有1 `animation-iteration-count`的动画，不会发生此事件。

#### **animationstart**

**animationstart**CSS动画启动时会触发该事件。如果有，则[`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay)一旦延迟期到期，此事件将触发。负延迟将导致事件以`elapsedTime`等于延迟的绝对值来触发（并且相应地，动画将在该时间点开始播放到序列中）。

#### **animationend**

**animationend**CSS动画完成时会触发该事件（但如果它在到达完成之前中止，则不会触发，例如元素变为不可见或动画从元素中移除）。

### 控制CSS Animation(动画)

就像我们刚刚了解到的，我们可以看到与元素动画相关的事件：`animationStart`,`animationIteration`,`animationEnd`。但是如果我们想改变CSS `animation`(动画)执行过程中的动画

#### `animation-play-state`属性

当你想在动画执行过程中暂停，并且接下来让动画接着执行。这时CSS的[`animation-play-state`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state)属性是非常有用的。你可以可以通过JavaScript像这样更改CSS(注意你的前缀)：

```js
element.style.webkitAnimationPlayState = "paused"; element.style.webkitAnimationPlayState = "running";
```

然而当使用`animation-play-state`让CSS 动画暂停时，动画中的元素变形也会以相同的方式被阻止。你不能使这种变形暂停在某个状态，使它变形，使它恢复，更不用期望它能从新的变形状态中恢复到流畅运行。

#### animation-fill-mode

这个设置成backwards可以使动画回到初始模式，设置成forwards：结束后保持动画结束时的状态，但当animation-direction为0，则动画不执行，持续保持动画开始时的状态

#### 获取当前keyvalue的百分比

不幸的是，在这个阶段没有办法获得当前CSS动画关键帧的“完成百分比”。最好的获取近似值的方法是使用`setInterval` 函数在动画过程中迭代`100`次。它的本质是：`动画持续的时间(单位是毫秒)/100`。例如，如果动画时长`4`秒，则得到的`setInterval`的执行时间是每`40ms`(`4000 / 100`)。

```js
var showPercent = window.setInterval(function() {
    if (currentPercent < 100) { 
        currentPercent += 1; 
    } else { 
        currentPercent = 0; 
    } 
    result.innerHTML = currentPercent; 
}, 40);
```

这种做法很不理想，因为函数实际运行频率要远少于每`40ms`。我发现将它设为`39ms`更准确。但这个也不是好实现，因为它依赖于浏览器，并非所有浏览器下都能得到很完美效果。

#### 获取当前动画的CSS属性值

在理想的情况下，我们选择一个使用CSS动画的元素，删除该元素当前动画再给它添加个新的动画，让它可以从当前状态开始新的动画。但是现实情况却很复杂。

### CSS**矩阵**

CSS3中的矩阵指的是一个方法，书写为`matrix()`和`matrix3d()`，前者是元素2D平面的移动变换(transform)，后者则是3D变换。2D变换矩阵为3*3, 如上面矩阵示意图；3D变换则是4*4的矩阵

斜拉(skew)，缩放(scale)，旋转(rotate)以及位移(translate)。

论是旋转还是拉伸什么的，本质上都是应用的`matrix()`方法实现的（修改`matrix()`方法固定几个值），只是类似于`transform:rotate`这种表现形式，我们更容易理解，记忆与上手。

换句话说，理解`transform`中`matrix()`矩阵方法有利于透彻理解CSS3的`transform`属性，这就与那80%的也会应用但只知表象的人拉开了差距！

OK，现在上面提到的CSS3矩阵解释应该说得通了

#### 矩阵应用场景

虽然题目写的是“`transform`中的`Matrix`”，实际上，在CSS3以及HTML5的世界里，这玩意还是涉猎蛮广的，如`SVG`以及`canvas`

#### `transform`与坐标系统

用过`transform`旋转的人可以发现了，其默认是绕着中心点旋转的，而这个中心点就是`transform-origin`属性对应的点，也是所有矩阵计算的一个重要依据点

![](/home/xsh/桌面/markdown/imgs/css-transforms-matrix2.png)

当我们通过`transform-origin`属性进行设置的时候，矩阵相关计算也随之发生改变。反应到实际图形效果上就是，旋转拉伸的中心点变了！

举例来说，如果偶们设置：

```js
-webkit-transform-origin: bottom left;
```

则，坐标中心点就是左下角位置。于是动画（例如图片收缩）就是基于图片的左下角这一点了：

再举个稍微难理解的例子，我们如果这样设置：

```css
transform-origin: 50px 70px;
```

则，中心点位置有中间移到了距离左侧50像素，顶部70像素的地方（参见下图），而此时的`(30, 30)`的坐标为白点所示的位置（这个位置后面会用到）。

CSS3 `transform`的`matrix()`方法写法如下：

```js
transform: matrix(a,b,c,d,e,f);
```

```js
transform: matrix(1, 0, 0, 1, 30, 30); /* a=1, b=0, c=0, d=1, e=30, f=30 */
```

现在，我们根据这个矩阵偏移元素的中心点，假设是`(0, 0)`，即`x=0`, `y=0`。

于是，变换后的`x`坐标就是`ax+cy+e = 1*0+0*0+30 =30`, `y`坐标就是`bx+dy+f = 0*0+1*0+30 =30`.

于是，中心点坐标从`(0, 0)`变成了→`(30, 30)`。对照上面有个`(30, 30)`的白点图，好好想象下，原来`(0,0)`的位置，移到了白点的`(30, 30)`处，怎么样，是不是往右下方同时偏移了30像素哈！！

实际上`transform: matrix(1, 0, 0, 1, 30, 30);`就等同于`transform: translate(30px, 30px);`. 注意：`translate`, `rotate`等方法都是需要单位的，而`matrix`方法`e, f`参数的单位可以省略。