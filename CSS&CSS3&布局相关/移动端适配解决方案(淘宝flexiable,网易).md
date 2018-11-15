# 移动端适配解决方案(淘宝flexiable,网易)

移动端Web页面，即常说的H5页面、手机页面、webview页面等。

手机设备屏幕尺寸不一，做移动端的Web页面，需要考虑在安卓/IOS的各种尺寸设备上的兼容，这里总结的是针对移动端设备的页面，设计与前端实现怎样做能更好地适配不同屏幕宽度的移动设备。

## 概念理解

### viewport视口

viewport是严格的等于浏览器的窗口。`viewport`与跟`viewport`有关的`meta`标签的关系(这里简单介绍)

`isual viewport` 可见视口 屏幕宽度
`layout viewport` 布局视口 DOM宽度
`ideal viewport` 理想适口：使布局视口就是可见视口
设备宽度(`visual viewport`)与DOM宽度`(layout viewport), scale`的关系为：

- `（visual viewport）= （layout viewport）* scale`

获取`屏幕宽度(visual viewport)`的尺寸：`window. innerWidth/Height`。
获取`DOM宽度(layout viewport)`的尺寸：`document. documentElement. clientWidth/Height`。

**设置理想视口：**把默认的layout viewport的宽度设为移动设备的屏幕宽度，得到理想视口`(ideal viewport)`:

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

### 物理像素(physical pixel)

物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。所谓的一倍屏、二倍屏(Retina)、三倍屏，指的是设备以多少物理像素来显示一个CSS像素，也就是说，多倍屏以更多更精细的物理像素点来显示一个CSS像素点，在普通屏幕下1个CSS像素对应1个物理像素，而在Retina屏幕下，1个CSS像素对应的却是4个物理像素。关于这个概念，看一张"田"字示意图就会清晰了

### CSS像素

CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs。CSS像素顾名思义就是我们写CSS时所用的像素。

### 设备像素比dpr(device pixel ratio)

设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：

设备像素比 ＝ 物理像素 / 设备独立像素

在Retina屏的iphone上，devicePixelRatio的值为2，也就是说1个css像素相当于2个物理像素。通常所说的二倍屏(retina)的dpr是2, 三倍屏是3。

viewport中的scale和dpr是倒数关系。
获取当前设备的dpr：

- `JavaScript: window.devicePixelRatio`。
- `CSS: -webkit-device-pixel-ratio, -webkit-min-device-pixel-ratio, -webkit-max-device-pixel-ratio`。不同dpr的设备，可根据此做一些样式适配(这里只针对webkit内核的浏览器和webview)。

### 设备独立像素dip与设备像素dp

dip（device independent pixels，设备独立像素）与屏幕密度有关。dip可以用来辅助区分视网膜设备还是非视网膜设备。
dp(device pixels, 设备像素)

安卓设备根据屏幕像素密度可分为ldpi、mdpi、hdpi、xhdpi等不同的等级。规定以160dpi为基准，1dp=1px。如果密度是320dpi，则1dp=2px，以此类推。
IOS设备：从IPhone4开始为Retina屏

- CSS像素与设备独立像素之间的关系依赖于当前的缩放等级。

### 屏幕像素密度PPI(pixel per inch)

屏幕像素密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。屏幕像素密度与屏幕尺寸和屏幕分辨率有关，在单一变化条件下，屏幕尺寸越小、分辨率越高，像素密度越大，反之越小。

> 屏幕密度 = 对角线分辨率/屏幕尺寸

 概念关系图

```
屏幕尺寸、屏幕分辨率-->对角线分辨率/屏幕尺寸-->屏幕像素密度PPI
                                             |
              设备像素比dpr = 物理像素 / 设备独立像素dip(dp)
                                             |
                                       viewport: scale
                                             |
                                          CSS像素px
```

## 前端实现相关方式

下面大致列下前端在实现适配上常采用的方式。百分比、em单位的使用就不必说了。

### viewport设置理想视口

