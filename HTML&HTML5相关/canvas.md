# Canvas 详解

> Canvas API（画布）用于在网页实时生成图像，并且可以操作图像内容，基本上它是一个可以用JavaScript操作的位图（bitmap）。

## 开始使用 (getContext来获得上下文对象,2d:画布,webGL3d立体,canvas大小只能通过witdh和height)

- 一、首先新建一个`<canvas>`网页元素。

```html
<canvas id="myCanvas" width="400" height="200">
你的浏览器不支持canvas!
</canvas>
```

上面代码中，如果浏览器不支持这个API，则就会显示`<canvas>`标签中间的文字——“您de浏览器不支持canvas！”。

* 每个**canvas**节点都有一个对应的**context**对象（上下文对象），Canvas API定义在这个**context**对象上面，所以需要获取这个对象，方法是使用**getContext**方法

```js
var canvas = document.getElementById('myCanvas');

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
}
```

上面代码中，`getContext`方法指定参数`2d`，表示该`canvas`节点用于生成2D图案（即平面图案）。如果参数是`webgl`，就表示用于生成3D图像（即立体图案），这部分实际上单独叫做WebGL API。

## 绘图方法(drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh))

`在canvas中，我们可以把一张图片直接绘制到canvas上，跟使用`img`标签类似，不同的是，图片是绘制到canvas画布上的，而非独立的html元素。canvas提供了`drawImage`方法来绘制图片，这个方法可以有三种形式的用法，如下

drawImage(image,dx,dy);直接将图片绘制到指定的canvas坐标上，图片由image传入，坐标由dx和dy传入。

drawImage(image,dx,dy,dw,dh)同上面形式，只不过指定了图片绘制的宽度和高度，宽高由dw和dh传入(放缩)。

`drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);`这个是最复杂，最灵活的使用形式，第一参数是待绘制的图片元素，第二个到第五个参数，指定了原图片上的坐标和宽高，这部分区域将会被绘制到canvas中，而其他区域将忽略，最后四个参数跟形式二一样，指定了canvas目标中的坐标和宽高。(区域绘制)

根据参数个数，我们会分别调用不同形式的`drawImage`，第一种形式最简单，就是将原图片直接绘制到目标canvas指定坐标处，图片宽高就是原图片宽高，不会缩放。第二种形式呢，指定了目标canvas绘制区域的宽高，那么图片最终被绘制在canvas上的宽高被固定了，图片会被缩放，如果指定的dw和dh与原图片的宽高不是等比咧的，图片会被压缩或者拉伸变形。第三种形式，分别指定了原图片被绘制的区域和目标canvas中的区域，通过sx，sy，sw，sh我们可只选择原图片中某一部分区域，也可以指定完整的图片，通过dx，dy，dw，dh我们待绘制的目标canvas区域

## 图片导出(canvas.toDataURL,存在兼容性)

```js
var image = new Image();
	image.src = canvas.toDataURL("image/png");
return image;
```

该**HTMLCanvasElement.toDataURL()**方法返回一个[数据URI，](https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs)  其中包含由`type`参数指定的格式的图像表示（默认为[PNG](https://en.wikipedia.org/wiki/Portable_Network_Graphics)）。返回的图像分辨率为96 dpi。

- 如果画布的高度或宽度是`0`，`"data:,"`则返回该字符串。
- 如果请求的类型不是`image/png`，但返回的值以`data:image/png`，则不支持请求的类型。
- Chrome也支持该`image/webp`类型



**HTMLCanvasElement.toBlob()**转成一个Blob(异步)

; 此文件可以缓存在磁盘上，也可以由用户代理自行决定存储在内存中。如果`type`未指定，则图像类型为`image/png`。创建的图像的分辨率为96dpi。

```js
canvas.toBlob(function(blob) {
  var newImg = document.createElement('img'),
      url = URL.createObjectURL(blob);

  newImg.onload = function() {
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(url);
  };

  newImg.src = url;
  document.body.appendChild(newImg);
});
```

```js
f (!HTMLCanvasElement.prototype.toBlob) {
 Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
  value: function (callback, type, quality) {

    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (var i=0; i<len; i++ ) {
     arr[i] = binStr.charCodeAt(i);
    }

    callback( new Blob( [arr], {type: type || 'image/png'} ) );
  }
 });
}
```

手动讲base64转成blob

## 优化：

### 离屏渲染

```js
var m_canvas = document.createElement('canvas');
m_canvas.width = 64;    // 渲染整体
m_canvas.height = 64;
var m_context = m_canvas.getContext(‘2d’);
draw(m_context);
function render() {
  context.drawImage(m_canvas, 0, 0);
}
```

### 集中绘制

```js
context.beginPath();
for (var i = 0; i < points.length - 1; i++) {
  var p1 = points[i];
  var p2 = points[i+1];
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
}
context.stroke();
```

### 避免浮点数坐标

浏览器为了抗锯齿会对浮点数进行额外的处理，可以通过数学类函数进行取整操作：

```js
ctx.drawImage(myImage, Math.floor(0.3), Math.floor(0.5));
```