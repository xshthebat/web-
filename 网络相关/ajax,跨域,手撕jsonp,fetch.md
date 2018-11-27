# ajax,跨域,手撕jsonp,fetch

![](/home/xsh/桌面/markdown/imgs/163e8f98a78dc412.png)

## 什么是Ajax

Ajax（Asynchronous JavaScript and XML的缩写）是一种异步请求数据的web开发技术，对于改善用户的体验和页面性能很有帮助。简单地说，在不需要重新刷新页面的情况下，Ajax 通过异步请求加载后台数据，并在网页上呈现出来。常见运用场景有表单验证是否登入成功、百度搜索下拉框提示和快递单号查询等等。 **Ajax目的：提高用户体验，较少网络数据的传输量**

## Ajax原理是什么

最核心的依赖是浏览器提供的XMLHttpRequest对象，使得浏览器可以发出HTTP请求与接收HTTP响应。浏览器接着做其他事情，等收到XHR返回来的数据再渲染页面。理解了Ajax的工作原理后，接下来我们探讨下如何使用Ajax。

![](/home/xsh/桌面/markdown/imgs/163e8f98a81cf781.png)

XMLHttpRequest是ajax的核心机制，是一种支持异步请求的技术。简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户。达到无刷新的效果。它还支持   [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)以外的协议(包括文件和ftp)。

所以要想理解Ajax原理就要先理解XMLHttpRequest的工作原理。

  首先，我们先来看看XMLHttpRequest这个对象的属性。

![](/home/xsh/桌面/markdown/imgs/0_1328346656B5Sl.gif)



优点：

- 页面无刷新，用户体验好。
- 异步通信，更加快的响应能力。
- 减少冗余请求，减轻了服务器负担
- 基于标准化的并被广泛支持的技术，不需要下载插件或者小程序

缺点：

- `ajax`干掉了`back`按钮，即对浏览器后退机制的破坏。
- 存在一定的安全问题。
- 对搜索引擎的支持比较弱。
- 破坏了程序的异常机制。
- 无法用`URL`直接访问

## Ajax的使用

### **1.创建Ajax核心对象XMLHttpRequest**(记得考虑兼容性)

所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象。

 

```js
var xhr=null;  
	 if (window.XMLHttpRequest)  
	   {// 兼容 IE7+, Firefox, Chrome, Opera, Safari  
	   xhr=new XMLHttpRequest();  
	   } else{// 兼容 IE6, IE5 
	     xhr=new ActiveXObject("Microsoft.XMLHTTP");  
	   } 
```

### **2.准备请求**

初始化该`XMLHttpRequest`对象，接受三个参数

```js
xhr.open(method,url,async,user, password);
```

method：请求的类型；GET 或 POST

要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」、等。对于非HTTP(S) URL被忽略。

url：文件在服务器上的位置

一个str表示要向其发送请求的URL。

user:可选的用户名用于认证用途；默认为`null`。

password:可选的密码用于认证用途，默认为null。

`GET`请求：

```js
xhr.open("GET",demo.php?name=tsrot&age=24,true);
```

`POST`请求:

请求：

```js
xhr.open("POST",demo.php,true);
```

第三个参数是async表示请求是以异步还是同步的模式发出。（默认为true

- `false`：同步模式发出的请求会暂停所有javascript代码的执行，知道服务器获得响应为止，如果浏览器在连接网络时或者在下载文件时出了故障，页面就会一直挂起。
- `true`：异步模式发出的请求，请求对象收发数据的同时，浏览器可以继续加载页面，执行其他javascript代码

async：true（异步）或 false（同步） **注意：post请求一定要设置请求头的格式内容**

```js
xhr.open("POST","test.html",true);  
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
xhr.send("fname=Henry&lname=Ford");  //post请求参数放在send里面，即请求体
```

### 3.发送请求

```js
xhr.send();
```

一般情况下，使用`Ajax`提交的参数多是些简单的字符串，可以直接使用`GET`方法将要提交的参数写到`open`方法的`url`参数中，此时`send`方法的参数为`null`或为空。

`GET`请求

```js
xhr.open("GET",demo.php?name=tsrot&age=24,true);
xhr.send(null);
```

`POST`请求：
如果需要像 `HTML` 表单那样 `POST` 数据，请使用 `setRequestHeader()`来添加 `HTTP` 头。然后在`send()`方法中规定您希望发送的数据：

```js
xhr.open("POST",demo.php,true);
xhr.setRequestHeder("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
xhr.send()
```

```js
void send();
void send(ArrayBuffer data);
void send(ArrayBufferView data);
void send(Blob data);
void send(Document data);
void send(DOMString? data);
void send(FormData data);
var xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

xhr.onload = function () {
   // 请求结束后,在此处写处理代码
};

xhr.send(null);
// xhr.send('string');
// xhr.send(new Blob());
// xhr.send(new Int8Array());
// xhr.send({ form: 'data' });
// xhr.send(document);
```

### ４.处理响应

```js
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.responseText);
    }
}
```

#### onreadystatechange：

只要 `readyState` 属性发生变化，就会调用相应的[处理函数](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler)。这个回调函数会被用户线程所调用。**XMLHttpRequest.onreadystatechange** 会在 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 的[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState) 属性发生改变时触发 `readystatechange` 事件的时候被调用当一个 `XMLHttpRequest` 请求被 [abort()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort) 方法取消时，其对应的 `readystatechange` 事件不会被触发。

```js
XMLHttpRequest.onreadystatechange = callback;
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.responseText);
    }
}
```

