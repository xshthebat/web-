## 事件与事件流

事件是与浏览器或文档交互的瞬间，如点击按钮，填写表格等，它是JS与HTML之间交互的桥梁。DOM是树形结构，若同时给父子结点绑定了相同的事件，那么他们的执行顺序是什么样子的呢？这就涉及到了事件流的概念。首先解释两个概念：

### 事件冒泡

IE的事件流叫事件冒泡，即事件开始时由最具体的元素(文档中嵌套层次最深的节点)接收，然后逐级向上传播到较为不具体的节点。

### 事件捕获

Netscape团队提出的另一种事件流叫事件捕获，事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。

一个DOM事件分为三个阶段：捕获阶段、触发阶段、冒泡阶段。

![](/home/xsh/桌面/markdown/imgs/image.jpg)

事件捕获阶段为事件的触发奠定了基础，当DOM事件发生的时候，首先由最不具体的window结点向下捕获那个具象元素（触发事件的元素），事件捕获之后就开始执行绑定在上面的函数；当函数执行完毕，触发事件冒泡进入冒泡阶段，一直从触发的元素逐级想上传递，直至window元素。

## 事件模型

### DOM0级事件(DOM0级的事件处理程式只能在事件冒泡阶段触发)

这样的事件模型中，事件是没有事件流的概念的，事件的绑定比较简单：

直接在HTML中绑定事件处理函数

```js
<button onclick="fun()">
```

通过在js中获取元素来绑定事件

```js
var btn = document.getElementById("btn");
btn.onclick = fun;
```

移除事件

```js
btn.onclick = null;
```

### DOM2级事件(和DOM0级相比按照绑定顺序定)

DOM2级事件现代浏览器都支持，事件流的概念也是支持的。

绑定方式

```js
target.addEventListener(type, listener ,{capture: Boolean, passive: Boolean, once: Boolean});
```

capture：是否在捕获时触发　once:是否触发一次　passive不能阻止默认事件

```js
addEventListener(eventType, handler, useCapture)
```

移除方式(这里穿进去参数必须是绑定时的引用)

```js
removeEventListener(eventType, handler, useCapture)
```

最后一个参数是一个boolean类型的参数，表示是否捕获过程，不填为false。

### IE事件

IE事件，取消了事件流中的事件捕获过程。

绑定方式

```js
attachEvent(eventType, handler)
```

移除方式

```js
detachEvent(eventType, handler)
```

## 事件封装

```js
EventUtil={
  addListener:function(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,handler);
    }else if(target.attachEvent){
        target.attach("on"+type,function(){
              handler.call(target);  //让handler中的this指向目标元素
        });
    }else{
        target["on"+type]=handler;
    }
  },
 removeListener:function(target,type,handler){   
      if(target.removeEventListener){    
        target.removeEventListener(type,handler);          
     }else if(target.detachEvent){
        target.detachEvent("on"+type,handler);
     }else{
        target["on"+type]=null;
     }
  },
 getEvent:function(e){      //获取事件对象
     var evt=window.event||e;
     return evt;
 },
 getTarget:function(e){      //获得目标对象
     var evt=EventUtil.getEvent(e);
     var target;
     if(evt.target){ target=evt.target;}
     else {target=evt.srcElement;}
     return target;
 },
 stopPropagation:function(e){  //停止冒泡
     var evt=EventUtil.getEvent(e);
     if(evt.stopPropagation) {evt.stopPropagation();}　//阻止捕获和冒泡阶段中当前事件的进一步传播。


     else {evt.cancelBubble=true;} //设置取消冒泡
 },
 preventDefault:function(e){   //阻值默认行为的发生
     var evt=EventUtil.getEvent(e);
     if(evt.preventDefault){ evt.preventDefault(); }　
     else {e.returnValue=false;}　　　
 }
}
```

### 阻止事件

#### stopPropagation(阻止捕获和冒泡阶段中当前事件的进一步传播)

#### cancelBubble(设置取消冒泡)

#### preventDefault(阻值默认行为的发生)

#### returnValue(同上)

#### stopImmediatePropagation(同时阻止事件传播但也阻止了在相同对象上注册的任何其他事件处理程序的调用。)

## 事件委托

事件在冒泡过程中会上传到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理(Event delegation)。

```js
<div id="box">
    <input type="button" value="按钮" id="btn">
    <input type="button" value="按钮2" id="btn2">
    <input type="button" value="按钮3" id="btn3">
</div>
var box = document.getElementById('box');

box.addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'input') {
    // some code
  }
});
```

## 模拟事件

**首先**通过`document.createEvent()`方法创建event对象，接收一个参数，即表示要创建的事件类型的字符串：

- UIEvents（DOM3中的UIEvent）鼠标和键盘事件；
- MouseEvents（DOM3中的MouseEvent）鼠标事件；
- MutationEvents（DOM3中的MutationEvent）变动事件；
- HTMLEvents（没有DOM3中对应的事件）HTML事件；

**其次**在创建了event对象之后，还需要使用与事件有关的信息对其进行初始化。每种类型的event对象都有一个特殊的方法，为它传入适当的数据就可以初始化该event对象。用`event.init......()`此类行的方法。

