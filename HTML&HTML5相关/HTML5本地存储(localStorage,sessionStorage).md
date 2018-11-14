# HTML5本地存储webStroage(localStorage,sessionStorage)

Web Storage是HTML5里面引入的一个类似于cookie的本地存储功能，可以用于客户端的本地存储，其相对于cookie来说有以下几点优势：

1. **存储空间大**：cookie只有4KB的存储空间，而Web Storage在官方建议中为每个网站5M。
2. **可选择性强**：Web Storage分为两种：`sessionStorage`和`localStorage`

## **Web Storage的使用方法**

在使用上，`session Storage`和`local Storage`大同小异，只是`session Storage`是将数据临时存储在session中，浏览器关闭，数据随之消失。而`localStorage`则是将数据存储在本地，理论上来说数据永远不会消失，除非人为删除。

API：

- 保存数据 `localStorage.setItem( key, value ); ``sessionStorage.setItem( key, value );`
- 读取数据 `localStorage.getItem( key );` `sessionStorage.getItem( key );`
- 删除单个数据`localStorage.removeItem( key );` `sessionStorage.removeItem( key );`
- 删除全部数据`localStorage.clear( );` `sessionStorage.clear( );`
- 获取索引的key`localStorage.key( index );` `sessionStorage.key( index );`

**注意：Web Storage的API只能操作字符串**

在使用Web Storage之前，我们需要注意以下几点：

1. 仅支持支持IE8及以上版本

2. 由于只能对字符串类型数据进行操作，所以对一些JSON对象需要进行转换

3. 因为是明文存储，所以毫无隐私性可言，绝对不能用于存储重要信息

4. 会是浏览器加载速度在一定程度上变慢

5. 无法被爬虫程序爬取

6. 使用Web Storage之前，请加上以下代码，对浏览器对Web Storage的支持性进行判断

7. 同源策略

8. 浏览器无痕模式下，localStorage会失效，需要捕捉错误，并暴露出来



   ```js
   if(window.localStorage){//或者window.sessionStorage     
       alert("浏览器支持localStorage")
       //主逻辑业务
   }else{      
       alert("浏览不支持localStorage")
       //替代方法
   }   
   ```

## 三者的异同

| 特性           | Cookie                                                       | localStorage                                       | sessionStorage                               |
| -------------- | ------------------------------------------------------------ | -------------------------------------------------- | -------------------------------------------- |
| 数据的生命期   | 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效 | 除非被清除，否则永久保存                           | 仅在当前会话下有效，关闭页面或浏览器后被清除 |
| 存放数据大小   | 4K左右                                                       | 一般为5MB                                          |                                              |
| 与服务器端通信 | 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 | 仅在客户端（即浏览器）中保存，不参与和服务器的通信 |                                              |

### 浏览器支持情况：

localStorage和sessionStorage是html5才应用的新特性，可能有些浏览器并不支持，这里要注意。



![img](/home/xsh/桌面/markdown/imgs/15ff2d54764e53af.png)

### Web Storage 事件

storage 事件当存储的数据发生变化时，会触发 storage 事件。但要注意的是它不同于click类的事件会事件捕获和冒泡，storage 事件更像是一个通知，不可取消。**触发这个事件会调用同域下其他窗口的storage事件，不过触发storage的窗口（即当前窗口）不触发这个事件**。storage 的 event 对象的常用属性如下

```js
  oldValue：更新前的值。如果该键为新增加，则这个属性为null。
  newValue：更新后的值。如果该键被删除，则这个属性为null。
  url：原始触发storage事件的那个网页的网址。
  key：存储store的key名
```

```javascript
function storageChanged() {
        console.log(arguments);
    }

    window.addEventListener('storage', storageChanged, false);
```

基于 storage 事件特点，Web Storage 还可以用于同域不同窗口间的通信

### 容量溢出

**字符串最大容量是5M，那么我如果存储容量溢出了怎么办？**

> 其实这个5M对于不同浏览器来说也是不确定的，不过大体上是一个5M的范围，溢出了怎么办，肯定会发生错误啊。浏览器会报一个名为“QuotaExceededError”的错误，如下图：

![](/home/xsh/桌面/markdown/imgs/2259272146-5a044ff90492b_articlex.png)

**最后一次溢出的字符串是会存储到最大容量停止还是不会存储？**

正常情况下，可能不会存储5M的字符串，但是也不能保证浏览器日积月累的情况下，恰巧用户也没清理过缓存，那么当最后容量接近5M的时候，我们再存储一个字符串进去的时候会发生错误，发生错误的字符串是存了一半？还是压根就没存呢？答案是---**没存**。下面是我写的一个demo，最后发现报错的时候刷新浏览器，localStorage的当前容量为发生变化。

![](/home/xsh/桌面/markdown/imgs/2874002072-5a0450ebd2cfe_articlex.png)

**既然存在安全问题，那么localStorage的使用就不是绝对安全的，如何更安全的使用localStorage？**

```js
(function(){
  var safeLocalStorage = function(key, value) {
    try{
      localStorage.setItem(key,value);
    }catch(oException){
      if(oException.name == 'QuotaExceededError'){
          console.log('已经超出本地存储限定大小！');
          // 可进行超出限定大小之后的操作，如下面可以先清除记录，再次保存
          localStorage.clear();
          localStorage.setItem(key,value);
      }
    }
  }
  this.safeLocalStorage = safeLocalStorage;
})();
```

## 整站本地存储的规划

户端的存储空间宝贵，然而站点也因为业务的不同，很难有一个统一的实施细则，但是有几个大原则不会变。

- 只保存重要页面的重要数据

  - 典型的，首页首屏
  - 对业务庞大的站点，这点尤其重要

- 极大提高用户体验的数据

  - 比如表单的状态，可以提交之前保存，当用户刷新页面时可以还原
  - 静态资源，比如 js 和 css

- 一个请求一个 key 值（一个 cgi 一个 key 值）

  - 避免请求链接加参数的 key (`http://request-ajax.cgi[params]`)，这样必然让 key 值趋于冗余从而撑爆空间


### 解决溢出



文件存入indexDB,重要逻辑内容存入localStorage