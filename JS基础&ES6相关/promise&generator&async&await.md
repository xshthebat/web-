# promise&generator&async&await

## promise

### Promise简介

​      `Promise`是一个对象，保存着未来将要结束的事件。有两个特征

1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
 2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

### Promise基本用法

```js
let promise1 = new Promise(function (resolve, reject){
    setTimeout(function (){
        resolve('ok') //将这个promise置为成功态(fulfilled),会触发成功的回调
    },1000)
})
promise1.then(fucntion success(val) {
    console.log(val) //一秒之后会打印'ok'
})
```

### 为什么出现promise

`Promise`提供了对js异步编程的新的解决方案，因为我们一直使用的回调函数其实是存在很大问题，只是限制于js的单线程等原因不得不大量书写。当然`Promise`并不是完全摆脱回调，她只是改变了传递回调的位置。那么传统的回调存在什么问题呢？

#### 嵌套

```js
$.ajax('url1',function success(result1){
    $.ajax('url2',function success(result2){
        $.ajax('url3',function success(result3){
            $.ajax('url4',function success(result4){
                //……
            })
        })
    })
})
```

#### 信任

除去书写的不优雅和维护的困难以外，回调函数其实还存在信任问题。
​      事实上回调函数不一定会像你期望的那样被调用。因为控制权不在你的手上。这种问题被称作“控制反转”。例如下面的例子：

```js
$.ajax('xxxxxx',function success(result1){
    //比如成功之后我会操作数据库记录结算金额
})
```

上面是`jQuery`中的`ajax`调用，我们期望在某些事件结束后，让第三方(jQ)帮我们执行我的程序(回调)。
​       那么，我们和第三方之间并没有一个契约或者规范可以遵循，除非你把你想使用的第三方库通读一遍，保证它做了你想做的事，但事实上你很难确定。即使在自己的代码中，或者自己编写的工具，我们都很难做到百分之百信任。

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### Promise解决方案

`Promise`是一个规范，尝试以一种更加友好的方式书写代码。`Promise`对象接受一个函数作为参数，函数提供两个参数：

- resolve:将`promise`从未完成切换到成功状态，也就是上面提到的从`pending`切换到`fufilled`,`resolve`可以传递参数，下一级`promise`中的成功函数会接收到它
- reject：将`promise`从未完成切换到失败状态，即从`pending`切换到`rejected`

```js
let promise1 = new Promise(function(reslove, reject){
    //reslove或者reject或者出错
})
promise1.then(fufilled, rejected).then().then() //这是伪代码
promise1.then(fufilled, rejected)//可以then多次

function fufilled(data) {
    console.log(data)
}
function rejected(e){
    console.log(e)
}
```

​      正如上面提到的两个特征，一旦状态改变，这个`Promise`就已经完成决议(不会再更改)，并且返回一个新的`Promise`,可以链式调用。并且可以注册多个`then`方法，他们同时决议并且互不影响。这种设计明显比回调函数要优雅的多，也更易于理解和维护。那么在信任问题上她又有哪些改善呢？
​       `Promise`通过通知的机制将“控制反转”的关系又“反转”回来。回调是我传递给第三方一个函数，期望它在事件发生时帮我执行，而`Promise`是在大家都遵循规范的前提下，我会在事件发生时得到通知，这时我决定做一些事(执行一些函数)。看到了吧，这是有本质差异的。
​       此外，回调函数还有以下信任问题，`Promise`也都做了相关约束：

- 回调调用过早
- 回调调用过晚（或者没有调用）
- 调用次数太多
- 没有把参数成功传递给你的回调
- 吐掉了错误或者异常

##### 过早或者过晚

  一个`Promise`回调一定会在当前栈执行完毕和下一个异步时机点上调用，即使像下面这样的同步`resolve`代码也会异步执行,而你传给工具库的回调函数却可能被同步执行(调用过早)或者被忘记执行(或者过晚)。

##### 次数太多或者没有传递参数

​      `Promise`只能被决议一次，如果你多次决议，她只会执行第一次决议，例如：

##### 吞掉错误

 `Promise`的错误处理机制是这样的：如果显示的调用`reject`并传递错误理由，这个消息会传递给拒绝回调。
​       此外，如果任意过程中出现错误(例如TypeError或者ReferenceError)，这个错误会被捕捉，并且使这个`Promise`拒绝，也就是说这个错误消息也会传递给拒绝回掉，这与传统的回调是不同的，传统的回调一旦出错会引起同步相应，而不出错则是异步。