**最后**就是触发事件。这需要使用`dispatchEvent()`方法，接收一个参数，即表示要触发的event对象。

### 模拟鼠标事件

首先创建鼠标事件对象的方法createEvent()传入MouseEvents，返回的对象的方法initMouseEvent()，接收15个信息：

1. type（字符串）：事件类型如“click”；
2. bubble（布尔值）：是否冒泡；
3. cancelable（布尔值）：是否可取消；
4. view（AbstractView）：与事件关联的视图，一般为`document.defaultView`；
5. detail（整数）：一般为0，一般只有事件处理程序使用；
6. screenX（整数）：事件相对于屏幕的X坐标；
7. screenY（整数）；
8. clientX（整数）：事件相对于视口的X坐标；
9. clientY（整数）；
10. ctrlKey（布尔值）：是否按下了Ctrl键，默认为false；

11. altKey（布尔值）；
12. shiftKey（布尔值）；
13. metaKey（布尔值）；
14. button（整数）：表示按下了哪个鼠标键，默认为0；
15. relatedTarget（对象）：表示与事件相关的对象。一般只有在模拟mouseover与mouseout时使用。

最后记得把event对象传给dispatchEvent()方法。

```js
/模拟click事件
//获取btn
var btn = document.querySelector("#btn");
//创建event
var event = document.createEvent("MouseEvents");
//初始化event
event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
//click事件绑定事件处理程序
btn.onclick = function () {
    console.log("hello");
}
//触发事件
btn.dispatchEvent(event); //hello
//取消引用
btn.onclick = null;

另外，建议使用构造函数"MouseEvent"：

var evt = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window
});
```

## onlode事件和DOMContentLoaded事件

DOMContentLoaded顾名思义，就是dom内容加载完毕。那什么是dom内容加载完毕呢？我们从打开一个网页说起。当输入一个URL，页面的展示首先是空白的，然后过一会，页面会展示出内容，但是页面的有些资源比如说图片资源还无法看到，此时页面是可以正常的交互，过一段时间后，图片才完成显示在页面。从页面空白到展示出页面内容，会触发DOMContentLoaded事件。而这段时间就是HTML文档被加载和解析完成。

![](/home/xsh/桌面/markdown/imgs/746387-20170407181220066-2064922697.png)

DOM文档加载的步骤为

1,解析HTML结构。
2,DOM树构建完成。//DOMContentLoaded
3,加载外部脚本和样式表文件。
4,解析并执行脚本代码。
5,加载图片等外部文件。
6,页面加载完毕。//load
在第2步，会触发DOMContentLoaded事件。在第6步，触发load事件。

在这里我们可以明确DOMContentLoaded所计算的时间，当文档中没有脚本时，浏览器解析完文档便能触发 DOMContentLoaded 事件；如果文档中包含脚本，则脚本会阻塞文档的解析，而脚本需要等位于脚本前面的css加载完才能执行。在任何情况下，DOMContentLoaded 的触发不需要等待图片等其他资源加载完成。

接下来，我们来说说load，页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在DOMContentLoaded被触发之后才触发。

　**1、onload事件**

   onload事件所有的浏览器都支持，所以我们不需要什么兼容，只要通过调用

```
window.onload = function(){
    
}
```

**2、DOMContentLoaded 事件**

DOMContentLoaded不同的浏览器对其支持不同，所以在实现的时候我们需要做不同浏览器的兼容。

1）支持DOMContentLoaded事件的，就使用DOMContentLoaded事件；

2）IE6、IE7不支持DOMContentLoaded，但它支持onreadystatechange事件，该事件的目的是提供与文档或元素的加载状态有关的信息。

3)  更低的ie还有个特有的方法doScroll， 通过间隔调用：document.documentElement.doScroll("left");

  可以检测DOM是否加载完成。 当页面未加载完成时，该方法会报错，直到doScroll不再报错时，就代表DOM加载完成了。该方法更接近DOMContentLoaded的实现。

#### **我们为什么一再强调将css放在头部，将js文件放在尾部**

在面试的过程中，经常会有人在回答页面的优化中提到将js放到body标签底部，原因是因为浏览器生成Dom树的时候是一行一行读HTML代码的，script标签放在最后面就不会影响前面的页面的渲染。那么问题来了，既然Dom树完全生成好后页面才能渲染出来，浏览器又必须读完全部HTML才能生成完整的Dom树，script标签不放在body底部是不是也一样，因为dom树的生成需要整个文档解析完毕。

我们再来看一下chrome在页面渲染过程中的，绿色标志线是First Paint的时间。纳尼，为什么会出现firstpaint，页面的paint不是在渲染树生成之后吗？其实现代浏览器为了更好的用户体验,渲染引擎将尝试尽快在屏幕上显示的内容。它不会等到所有HTML解析之前开始构建和布局渲染树。部分的内容将被解析并显示。也就是说浏览器能够渲染不完整的dom树和cssom，尽快的减少白屏的时间。假如我们将js放在header，js将阻塞解析dom，dom的内容会影响到First Paint，导致First Paint延后。所以说我们会将js放在后面，以减少First Paint的时间，但是不会减少DOMContentLoaded被触发的时间。