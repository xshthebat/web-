## setState

### setState的使用注意事项

`setState(updater, callback)`这个方法是用来告诉react组件数据有更新，有可能需要重新渲染。它是异步的，react通常会集齐一批需要更新的组件，然后一次性更新来保证**渲染的性能**，所以这就给我们埋了一个坑：

那就是在使用`setState`改变状态之后，立刻通过`this.state`去拿最新的状态往往是拿不到的。

#### 要点一

所以第一个使用要点就是：如果你需要基于最新的state做业务的话，可以在`componentDidUpdate`或者`setState`的回调函数里获取。(注：官方推荐第一种做法)

```js
// setState回调函数
changeTitle: function (event) {
  this.setState({ title: event.target.value }, () => this.APICallFunction());
},
APICallFunction: function () {
  // Call API with the updated value
}
```

#### 要点二

设想有一个需求，需要在在onClick里累加两次，如下

```
 onClick = () => {
    this.setState({ index: this.state.index + 1 });
    this.setState({ index: this.state.index + 1 });
  }

```

在react眼中，这个方法最终会变成

```js
Object.assign(
  previousState,
  {index: state.index+ 1},
  {index: state.index+ 1},
  ...
)
```

由于后面的数据会覆盖前面的更改，所以最终只加了一次.所以如果是下一个state依赖前一个state的话，推荐给setState传function

```js
onClick = () => {
    this.setState((prevState, props) => {
      return {quantity: prevState.quantity + 1};
    });
    this.setState((prevState, props) => {
      return {quantity: prevState.quantity + 1};
    });
}
```

![](/home/xsh/桌面/markdown/imgs/1658a8a62d6bb975.png)

**setState是一个异步的过程，它会集齐一批需要更新的组件然后一起更新**。**其实state的值只有在render的时候才真正被修改了**经过测试，其实state的值只有在render的时候才真正被修改了，在shouldComponentUpdate和componentWillUpdate时还是之前的值。测试结果如下：

```js
// shouldComponentUpdate: 0
// componentWillUpdate: 0
// render: 1
// componentDidUpdate: 1
// shouldComponentUpdate: 1
// componentWillUpdate: 1
// render: 2
// componentDidUpdate: 2
// shouldComponentUpdate: 2
// componentWillUpdate: 2
// render: 3
// componentDidUpdate: 3
```

## **setState真的是异步的吗 ？**

这两天自己简单的看了下`setState`的部分实现代码，在这边给到大家一个自己个人的见解，可能文字或图片较多，没耐心的同学可以直接跳过看总结（**源码版本是16.4.1**）。

。

**看之前，为了方便理解和简化流程，我们默认react内部代码执行到performWork、performWorkOnRoot、performSyncWork、performAsyncWork这四个方法的时候，就是react去update更新并且作用到UI上。**

## **一、合成事件中的setState**

首先得了解一下什么是合成事件，react为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在`jsx`中常见的`onClick`、`onChange`这些都是合成事件。

```js
class App extends Component {

  state = { val: 0 }

  increment = () => {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 输出的是更新前的val --> 0
  }
  render() {
    return (
      <div onClick={this.increment}>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```



## **二、生命周期函数中的setState**

```js
class App extends Component {

  state = { val: 0 }

 componentDidMount() {
    this.setState({ val: this.state.val + 1 })
   console.log(this.state.val) // 输出的还是更新前的值 --> 0
 }
  render() {
    return (
      <div>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

## **三、原生事件中的setState**

```js
class App extends Component {

  state = { val: 0 }

  changeValue = () => {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 输出的是更新后的值 --> 1
  }

 componentDidMount() {
    document.body.addEventListener('click', this.changeValue, false)
 }

  render() {
    return (
      <div>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

## **四、setTimeout中的setState**

```js
class App extends Component {

  state = { val: 0 }

 componentDidMount() {
    setTimeout(_ => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 输出更新后的值 --> 1
    }, 0)
 }

  render() {
    return (
      <div>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

## **五、setState中的批量更新**

```js
class App extends Component {

  state = { val: 0 }

  batchUpdates = () => {
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
 }

  render() {
    return (
      <div onClick={this.batchUpdates}>
        {`Counter is ${this.state.val}`} // 1
      </div>
    )
  }
}
```

上面的结果最终是1，在`setState`的时候react内部会创建一个`updateQueue`，通过`firstUpdate`、`lastUpdate`、`lastUpdate.next`去维护一个更新的队列，在最终的`performWork`中，相同的key会被覆盖，只会对最后一次的`setState`进行更新，



## **总结 :**

1. **setState 只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。**
2. **setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。**
3. setState **的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。**