### promise并发控制

##### all ／ race

`all`和`race`两个函数都是并发执行`promise`的方法，他们的返回值也是`promise`，`all`会等所有的`promise`都决议之后决议，而`race`是只要有一个决议就会决议。

```js
Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
```

> 注意：如果参数为空，`all`方法会立刻决议，而`race`方法会挂住。

##### 面试题：封装一个promise.all方法

```js
Promise.all = function(ary) {
    let num = 0
    let result = []
    return new Promise(function(reslove, reject){
        ary.forEach(promise => {
            promise.then(function(val){
                if(num >= ary.length){
                    reslove(result)
                }else{
                    result.push(val)
                    num++
                }
            },function(e){
                reject(e)
            })
        })
    })
}
```

##### 如何检测一个对象是Promise？

你肯能会想到 `instanceof Promise`，但遗憾的是不可以。原因是每种环境都封装了自己的`Promise`，而不是使用原生的`ES6 Promise`。
​       所以目前判断`Promise`的一种方法就是判断它是不是`thenable`对象(如果它是一个对象或者函数，并且它具有`then`方法)。
​       这是一种js常见的类型检测方法——鸭子类型检测：

### resolve/reject

`resolve`返回一个立即成功的`Promise`，`reject`返回一个立即失败的`Promise`,他们是`new Promise`的语法糖，所以下面两个写法是等价的：

```
let p1 = new Promise(function(resolve, reject){
    reslove(11111)
})

let p2 = Promise.resolve(11111) //这和上面的写法结果一样
```

### 错误处理

上面提到，`Promise`是异步处理错误，也就是说我的错误要在下一个`Promise`才能捕获到，大多情况这是好的，但是存在一个问题：如果捕获错误的代码再出现错误呢？

​      我的做法通常是在代码的最后加`catch`：

```js
let p1 = new Promise(function(reslove, reject){
    ajax('xxxxx')
})

p1
    .then(fullfilled, rejected)
    .then(fullfilled, rejected)
    .catch(function(e){
        //处理错误
    })
```

#### **什么会引发 catch**

当一个 promise 被 reject，就会引发 catch。典型的情况是，调用 reject(reason) 方法。

除此之外，另有3种情况也会引发 reject

第一种是开发者的失误：

```js
function asyncTask(url) {
  return new Promise((resolve, reject) => {
    a.push(1);

    if (url) {
      return setTimeout(() => {
        resolve({
          id: 1
        });
      }, 500);
    }

    reject({
      error: 'url missing in async task 1'
    });
  });
}

asyncTask('google.com').catch(err => console.log(err)); //ReferenceError: a is not defined
```



第二种情况是，明确用 throw 抛出错误也会达到同样的效果：

```js
function asyncTask(url) {
  return new Promise((resolve, reject) => {
    if (url) {
      throw new Error('terminate now');
      return setTimeout(() => {
        resolve({
          id: 1
        });
      }, 500);
    }

    reject({
      error: 'url missing in async task 1'
    });
  });
}

asyncTask('google.com').catch(err => console.log(err)); //Error: terminate now
```

最后，嵌套的 promise 也会引发 reject。内层 promise 造成的 reject 状态会冒泡，造成顶层 promise 也 reject：

```
function asyncTask(url) {
  return new Promise((resolve, reject) => {
    if (url) {
      return setTimeout(() => {
        resolve(asyncTask2());
      }, 500);
    }

    reject({
      error: 'url missing in async task 1'
    });
  });
}

function asyncTask2(url) {
  return new Promise((resolve, reject) => {
    if (url) {
      return resolve({
        id:2
      });
    }

    reject({
      error: 'url missing in async task 2'
    });
  });
}

asyncTask('google.com')
  .catch(err => {
    console.log('failed ', err); // { error: 'url missing in async task 2' }
    return err;
  });复制代码
```

总而言之，以下3种情况会引发 promise 的 reject：

- 开发者在 promise 构造器函数中的错误(bug)
- 明确抛出错误
- 嵌套 promise 的 reject

#### **catch 监控什么区域呢?**

只需要记住 -- catch 会检查 promise 链上位于它之前的每个地方(then 和其他异步操作)；如果它之前还有另一个 catch，则从那个 catch 之后的位置开始。

