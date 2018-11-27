# JS异步,事件循环,定时器(requestAnimationFrame)

## JS异步

### JS是单线程

所谓单线程，是指在JS引擎中负责解释和执行JavaScript代码的线程只有一个。不妨叫它**主线程**。

但是实际上还存在其他的线程。例如：处理AJAX请求的线程、处理DOM事件的线程、定时器线程、读写文件的线程(例如在Node.js中)等等。这些线程可能存在于JS引擎之内，也可能存在于JS引擎之外，在此我们不做区分。不妨叫它们**工作线程**。

原因:

1. JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准**。
2. 为了避免复杂性

### 异步

如果在函数返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的。

```js
//读取文件
fs.readFile('hello.txt', 'utf8', function(err, data) {
    console.log(data);
});
//网络请求
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = xxx; // 添加回调函数
xhr.open('GET', url);
xhr.send(); // 发起函数
```

上述示例中读取文件函数 `readFile`和网络请求的发起函数  `send`都将执行耗时操作，虽然函数会立即返回，但是不能立刻获取预期的结果，因为耗时操作交给其他线程执行，暂时获取不到预期结果（后面介绍）。而在JavaScript中通过回调函数 `function(err, data) { console.log(data); }`和 `onreadystatechange`   ，在耗时操作执行完成后把相应的结果信息传递给回调函数，通知执行JavaScript代码的线程执行回调。

**如果函数是异步的，发出调用之后，马上返回，但是不会马上返回预期结果。调用者不必主动等待，当被调用者得到结果之后会通过回调函数主动通知调用者。**

一个浏览器通常由以下几个常驻的线程：

- 渲染引擎线程：顾名思义，该线程负责页面的渲染
- JS引擎线程：负责JS的解析和执行
- 定时触发器线程：处理定时事件，比如setTimeout, setInterval
- 事件触发线程：处理DOM事件
- 异步http请求线程：处理http请求

一个浏览器通常由以下几个常驻的线程：

- 渲染引擎线程：顾名思义，该线程负责页面的渲染
- JS引擎线程：负责JS的解析和执行
- 定时触发器线程：处理定时事件，比如setTimeout, setInterval
- 事件触发线程：处理DOM事件
- 异步http请求线程：处理http请求

需要注意的是，渲染线程和JS引擎线程是不能同时进行的。渲染线程在执行任务的时候，JS引擎线程会被挂起。因为JS可以操作DOM，若在渲染中JS处理了DOM，浏览器可能就不知所措了。

### **浏览器的进程机制**

