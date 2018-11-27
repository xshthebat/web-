## 初次渲染

###  **构造函数，指定This，初始状态，绑定函数（constructor）**

````js
       constructor(props){
                //指定This
		super(props)  
               //设置初始化状态
		this.state={
			value:'',
			focus:false
			}
               //为组件上的函数绑定this
		this.handleChange = this.handleChange.bind(this);
	}
````

构造函数在组件初次渲染的时候只运行一次，构造函数里面进行的操作大概有上述代码的三种操作。

### **组件安装（componentWillMount）**

```js
render(){
		return(
			<div className="FilterableProductTable">
			   <SearchBar value={this.state.value} handleChange={this.handleChange} handleFocus={this.handleFocus} handleOnblur={ this.handleOnblur}/>
			   <ProductTable data={this.props.JsonData} focus={this.state.focus} value={this.state.value} handleSelect={this.handleSelect}/>
			</div>
		);
	}
```

这个 render 方法必须要返回一个 JSX 元素。
必须要用一个外层的 JSX 元素把所有内容包裹起来,返回并列多个 JSX 元素是不合法的.在这里render函数只调用一次

### **查找DOM或者请求数据（****componentDidMount**

```js
void componentDidMount()
```

在第一次渲染后调用，此时组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 

如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)

## 组件的二次渲染

导致组件进行二次渲染的原因一般有三种

父组件的props发生更新

调用this.forceUpdate,（调用 forceUpdate() 会导致组件跳 shouldComponentUpdate() ，直接调用 render()。 ）

调用this.setState （并不是一次setState会触发一次render，React可能会合并操作，再一次性进行render）

### **1.父组件的props发生更新**

```
void componentWillReceiveProps(nextProps)
```

props是父组件传递给子组件的。当子组件接受到nextProps时，不管这个props与原来的是否相同都会执行该方法。

```
bool shouldComponentUpdate(nextProps, nextState)
```

`shouldComponentUpdate`方法接收一个新的props和state，函数返回一个bool类型数据决定是否更新组件。如果返回false，则不进行更新。如果返回true，则进入下一环节。通常情况下为了优化，我们需要对新的props以及state和原来的数据作对比，如果发生变化。一般用`immutable` ，判断如下

当组件决定继续更新时，会进入`componentWillUpdate`方法

```
void componentWillUpdate(nextProps, nextState)
```

之后执行render函数更新DOM

```
ReactElement render()
```

执行完render函数之后执行`componentDidUpdata`,

```
void componentDidUpdate()
```

除了首次render之后调用`componentDidMount`，其它render结束之后都是调用`componentDidUpdate`。

当组件需要被卸载的时候，调用 componentWillUnmount 方法

```
void componentWillUnmount()
```

一般在`componentDidMount`里面注册的事件需要在这里删除。

### **2.调用this.forceUpdate更新（重复componentWillUpdate方法之后的操作）**

当组件调用forceUpdata方法更新时，会进入`componentWillUpdate`方法。直接跳过shouldComponentUpdta

```
void componentWillUpdate(nextProps, nextState)
```

之后执行render函数更新DOM

```
ReactElement render()
```

执行完render函数之后执行`componentDidUpdata`,

```
void componentDidUpdate()
```

除了首次render之后调用`componentDidMount`，其它render结束之后都是调用`componentDidUpdate`。

当组件需要被卸载的时候，调用 componentWillUnmount 方法

```js
void componentWillUnmount()
```

void componentWillUnmount()

### **3.调用this.setState方法更新组件state,触发组件更新**

调用this.setState()方法更新组件state，首先会触发`shouldComponentUpdata(nextProps,nextState)`

在方法判断过后，决定是否更新。更新的操作和调用this.forceUpdate更新的操作是一样的。

![](/home/xsh/桌面/markdown/imgs/16371f0fb7b47b1a.png)