```js
asyncTask()
  .then()
  .then()
  .then()
  .catch() // 覆盖 asyncTask 和3个 then
```

```js
asyncTask()
  .catch() // 只覆盖 asyncTask
  .then()
  .then()
  .catch() // 覆盖了2个 then
```

需要注意的就是，和 then 一样， catch 也会返回一个可链式操作的新 promise 对象。

#### **可以在 catch 中抛出错误吗?**

```js
asyncTask()
  .then()
  .then()
  .catch(err => {throw new Error('operation failed')})
  .catch(err => console.log(err)) // operation failed
```

### then

1.注册回调

2.异步操作

3.可以返回一个值或者promise,作为传递给下个回调链的参数

4.要是前面有一个爆出错误就不会执行后面的then除非被catch

5.前面没返回值then里undefined

### Promise 的及早求值(在执行的时候就会发出异步操作)



### promise原理(之后再实现难)



## generator

ES6中引入很多新特性，其中关于异步操作的处理就引入了Promise和生成器。众所周知，Promise可以在一定程度上解决被广为诟病的回调地狱问题。但是在处理多个异步操作时采用Promise链式调用的语法也会显得不是那么优雅和直观。而生成器在Promise的基础上更进一步，允许我们用同步的方式来描述我们的异步流程。

### 基本介绍



Generator函数和普通函数完全不同，有其与众不同的独特语法。一个简单的Generator函数就长下面这个样子：

```js
function* greet() { yield 'hello' }
```

在第一次调用Generator函数的时候并不会执行Generator函数内部的代码，而是会返回一个生成器对象。在前面的文章中，我们也提过，通过调用这个生成器对象的next函数可以开始执行Generator函数内部的逻辑，在遇到yield语句会暂停函数的执行，同时向外界返回yield关键字后面的结果。暂停之后在需要恢复Generator函数执行时同样可以通过调用生成器对象的next方法恢复，同时向next方法传入的参数会作为生成器内部当前暂停的yield语句的返回值。如此往复，直到Generator函数内部的代码执行完毕。举例：

```js
function* greet() {
  let result = yield 'hello'
  console.log(result)
}
let g = greet()
g.next() // {value: 'hello', done: false}
g.next(2) // 打印结果为2，然后返回{value: undefined, done: true}
```

第一次调用next方法传入的参数，生成器内部是无法获取到的，或者说没有实际意义，因为此时生成器函数还没有开始执行，第一次调用next方法是用来启动生成器函数的。

#### 作用

##### 1: 异步操作的同步化表达

Generator 函数的暂停执行的效果，意味着可以把异步操作写在`yield`表达式里面，等到调用`next`方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在`yield`表达式下面，反正要等到调用`next`方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数

```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()
```

##### 2.控制流管理

如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。

```js
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});

Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();
  
  function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
```

然后，使用一个函数，按次序自动执行所有步骤。(同步)

```js
scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
```



##### 3.部署 Iterator 接口 

利用 Generator 函数，可以在任意对象上部署 Iterator 接口。

```js
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```

上述代码中，`myObj`是一个普通对象，通过`iterEntries`函数，就有了 Iterator 接口。也就是说，可以在任意对象上部署`next`方法。

##### 4 . 作为数据结构

Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。

```js
function* doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}
```

上面代码就是依次返回三个函数，但是由于使用了 Generator 函数，导致可以像处理数组那样，处理这三个返回的函数。

```javascript
for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
```





### yield语法要点(每次next执行到yield后)

next 方法返回值的 value 属性，是 Generator 函数向外输出数据；next 方法还可以接受参数，这是向 Generator 函数体内输入数据

```js
b = 2 + a = 3 // 不合法
b = 2 + (a = 3) // 合法

b = 2 + yield 3 // 不合法
b = 2 + (yield 3) // 合法

```

```js
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```

遍历器对象的`next`方法的运行逻辑如下。

（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

（4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`

需要注意的是，`yield`表达式后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

```js
function* gen() {
  yield  123 + 456;
}
```

Generator 函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数。

```js
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);
```

`yield`表达式只能用于generator函数内

另外，`yield`表达式如果用在另一个表达式之中，必须放在圆括号里面。

```js
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```

### 与 Iterator 接口的关系

任意一个对象的`Symbol.iterator`方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 Iterator 接口

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

上面代码中，Generator 函数赋值给`Symbol.iterator`属性，从而使得`myIterable`对象具有了 Iterator 接口，可以被`...`运算符遍历了。

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有`Symbol.iterator`属性，执行后返回自身。

```js
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
```

上面代码中，`gen`是一个 Generator 函数，调用它会生成一个遍历器对象`g`。它的`Symbol.iterator`属性，也是一个遍历器对象生成函数，执行后返回它自己。

```js
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
```

### next 方法的参数 

`yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