```html
<meta name="viewport" content="width=width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

设置理想视口，使得DOM宽度(layout viewport)与屏幕宽度(visual viewport)一样大,DOM文档主宽度即为屏幕宽度。1个CSS像素(1px)由多少设备像素显示由具体设备而不同。

#### 动态设置视口缩放为1/dpr

对于安卓，所有设备缩放设为1,对于IOS，根据dpr不同，设置其缩放为dpr倒数。**设置页面缩放可以使得1个CSS像素(1px)由1个设备像素来显示，从而提高显示精度；因此，设置1/dpr的缩放视口，可以画出1px的边框。**

不管页面中有没有设置viewport，若无，则设置，若有，则改写，设置其scale为1/dpr。

```js
(function (doc, win) {
  var docEl = win.document.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var dpr = 0;
  var scale = 0;

  // 对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1
  if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/[iphone|ipad]/gi);
    var devicePixelRatio = win.devicePixelRatio;

    if(isIPhone) {
      dpr = devicePixelRatio;
    } else {
      drp = 1;
    }
    
    scale = 1 / dpr;
  }

  /**
    * ================================================
    *   设置data-dpr和viewport
    × ================================================
    */

  docEl.setAttribute('data-dpr', dpr);
  // 动态改写meta:viewport标签
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    document.documentElement.firstElementChild.appendChild(metaEl);
  } else {
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  }

})(document, window);
```

#### px单位的适配

设置动态缩放视口后，在iPhone6上，缩放为0.5，即CSS像素2px最终显示效果为1px，而在scale=1的设备，CSS像素1px显示效果为1px，那么，为了达到显示效果一致，以px为单位的元素(比如字体大小)，其样式应有适配不同dpr的版本，因此，在动态设置`viewport: scale`的时候，同时在html根元素上加上`data-dpr=[dpr]`，**但是这种方式还是不够，如果dpr为2，3之外的其他数值，px就没办法适配到。因此我会选择都用rem为单位进行适配。**

#### 设置缩放视口与设置理想视口有什么不同

问题：viewport设为理想视口(scale=1)，基本已经满足适配，为什么要动态设置viewport缩放?
原因：iPhone6为例，dpr为2，缩放设为0.5，则DOM宽度为750，缩放后显示刚好为屏幕宽度375，而总的CSS像素其实是750，与设备像素一致，这样1px的CSS像素，占用的物理像素也是1；而viewport设置缩放为1的理想视口情况下，DOM宽度为375，显示也刚好是屏幕宽度，然而1px的CSS像素，占用的物理像素是2。这样说来，这样设置可以实现1px的线条在二倍屏的显示。因为： **CSS像素与设备像素的关系依赖于屏幕缩放。** 
验证：设备：iPhone6, 
在scale=0.5时，1px边框显示效果;
在scale=1.0时，1px边框显示效果;
在scale=0.5时，2px边框显示效果;
通过对比后发现，在scale=0.5时，1px的线比scale=1.0要细，这也就解决了1px线条的显示问题

####  rem(一个CSS单位)



> 定义：font size of the root element.

这个单位的定义和em类似，不同的是em是相对于父元素，而rem是相对于根元素。rem定义是根元素的font-size, 以rem为单位，其数值与px的关系，需相对于根元素<html>的font-size计算，比如，设置根元素font-size=16px, 则表示1rem=16px。

根据这个特点，可以根据设备宽度动态设置根元素的font-size，使得以rem为单位的元素在不同终端上以相对一致的视觉效果呈现。

选取一个设备宽度作为基准，设置其根元素大小，其他设备根据此比例计算其根元素大小。比如使得iPhone6根元素font-size=16px。

| 设 备   | 设备宽度 | 根元素font-size/px | 宽度/rem |
| ------- | -------- | ------------------ | -------- |
| iPhone5 | 320      | js计算所得         | --       |
| iPhone6 | 375      | 16                 | 23.4375  |
| i6 Plus | 414      | js计算所得         | --       |
| -       | 360      | js计算所得         | --       |

根元素fontSize公式：

```
width/fontSize = baseWidth/baseFontSize
```

其中，`baseWidth, baseFontSize`是选为基准的设备宽度及其根元素大小，`width, fontSize`为所求设备的宽度及其根元素大小

#### 动态设置根元素fontSize

```js
/**
  * 以下这段代码是用于根据移动端设备的屏幕分辨率计算出合适的根元素的大小
  * 当设备宽度为375(iPhone6)时，根元素font-size=16px; 依次增大；
  * 限制当为设备宽度大于768(iPad)之后，font-size不再继续增大
  * scale 为meta viewport中的缩放大小
  */
