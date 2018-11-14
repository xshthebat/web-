# HTML5 SSE(Server-Sent Events)

SSE 协议很简单，本质上是一个客户端发起的 HTTP Get 请求，服务器在接到该请求后，返回 200 OK 状态，同时附带以下 Headers

```http
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

- SSE 的 MIME Type 规定为 text/event-stream
- SSE 肯定不允许缓存
- SSE 是一个一直打开的 TCP 连接，所以 Connection 为 Keep-Alive

## Server-Sent 事件 - 单向消息传递

Server-Sent 事件指的是网页自动获取来自服务器的更新。

以前也可能做到这一点，前提是网页不得不询问是否有可用的更新。通过服务器发送事件，更新能够自动到达。

例子：Facebook/Twitter 更新、股价更新、新的博文、赛事结果等。

所有主流浏览器均支持服务器发送事件，除了 Internet Explorer。

我们知道，IE浏览器并不支持EventSource，有如下解决方案：

```
eventsource.min.js
```

```
npm install event-source-polyfill
```

### 检测 Server-Sent 事件支持

```html
if(typeof(EventSource)!=="undefined")
{
  // 浏览器支持 Server-Sent
  // 一些代码.....
}
else
{
// 浏览器不支持 Server-Sent..
}
```

## EventSource对象

```js
new EventSource(url);
```

url必须同源

### 属性

#### readyState

```js
var myReadyState = eventSource.readyState;
```

表示连接状态的数字。可能的值是：

- `0` - 连接
- `1` - 打开
- `2` - 关闭

#### url

表源的URL。

#### withCredentials

A [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/API/Boolean)指示`EventSource`对象是否使用跨源（[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)）凭据set（`true`）实例化（或者`false`是默认值）。

### open(连接时触发)

```js
source.onopen = function(event) {
  // handle open event
};
```





### message(有数据触发)

```js
evtSource.onmessage = function(e) {
  var newElement = document.createElement("li");

  newElement.textContent = "message: " + e.data;
  eventList.appendChild(newElement);
}
```



### error(发生错误触发)

```js
source.onerror = function(event) {
  // handle error event
  
};
source.addEventListener("error", function(event) {
  // handle error event
}, false);
```

#### 主动断开连接

```js
source.close();
```



### 自定义事件

服务器可以与浏览器约定自定义事件。这种情况下，发送回来的数据不会触发message事件。

```js
source.addEventListener("foo", function(event) {
  var data = event.data;
  var origin = event.origin;
  var lastEventId = event.lastEventId;
  // handle message
}, false);
```

## 服务端实现

设置响应头

```
{'Content-Type': "text/event-stream",
 'Cache-Control': 'no-cache',
 'Connection': 'keep-alive'}
```



```js
//一次事件流
res.write("id: " + num + "\n");
res.write("event: " + str + "\n");
res.write("data: " + datastr + "\n\n");
//如果一个request断开连接，则结束对应的response
res.end();
```