```js
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

上面代码先定义了一个可以无限运行的 Generator 函数`f`，如果`next`方法没有参数，每次运行到`yield`表达式，变量`reset`的值总是`undefined`。当`next`方法带一个参数`true`时，变量`reset`就被重置为这个参数（即`true`），因此`i`会等于`-1`，下一轮循环就会从`-1`开始递增。

这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过`next`方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

### for...of 循环

`for...of`循环可以自动遍历 Generator 函数时生成的`Iterator`对象，且此时不再需要调用`next`方法。

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
```

上面代码使用`for...of`循环，依次显示 5 个`yield`表达式的值。这里需要注意，一旦`next`方法的返回对象的`done`属性为`true`，`for...of`循环就会中止，且不包含该返回对象，所以上面代码的`return`语句返回的`6`，不包括在`for...of`循环之中

### throw

1. 内部有catch则捕获一个yeild的错误,若没有则外部捕获
2. 若内部throw则,则外部捕获
3. 外部throw,内部没有trycatch则报错,
4. 且先要next在throw捕获,
5. `throw`方法被捕获以后，会附带执行下一条`yield`表达式。也就是说，会附带执行一次`next`方法

Generator 函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在 Generator 函数体内throw则,只能外部捕获。

```css
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a'); //被内部捕获
  i.throw('b');　//内部无catch可捕获
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

上面代码中，遍历器对象`i`连续抛出两个错误。第一个错误被 Generator 函数体内的`catch`语句捕获。`i`第二次抛出错误，由于 Generator 函数内部的`catch`语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的`catch`语句捕获。

`throw`方法可以接受一个参数，该参数会被`catch`语句接收，建议抛出`Error`对象的实例。

`throw`方法被捕获以后，会附带执行下一条`yield`表达式。也就是说，会附带执行一次`next`方法。

```js
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // b
g.next() // c
```

Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的`catch`捕获

```javascript
function* foo() {
  var x = yield 3;
  var y = x.toUpperCase();
  yield y;
}

var it = foo();

it.next(); // { value:3, done:false }

try {
  it.next(42);
} catch (err) {
  console.log(err);
}
```

一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用`next`方法，将返回一个`value`属性等于`undefined`、`done`属性等于`true`的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

```js
function* g() {
    yield 1;
    console.log('throwing an exception');
    throw new Error('generator broke!');
    yield 2;
    yield 3;
  }
  
  function log(generator) {
    var v;
    console.log('starting generator');
    try {
      v = generator.next();
      console.log('第一次运行next方法', v);
    } catch (err) {
      console.log('捕捉错误1', v);
    }
    try {
      v = generator.next();
      console.log('第二次运行next方法', v);
    } catch (err) {
      console.log('捕捉错误2', v);
    }
    try {
      v = generator.next();
      console.log('第三次运行next方法', v);
    } catch (err) {
      console.log('捕捉错误', v);
    }
    console.log('caller done');
  }
```

### return

1.直接返回该参数

2.若有finally 跳过其他yield直接执行finally

Generator 函数返回的遍历器对象，还有一个`return`方法，可以返回给定的值，并且终结遍历 Generator 函数。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

上面代码中，遍历器对象`g`调用`return`方法后，返回值的`value`属性就是`return`方法的参数`foo`。并且，Generator 函数的遍历就终止了，返回值的`done`属性为`true`，以后再调用`next`方法，`done`属性总是返回`true`。

如果`return`方法调用时，不提供参数，则返回值的`value`属性为`undefined`。

如果 Generator 函数内部有`try...finally`代码块，且正在执行`try`代码块，那么`return`方法会推迟到`finally`代码块执行完再执行。

```js
function* numbers () {
    yield 1;
    try {
      yield 2;
      yield 3;
      yield 10;
      console.log('跳过')　//不执行
    } finally {
      yield 4;
      yield 5;
    }
    yield 6;
  }
  var g = numbers();
  console.log(g.next())  //1
  console.log(g.next())  //2
  console.log(g.return(7)) //4
  console.log(g.next())  //5
  console.log(g.next()) //7
