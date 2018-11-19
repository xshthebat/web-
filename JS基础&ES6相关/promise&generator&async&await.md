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

### yield语法要点

yield 后面可以是任意合法的JavaScript表达式，yield语句可以出现的位置可以等价于一般的赋值表达式（比如a=3）能够出现的位置。举例：

```js
b = 2 + a = 3 // 不合法
b = 2 + (a = 3) // 合法

b = 2 + yield 3 // 不合法
b = 2 + (yield 3) // 合法

```

### 关于生成器对象

Generator函数返回的生成器对象是Generator函数的一个实例，也就是说返回的生成器对象会继承Generator函数原型链上的方法。举例：

```js
function* g() {
  yield 1
}
g.prototype.greet = function () {
  console.log('hello')
}
let g1 = g()
console.log(g1 instanceof g) // true
g1.greet() // 'hello'
```

执行生成器对象的[Symbol.iterator]方法会返回生成器对象本身。

```js
function* greet() {}
let g = greet()
console.log(g[Symbol.iterator]() === g) // true
```

生成器对象还具有以下两个方法：

#### return 

1. return方法。和迭代器接口的return方法一样，用于在生成器函数执行过程中遇到异常或者提前中止（比如在for...of循环中未完成时提前break）时自动调用，同时生成器对象变为终止态，无法再继续产生值。也可以手动调用来终止迭代器，如果在调用return方法传入参数，则该参数会作为最终返回对象的value属性值。

如果刚好是在生成器函数中的try代码块中函数执行暂停并且具有finally代码块，此时调用return方法不会立即终止生成器，而是会继续将finally代码块中的逻辑执行完，然后再终止生成器。如果finally代码块中包含yield语句，意味着还可以继续调用生成器对象的next方法来获取值，直到finally代码块执行结束。举例：

```js
function* ff(){
  yield 1;
  try{ yield 2 }finally{ yield 3 }
}
let fg = ff()
fg.next() // {value: 1, done: false}
fg.return(4) // {value: 4, done: true}
let ffg = ff()
ffg.next() // {value: 1, done: false}
ffg.next() // {value: 2, done: false}
ffg.return(4) // {value: 3, done: false}
ffg.next() // {value: 4, done: true}
```

从上面的例子中可以看出，在调用return方法之后如果刚好触发finally代码块并且finally代码中存在yield语句，就会导致在调用return方法之后生成器对象并不会立即结束，因此在实际使用中不应该在finally代码块中使用yield语句。

#### throw

throw方法。调用此方法会在生成器函数当前暂停执行的位置处抛出一个错误。如果生成器函数中没有对该错误进行捕获，则会导致该生成器对象状态终止，同时错误会从当前throw方法内部向全局传播。在调用next方法执行生成器函数时，如果生成器函数内部抛出错误而没有被捕获，也会从next方法内部向全局传播。

#### yield*语句

yield* 语句是通过给定的Iterable对象的[Symbol.iterator]方法返回的迭代器来产生值的，也称为yield委托，指的是将当前生成器函数产生值的过程委托给了在yield*之后的Iterable对象。基于此，yield* 可以用来在Generator函数调用另外一个Generator函数。举例：

```js
function* foo() {
  yield 2
  yield 3
  return 4
}
function* bar() {
  let ret = yield* foo()
  console.log(ret) // 4
}
```

上面的例子中，被代理的Generator函数最终执行完成的返回值最终会作为代理它的外层Generator函数中yield*语句的返回值。另外，错误也会通过yield*在被委托的生成器函数和控制外部生成器函数的代码之间传递。举例：

```js
function* delegated() {
  try {
    yield 1
  } catch (e) {
    console.log(e)
  }
  yield 2
  throw "err from delegate"
}

function* delegate() {
  try {
    yield* delegated()
  } catch (e) {
    console.log(e)
  }
  yield 3
}

let d = delegate()
d.next() // {value: 1, done: false}
d.throw('err')
// err
// {value: 2, done: false}
d.next()
// err from delegate
// {value: 3, done: false}
```

最后需要注意的是yield*和yield之间的区别，容易忽视的一点是yield*并不会停止生成器函数的执行。举例：

```js
function* foo(x) {
  if (x < 3) {
    x = yield* foo(x + 1)
  }
  return x * 2
}
let f = foo()
f.next() // {value: 24, done: true}。
```

#### 使用Generator组织异步流程(之后加深理解)

使用Generator函数来处理异步操作的基本思想就是在执行异步操作时暂停生成器函数的执行，然后在阶段性异步操作完成的回调中通过生成器对象的next方法让Generator函数从暂停的位置恢复执行，如此往复直到生成器函数执行结束。

也正是基于这种思想，Generator函数内部才得以将一系列异步操作写成类似同步操作的形式，形式上更加简洁明了。而要让Generator函数按顺序自动完成内部定义好的一系列异步操作，还需要通过额外的函数来执行Generator函数。对于每次返回值为非Thunk函数类型的生成器函数，可以用co模块来自动执行。而对于遵循callback的异步API，则需要先转化为Thunk函数然后再集成到生成器函数中。比如我们有这样的API：

```js
logAfterNs = (seconds, callback) => 
    setTimeout(() => {console.log('time out');callback()}, seconds * 1000)

```

异步流程是这样的：

```js
logAfterNs(1, function(response_1) {
  logAfterNs(2, function () {
    ...
  })
})
```

首先我们需要将异步API转化为Thunk形式，也就是原来的API：logAfterNs(...args, callback)，我们需要改造为：thunkedLogAfterNs(...args)(callback)

```js
function thunkify (fn) {
  return function (...args) {
    return function (callback) {
      args.push(callback)
      return fn.apply(null, args)
    }
  }
}
let thunkedLogAfterNs = thunkify(logAfterNs)
function* sequence() {
  yield thunkedLogAfterNs(1)
  yield thunkedLogAfterNs(2)
}
```

转化为使用生成器函数来改写我们的异步流程之后，我们还需要一个函数来自动管理并执行我们的生成器函数。

```js
function runTask(gen) {
  let g = gen()
  function next() {
    let result = g.next()
    if (!result.done) result.value(next)
  }
  next()
}

runTask(sequence)
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