#### readyState:

**XMLHttpRequest.readyState** 属性返回一个 XMLHttpRequest  代理当前所处的状态。一个 XHR 代理总是处于下列状态中的一个：

| 值   | 状态               | 描述                                                |
| ---- | ------------------ | --------------------------------------------------- |
| `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
| `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
| `3`  | `LOADING`          | 下载中； `responseText` 属性已经包含部分数据。      |
| `4`  | `DONE`             | 下载操作已完成。                                    |

#### status：

只读属性 `**XMLHttpRequest.status**` 返回了`XMLHttpRequest` 响应中的数字状态码。`status` 的值是一个`无符号短整型`。在请求完成前，`status`的值为`0`。值得注意的是，如果 XMLHttpRequest 出错，浏览器返回的 status 也为0。

 

status码是标准的[HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_codes)。举个例子，`status` `200` 代表一个成功的请求。如果服务器响应中没有明确指定status码，`XMLHttpRequest.status` 将会默认为`200`

```js
var xhr = new XMLHttpRequest();
console.log('UNSENT', xhr.status);

xhr.open('GET', '/server', true);
console.log('OPENED', xhr.status);

xhr.onprogress = function () {
  console.log('LOADING', xhr.status);
};

xhr.onload = function () {
  console.log('DONE', xhr.status);
};

xhr.send(null);

/**
 * 输出如下：
 *
 * UNSENT 0
 * OPENED 0
 * LOADING 200
 * DONE 200
 */
```

#### responseText:

**XMLHttpRequest.responseText** 属性返回一个DOMString，它包含对文本的请求的响应，如果请求不成功或尚未发送，则返回null。`responseText`属性在请求完成之前将会得到部分属性。 如果 `XMLHttpRequest.responseType` 的值不是 `text` 或者空字符串，届时访问 `XMLHttpRequest.responseType` 将抛出 `InvalidStateError` 异常。

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

// If specified, responseType must be empty string or "text"
xhr.responseType = 'text';

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            console.log(xhr.response);
            console.log(xhr.responseText);
        }
    }
};

xhr.send(null);
```



#### responseXML：

**XMLHttpRequest.responseXML** 属性是一个只读值，它返回一个包含请求检索的HTML或XML的[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)，如果请求未成功，尚未发送，或者检索的数据无法正确解析为 XML 或 HTML，则为 null。该响应被解析，就像它是一个 “text / xml” 流。当 [`responseType`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType) 设置为 “document” 并且请求已异步执行时，响应将解析为 “text / html” 流。`responseXML` 对于任何其他类型的数据以及 [`data:` URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) 为 null。

如果服务器没有明确指出 [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 头是 `"text/xml"` 还是 `"application/xml"`, 你可以使用[`XMLHttpRequest.overrideMimeType()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/overrideMimeType) 强制 `XMLHttpRequest` 解析为 XML.

```js
var data = XMLHttpRequest.responseXML;
```

 ```js
ar xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

// 如果已指明，responseType 必须是空字符串或 "docuemnt" 
xhr.responseType = 'document';

// overrideMimeType() 用来强制解析 response 为 XML
xhr.overrideMimeType('text/xml');

xhr.onload = function () {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 200) {
      console.log(xhr.response);
      console.log(xhr.responseXML);
    }
  }
};

xhr.send(null);
 ```

#### **responseType**:

**XMLHttpRequest.responseType** 属性是一个枚举类型的属性，返回响应数据的类型。它允许我们手动的设置返回数据的类型。如果我们将它设置为一个空字符串，它将使用默认的"text"类型。

esponseType支持以下几种值：

| Value           | Data type of `response` property                             |
| --------------- | ------------------------------------------------------------ |
| `""`            | [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) (this is the default value) |
| `"arraybuffer"` | [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBuffer) |
| `"blob"`        | [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) |
| `"document"`    | [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) |
| `"json"`        | JavaScript object, parsed from a JSON string returned by the server |
| `"text"`        | [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) |

#### **timeout**:

`**XMLHttpRequest.timeout**` 是一个无符号长整型数，代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时。超时并不应该用在一个 [document environment](https://developer.mozilla.org/en-US/docs/Glossary/document_environment) 中的同步 XMLHttpRequests  请求中，否则将会抛出一个 `InvalidAccessError` 类型的错误。当超时发生， [timeout](https://developer.mozilla.org/zh-CN/docs/Web/Events/timeout) 事件将会被触发。

在IE中，超时属性可能只能在调用 [open()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open) 方法之后且在调用 [send()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send) 方法之前设置。

```js
function loadFile(url, timeout, callback) {
    var args = Array.prototype.slice.call(arguments, 3);
    var xhr = new XMLHttpRequest();
    xhr.ontimeout = function () {
        console.error("The request for " + url + " timed out.");
    };
    xhr.onload = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback.apply(xhr, args);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.timeout = timeout;
    xhr.send(null);
}
```

#### **upload**:

**XMLHttpRequest.upload方法返回一个** [`XMLHttpRequestUpload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload)对象，用来表示上传的进度。这个对象是不透明的，但是作为一个[`XMLHttpRequestEventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget)，可以通过对其绑定事件来追踪它的进度。

| 事件          | 相应属性的信息类型               |
| ------------- | -------------------------------- |
| `onloadstart` | 获取开始                         |
| `onprogress`  | 数据传输进行中                   |
| `onabort`     | 获取操作终止                     |
| `onerror`     | 获取失败                         |
| `onload`      | 获取成功                         |
| `ontimeout`   | 获取操作在用户规定的时间内未完成 |
| `onloadend`   | 获取完成（不论成功与否）         |

#### **withCredentials**

**XMLHttpRequest.withCredentials**  属性是一个[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)类型，它指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site `Access-Control`）请求。在同一个站点下使用`withCredentials属性是无效的。`

`此外，这个指示`也会被用做`响应中`cookies 被忽视的标示。默认值是false。

如果在发送来自其他域的XMLHttpRequest请求之前，未设置`withCredentials` 为true，那么就不能为它自己的域设置cookie值。而通过设置`withCredentials` 为true获得的第三方cookies，将会依旧享受同源策略，因此不能被通过[document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)或者从头部相应请求的脚本等访问。

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true);
xhr.withCredentials = true;
xhr.send(null);
```

### 5.完整例子

```js
function Ajax({ url, method, param, timeout }) {
    let _url = url;
    let _method = method.toLocaleUpperCase() === 'GET' || method.toLocaleUpperCase() === 'POST' ? method.toLocaleUpperCase() : 'GET';
    return new Promise((res, rej) => {
        let xhr = null;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject();
        }
        if (_method === 'GET') {
            //处理参数
            let arrs = [];
            for (let keys in param) {
                arrs.push(`${keys}=${param[keys]}`);
            }
            let _param = `${_url}?${arrs.join('&')}`
            if (_param[_param.length - 1] === '?') {
                _param = _param.substring(0, _param.length - 1);
            }
            console.log(_param)
            if (xhr) {
                xhr.open(_method, _param, true);
            } else {
                rej(new Error('XMLHttpRequest is not defined'));
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    res(xhr.responseText)
                }
            }
            xhr.ontimeout = function () {
                rej(new Error('timeout'));
            }
            xhr.send();
        } else {
            if (xhr) {
                xhr.open(_method, _url, true);
            } else {
                rej(new Error('XMLHttpRequest is not defined'));
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    res(xhr.responseText)
                }
            }
            xhr.ontimeout = function () {
                rej(new Error('timeout'));
            }
            xhr.send(param);
        }

    })
}
Ajax({
    url: 'http://123.207.138.78:8881/api/iflogin', method: 'GET', param: {

    }
}).then((res)=>{
    console.log(res);
}).catch(e=>{
    console.log(e);
})
```

### ajax方法

#### abort()

如果该请求已被发出，**XMLHttpRequest.abort()** 方法将终止该请求。当一个请求被终止，它的 readyState 属性将被置为0（ `UNSENT` )。

```js
xhrInstance.abort();
```

```js
var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://developer.mozilla.org/";
xhr.open(method,url,true);

xhr.send();