```

### next()、throw()、return() 的共同点

`next()`、`throw()`、`return()`这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换`yield`表达式。

`next()`是将`yield`表达式替换成一个值。

`throw()`是将`yield`表达式替换成一个`throw`语句。

`return()`是将`yield`表达式替换成一个`return`语句。

### yield* 表达式

1. 遍历内部有遍历器的对象都可以

2. 如果被代理的 Generator 函数有`return`语句，那么就可以向代理它的 Generator 函数返回数据
3. 内部类似于　for of+yield语句

如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。

```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  foo();
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "y"
```

这个就需要用到`yield*`表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。

```js
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

再来看一个对比的例子。

```js
function* inner() {
    yield 'hello!';
  }
  
  function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
  }
  
  var gen = outer1()
  console.log(gen.next().value) //open
  console.log(gen.next().value)  //遍历器对象
  console.log(gen.next().value) //close
  
  function* outer2() {
    yield 'open'
    yield* inner()
    yield 'close'
  }
  
  var gen = outer2()
  console.log(gen.next().value) //open
  console.log(gen.next().value)  //hello
  console.log(gen.next().value) //close
```

从语法角度看，如果`yield`表达式后面跟的是一个遍历器对象，需要在`yield`表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为`yield*`表达式



`yield*`后面的 Generator 函数（没有`return`语句时），等同于在 Generator 函数内部，部署一个`for...of`循环

如果`yield*`后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。

```js
function* gen(){
  yield* ["a", "b", "c"];
}

gen().next() // { value:"a", done:false }
```



实际上，任何数据结构只要有 Iterator 接口，就可以被`yield*`遍历。

```js
let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();

read.next().value // "hello"
read.next().value // "h"
```

如果被代理的 Generator 函数有`return`语句，那么就可以向代理它的 Generator 函数返回数据

```js
function* foo() {
  yield 2;
  yield 3;
  return "foo";
}

function* bar() {
  yield 1;
  var v = yield* foo();
  console.log("v: " + v);
  yield 4;
}

var it = bar();

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next()
// {value: undefined, done: true}
```

```js
function* foo() {
    yield 2;
    yield 3;
    return "foo";
  }
  
  function* bar() {
    yield 1;
    var v = yield* foo();
    console.log("v: " + v);
    yield 4;
    return 5
  }
  
  var it = bar();
  console.log(it.next())  //1
  console.log(it.next())  //2
  console.log(it.next())   //3
  //(v:foo)             
  console.log(it.next())   //4
  console.log(it.next())   //5

```

### 作为对象属性的 Generator 函数(前面不变加*)

如果一个对象的属性是 Generator 函数，可以简写成下面的形式。

```js
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
```

上面代码中，`myGeneratorMethod`属性前面有一个星号，表示这个属性是一个 Generator 函数。

```js
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};
```

### Generator 函数的this(通过call来绑定)

```js
function* g() {}

g.prototype.hello = function () {
  return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'
```

上面代码表明，Generator 函数`g`返回的遍历器`obj`，是`g`的实例，而且继承了`g.prototype`。但是，如果把`g`当作普通的构造函数，并不会生效，因为`g`返回的总是遍历器对象，而不是`this`对象。

```js
function* g() {
  this.a = 11;
}

let obj = g();
obj.next();
obj.a // undefined
```

上面代码中，Generator 函数`g`在`this`对象上面添加了一个属性`a`，但是`obj`对象拿不到这个属性。

Generator 函数也不能跟`new`命令一起用，会报错。

```js
function* F() {
  yield this.x = 2;
  yield this.y = 3;
}

new F()
// TypeError: F is not a constructor
```

上面代码中，`new`命令跟构造函数`F`一起使用，结果报错，因为`F`不是构造函数。

那么，有没有办法让 Generator 函数返回一个正常的对象实例，既可以用`next`方法，又可以获得正常的`this`？

下面是一个变通方法。首先，生成一个空对象，使用`call`方法绑定 Generator 函数内部的`this`。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。

```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3
```

上面代码中，执行的是遍历器对象`f`，但是生成的对象实例是`obj`，有没有办法将这两个对象统一呢？

一个办法就是将`obj`换成`F.prototype`。

```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1 //原型
f.b // 2
f.c // 3
```

再将`F`改成构造函数，就可以对它执行`new`命令了。