(function (doc, win) {
  var docEl = win.document.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  /**
    * ================================================
    *   设置根元素font-size
    * 当设备宽度为375(iPhone6)时，根元素font-size=16px; 
    × ================================================
    */
  var refreshRem = function () {
    var clientWidth = win.innerWidth
                      || doc.documentElement.clientWidth
                      || doc.body.clientWidth;

    console.log(clientWidth)
    if (!clientWidth) return;
    var fz;
    var width = clientWidth;
    fz = 16 * width / 375;
    docEl.style.fontSize = fz + 'px';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();

})(document, window);
```

### 小结

- 适配不同屏幕宽度以及不同dpr，通过动态设置viewport(scale=1/dpr) + 根元素fontSize + rem, 辅助使用vw/vh等来达到适合的显示；
- 若无需适配可显示1px线条，也可以不动态设置scale，只使用动态设置根元素fontSize + rem + 理想视口；
- 当视口缩放，计算所得的根元素fontSize也会跟着缩放，即若理想视口(scale=1), iPhone6根元素fontSize=16px; 若scale=0.5, iPhone6根元素fontSize=32px; 因此不必担心rem的计算；
- !!css单位：以前我认为这样比较好：适配元素rem为单位，正文字体及边距宜用px为单位；现在认为**全部用rem即可，包括字体大小，不用px**；
- px为单位的元素，需根据dpr有不同的大小，如大小12px, dpr=2则采用24px, 使用sass mixin简化写法；
- 配合scss函数，简化px2rem转换，且易于维护(若需修改$base-font-size, 无需手动重新计算所有rem单位)；
- px2rem函数的$base-font-size只跟根元素fontSize的基准（此文中是【fontSize=16px when 375】）以及设计图的大小有关，按此基准，若设计图为iPhone6二倍稿，则$base-font-size=32px，参数传值直接为设计图标注尺寸；
- 使用iPhone6(375pt)二倍设计图:宽度750px；
- 切图使用三倍精度图，以适应三倍屏（这个目前我还没有实际应用过）

# 网易解决方案(rem)

## 目的

css中使用的尺寸与设计稿保持一致，body的宽度设为屏幕宽度

## 原理

将页面宽度定为屏幕宽度，通过设置html的font-size与使用rem来实现尺寸与设计稿一致

## 思路

假设设计稿宽度为640px
那么以设计稿为准，设置body的宽度为640px
由于使用rem单位，因此需要设置html标签的font-size）(**网易页面上html的font-size不是预先通过媒介查询在css里定义好的，而是通过js计算出来的**)
为计算方便，取100px为参照，所以body的宽度为6.4rem
由于设备的dip!=设计稿宽度，因此font-size=deviceWidth/6.4

```js
document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
```



# 淘宝的做法(动态设置viewport的scale)

## 目的

页面大小与设计稿保持一致

## 原理

设置meta viewport中的scale保证页面大小与设计稿一致，使用rem

```js
var scale = 1 / devicePixelRatio;
document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
```

```js
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
```



## 思路

- meta viewport中device-width的算法为：设备的物理分辨率/(devicePixelRatio * scale)=设备的物理分辨率/1
- 而每台设备的devicePixelRatio都是已知的，可通过window.devicePixelRatio获取
- JavaScript动态计算设置scale，包括initial-scale，maximum-scale，minimum-scale
- 动态设置html的font-size，为屏幕分辨率/10
- css尺寸为：设计稿标注尺寸/html的font-size

# 比较

相同

- 都能适配所有的手机设备，对于pad，网易与淘宝都会跳转到pc页面，不再使用触屏版的页面
- 都需要动态设置html的font-size
- 布局时各元素的尺寸值都是根据设计稿标注的尺寸计算出来，由于html的font-size是动态调整的，所以能够做到不同分辨率下页面布局呈现等比变化
- 容器元素的font-size都不用rem，需要额外地对font-size做媒介查询
- 都能应用于尺寸不同的设计稿，只要按以上总结的方法去用就可以了

不同

- 淘宝的设计稿是基于750的横向分辨率，网易的设计稿是基于640的横向分辨率，还要强调的是，虽然设计稿不同，但是最终的结果是一致的，设计稿的尺寸一个公司设计人员的工作标准，每个公司不一样而已
- 淘宝还需要动态设置viewport的scale，网易不用
- **最重要的区别就是：网易的做法，rem值很好计算，淘宝的做法肯定得用计算器才能用好了** 。不过要是你使用了less和sass这样的css处理器，就好办多了，以淘宝跟less举例，我们可以这样编写less：

```css
baseFontSize: 75;//基于视觉稿横屏尺寸/100得出的基准font-size
.px2rem(@name, @px){
    @{name}: @px / @baseFontSize * 1rem;
}
//使用示例：
.container {
    .px2rem(height, 240);
}
//less翻译结果：
.container {
    height: 3.2rem;
}
```



