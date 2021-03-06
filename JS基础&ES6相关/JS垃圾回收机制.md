# JS垃圾回收机制

## 内存生命周期

 不管什么程序语言，内存生命周期基本是一致的：   

1. 分配你所需要的内存
2. 使用分配到的内存（读、写）
3. 不需要时将其释放\归还

所有语言第二部分都是明确的。第一和第三部分在底层语言中是明确的，但在像JavaScript这些高级语言中，大部分都是隐含的。

## JavaScript 的内存分配

### 变量初始化

为了不让程序员为分配费心，JavaScript 在定义变量时完成内存分配。

```js
var n = 123;  // 给数值变量分配内存

// 为对象及其包含变量分配内存
var o = {
    a: 1,
    b: null
};

// 函数表达式也能分配一个对象
obj.addEventListener("click", function(){
  obj.style.backgroundColor = 'blue';
}, false);
```

### 通过函数调用的内存分配

有些函数调用结果是分配对象内存：

```js
var d = new Date();
var e = document.createElement("div");
```

有些方法分配新变量或者新对象：

```js
var s = "azerty";
var s2 = s.substr(0, 3); // s2 是一个新的字符串
// 因为字符串是不变量，
// JavaScript 可能决定不分配内存，
// 只是存储了 [0-3] 的范围。

var a = ["ouais ouais", "nan nan"];
var a2 = ["generation", "nan nan"];
var a3 = a.concat(a2); 
// 新数组有四个元素，是 a 连接 a2 的结果
```

### 值的使用

```js
使用值的过程实际上是对分配内存进行读取与写入的操作，这意味着可以写入一个变量或者一个对象的属性值，甚至传递函数的参数
```

### 当内存不再需要使用时释放

大多数内存管理的问题都在这个阶段。在这里最艰难的任务是找到“所分配的内存确实已经不再需要了”。它往往要求开发人员来确定在程序中哪一块内存不再需要并且释放它。

高级语言解释器嵌入了“垃圾回收器”，它的主要工作是跟踪内存的分配和使用，以便当分配的内存不再使用时，自动释放它。这只能是一个近似的过程，因为要知道是否仍然需要某块内存是无法判定的

## 垃圾回收

垃圾回收算法主要依赖于引用的概念。在内存管理的环境中，一个对象如果有访问另一个对象的权限（隐式或者显式），叫做一个对象引用另一个对象。例如，一个Javascript对象具有对它[原型](https://developer.mozilla.org/en/JavaScript/Guide/Inheritance_and_the_prototype_chain)的引用（隐式引用）和对它属性的引用（显式引用）。

在这里，“对象”的概念不仅特指 JavaScript 对象，还包括函数作用域（或者全局词法作用域)

### 引用计数垃圾收集

这是最初级的垃圾收集算法。此算法把“对象是否不再需要”简化定义为“对象有没有其他对象引用到它”。如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收。

```js
var o = { 
  a: {
    b:2
  }
}; 
// 两个对象被创建，一个作为另一个的属性被引用，另一个被分配给变量o
// 很显然，没有一个可以被垃圾收集


var o2 = o; // o2变量是第二个对“这个对象”的引用

o = 1;      // 现在，“这个对象”的原始引用o被o2替换了

var oa = o2.a; // 引用“这个对象”的a属性
// 现在，“这个对象”有两个引用了，一个是o2，一个是oa

o2 = "yo"; // 最初的对象现在已经是零引用了
           // 他可以被垃圾回收了
           // 然而它的属性a的对象还在被oa引用，所以还不能回收

oa = null; // a属性的那个对象现在也是零引用了
           // 它可以被垃圾回收了
```



#### 限制：循环引用

该算法有个限制：无法处理循环引用。在下面的例子中，两个对象被创建，并互相引用，形成了一个循环。它们被调用之后会离开函数作用域，所以它们已经没有用了，可以被回收了。然而，引用计数算法考虑到它们互相都有至少一次引用，所以它们不会被回收。

```js
function f(){
  var o = {};
  var o2 = {};
  o.a = o2; // o 引用 o2
  o2.a = o; // o2 引用 o

  return "azerty";
}

f();
```

#### 实际例子

IE 6, 7 使用引用计数方式对 DOM 对象进行垃圾回收。该方式常常造成对象被循环引用时内存发生泄漏：

```html
var div;
window.onload = function(){
  div = document.getElementById("myDivElement");
  div.circularReference = div;
  div.lotsOfData = new Array(10000).join("*");
};
```