```js
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

### Generator 函数的异步应用

//这里简单

举个例子

```javascript
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  try{
    var result = yield fetch(url);

  } catch(e){
      console.log(e);
  }
  console.log(result.bio);
}
var g = gen();
var result = g.next();
result.value.then(function(data){
  return data.json();
},(err)=>{
  g.throw(new Error(err));
}).then(function(data){
  g.next(data);
});
```

###  Thunk 函数(自动执行Generator函数的方法)

```
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
```



```js
function* gen() {
  // ...
}

var g = gen();
var res = g.next();

while(!res.done){
  console.log(res.value);
  res = g.next();
}
```

上面代码中，Generator 函数`gen`会自动执行完所有步骤。

但是，这不适合异步操作。如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。这时，Thunk 函数就能派上用处。以读取文件为例。下面的 Generator 函数封装了两个异步操作。

```js
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};
```

上面代码中，`yield`命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。

这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。为了便于理解，我们先看如何手动执行上面这个 Generator 函数

```js
var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});
```

上面代码中，变量`g`是 Generator 函数的内部指针，表示目前执行到哪一步。`next`方法负责将指针移动到下一步，并返回该步的信息（`value`属性和`done`属性）。

仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入`next`方法的`value`属性。这使得我们可以用递归来自动完成这个过程。

```js


const Thunk = function (fn) {
    return function (...args) {
        return function (callback) {
            console.log(...args,callback);
            return fn.call(this, ...args, callback); //调用原函数
        }
    };
};

function f(a,b,cb) {
    cb(a+b);
}
const ft = Thunk(f);

function* gen() {
    var f1 = yield ft(1,2)
    // console.log(f1);
    var f2 = yield ft(3,4)
    // console.log(f2);
    var f3 = yield ft(4,5)
    // console.log(f3);
}
function run(fn) {
    var gen = fn();

    function next(data) {
        console.log(data);
        var result = gen.next(data);
        console.log(result);
        if (result.done) return;
        result.value(next);
    }

    next();
}

run(gen);


// undefined
// { value: [Function], done: false}
// 1 2 [Function: next]
// 3
// { value: [Function], done: false}
// 3 4 [Function: next]
// 7
// { value: [Function], done: false}
// 4 5 [Function: next]
// 9
// { value: undefined, done: true }
```

### co 模块

co 模块可以让你不用编写 Generator 函数的执行器。

```js
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
var co = require('co');
co(gen);
```

上面代码中，Generator 函数只要传入`co`函数，就会自动执行。

`co`函数返回一个`Promise`对象，因此可以用`then`方法添加回调函数。

```js
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});
```

前面说过，Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。

（1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。

（2）Promise 对象。将异步操作包装成 Promise 对象，用`then`方法交回执行权。

co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的`yield`命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co，详见后文的例子。

基于promise对象的自动执行

```js
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

然后，手动执行上面的 Generator 函数。

```js
var g = gen();

g.next().value.then(function(data){
  g.next(data).value.then(function(data){
    g.next(data);
  });
});
```

手动执行其实就是用`then`方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。

```js
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){ //注意这里
      next(data);
    });
  }

  next();
}

run(gen);
```

### co 模块的源码

首先，co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。

```js
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
  });
}
```

在返回的 Promise 对象里面，co 先检查参数`gen`是否为 Generator 函数。如果是，就执行该函数，得到一个内部指针对象；如果不是就返回，并将 Promise 对象的状态改为`resolved`。

```js
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
  });
}
```

接着，co 将 Generator 函数的内部指针对象的`next`方法，包装成`onFulfilled`函数。这主要是为了能够捕捉抛出的错误

```js
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
  });
}
```

```
function next(ret) {
  if (ret.done) return resolve(ret.value); //完成
  var value = toPromise.call(ctx, ret.value);　
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(
    new TypeError(
      'You may only yield a function, promise, generator, array, or object, '
      + 'but the following object was passed: "'
      + String(ret.value)
      + '"'
    )
  );
}
```

上面代码中，`next`函数的内部代码，一共只有四行命令。

第一行，检查当前是否为 Generator 函数的最后一步，如果是就返回。

第二行，确保每一步的返回值，是 Promise 对象。

第三行，使用`then`方法，为返回值加上回调函数，然后通过`onFulfilled`函数再次调用`next`函数。

第四行，在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为`rejected`，从而终止执行。

### 处理并发的异步操作