xhr.abort();
```

#### **overrideMimeType()(强制使流方式处理为"text/xml"类型处理时会被使用到，即使服务器在响应头中并没有这样指定。此方法必须在send方法之前调用方为有效)**

```js
req = new XMLHttpRequest();
req.overrideMimeType("text/plain");
req.addEventListener("load", callback, false);
req.open("get", url);
req.send();
```

#### **setRequestHeader**



设置HTTP请求头部的方法。此方法必须在  [`open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open)方法和 [`send()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)   之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。

如果没有设置 [`Accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept) 属性，则此发送出[`send()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send) 的值为此属性的默认值`*/*` 。

安全起见，有些请求头的值只能由user agent设置(不能自己设置)

## fetch(一般先不说)

### fetch和ajax

不能中断，没有 abort、terminate、onTimeout 或 cancel 方法

而ajax有timeout(超时事件),upload(进度)属性,以及　abort(停止)方法

fetch 不支持同步请求







随着前端异步的发展, XHR 这种耦合方式的书写不利于前端异步的 Promise 回调. 而且,写起来也是很复杂. fetch API 本来是在 SW(ServiceWorkers) 中提出的, 不过, 后面觉得好用, 就把他挂载到 window 对象下. 这样, 在前端的正常通信中, 我们也可以直接调用. 但, fetch 毕竟比较新, 看一下他的兼容性.

这种功能以前是使用  [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)实现的。(浏览器现在提供新接口实现)Fetch提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 [`Service Workers`](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorker_API)。Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如CORS和HTTP的扩展。

![](/home/xsh/桌面/markdown/imgs/ccfee79f0eec15d2874f6d40128b7387.png)



在 PC 端上, 就 FF, Opera 和 Chrome 比较 fashion. mobile 的话, 基本上是不能用的. 当然, 前端一直是个拥抱变化的职业, 官方已经有一个现成的 [polyfill](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fgithub%2Ffetch) 可以使用. 这样的话, 就没必要过多担心.

每用到一个新的 feature, 我们首先得知道他能不能用. [Modernizr](https://link.juejin.im/?target=https%3A%2F%2Fmodernizr.com%2F) 这个库做的挺好的. 这里, 我们简单的了解一下就 ok 了.

### fetch 基本格式

可以说, fetch 就是 ajax + Promise. 使用的方式和 jquery 提供的 $.ajax() 差不多.

```js
fetch('./api/some.json')  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log(`返回的响应码${response.status}`);  
        return;  
      }

      // 获得后台实际返回的内容
      response.json().then(function(data) {  
        console.log(data);  
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
```

这里需要注意的是，fetch 中的 response/request 都是 [stream](https://link.juejin.im/?target=https%3A%2F%2Fstreams.spec.whatwg.org%2F) 对象。

### fetch 传输格式

除了 get , 还有其他的 HTTP Method, PUT, DELETE, POST, PATCH 等. 这里, 我们就说一个 POST, 其他方法的基本格式还是类似的.

```js
fetch("http://www.example.org/submit.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "this is a post Msg"
}).then(function(res) {
  if (res.ok) {
    // doSth
  } else if (res.status == 401) {
    // doSth
  }
});
```

### Headers 操作

```js
var content = "Hello World";
var reqHeaders = new Headers();
reqHeaders.append("Content-Type", "text/plain"
reqHeaders.append("Content-Length", content.length.toString());
reqHeaders.append("X-Custom-Header", "自定义头");
```

```js
reqHeaders = new Headers({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "自定义头",
});
```

接下来就是, 头部的内容的检测相关.

```js
console.log(reqHeaders.has("Content-Type")); // true
console.log(reqHeaders.has("Set-Cookie")); // false
reqHeaders.set("Content-Type", "text/html");
reqHeaders.append("X-Custom-Header", "新增自定义头");

console.log(reqHeaders.get("Content-Length")); // 11
console.log(reqHeaders.getAll("X-Custom-Header")); // ["自定义头", "新增自定义头"]

reqHeaders.delete("X-Custom-Header");
console.log(reqHeaders.getAll("X-Custom-Header")); // []
```

### Request 操作

Request 的基本用法和 fetch 差不多.

```js
var uploadReq = new Request("/uploadImage", {
  method: "POST",
  headers: {
    "Content-Type": "image/png",
  },
  body: "image data"
});

fetch("/uploadImage", {
  method: "POST",
  headers: {
    "Content-Type": "image/png",
  },
  body: "image data"
});
```

那 fetch 有什么用呢？
关键的地方在于，fetch 实际上就是 request/reponse 的容器，request/response 相当于就是两个元数据，fetch 只是实际进行的操作。所以，为了达到更高的复用性，我们可以 ajax 的请求，实例化为一个个具体的对象。

在浏览器里, 一切请求都逃不过跨域和不跨域的问题. fetch 也是. 对于跨域的请求, 主要的影响还是体现在 Response 中, 这 fetch Request 这, 没多大影响. 不过, 我们需要在 fetch 设置 `mode` 属性, 来表示这是一个跨域的请求.

常用的 mode 属性值有:

- same-origin: 表示只请求同域. 如果你在该 mode 下进行的是跨域的请求的话, 那么就会报错.
- no-cors: 正常的网络请求, 主要应对于没有后台没有设置 `Access-Control-Allow-Origin`. 话句话说, 就是用来处理 script, image 等的请求的. 他是 mode 的默认值.
- cors: 用来发送跨域的请求. 在发送请求时, 需要带上.
- cors-with-forced-preflight: 这是专门针对 xhr2 支持出来的 preflight，会事先多发一次请求给 server，检查该次请求的合法性。

还有一个关于 cookie 的跨域内容. 在 XHR2 中,我们了解到, withCredentials 这个属性就是用来设置在进行跨域操作时, 对不同域的 Server 是否发送本域的 cookie. 一般设置为 omit(不发送). 在 fetch 当中, 使用的是 `credentials` 属性.
credentials 常用取值为:

- omit: 发送请求时,不带上 cookie. 默认值.
- same-origin: 发送同域请求时,会带上 cookie.
- include: 只要发送请求,都会带上 cookie.

### Response 操作

response 应该算和 fetch 最为接近的一个对象. Response 的实际其实就是 fetch 回调函数传回的参数. Response 中比较常用的属性有四个: status, statusText, ok, type.

- status: 返回的状态码. 100~500+
- statusText: 返回状态码代表的含义. 比如, 返回"ok".
- ok: 用来检差 status 是否在200和299之间.
- type: 表示请求是否跨域, 或是否出错. 取值为: “basic”, “cors”, “default”, “error” 或
  “opaque”.

```js
fetch('https://www.villainhr.com/cors-enabled/some.json', {mode: 'cors',credentials:'include'})  
  .then(function(response) {  
    // ...
  })
```

这里, 我们主要关心一下 type 上面挂载的一些属性.

- basic: 同域通信类别. 可以正常的访问 response 的 header(除了 Set-Cookie 头).
- cors: 跨域通信类别. 一般只能访问以下的头:

```js
- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma
```

- error: 网络错误类别.
- opaque: 无法理解类别. 当使用 `no-cors` 发送跨域请求时,会触发.

另外,在 response 上面,还挂载了几个常用的方法: text(),json().

- text(): 主要用来处理 server 返回的 string 类型数据.
- josn(): 主要用来处理 server 返回的 json 类型数据.

使用方式都是流式 API.

```js
fetch('https://www.villainhr.com/cors-enabled/some.json')  
  .then(function(res) {  
    res.text().then((text)=>{...})
    res.json().then((obj)=>{...})
  })
```

###  body 处理

我们通过 ajax 请求数据时，可能会收到，ArrayBuffer，Blob/File，string，FormData 等等。并且，在发送的时候比如

```js
var form = new FormData(document.getElementById('login-form'));
fetch("/login", {
  method: "POST",
  body: form
})
```

fetch 会自动设置相关的 Content-Type 的头。另外，如果我们可以手动生成一个响应流（方便后面其他操作）。

```js
var res = new Response(new File(["chunk", "chunk"], "archive.zip",{ type: "application/zip" }));
```

### 流的处理

因为，req/res 都是以流的形式存在的，即，req/res 的 body 只能被使用一次。相当于就是一个文件从缓存读到硬盘里面，那么原来文件就已经消失了。我们可以通过 `bodyUsed` 去检查，该对象是否已经被使用。

```js
var res = new Response("one time use");
console.log(res.bodyUsed); // false
res.text().then(function(v) {
  console.log(res.bodyUsed); // true
});
console.log(res.bodyUsed); // true

res.text().catch(function(e) {
  console.log("Tried to read already consumed Response");
});
```

这样做的原因主要是为了让以后 Web 更好的处理视频的相关数据。那如果我有时候想要使用多次，那该怎么办？
例如，我们 Service Worker 中，使用 caches API 缓存响应，然后后面我还要将该响应返回给浏览器，那么这里 response 流就被使用了两次。这里，就和普通的流操作一样，将该流克隆一份，使用:

```js
addEventListener('fetch', function(evt) {
  var sheep = new Response("Dolly");
  console.log(sheep.bodyUsed); // false
  var clone = sheep.clone();
  console.log(clone.bodyUsed); // false

  clone.text();
  console.log(sheep.bodyUsed); // false
  console.log(clone.bodyUsed); // true

  evt.respondWith(cache.add(sheep.clone()).then(function(e) {
    return sheep;
  });
});
```

## 跨域(重点掌握)

### 什么是跨域

同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在|恶意文件的重要安全机制。同源指：协议、域名、端口号必须一致。

*注：严格的说，浏览器并不是拒绝所有的跨域请求，实际上拒绝的是跨域的读操作。浏览器的同源限制策略是这样执行的：

通常浏览器允许进行跨域写操作（Cross-origin writes），如链接，重定向；

通常浏览器允许跨域资源嵌入（Cross-origin embedding），如 img、script 标签；

通常浏览器不允许跨域读操作（Cross-origin reads）。*



下面为允许跨域资源嵌入的示例，即一些不受同源策略影响的标签示例：

- `<script src="..."></script>`标签嵌入跨域脚本。语法错误信息只能在同源脚本中捕捉到。
- `<link rel="stylesheet" href="...">`标签嵌入CSS。由于CSS的松散的语法规则CSS的跨域需要一个设置正确的`Content-Type`消息头。不同浏览器有不同的限制： [IE](https://link.juejin.im?target=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fprevious-versions%2Fwindows%2Finternet-explorer%2Fie-developer%2Fcompatibility%2Fgg622939%2528v%3Dvs.85%2529), [Firefox](https://link.juejin.im?target=https%3A%2F%2Fwww.mozilla.org%2Fen-US%2Fsecurity%2Fadvisories%2Fmfsa2010-46%2F), [Chrome](https://link.juejin.im?target=http%3A%2F%2Fcode.google.com%2Fp%2Fchromium%2Fissues%2Fdetail%3Fid%3D9877), [Safari](https://link.juejin.im?target=https%3A%2F%2Fsupport.apple.com%2Fzh-cn%2FHT4070) 和 [Opera](https://link.juejin.im?target=https%3A%2F%2Fwww.opera.com%2Fzh-cn%2Fsecurity%2Fadvisory%2F943)。
- img嵌入图片。支持的图片格式包括PNG,JPEG,GIF,BMP,SVG
- video 和audio嵌入多媒体资源。
- object, embed 和applet的插件。
- [`@font-face`](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2F%40font-face)引入的字体。一些浏览器允许跨域字体（ cross-origin fonts），一些需要同源字体（same-origin fonts）。
- frame和iframe载入的任何资源。站点可以使用`X-Frame-Options`消息头来阻止这种形式的跨域交互。

![](/home/xsh/桌面/markdown/imgs/3d6de65250289eea6b6d3961bb258f12.png)

#### iframe(了解主要是跨域方向)

```js
<iframe src="http://www.runoob.com"></iframe>
```

iframe(规定一个内联矿建)

| 属性                                                         | 值                                                           | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [align](http://www.runoob.com/tags/att-iframe-align.html)    | left right top middle bottom                                 | HTML5 不支持。HTML 4.01 已废弃。 规定如何根据周围的元素来对齐 <iframe>。 |
| [frameborder](http://www.runoob.com/tags/att-iframe-frameborder.html) | 1 0                                                          | HTML5 不支持。规定是否显示 <iframe> 周围的边框。             |
| [height](http://www.runoob.com/tags/att-iframe-height.html)  | *pixels*                                                     | 规定 <iframe> 的高度。                                       |
| [longdesc](http://www.runoob.com/tags/att-iframe-longdesc.html) | *URL*                                                        | HTML5 不支持。规定一个页面，该页面包含了有关 <iframe> 的较长描述。 |
| [marginheight](http://www.runoob.com/tags/att-iframe-marginheight.html) | *pixels*                                                     | HTML5 不支持。规定 <iframe> 的顶部和底部的边距。             |
| [marginwidth](http://www.runoob.com/tags/att-iframe-marginwidth.html) | *pixels*                                                     | HTML5 不支持。规定 <iframe> 的左侧和右侧的边距。             |
| [name](http://www.runoob.com/tags/att-iframe-name.html)      | *name*                                                       | 规定 <iframe> 的名称。                                       |
| [sandbox](http://www.runoob.com/tags/att-iframe-sandbox.html)New | "" allow-forms allow-same-origin allow-scripts allow-top-navigation | 对 <iframe> 的内容定义一系列额外的限制。                     |
| [scrolling](http://www.runoob.com/tags/att-iframe-scrolling.html) | yes no auto                                                  | HTML5 不支持。规定是否在 <iframe> 中显示滚动条。             |
| [seamless](http://www.runoob.com/tags/att-iframe-seamless.html)New | seamless                                                     | 规定 <iframe> 看起来像是父文档中的一部分。                   |
| [src](http://www.runoob.com/tags/att-iframe-src.html)        | *URL*                                                        | 规定在 <iframe> 中显示的文档的 URL。                         |
| [srcdoc](http://www.runoob.com/tags/att-iframe-srcdoc.html)New | *HTML_code*                                                  | 规定页面中的 HTML 内容显示在 <iframe> 中。                   |
| [width](http://www.runoob.com/tags/att-iframe-width.html)    | *pixels*                                                     | 规定 <iframe> 的宽度。                                       |

##### 获取iframe里的内容

主要的两个API就是contentWindow,和contentDocument
iframe.contentWindow, 获取iframe的window对象
iframe.contentDocument, 获取iframe的document对象
这两个API只是DOM节点提供的方式(即getELement系列对象)

```js
var iframe = document.getElementById("iframe1");
 var iwindow = iframe.contentWindow;
 var idoc = iwindow.document;
        console.log("window",iwindow);//获取iframe的window对象
        console.log("document",idoc);  //获取iframe的document
        console.log("html",idoc.documentElement);//获取iframe的html
        console.log("head",idoc.head);  //获取head
        console.log("body",idoc.body);  //获取body
```

##### 在iframe中获取父级内容

同理，在同域下，父页面可以获取子iframe的内容，那么子iframe同样也能操作父页面内容。在iframe中，可以通过在window上挂载的几个API进行获取.

```js
window.parent 获取上一级的window对象，如果还是iframe则是该iframe的window对象
window.top 获取最顶级容器的window对象，即，就是你打开页面的文档
window.self 返回自身window的引用。可以理解 window===window.self(脑残)
```

##### iframe的轮询

###### iframe长轮询

如果写过ajax的童鞋，应该知道，长轮询就是在ajax的readyState = 4的时，再次执行原函数即可。 这里使用iframe也是一样，异步创建iframe，然后reload, 和后台协商好, 看后台哥哥们将返回的信息放在,然后获取里面信息即可. 这里是直接放在body里.

```jade
var iframeCon = docuemnt.querySelector('#container'),
        text; //传递的信息
    var iframe = document.createElement('iframe'),
        iframe.id = "frame",
        iframe.style = "display:none;",
        iframe.name="polling",
        iframe.src="target.html";
    iframeCon.appendChild(iframe);
    iframe.onload= function(){
        var iloc = iframe.contentWindow.location,
            idoc  = iframe.contentDocument;
        setTimeout(function(){
            text = idoc.getElementsByTagName('body')[0].textContent;
            console.log(text);
            iloc.reload(); //刷新页面,再次获取信息，并且会触发onload函数
        },2000);
    }
```

这样就可以实现ajax的长轮询的效果。 当然，这里只是使用reload进行获取，你也可以添加iframe和删除iframe的方式，进行发送信息，这些都是根据具体场景应用的。另外在iframe中还可以实现异步加载js文件，不过，iframe和主页是共享连接池的，所以还是很蛋疼的，现在基本上都被XHR和hard calllback取缔了，这里也不过多介绍了。

### 跨域的解决方案

#### jsonp(application / javascript)

> 利用script标签不受跨域限制而形成的一种方案。

```js
// index.html
function jsonp({url, param, cb}){
    return new Promise((resolve, reject)=>{
        let script = document.createElement('script')
        window[cb] = function(data){
            resolve(data);
            document.body.removeChild(script)
        }
        params = {...params, cb}
        let arrs = [];
        for(let key in params){
            arrs.push(`${key}=${params[key]}`)
        }
        script.src = `${url}?${arrs.join('&')}`
        document.body.appendChild(script)
    })
}
jsonp({
    url: 'http://localhost:3000/say',
    params: {wd: 'haoxl'},
    cb: 'show'
}).then(data=>{
    console.log(data)
})
//server.js
let express = require('express')
let app = express()
app.get('/say', function(req, res){
    let {wd,cb} = req.query
    console.log(wd)
    res.end(`${cb}('hello')`)
})
app.listen(3000)
```

```js
function generateJsonpCallback() {
  return `jsonpcallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function removeScript(id) {
  document.body.removeChild(document.getElementById(id));
}

function removeFunc(name) {
  delete window[name];
}

function jsonp(url, timeout = 3000, callback) {
  const funcName = generateJsonpCallback();
  window[funcName] = callback;
  const script = document.createElement('script');
  script.src = `${url}?callback=${funcName}`;
  script.id = funcName;
  script.type = 'text/javascript';
  document.body.appendChild(script);
  setTimeout(() => {
    removeScript(funcName);
    removeFunc(funcName);
  }, timeout)
}


jsonp('http://localhost:5000', 3000, function(res) {
  alert(res.data);
});

jsonp('http://localhost:5000', 3000, function(res) {
  const text = document.createTextNode(res.data);
  document.body.appendChild(text);
});
```

我们通过将利用一个timeout时间定时为我们清除相应的script标签和全局变量就可以了，这个定时时间的作用类似于ajax的timeout时间。
我们所有的内容都是使用es6的，那为什么不使用Promise来处理呢，还要使用烦人的回调，接下来那就来Promise化吧。

```js
function jsonp(url, options = {timeout:3000}) {
  const timeout = options.timeout;
  return new Promise((resolve, reject) => {
    const funcName = generateJsonpCallback();
    window[funcName] = (res) => {
      resolve(res);
      setTimeout(() => {
        removeScript(funcName);
        removeFunc(funcName);
      }, timeout)
    };
    const script = document.createElement('script');
    script.src = `${url}?callback=${funcName}`;
    script.id = funcName;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  })
}
```

迄今为止，并没有测试过如果这个script标签加载不成功如何处理，判断资源加载失败，显然使用的是onerror事件，我们这就把他加上：

```js
function jsonp(url, options = {timeout:3000}) {
  const timeout = options.timeout;
  let timeId;
  return new Promise((resolve, reject) => {
    const funcName = generateJsonpCallback();
    window[funcName] = (res) => {
      resolve(res);
      timeId = setTimeout(() => {
        removeScript(funcName);
        removeFunc(funcName);
      }, timeout)
    };
    const script = document.createElement('script');
    script.src = `${url}?callback=${funcName}`;
    script.id = funcName;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    script.onerror = () => {
      reject(new Error(`fetch ${url} failed`));
      removeScript(funcName);
      removeFunc(funcName);
      if(timeId) clearTimeout(timeId);
    }
  })
}
```

超时处理:设置定时器,删除script标签和回调函数,请求错误(url错误等等)用onerror

缺点：只支持get请求，不支持post、put、delete等；不安全，容易受xss攻击。 

#### 跨域资源共享(CORS)(会对非简单请求做一个预检请求,然后才发送实际请求)

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 [GET](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FMethods%2FGET) 以外的 HTTP 请求，或者搭配某些 MIME 类型的 [POST](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FMethods%2FPOST) 请求），浏览器必须首先使用 [OPTIONS](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FMethods%2FOPTIONS) 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 [Cookies](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FCookies) 和 HTTP 认证相关数据）。

非简单请求:对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 以外的 HTTP 请求，或者搭配某些 MIME 类型的 [`POST`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST) 请求）

简单请求:

使用下列方法之一：

- GET
- HEAD
- POST

Fetch 规范定义了对 CORS 安全的首部字段集合，不得人为设置该集合之外的其他首部字段。该集合为：

- [`Accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)
- [`Accept-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)
- [`Content-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language)
- [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) （需要注意额外的限制）
- `DPR`
- `Downlink`
- `Save-Data`
- `Viewport-Width`
- `Width`

[`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 的值仅限于下列三者之一：

- `text/plain`
- `multipart/form-data`
- `application/x-www-form-urlencoded`

- 请求中的任意[`XMLHttpRequestUpload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload) 对象均没有注册任何事件监听器；[`XMLHttpRequestUpload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload) 对象可以使用 [`XMLHttpRequest.upload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload) 属性访问。
- 请求中没有使用 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 对象。



普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。

```js
<script>
let xhr = new XMLHttpRequest;
// 强制前端设置必须带上请示头cookie
document.cookie = 'name=haoxl'
xhr.withCredentials = true
xhr.open('GET','http://localhost:4000/getData', true);
// 设置自定义请求头
xhr.setRequestHeader('name','haoxl')
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status>=200 && xhr.status < 300 || xhr.status === 304){
            console.log(xhr.response);
            //获取后台传来的已改变name值的请示头
            console.log(xhr.getResponseHeader('name'));
        }
    }
}
xhr.send()
</script>
```

```js
// server1.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(3000)
```

```js
// server2.js
let express = require('express');
let app = express();
let whiteList = ['http://localhost:3000']
app.use(function(req, res, next){
    let origin = req.headers.origin;
    if(whiteList.includes(origin)){
        //设置那个源可以访问我，参数为 * 时，允许任何人访问，但是不可以和 cookie 凭证的响应头共同使用
        res.setHeader('Access-Control-Allow-Origin', origin);
        //允许带有name的请求头的可以访问
        res.setHeader('Access-Control-Allow-Headers','name');
        // 设置哪些请求方法可访问
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        // 设置带cookie请求时允许访问
        res.setHeader('Access-Control-Allow-Credentials', true);
        // 后台改了前端传的name请示头后，再传回去时浏览器会认为不安全，所以要设置下面这个 
        res.setHeader('Access-Control-Expose-Headers','name');
        // 预检的存活时间-options请示
        res.setHeader('Access-Control-Max-Age',3)
        // 设置当预请求发来请求时，不做任何处理
        if(req.method === 'OPTIONS'){
            res.end();//OPTIONS请示不做任何处理
        }
    }
    next();
});
```

```js
app.put('/getData', function(req, res){
    console.log(req.headers)
    res.setHeader('name','hello');
    res.end('hello world');
}

app.get('/getData', function(){
    res.end('Nice to meet you')
})
app.use(express.static(__dirname));
app.listen(3000)
```

#### **document.domain + iframe跨域**(父域向子域通信,document.domain)

此方案仅限主域相同，子域不同的跨域应用场景。

实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。

1.）父窗口：

```js
<iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
<script>
    document.domain = 'domain.com';
    var user = 'admin';
</script>
```

2.）子窗口：

```js
<script>
    document.domain = 'domain.com';
    // 获取父窗口中变量
    alert('get js data from parent ---> ' + window.parent.user);
</script>
```

#### **location.hash + iframe跨域(hash不变)**

　　要理解location.hash+iframe跨域获取数据的机制，先得知道什么是location.hash，买一送一，把锚点也一起介绍了。

```js
<a href='#1'>red</a>
<a href='#2'>black</a>
<a href='#3'>yellow</a>
<a href='#4'>pink</a>
<div id='1' style='width:500;height:200;background-color:red'> </div>
<div id='2' style='width:500;height:200;background-color:black'> </div>
<div id='3' style='width:500;height:200;background-color:yellow'> </div>
<div id='4' style='width:500;height:1200;background-color:pink'> </div>
```

锚点设置是个a标签，它的href指向内容和跳转位置的name值一致（其实差个#），需要注意的是如果用的是name，那么必须用a标签包裹，而该法在html5中已经被废除。我们设置锚点通常采用id的方式，更简单，也不会产生没用的文档元素。

　　说完锚点，我们来说说[location.hash](http://www.w3school.com.cn/jsref/prop_loc_hash.asp)。还是在博客园的百科页面，在导航栏点击”网站简介“后，注意这时候地址栏发生了变化！多出来的的正是location.hash值（字符串）。

　而location.hash和location.href一样，既能获取它的值，也能用它进行重定向（重定位）。继续留在博客园的百科主页，然后在控制台输入location.hash = "#2”，然后页面就跳转到”发展历程“这部分了，和普通的锚点一样的效果

　　而这个过程页面是不会进行刷新的，但是如果要回到之前的页面却能使用浏览器的前进、后退键。(相当于本地的history机制废除)

##### 如何跨域

其实很简单，**如果index页面要获取远端服务器的数据，动态插入一个iframe，将iframe的src属性指向服务端地址。这时top window和包裹这个iframe的子窗口是不能通信的（同源策略），所以改变子窗口的路径就行了，将数据当做改变后的路径的hash值加在路径上，然后就能通信了（和window.name跨域几乎相同），将数据加在index页面地址的hash值上**。index页面监听地址的hash值变化（html5有hashchange事件，用setInterval不断轮询判断兼容ie6/7），然后做出判断，处理数据。



```js
<!-- foo.com/a.html -->
<iframe id="ifr" src="http://bar.com/b.html"></iframe>
<script>
function callback(data) {
    console.log(data)
}
</script>
<!-- bar.com/b.html -->
window.onload = function() {
    var ifr = document.createElement('iframe');
    ifr.style.display = 'none';
    var height = document.documentElement.scrollHeight;
    var data = '{"h":'+ height+', "json": {"a":1,"b":2}}';
    ifr.src = 'http://foo.com/aa.html#' + data;
    document.body.appendChild(ifr);
}
<!-- foo.com/aa.html -->
var data = JSON.parse(location.hash.substr(1));
top.document.getElementById('ifr').style.height = data.h + 'px';
top.callback(data);
```

　　服务端文件中重定向的地址和index页面需同源，这是通信的关键。

**a页面和b页面同源,要获取c页面的东西　a页面需要知道c页面的高度　a页面iframe嵌入c　页面　c页面里　onload事件给和a同源的页面b页面的hash值改变然后　b页面将hash给a页面**

　

location.hash+iframe法和jsonp以及window.name+iframe一样，都是双向的，但是都只能是GET形式，所以数据只能加在url上。

其实window.name和location.hash是异曲同工的，都是用了window下的属性，毕竟location.hash也是window下的（window.location.hash）



#### window.name+iframe跨域

只要不关闭浏览器，`window.name`可以在不同页面加载后依然保持。尝试在浏览器打开百度`baidu.com`，然后在控制台输入`window.name='aaa';`回车，接着在地址栏输入`qq.com`转到腾讯首页，打开控制台输入`window.name`查看它的值，可以看到输出了`"aaa"`。
例如子页面bar.com/b.html向父页面foo.com/a.html传数据。浏览器名字

原理同上只不过是用window.name实现

```js
<iframe id="ifr" src="http://bar.com/b.html"></iframe>
<script>
function callback(data) {
    console.log(data)
}
</script>

<!-- bar.com/b.html -->
<input id="txt" type="text">
<input type="button" value="发送" onclick="send();">


<script>
var proxyA = 'http://foo.com/aa.html';    // foo.com下代理页面
var proxyB = 'http://bar.com/bb.html';    // bar.com下代理空页面

var ifr = document.createElement('iframe');
ifr.style.display = 'none';
document.body.appendChild(ifr);

function send() {
    ifr.src = proxyB;
}

ifr.onload = function() {
    ifr.contentWindow.name = document.querySelector('#txt').value;
    ifr.src = proxyA;
}
</script>

<!-- foo.com/aa.html -->
top.callback(window.name)
```



#### postMessage+iframe跨域

HTML5新增方法，现在浏览器及IE8+支持，简单易用高大上。

`postMessage(message, targetOrigin)`参数说明

message: 是要发送的消息，类型为 String、Object (IE8、9 不支持)
targetOrigin: 是限定消息接收范围，不限制请使用 '*'

`'message', function(e)`回调函数第一个参数接收 Event 对象，有三个常用属性：

data: 消息
origin: 消息来源地址
source: 源 DOMWindow 对象

一个简单的父页面`foo.com/a.html` 和子页面 `bar.com/b.html`建立通信

```js
<!-- foo.com/a.html -->
<iframe id="ifr" src="http://bar.com/b.html"></iframe>
<script>
window.onload = function () {
    var ifr = document.querySelector('#ifr');
    ifr.contentWindow.postMessage({a: 1}, '*');
}
window.addEventListener('message', function(e) {
    console.log('bar say: '+e.data);
}, false);
</script>

<!-- bar.com/b.html -->
window.addEventListener('message', function(e){
    console.log('foo say: ' + e.data.a);
    e.source.postMessage('get', '*');
}, false)
```