在上面的例子里，`myDivElement` 这个 DOM 元素里的 `circularReference 属性`引用了 `myDivElement`，造成了循环引用。如果该属性没有显示移除或者设为 null，引用计数式垃圾收集器将总是且至少有一个引用，并将一直保持在内存里的 DOM 元素，即使其从DOM 树中删去了。如果这个 DOM 元素拥有大量的数据 (如上的 `lotsOfData` 属性)，而这个数据占用的内存将永远不会被释放。

### 标记-清除算法

这个算法把“对象是否不再需要”简化定义为“对象是否可以获得”。

这个算法假定设置一个叫做根（root）的对象（在Javascript里，根是全局对象）。垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。

这个算法比前一个要好，因为“有零引用的对象”总是不可获得的，但是相反却不一定，参考“循环引用”。

从2012年起，所有现代浏览器都使用了标记-清除垃圾回收算法。所有对JavaScript垃圾回收算法的改进都是基于标记-清除算法的改进，并没有改进标记-清除算法本身和它对“对象是否不再需要”的简化定义。

#### 循环引用不再是问题了

在上面的示例中，函数调用返回之后，两个对象从全局对象出发无法获取。因此，他们将会被垃圾回收器回收。第二个示例同样，一旦 div 和其事件处理无法从根获取到，他们将会被垃圾回收器回收。

#### 限制: 那些无法从根对象查询到的对象都将被清除



### 扩展

#### 1、什么时候触发垃圾回收？

垃圾回收周期性运行，如果分配的内存非常多，那么回收工作也会很艰巨，确定垃圾回收时间间隔就变成了一个值得思考的问题。IE6 的垃圾回收是根据内存分配量运行的，当环境中存在 256 个变量、4096 个对象、64K 的字符串任意一种情况的时候就会触发垃圾回收器工作，看起来很科学，不用按一段时间就调用一次，有时候会没必要，这样按需调用不是很好嘛？但是如果环境中就是有这么多变量一直存在，现在脚本如此复杂，很正常，那么结果就是垃圾回收器一直在工作，这样浏览器就没法玩了。

微软在 IE7 中做了调整，触发条件不再是固定的，而是动态修改的，初始值和IE6相同，如果垃圾回收器回收的内存分配量低于程序占用内存的 15%，说明大部分内存不可被回收，设的垃圾回收触发条件过于敏感，这时候把临界条件翻倍，如果回收的内存高于 85%，说明大部分内存早就该清理了，这时候把触发条件置回。这样就使垃圾回收工作智能了很多。

#### 2、合理的 GC 方案

1）、JavaScript 引擎基础 GC 方案是（simple GC）：mark and sweep（标记清除），即：

- 遍历所有可访问的对象。
- 回收已不可访问的对象。

#### 2）、GC 的缺陷

和其他语言一样，JavaScript 的 GC 策略也无法避免一个问题：GC 时，停止响应其他操作，这是为了安全考虑。而 JavaScript 的 GC 在 100ms 甚至以上，对一般的应用还好，但对于 JS 游戏，动画连贯性要求比较高的应用，就麻烦了。这就是新引擎需要优化的点：避免 GC 造成的长时间停止响应。

## 垃圾回收的优化策略

和其他语言一样，JavaScript 的垃圾回收策略也无法避免一个问题：垃圾回收时，会停止响应其他操作，这是为了安全考虑。而 JavaScript 的垃圾回收在 100ms 甚至以上，对一般的应用还好，但对于 JavaScript 游戏和动画，这种对连贯性要求比较高的应用，就麻烦了。这就是新引擎需要优化的点：避免垃圾回收造成的长时间停止响应。

2个优化方案，而这也是最主要的2个优化方案了：

### 分代回收（Generation GC）

这个和 Java 回收策略思想是一致的。目的是通过区分「临时」与「持久」对象；多回收「临时对象区」（young generation），少回收「持久对象区」（tenured generation），减少每次需遍历的对象，从而减少每次GC的耗时。**Chrome 浏览器所使用的 V8 引擎就是采用的分代回收策略。**如图：

![](/home/xsh/桌面/markdown/imgs/4dd990bec0bea5ed7d30319088e321e3.png)



### 增量回收（Incremental GC）

这个方案的思想很简单，就是「每次处理一点，下次再处理一点，如此类推」。这种方案，虽然耗时短，但中断较多，带来了上下文切换频繁的问题。**Firefox 浏览器所使用的 JavaScript 引擎就是采用的增量回收策略。**如图：

![](/home/xsh/桌面/markdown/imgs/f9b83832e0b6dc6b211ccb520916ecb8.png)