这时，要把并发的操作都放在数组或对象里面，跟在`yield`语句后面。

```

```



## Async

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

在异步处理上，async 函数就是 Generator 函数的语法糖。

```js
// 使用 generator
var fetch = require('node-fetch');
var co = require('co');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var json1 = yield r1.json();
    console.log(json1.bio);
}

co(gen);
```

当你使用 async 时：

```js
// 使用 async
var fetch = require('node-fetch');

var fetchData = async function () {
    var r1 = await fetch('https://api.github.com/users/github');
    var json1 = await r1.json();
    console.log(json1.bio);
};

fetchData();
```

其实 async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```
async function fn(args) {
  // ...
}
// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

spawn 函数指的是自动执行器，就比如说 co。

再加上 async 函数返回一个 Promise 对象，你也可以理解为 async 函数是基于 Promise 和 Generator 的一层封装。

```js
/**
 * 示例二
 */
function fetch() {
  return fetchData()
  .then(data => {
    if (data.moreData) {
        return fetchAnotherData(data)
        .then(moreData => {
          return moreData
        })
    } else {
      return data
    }
  });
}

async function fetch() {
  const data = await fetchData()
  if (data.moreData) {
    const moreData = await fetchAnotherData(data);
    return moreData
  } else {
    return data
  }
};
```

### 基本用法

`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

```js
function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(()=>{
          console.log(ms);
          resolve(ms+1000);
      }, ms);
    });
  }
 async function fun(time) {
    const time1 = await timeout(time);
    const time2 = await timeout(time1);
    return 'over'
  }
  
  fun(1000).then(function (time) {
    console.log(time);
  });

//1000
//2000
//over
```

async 函数有多种使用形式。

```js
/ 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

### 语法

`async`函数的语法规则总体上比较简单，难点是错误处理机制。

`async`函数返回一个 Promise 对象。

`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数

```js
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```

上面代码中，函数`f`内部`return`命令返回的值，会被`then`方法回调函数接收到。

`async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

```js
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
// Error: 出错了
```

### Promise 对象的状态变化(return 或者报错)

`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数

```js
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
```

### await 命令 (任何一个reject对象后续就不执行)

正常情况下，`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

另一种情况是，`await`命令后面是一个`thenable`对象（即定义`then`方法的对象），那么`await`会将其等同于 Promise 对象

```js
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const actualTime = await new Sleep(1000);
  console.log(actualTime);
})();
```

```js
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```

注意，上面代码中，`await`语句前面没有`return`，但是`reject`方法的参数依然传入了`catch`方法的回调函数。这里如果在`await`前面加上`return`，效果是一样的。

**任何一个`await`语句后面的 Promise 对象变为`reject`状态，那么整个`async`函数都会中断执行。**

另一种方法是`await`后面的 Promise 对象再跟一个`catch`方法，处理前面可能出现的错误类似处理Promise自己处理catch()

```js
async function f() {
    await Promise.reject('出错了')
      .catch(e => console.log(e));
    return await Promise.resolve('hello world');
  }
  
  f()
  .then(v => console.log(v))
```

### 错误处理

如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`

防止出错的方法，也是将其放在`try...catch`代码块之中。

```js
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))

async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}
如果有多个await命令，可以统一放在try...catch结构中。
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}

```

### async 函数的实现原理

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

### async实现并发



## js实现并发以及异步队列

```js
// 为了代码短一些，把 retry，goOn 先去掉了。

const queue = () => {
  const list = [];
  let index = 0;
  let isStop = false;
  let isParallel = false;

  const next = () => {
    if (index >= list.length - 1 || isStop || isParallel) return;    
    const cur = list[++index];
    cur(next);
  }

  const add = (...fn) => {
    list.push(...fn);
  }

  const run = (...args) => {
    const cur = list[index];
    typeof cur === 'function' && cur(next);
  }

  const parallelRun = () => {
    isParallel = true;
    for(const fn of list) {
      fn(next);
    }
  }

  const stop = () => {
    isStop = true;
  }

  return {
    add,
    run,
    stop,
    parallelRun,
  }
}

const async = (x) => {
  return (next) => {
    setTimeout(() => {
      console.log(x);
      next();
    }, 1000);
  }
}

const q = queue();
const funs = '123456'.split('').map(x => async(x));
q.add(...funs);
q.parallelRun();
// 一秒后全部输出 1, 2, 3, 4, 5, 6
```