![自上而下，分别是：

- **用户界面**--包括地址栏、书签菜单等
- **浏览器引擎**--用户界面和渲染引擎之间的传送指令（浏览器的主进程）
- **渲染引擎**--浏览器的内核，如（webkit，Gecko）
- **其他**--网络请求，js线程和ui线程



#### 渲染引擎

渲染引擎是`多线程`的，包含ui线程和js线程。ui线程和js线程会**互斥**，因为js线程的运行结果会影响ui线程，ui更新会被保存在队列，直到js线程空闲，则被取出来更新。

js单线程是单线程的，为什么呢？假如js是多线程的，那么操作DOM就是多线程操作，那样的话就会很**混乱**，DOM不知道该听谁的，而这里的单线程指得是主线程是单线程的，他同样可以有异步线程，通过队列存放这些线程，而主线程依旧是单线程，这个我们后面再讲。所以在node中js也是单线程的。

单线程的好处就是节约内存，不需要再切换的时候执行上下文，也不用管锁的概念，因为我们每次都通过一个。

## 消息队列与事件循环

![](/home/xsh/桌面/markdown/imgs/161314dca3a23ba4.png)



JS引擎线程用来执行栈中的同步任务，当所有同步任务执行完毕后，栈被清空，然后读取消息队列中的一个待处理任务，并把相关回调函数压入栈中，单线程开始执行新的同步任务。

JS引擎线程从消息队列中读取任务是不断循环的，每次栈被清空后，都会在消息队列中读取新的任务，如果没有新的任务，就会等待，直到有新的任务，这就叫事件循环。



![](/home/xsh/桌面/markdown/imgs/161314dcb17a84ad.png)

上图以AJAX异步请求为例，发起异步任务后，由AJAX线程执行耗时的异步操作，而JS引擎线程继续执行堆中的其他同步任务，直到堆中的所有异步任务执行完毕。然后，从消息队列中依次按照顺序取出消息作为一个同步任务在JS引擎线程中执行，那么AJAX的回调函数就会在某一时刻被调用执行。

### (浏览器)事件循环模型

在单线程的Javascript引擎中，setTimeout()是如何运行的呢，这里就要提到浏览器内核中的事件循环模型了。简单的讲，在Javascript执行引擎之外，有一个任务队列，当在代码中调用setTimeout()方法时，注册的延时方法会交由浏览器内核其他模块（以webkit为例，是webcore模块）处理，当延时方法到达触发条件，即到达设置的延时时间时，这一延时方法被添加至任务队列里。这一过程由浏览器内核其他模块处理，与执行引擎主线程独立，执行引擎在主线程方法执行完毕，到达空闲状态时，会从任务队列中顺序获取任务来执行，这一过程是一个不断循环的过程，称为事件循环模型。

## 微任务、宏任务？(先微后宏)

宏任务一般是：包括整体代码script，setTimeout，setInterval、setImmediate,requestAnimationFrame,postMessage,MessageChannel。

微任务：原生Promise(有些实现的promise将then方法放到了宏任务中)、process.nextTick、Object.observe(已废弃)、 MutationObserver 记住就行了

![](/home/xsh/桌面/markdown/imgs/164974fa4b42e4af.png)

典列子

```js
console.log('start');
setTimeout(() => {
    console.log(1) //1
    Promise.resolve().then(() => {
        console.log(2); 
    }).then(() => {
        console.log(4); 
    }).then(() => {
        console.log('进入第三层微');
        setTimeout(() => {
            console.log(5); 
            Promise.resolve().then(() => {
                console.log(6) 
            }).then(() => {
                console.log(7) 
            }).then(() => {
                console.log('clear');
                clearInterval(interval)
            })
        }, 0)
    })
}, 0);
const interval = setInterval(()=>{
    console.log('int') 
    Promise.resolve().then(()=>{
        console.log(8) 
    }).then(()=>{
        console.log(9) 
    })
},0)

// 1 int 2 8 4 9 进入第三层微 int 8 9 5 int 6 8 7 9 clear node
//setInterval先于timeout进入并且在一次setinterval中timeou并未执行　二次中和setimeout并行
// 1 int 2 8 4 9  进入第三层微 int 5 8 6 9 7 //node　第二次和timeout都执行　并且　interval先于timeout
// 1 2 4 　进入第三层微　int 5 8 6 9 7 //node
//timeout执行时　interval并为执行　



// 1 2 4 进入第三层微 int 8 9 int 8 9 5 6 7 浏览器   
// 1 2 4 int 8 9 5 6 7　//浏览器
//浏览器　先微后宏　主要看setimeout和　setinterval谁先进入消息队列
```



## node中的事件环

node的事件环相比浏览器就不一样了，我们先来看一张图，他的工作流程

![](/home/xsh/桌面/markdown/imgs/1644ad464210b649.png)



* 首先我们能看到我们的js代码`（APPLICATION）`会先进入v8引擎,v8引擎中主要是一些`setTimeout`之类的方法。

* 其次如果我们的代码中执行了nodeApi，比如`require('fs').read()`，node就会交给`libuv`库处理，这个`libuv`库是别人写的，他就是node的事件环。

* `libuv`库是通过单线程异步的方式来处理事件，我们可以看到`work threads`是个多线程的队列，通过外面`event loop`阻塞的方式来进行异步调用。

* 等到`work threads`队列中有执行完成的事件，就会通过`EXECUTE CALLBACK`回调给`EVENT QUEUE`队列，把它放入队列中。

* 最后通过事件驱动的方式，取出`EVENT QUEUE`队列的事件，交给我们的应用

## node中的event loop



> node中的event loop是在libuv里面的，libuv里面有个事件环机制，他会在启动node时，初始化事件环



![](/home/xsh/桌面/markdown/imgs/1644b17495b10980.png)

- 这里的每一个阶段都对应着一个**事件队列**
- 每当`event loop`执行到某个阶段时，都会执行对应的**事件队列**中的事件，依次执行
- 当该队列执行完毕或者执行数量超过上限，`event loop`就会执行下一个阶段
- 每当`event loop`切换一个执行队列时，就会去清空`microtasks queues`，然后再切换到下个队列去执行，如此反复

**这里我们要注意setImmediate是属于check队列的，还有poll队列主要是异步的I/O操作，比如node中的fs.readFile()**

### js定时器(不一定是按准确时间推入,可能存在timeout2ms左右的延迟,interval10ms延迟)

### 定时器和线程是如何工作的

js提供了两种方式，用于创建定时器以及相应两种方法（删除）

js中操作定时器的方法　：

| 方法          | 格式                    | 描述                                                         |
| ------------- | ----------------------- | ------------------------------------------------------------ |
| setTImeout    | id=setTimemout(fn,time) | 启动一个定时器，在一段时间（time）之后执行传入的回调函数 fn,返回一个定时器id用于clear |
| clearTimeout  | clearTimeout(id)        | 如果定时器还没触发，传入id就可以取消该定时器                 |
| setinterval   | id=setinterval(fn,time) | 启动一个定时器，在每隔一段时间(time)之后执行传入的回调 函数fn,并且返回一个定时器id涌入clear |
| clearinterval | clearinterval(id)       | 传入间隔定时器标识，即清除该定时器                           |

这里需要提示一下，js中的延迟时间是不能保证的，原因和浏览器线程有很大关系

### 执行进程中的定时器运行 

![](/home/xsh/桌面/markdown/imgs/5c56e46ae48fc30c256efb2baf639a5d.png)



在0毫秒时，启动一个10毫秒的setTimeout以及一个10毫秒的setinterval 
- 在6毫秒时，执行鼠标点击触发click 
- 在10毫秒时，定时器和间隔定时器触发 
- 但是第一个js代码块要执行18毫秒 
- 直到这段时间内相继出发了 鼠标单击click时间 setTimeout 以及两次setinterval事件，由于这个时间段内有别的代码正在执行，所以这些时间中的处理程序就不能执行，所以就开始排队 
- 直到鼠标单击事件结束 在timeout处理程序执行时（原本我们要在10毫秒执行的），注意在30秒的时候又触发了一次间隔定时器，但是由于之前已经有一个interval代码正在排队，所以这次的处理程序就不会执行，按通俗易懂的话就是等到线程中没有处理程序时，才会将其添加到队伍中，浏览器不会对特定的interval处理程序的多个实例进行排队， 
- 在34毫秒，timeout执行结束，队列中的interval处理程序开始执行 由于该程序要执行6毫秒，所以在执行到40毫秒又触发interval时间，进入队列，所以到目前为止进入队列的interval只有10毫秒和40豪秒触发的 
- 在42秒开始执行40秒触发的之后 因为运行时间为6毫秒所以 之后没次的interval时间都会在每10毫秒运行 
  正如我们所看到的interval中的几个处理程序完全被“挤没了” 

![](/home/xsh/桌面/markdown/imgs/740839-20160815211436000-1289002683.jpg)



例子中的第一个定时器是在205ms处添加到队列中的，但是直到过了300ms处才能执行。当执行这个定时器代码时，在405ms处又给队列添加了另一个副本。在下一个间隔，即605ms处，第一个定时器代码仍在运行，同时在队列中已经有了一个定时器代码的实例。结果是，在这个时间点上的定时器代码不会被添加到队列中

**迭代setTimeout**

　　为了避免setInterval()定时器的问题，可以使用链式setTimeout()调用

这个模式链式调用了setTimeout()，每次函数执行的时候都会创建一个新的定时器。第二个setTimeout()调用当前执行的函数，并为其设置另外一个定时器。这样做的好处是，在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何缺失的间隔。而且，它可以保证在下一次定时器代码执行之前，至少要等待指定的间隔，避免了连续的运行(不会缺失间隔)

## requestAnimationFrame(兼容性问题)

看到这里其实 requestAnimationFrame 的实现原理就很明显了：

- 注册回调函数
- 浏览器更新时触发 animate
- animate 会触发所有注册过的 callback

这里的工作机制可以理解为所有权的转移，把触发帧更新的时间所有权交给浏览器内核，与浏览器的更新保持同步。这样做既可以避免浏览器更新与动画帧更新的不同步，又可以给予浏览器足够大的优化空间。
在往上的调用入口就很多了，很多函数（RenderWidget::didInvalidateRect，RenderWidget::CompleteInit等）会触发动画检查，从而要求一次动画帧的更新

requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。

设置这个API的目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。代码中使用这个API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘。

requestAnimationFrame的优势，在于充分利用显示器的刷新机制，比较节省系统资源。显示器有固定的刷新频率（60Hz或75Hz），也就是说，每秒最多只能重绘60次或75次，requestAnimationFrame的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行页面重绘。此外，使用这个API，一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力。

不过有一点需要注意，requestAnimationFrame是在主线程上完成。这意味着，如果主线程非常繁忙，requestAnimationFrame的动画效果会大打折扣。

requestAnimationFrame使用一个回调函数作为参数。这个回调函数会在浏览器重绘之前合并调用。

```
requestID = window.requestAnimationFrame(callback); 
```

目前，主要浏览器Firefox 23 / IE 10 / Chrome / Safari）都支持这个方法。可以用下面的方法，检查浏览器是否支持这个API。如果不支持，则自行模拟部署该方法。

```js
 window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);　//模拟刷新频率
              };
    })();
```

上面的代码按照1秒钟60次（大约每16.7毫秒一次），来模拟requestAnimationFrame。

使用requestAnimationFrame的时候，只需反复调用它即可。

```js
function repeatOften() {
  // Do whatever
  requestAnimationFrame(repeatOften);
}

requestAnimationFrame(repeatOften);
```



### cancelAnimationFrame方法

cancelAnimationFrame方法用于取消重绘。

```js
window.cancelAnimationFrame(requestID);
```

它的参数是requestAnimationFrame返回的一个代表任务ID的整数值。

```js
var globalID;

function repeatOften() {
  $("<div />").appendTo("body");
  globalID = requestAnimationFrame(repeatOften);
}

$("#start").on("click", function() {
  globalID = requestAnimationFrame(repeatOften);
});

$("#stop").on("click", function() {
  cancelAnimationFrame(globalID);
});
```





