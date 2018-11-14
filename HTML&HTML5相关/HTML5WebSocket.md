# HTML5WebSocket

## WebSocket 是什么(不一定用于浏览器内)

WebSocket同样是HTML 5规范的组成部分之一，现标准版本为 RFC 6455。WebSocket 相较于上述几种连接方式，实现原理较为复杂，用一句话概括就是：客户端向 WebSocket 服务器通知（notify）一个带有所有 `接收者ID（recipients IDs）` 的事件（event），服务器接收后立即通知所有活跃的（active）客户端，只有ID在接收者ID序列中的客户端才会处理这个事件。由于 WebSocket 本身是基于TCP协议的，所以在服务器端我们可以采用构建 TCP Socket 服务器的方式来构建 WebSocket 服务器。

这个 WebSocket 是一种全新的协议。它将 TCP 的 `Socket（套接字）`应用在了web page上，从而使通信双方建立起一个保持在活动状态连接通道，并且属于全双工（双方同时进行双向通信）。

它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于[服务器推送技术](https://en.wikipedia.org/wiki/Push_technology)的一种。其他特点包括：

- 建立在 TCP 协议之上，服务器端的实现比较容易。
- 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443 ，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
- 数据格式比较轻量，性能开销小，通信高效。
- 可以发送文本，也可以发送二进制数据。
- 没有同源限制，客户端可以与任意服务器通信。
- 协议标识符是ws（如果加密，则为wss,当选择HTTPS监听时），服务器网址就是 URL。
- 支持扩展(子协议WAMP是一个合适的WebSocket子协议，使用WebSocket作为传输和JSON作为有效载荷格式)

## 在实现之前　客户端和服务端通信方法

### ajax轮询

```js
//1
//使用setInterval，每隔10s向服务器发送一次请求。
//存在的问题是：在网络不稳定的情况下，无法保证请求以及服务器响应的顺序。
setInterval(function() {
    $.getJSON("url-path")
    .done(function(data) {
        console.log(data);
    });
}, 10000);

//2
//使用setTimeout，在每一次的请求并收到响应后，发送下一次请求。
//解决的问题：保证了每次请求的先后顺序。
//存在的问题：仍然无法保证每次请求的间隔时间。
function poll() {
    setTimeout(function() {
        $.getJSON("url-path")
        .done(function(data) {
            console.log(data);
            
            //发起下一次请求
            poll();
        });
    }, 1000);
}
```

**缺点分析**

每次都需要新发起一条http请求。

对**客户端**来说**占用较多内存资源与请求资源**，对**服务器**来说**占用较多的内存资源与带宽资源**。

响应的结果没有顺序（因为是异步请求，当发送的请求没有返回结果的时候，后面的请求又被发送。而此时如果后面的请求比前面的请求要先返回结果，那么当前面的请求返回结果数据时已经是过时无效的数据了）；请求多，难于维护、浪费服务器和网络资源。



### Comet：一种hack技术

Comet的实现主要有两种方式，基于Ajax的长轮询（long-polling）方式和基于 Iframe 及 htmlfile 的流（http streaming）方式。

#### Ajax的长轮询

浏览器发出XMLHttpRequest 请求，服务器端接收到请求后，会阻塞请求直到有数据或者超时才返回，浏览器JS在处理请求返回信息（超时或有效数据）后再次发出请求，重新建立连接。在此期间服务器端可能已经有新的数据到达，服务器会选择把数据保存，直到重新建立连接，浏览器会把所有数据一次性取回。

- 服务器端会阻塞请求直到有数据传递或超时才返回。
- 客户端 JavaScript 响应处理函数会在处理完服务器返回的信息后，再次发出请求，重新建立连接。
- 当客户端处理接收的数据、重新建立连接时，服务器端可能有新的数据到达；这些信息会被服务器端保存直到客户端重新建立连接，客户端会一次把当前服务器端所有的信息取回

```js
/服务器
//通过死循环，以资源的修改时间作为循环跳出条件。
//就是上文三次握手的服务器响应阶段，被后端程序的死循环“hold”住。
//当请求的服务器资源的最后一次修改时间==不旧于==客户端请求参数所携带资源的时间（Last-Modified）时，跳出循环，并返回数据。

//客户端
function longPoll(_timeStamp) {
    let _timeStamp;
    $.get("url-path")
    .done(function(data) {
        try{
            let res = JSON.parse(data);
            console.log(res.msg);
        }catch(e) {}
    })
    .always(function() {
        setTimeout(function() {
            longPoll(_timeStamp || Date.now() / 1000);
        }, 10000); 
    });
}
```

**缺点**：服务器资源消耗大。

**解决的问题**：减少了http请求。

#### 基于 Iframe 及 htmlfile 的流（http streaming）方式

在第一种方式中，浏览器在收到数据后会直接调用JS回调函数，但是这种方式该如何响应数据呢？可以通过在返回数据中嵌入JS脚本的方式服务器端将返回的数据作为回调函数的参数，浏览器在收到数据后就会执行这段JS脚本。

```js
<script type="text/javascript">js_func(“data from server ”)</script>
```

但是这种方式有一个明显的不足之处：IE、Morzilla Firefox 下端的进度栏都会显示加载没有完成，而且 IE 上方的图标会不停的转动

```js
$(function () {
             
                window.setInterval(function () {
                    $("#logs").append("[data: " + $($("#frame").get(0).contentDocument).find("body").text() + " ]<br/>");
                    $("#frame").attr("src", "${pageContext.request.contextPath}/communication/user/ajax.mvc?timed=" + new Date().getTime());
                    // 延迟1秒再重新请求
                    window.setTimeout(function () {
                        window.frames["polling"].location.reload();
                    }, 1000);
                }, 5000);
                 
            });
```

这里的客户端程序是利用隐藏的iframe向服务器端不停的拉取数据，将iframe获取后的数据填充到页面中即可。同ajax实现的基本原理一样，唯一不同的是当一个请求没有响应返回数据的情况下，下一个请求也将开始，这时候前面的请求将被停止。如果要使程序和上面的ajax请求一样也可以办到，那就是给每个请求分配一个独立的iframe即可。

### 服务器发送事件（Server-sent Event）

1. HTML5规范的组成部分。

2. 服务器到客户端的单向通信，不需要由客户端发起。

3. 以“事件流”的格式产生并推送。

   其格式说明如下：

   - MIME类型:text/event-stream
   - event:事件类型
   - [data:消息内容](data:%E6%B6%88%E6%81%AF%E5%86%85%E5%AE%B9)
   - id:用于设置客户端EventSource对象的“last event ID string”内部属性
   - retry:指定重新连接的时间

客户端的处理方式: 借助EventSource对象实现

```js
let eventSource = new EventSource("/path/to/server");
eventSource.onmessage = (e) => {
    console.log(e.event, e.data);
};

//或者
eventSource.addEventListener("ping", function(e) {
   console.log(e.event, e.data); 
});
```

**缺点**：所有IE（包括Edge）都不支持该事件，可以通过[EventSource Polyfill](https://github.com/Yaffle/EventSource)进行兼容处理（本质上仍然是轮询）。



## WebSocket通信原理和机制(WebSocke握手和数据传输)

###　WebSocket握手过程

来自客户端的握手看起来像如下形式：

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

来自服务器的握手看起来像如下形式：

```js
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

来自客户端的首行遵照 Request-Line 格式。 来自服务器的首行遵照 Status-Line 格式。



一旦客户端和服务器都发送了它们的握手，且如果握手成功，接着开始数据传输部分。 这是一个每一端都可以的双向通信信道，彼此独立，随意发生数据。

一个成功握手之后，客户端和服务器来回地传输数据，在本规范中提到的概念单位为“消息”。 在线路上，一个消息是由一个或多个帧的组成。 WebSocket 的消息并不一定对应于一个特定的网络层帧，可以作为一个可以被一个中间件合并或分解的片段消息。

一个帧有一个相应的类型。 属于相同消息的每一帧包含相同类型的数据。 从广义上讲，有文本数据类型（它被解释为 UTF-8 [RFC3629](http://tools.ietf.org/html/rfc3629)文本）、二进制数据类型（它的解释是留给应用）、和控制帧类型（它是不准备包含用于应用的数据，而是协议级的信号，例如应关闭连接的信号）。这个版本的协议定义了六个帧类型并保留10以备将来使用

### 握手过程

#### 客户端：申请协议升级

首先，客户端发起协议升级请求。可以看到，采用的是标准的 HTTP 报文格式，且只支持GET方法。

```http
GET / HTTP/1.1
Host: localhost:8080
Origin: http://127.0.0.1:3000
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: w4v7O6xFTi36lq3RNcgctw==
```

重点请求首部意义如下：

- **Connection**: Upgrade：表示要升级协议
- **Upgrade: websocket**：表示要升级到 websocket 协议。
- **Sec-WebSocket-Version**: 13：表示 websocket 的版本。如果服务端不支持该版本，需要返回一个 `Sec-WebSocket-Versionheader` ，里面包含服务端支持的版本号。
- **Sec-WebSocket-Key**：与后面服务端响应首部的 `Sec-WebSocket-Accept` 是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。(并不保证安全)



#### 服务端：响应协议升级 

服务端返回内容如下，状态代码101表示协议切换。到此完成协议升级，后续的数据交互都按照新的协议来。

```http
HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=
```

**Sec-WebSocket-Accept**

`Sec-WebSocket-Accept` 根据客户端请求首部的 `Sec-WebSocket-Key` 计算出来。

计算公式为：

将 `Sec-WebSocket-Key` 跟 `258EAFA5-E914-47DA-95CA-C5AB0DC85B11` 拼接。

通过 SHA1 计算出摘要，并转成 base64 字符串。

```
>toBase64( sha1( Sec-WebSocket-Key + 258EAFA5-E914-47DA-95CA-C5AB0DC85B11 ) )
```

### 数据流

WebSocket 客户端、服务端通信的最小单位是 `帧（frame）`，由 1 个或多个帧组成一条完整的 `消息（message）`。

- 发送端：将消息切割成多个帧，并发送给服务端；
- 接收端：接收消息帧，并将关联的帧重新组装成完整的消息；



#### 数据帧格式概览 

从左到右，单位是比特。比如 `FIN`、`RSV1`各占据 1 比特，`opcode`占据 4 比特。

内容包括了标识、操作代码、掩码、数据、数据长度等。

```ABNF
  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |     Extended payload length continued, if payload len == 127  |
 + - - - - - - - - - - - - - - - +-------------------------------+
 |                               |Masking-key, if MASK set to 1  |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |                     Payload Data continued ...                |
 +---------------------------------------------------------------+
```



数据帧格式详解

**FIN**：1 个比特。

如果是 1，表示这是 `消息（message）`的最后一个分片`（fragment）`，如果是 0，表示不是是 `消息（message）`的最后一个 `分片（fragment）`。

**RSV1, RSV2, RSV3**：各占 1 个比特。

一般情况下全为 0。当客户端、服务端协商采用 WebSocket 扩展时，这三个标志位可以非 0，且值的含义由扩展进行定义。如果出现非零的值，且并没有采用 WebSocket 扩展，连接出错。

**Opcode**: 4 个比特。

操作代码，Opcode 的值决定了应该如何解析后续的 `数据载荷（data payload）`。如果操作代码是不认识的，那么接收端应该 `断开连接（fail the connection）`。可选的操作代码如下：

 

- %x0：表示一个延续帧。当 Opcode 为 0 时，表示本次数据传输采用了数据分片，当前收到的数据帧为其中一个数据分片。
- %x1：表示这是一个文本帧（frame）
- %x2：表示这是一个二进制帧（frame）
- %x3-7：保留的操作代码，用于后续定义的非控制帧。
- %x8：表示连接断开。
- %x8：表示这是一个 **ping** 操作。
- %xA：表示这是一个 **pong** 操作。(连接健康检查和保持连接打开状态)
- %xB-F：保留的操作代码，用于后续定义的控制帧。

**Mask**: 1 个比特。

表示是否要对数据载荷进行掩码操作。**从客户端向服务端发送数据时，需要对数据进行掩码操作；从服务端向客户端发送数据时，不需要对数据进行掩码操作**。

如果服务端接收到的数据没有进行过掩码操作，服务端需要断开连接。

如果 Mask 是 1，那么在 `Masking-key` 中会定义一个 `掩码键（masking key）`，并用这个掩码键来对数据载荷进行反掩码。所有客户端发送到服务端的数据帧，Mask 都是 1。

**Payload length**：数据载荷的长度

单位是字节。为 7 位，或 7+16 位，或 1+64 位。

假设数 Payload length === x，如果

- x 为 0~126：数据的长度为 x 字节。
- x 为 126：后续 2 个字节代表一个 16 位的无符号整数，该无符号整数的值为数据的长度。
- x 为 127：后续 8 个字节代表一个 64 位的无符号整数（最高位为 0），该无符号整数的值为数据的长度

此外，如果 `payload length` 占用了多个字节的话，`payload length` 的二进制表达采用 `网络序（big endian，重要的位在前）`。 

**Masking-key**：0 或 4 字节（32 位）

所有从客户端传送到服务端的数据帧，数据载荷都进行了掩码操作，Mask 为 1，且携带了 4 字节的 `Masking-key`。如果 Mask 为 0，则没有 `Masking-key`。

备注：载荷数据的长度，不包括 mask key 的长度。

**Payload data**：(x+y) 字节

载荷数据：包括了扩展数据、应用数据。其中，扩展数据 x 字节，应用数据 y 字节。

扩展数据：如果没有协商使用扩展的话，扩展数据数据为 0 字节。所有的扩展都必须声明扩展数据的长度，或者可以如何计算出扩展数据的长度。此外，扩展如何使用必须在握手阶段就协商好。如果扩展数据存在，那么载荷数据长度必须将扩展数据的长度包含在内。

应用数据：任意的应用数据，在扩展数据之后（如果存在扩展数据），占据了数据帧剩余的位置。载荷数据长度 减去 扩展数据长度，就得到应用数据的长度。

**掩码算法**

`掩码键（Masking-key）`是由客户端挑选出来的 32 位的随机数。掩码操作不会影响数据载荷的长度。掩码、反掩码操作都采用如下算法：

首先，假设：

- original-octet-i：为原始数据的第 i 字节。
- transformed-octet-i：为转换后的数据的第 i 字节。
- j：为i mod 4的结果。
- masking-key-octet-j：为 mask key 第 j 字节。

算法描述为： original-octet-i 与 masking-key-octet-j 异或后，得到 transformed-octet-i。

```
j  = i MOD 4
transformed-octet-i = original-octet-i XOR masking-key-octet-j
```

### 数据传递

一旦 WebSocket 客户端、服务端建立连接后，后续的操作都是基于数据帧的传递。

WebSocket 根据 `opcode` 来区分操作的类型。比如0x8表示断开连接，`0x0-0x2` 表示数据交互。

#### 数据分片

WebSocket 的每条消息可能被切分成多个数据帧。当 WebSocket 的接收方收到一个数据帧时，会根据FIN的值来判断，是否已经收到消息的最后一个数据帧。

FIN=1 表示当前数据帧为消息的最后一个数据帧，此时接收方已经收到完整的消息，可以对消息进行处理。FIN=0，则接收方还需要继续监听接收其余的数据帧。

此外，`opcode` 在数据交换的场景下，表示的是数据的类型。0x01表示文本，0x02表示二进制。而0x00比较特殊，表示`延续帧（continuation frame）`，顾名思义，就是完整消息对应的数据帧还没接收完。

### 连接保持 + 心跳

WebSocket 为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的 TCP 通道保持连接没有断开。然而，对于长时间没有数据往来的连接，如果依旧长时间保持着，可能会浪费包括的连接资源。

但不排除有些场景，客户端、服务端虽然长时间没有数据往来，但仍需要保持连接。这个时候，可以采用心跳来实现。

- 发送方 ->接收方：ping

- 接收方 ->发送方：pong

ping、pong 的操作，对应的是 WebSocket 的两个控制帧，opcode分别是 `0x9、0xA`。



### 关闭连接 

一旦发送或接收到一个Close控制帧，这就是说，_WebSocket 关闭阶段握手已启动，且 WebSocket 连接处于 CLOSING 状态。

当底层TCP连接已关闭，这就是说 WebSocket连接已关闭 且 WebSocket 连接处于 CLOSED 状态。 如果 TCP 连接在 WebSocket 关闭阶段已经完成后被关闭，WebSocket连接被说成已经 完全地 关闭了。

如果WebSocket连接不能被建立，这就是说，WebSocket连接关闭，但不是 完全的

### 状态码

当关闭一个已经建立的连接（例如，当在打开阶段握手已经完成后发送一个关闭帧），端点可以表明关闭的原因。 由端点解释这个原因，并且端点应该给这个原因采取动作，本规范是没有定义的。 本规范定义了一组预定义的状态码，并指定哪些范围可以被扩展、框架和最终应用使用。 状态码和任何相关的文本消息是关闭帧的可选的组件。

当发送关闭帧时端点可以使用如下预定义的状态码。

| 0–999     |                      | 保留段, 未使用.                                              |
| --------- | -------------------- | ------------------------------------------------------------ |
| 1000      | CLOSE_NORMAL         | 正常关闭; 无论为何目的而创建, 该链接都已成功完成任务.        |
| 1001      | CLOSE_GOING_AWAY     | 终端离开, 可能因为服务端错误, 也可能因为浏览器正从打开连接的页面跳转离开. |
| 1002      | CLOSE_PROTOCOL_ERROR | 由于协议错误而中断连接.                                      |
| 1003      | CLOSE_UNSUPPORTED    | 由于接收到不允许的数据类型而断开连接 (如仅接收文本数据的终端接收到了二进制数据). |
| 1004      |                      | 保留. 其意义可能会在未来定义.                                |
| 1005      | CLOSE_NO_STATUS      | 保留.  表示没有收到预期的状态码.                             |
| 1006      | CLOSE_ABNORMAL       | 保留. 用于期望收到状态码时连接非正常关闭 (也就是说, 没有发送关闭帧). |
| 1007      | Unsupported Data     | 由于收到了格式不符的数据而断开连接 (如文本消息中包含了非 UTF-8 数据). |
| 1008      | Policy Violation     | 由于收到不符合约定的数据而断开连接. 这是一个通用状态码, 用于不适合使用 1003 和 1009 状态码的场景. |
| 1009      | CLOSE_TOO_LARGE      | 由于收到过大的数据帧而断开连接.                              |
| 1010      | Missing Extension    | 客户端期望服务器商定一个或多个拓展, 但服务器没有处理, 因此客户端断开连接. |
| 1011      | Internal Error       | 客户端由于遇到没有预料的情况阻止其完成请求, 因此服务端断开连接. |
| 1012      | Service Restart      | 服务器由于重启而断开连接.                                    |
| 1013      | Try Again Later      | 服务器由于临时原因断开连接, 如服务器过载因此断开一部分客户端连接. |
| 1014      |                      | 由 WebSocket 标准保留以便未来使用.                           |
| 1015      | TLS Handshake        | 保留. 表示连接由于无法完成 TLS 握手而关闭 (例如无法验证服务器证书). |
| 1016–1999 |                      | 由 WebSocket 标准保留以便未来使用.                           |
| 2000–2999 |                      | 由 WebSocket 拓展保留使用.                                   |
| 3000–3999 |                      | 可以由库或框架使用.不应由应用使用. 可以在 IANA 注册, 先到先得. |
| 4000–4999 |                      | 可以由应用使用                                               |

## 客户端的 API

### WebSocket 构造函数

WebSocket 对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。

WebSocket 构造器方法接受一个必须的参数和一个可选的参数：

```js
WebSocket WebSocket(in DOMString url, in optional DOMString protocols);
WebSocket WebSocket(in DOMString url,in optional DOMString[] protocols);
```

### 参数

- url

表示要连接的URL。这个URL应该为响应WebSocket的地址。

- protocols 可选

可以是一个单个的协议名字字符串或者包含多个协议名字字符串的数组。这些字符串用来表示子协议，这样做可以让一个服务器实现多种 WebSocket子协议（例如你可能希望通过制定不同的协议来处理不同类型的交互）。如果没有制定这个参数，它会默认设为一个空字符串。

构造器方法可能抛出以下异常：`SECURITY_ERR` 试图连接的端口被屏蔽。 

```js
var ws = new WebSocket('ws://localhost:8080');
```

执行上面语句之后，客户端就会与服务器进行连接。执行上面语句之后，客户端就会与服务器进行连接。

| binaryType     | DOMString      | 一个字符串表示被传输二进制的内容的类型。取值应当是"blob"或者"arraybuffer"。"blob"表示使用DOM [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象，而"arraybuffer"表示使用 ArrayBuffer 对象。 |
| -------------- | -------------- | ------------------------------------------------------------ |
| bufferedAmount | unsigned long  | 调用 [send()](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket#send()) 方法将多字节数据加入到队列中等待传输，但是还未发出。该值会在所有队列数据被发送后重置为 0。而当连接关闭时不会设为0。如果持续调用send()，这个值会持续增长。只读。 |
| extensions     | DOMString      | 服务器选定的扩展。目前这个属性只是一个空字符串，或者是一个包含所有扩展的列表。 |
| onclose        | EventListener  | 用于监听连接关闭事件监听器。当 WebSocket 对象的readyState 状态变为 CLOSED 时会触发该事件。这个监听器会接收一个叫close的 [CloseEvent](https://developer.mozilla.org/en/WebSockets/WebSockets_reference/CloseEvent) 对象。 |
| onerror        | EventListener  | 当错误发生时用于监听error事件的事件监听器。会接受一个名为“error”的event对象。 |
| onmessage      | EventListener  | 一个用于消息事件的事件监听器，这一事件当有消息到达的时候该事件会触发。这个Listener会被传入一个名为"message"的 [MessageEvent](https://developer.mozilla.org/en/WebSockets/WebSockets_reference/MessageEvent) 对象。 |
| onopen         | EventListener  | 一个用于连接打开事件的事件监听器。当readyState的值变为 OPEN 的时候会触发该事件。该事件表明这个连接已经准备好接受和发送数据。这个监听器会接受一个名为"open"的事件对象。 |
| protocol       | DOMString      | 一个表明服务器选定的子协议名字的字符串。这个属性的取值会被取值为构造器传入的protocols参数。 |
| readyState     | unsigned short | 连接的当前状态。取值是 [Ready state constants](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket#Ready_state_constants) 之一。 只读。 |
| url            | DOMString      | 传入构造器的URL。它必须是一个绝对地址的URL。只读。           |

webSocket.onopen

实例对象的 onopen 属性，用于指定连接成功后的回调函数。

```js
ws.onopen = function () {
  ws.send('Hello Server!');
}
```

如果要指定多个回调函数，可以使用addEventListener方法。

webSocket.onclose

实例对象的 onclose 属性，用于指定连接关闭后的回调函数。

```js
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
```

webSocket.onmessage

实例对象的 onmessage 属性，用于指定收到服务器数据后的回调函数。

```js
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
ws.onmessage = function(event){
  if(typeof event.data === String) {
    console.log("Received data string");
  }

  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```

注意，服务器数据可能是文本，也可能是 二进制数据（blob对象或Arraybuffer对象）。

除了动态判断收到的数据类型，也可以使用 `binaryType` 属性，显式指定收到的二进制数据类型。

```JS
/ 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```

### 常量

#### Ready state 常量

这些常量是 `readyState` 属性的取值，可以用来描述 WebSocket 连接的状态。

| 常量       | 值   | 描述                             |
| ---------- | ---- | -------------------------------- |
| CONNECTING | 0    | 连接还没开启。                   |
| OPEN       | 1    | 连接已开启并准备好进行通信。     |
| CLOSING    | 2    | 连接正在关闭的过程中。           |
| CLOSED     | 3    | 连接已经关闭，或者连接无法建立。 |

### 方法

#### close()

关闭 WebSocket 连接或停止正在进行的连接请求。如果连接的状态已经是 `closed`，这个方法不会有任何效果



```JS
void close(in optional unsigned short code, in optional DOMString reason);
```

code 可选

一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）。 请看 CloseEvent 页面的 list of status codes来看默认的取值。

eason 可选

一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）。

可能抛出的异常

- INVALID_ACCESS_ERR：选定了无效的code。
- SYNTAX_ERR：reason 字符串太长或者含有 `unpaired surrogates`。



#### send()

通过 WebSocket 连接向服务器发送数据。

```js
void send(in DOMString data);
void send(in ArrayBuffer data);
void send(in Blob data); 
```

data：要发送到服务器的数据。

可能抛出的异常：

- INVALID_STATE_ERR：当前连接的状态不是OPEN。
- SYNTAX_ERR：数据是一个包含 `unpaired surrogates` 的字符串。

发送文本的例子。

```js
ws.send('your message');
```

发送 Blob 对象的例子。

```js
var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);
```

发送 ArrayBuffer 对象的例子。

```js
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```



## 服务端的实现

WebSocket 服务器的实现



这里的Sec-WebSocket-Accept 就是基于请求头中Sec-WebSocket-Key来生成。规则如下：
 Sec-WebSocket-Key 和"258EAFA5-E914-47DA-95CA-C5AB0DC85B11"链接，通过SHA-1 hash获得结果，然后返回该结果的base64编码。 代码如下：

```js
/ 指定拼接字符
var ws_key = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
// 生成相应key
function getAccpectKey(rSWKey) {
    return crypto.createHash('sha1').update(rSWKey + ws_key).digest('base64')
}
function handShake(socket, headers) {
    var reqSWKey = headers['Sec-WebSocket-Key'],
        resSWKey = getAccpectKey(reqSWKey)
    socket.write('HTTP/1.1 101 Switching Protocols\r\n');
    socket.write('Upgrade: websocket\r\n');
    socket.write('Connection: Upgrade\r\n');
    socket.write('Sec-WebSocket-Accept: ' + resSWKey + '\r\n');
    socket.write('\r\n');
}
```

这样我们的握手协议就算完成了，此时会触发客户端websocket的onopen事件，即websocket打开，可以进行通信

### 解析数据

#### 客户端发送帧格式

所谓解析数据，肯定是基于上面的格式按照一定规则来进行处理。下面就是处理的规则。

1. 获取有效数据长度
2. 获取掩码并依据规则进行反序列化数据

直接看代码应该更加清晰。

```js
function decodeFrame(buffer) {
    /**
     * >>> 7 右移操作，即字节右移7位，目的是为了即只取第一位的值
     * 10010030  ====>   00000001
     * & 按位与  同1为1    
     * 15二进制表示为：00001111  ,运算之后前四位即为0，得到后四位的值
     * 11011000 & 00001111  ===》  00001000
     *  
     */
    var fBite = buffer[0],
        /**
         * 获取Fin的值，
         * 1传输结束
         * 0 继续监听 
         */
        Fin = fBite >>> 7,
        /**
         * 获取opcode的值，opcode为fBite的4-7位
         * & 按位与  同1为1    
         * 15二进制表示为：00001111  ,运算之后前四位即为0，得到后四位的值
         */
        opcode = buffer[0] & 15,
        /**
         * 获取有效数据长度 
         */
        len = buffer[1] & 127,
        // 是否进行掩码处理，客户端请求必须为1
        Mask = buffer[1] >>> 7,
        maskKey = null
    // 获取数据长度
    //真实长度大于125，读取后面2字节
    if (len == 126) {
        len = buffer.readUInt16BE(2)
    } else if (len == 127) {
        // 真实长度大于65535，读取后面8字节
        len = buffer.readUInt64BE(2)
    }
    // 判断是否进行掩码处理
    Mask && (maskKey = buffer.slice(2,5))
    /**
     * 反掩码处理 
     * 循环遍历加密的字节（octets，text数据的单位）并且将其与第（i%4）位掩码字节(即i除以4取余)进行异或运算
     */
    if(Mask){
        for (var i = 2;i<len ;i++){
            buffer[i] = maskKey[(i - 2) % 4] ^ buffer[i];
        }
    }
    var data = buffer.slice(2)
    return {
        Fin:Fin,
        opcode:opcode,
        data:data
    }
}
```



#### 发送数据

处理完接收到的数据之后，下面就是发送响应了。 响应数据不需要进行掩码运算，只需要根据帧的格式(即上面的帧)，将数据进行组装就好

```js
function encodeFrame(data){
    var len = Buffer.byteLength(data),
        // 2的64位
        payload_len = len > 65535 ?10:(len > 125 ? 4 : 2),
        buf = new Buffer(len+payload_len)
    /**
     * 首个字节，0x81 = 10000001 
     *对应的Fin 为1 opcode为001 mask 为0 
     * 即表明 返回数据为txt文本已经结束并未使用掩码处理
     */
    buf[0] = 0x81  
    /**
     * 根据真实数据长度设置payload_len位
     */        
    if(payload_len == 2){
        buf[1] = len
    }else if(payload_len == 4){
        buf[1] = 126;
        buf.writeUInt16BE(payload_len, 2);
    }else {
        buf[1] = 127;
        buf.writeUInt32BE(payload_len >>> 32, 2);
        buf.writeUInt32BE(payload_len & 0xFFFFFFFF, 6);
    }  
    buf.write(data, payload_len);
    return buf;
}    
```

#### 心跳响应

当收到opcode 为 9时即ping请求，直接返回具有完全相同有效数据的pong即可。 Pings的opcode为0x9，pong是0xA，所以可以直接如下

```js
if(opcode == 9){
   console.log("ping相应");
   /**
    * ping pong最大长度为125，所以可以直接拼接
    * 前两位数据为10001010+数据长度
    * 即传输完毕的pong响应，数据肯定小于125
    */
    socke.write(Buffer.concat([new Buffer([0x8A, data.length]), data]))
}
```

### **详情代码**

```js
ar http = require('http');
var net = require('net')
var url = require('url');
var crypto = require('crypto');
var querystring = require('querystring');
// 指定拼接字符
var ws_key = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
var br = '\r\n'

var server = net.createServer()
var utils = {
    formatHeader: function (str) {
        var arr = str.split('\r\n'),
            len = arr.length,
            headers = {}
        for (var i = 0; i < len; i++) {
            var items = arr[i].split(':')
            if (items.length < 2) continue;
            headers[items[0].trim()] = items[1].trim()
        }

        var firstLine = arr[0].split(' ')
        headers.method = firstLine[0]
        headers.path = firstLine[1]
        // console.dir(headers)
        return headers
    }
}
// 解析接受的数据帧
function decodeFrame(buffer) {
    /**
     * >>> 7 右移操作，即字节右移7位，目的是为了即只取第一位的值
     * 10010030  ====>   00000001
     * & 按位与  同1为1    
     * 15二进制表示为：00001111  ,运算之后前四位即为0，得到后四位的值
     * 11011000 & 00001111  ===》  00001000
     *  
     */
    var fBite = buffer[0],
        /**
         * 获取Fin的值，
         * 1传输结束
         * 0 继续监听 
         */
        Fin = fBite >>> 7,
        /**
         * 获取opcode的值，opcode为fBite的4-7位
         * & 按位与  同1为1    
         * 15二进制表示为：00001111  ,运算之后前四位即为0，得到后四位的值
         */
        opcode = buffer[0] & 15,
        /**
         * 获取有效数据长度 
         */
        len = buffer[1] & 127,
        // 是否进行掩码处理，客户端请求必须为1
        Mask = buffer[1] >>> 7,
        maskKey = null
    // 获取数据长度
    //真实长度大于125，读取后面2字节
    if (len == 126) {
        len = buffer.readUInt16BE(2)
    } else if (len == 127) {
        // 真实长度大于65535，读取后面8字节
        len = buffer.readUInt64BE(2)
    }
    // 判断是否进行掩码处理
    Mask && (maskKey = buffer.slice(2,5))
    /**
     * 反掩码处理 
     * 循环遍历加密的字节（octets，text数据的单位）并且将其与第（i%4）位掩码字节(即i除以4取余)进行异或运算
     */
    if(Mask){
        for (var i = 2;i<len ;i++){
            buffer[i] = maskKey[(i - 2) % 4] ^ buffer[i];
        }
    }
    var data = buffer.slice(2)
    return {
        Fin:Fin,
        opcode:opcode,
        data:data
    }
}
// 加密发送数据
function encodeFrame(data){
    var len = Buffer.byteLength(data),
        // 2的64位
        payload_len = len > 65535 ?10:(len > 125 ? 4 : 2),
        buf = new Buffer(len+payload_len)
    /**
     * 首个字节，0x81 = 10000001 
     *对应的Fin 为1 opcode为001 mask 为0 
     * 即表明 返回数据为txt文本已经结束并未使用掩码处理
     */
    buf[0] = 0x81  
    /**
     * 根据真实数据长度设置payload_len位
     */        
    if(payload_len == 2){
        buf[1] = len
    }else if(payload_len == 4){
        buf[1] = 126;
        buf.writeUInt16BE(payload_len, 2);
    }else {
        buf[1] = 127;
        buf.writeUInt32BE(payload_len >>> 32, 2);
        buf.writeUInt32BE(payload_len & 0xFFFFFFFF, 6);
    }  
    buf.write(data, payload_len);
    return buf;
}
// 
function getAccpectKey(rSWKey) {
    return crypto.createHash('sha1').update(rSWKey + ws_key).digest('base64')
}

function handShake(socket, headers) {
    var reqSWKey = headers['Sec-WebSocket-Key'],
        resSWKey = getAccpectKey(reqSWKey)
    socket.write('HTTP/1.1 101 Switching Protocols\r\n');
    socket.write('Upgrade: websocket\r\n');
    socket.write('Connection: Upgrade\r\n');
    socket.write('Sec-WebSocket-Accept: ' + resSWKey + '\r\n');
    socket.write('\r\n');
}

server.on('connection', function (sock) {
    sock.once('data', function (data) {
        var headers = utils.formatHeader(data.toString())
        // 即http请求
        if (headers['Upgrade']) {
            handShake(sock, headers)
            sock.on('data', function (e) {
                var frame = decodeFrame(e),
                    data = frame.data,
                    Fin = frame.Fin,
                    opcode = frame.opcode
                if(Fin){
                    // ping请求
                    if(opcode == 9){
                        console.log("ping相应");
                        /**
                         * ping pong最大长度为125，所以可以直接拼接
                         * 前两位数据为10001010+数据长度
                         * 即传输完毕的pong响应，数据肯定小于125
                         */
                        socke.write(Buffer.concat([new Buffer([0x8A, data.length]), data]))
                    }
                    var datas = '收到数据';
                    datas = encodeFrame(datas)   
                    sock.write(datas)
                }   

            })
        } else {
            sock.write("HTTP/1.1 200 OK\r\nserver: 直解析websocket\r\n\r\n")
            sock.end()
        }
    })
})

server.listen(8081)
```

同时也有比较完善的库Socket.io,WebSocket-Node这些实现

## 一些问题、

### 和TCP、HTTP协议的关系

WebSocket 是基于 TCP 的独立的协议。它与 HTTP 唯一的关系是它的握手是由 HTTP 服务器解释为一个 Upgrade 请求。

WebSocket协议试图在现有的 HTTP 基础设施上下文中解决现有的双向HTTP技术目标；同样，它被设计工作在HTTP端口80和443，也支持HTTP代理和中间件，

HTTP服务器需要发送一个“Upgrade”请求，即101 Switching Protocol到HTTP服务器，然后由服务器进行协议转换。

**http相同点**

- 都是基于TCP的应用层协议；
- 都使用Request/Response模型进行连接的建立；
- 在连接的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的返回码；
- 都可以在网络中传输数据。

**不同点**

WS使用HTTP来建立连接，但是定义了一系列新的header域，这些域在HTTP中并不会使用；

WS的连接不能通过中间人来转发，它必须是一个直接连接；

WS连接建立之后，通信双方都可以在任何时刻向另一方发送数据；

WS连接建立之后，数据的传输使用帧来传递，不再需要Request消息；

WS的数据帧有序。

### Sec-WebSocket-Key/Accept 的作用

前面提到了，`Sec-WebSocket-Key/Sec-WebSocket-Accept` 在主要作用在于提供基础的防护，减少恶意连接、意外连接。

作用大致归纳如下：

避免服务端收到非法的 websocket 连接（比如 http 客户端不小心请求连接 websocket 服务，此时服务端可以直接拒绝连接）

确保服务端理解 websocket 连接。因为 ws 握手阶段采用的是 http 协议，因此可能 ws 连接是被一个 http 服务器处理并返回的，此时客户端可以通过 `Sec-WebSocket-Key` 来确保服务端认识 ws 协议。（并非百分百保险，比如总是存在那么些无聊的 http 服务器，光处理 `Sec-WebSocket-Key`，但并没有实现 ws 协议。。。）

用浏览器里发起 ajax 请求，设置 header 时，`Sec-WebSocket-Key` 以及其他相关的 header 是被禁止的。这样可以避免客户端发送 ajax 请求时，意外请求`协议升级（websocket upgrade）`

可以防止反向代理（不理解 ws 协议）返回错误的数据。比如反向代理前后收到两次 ws 连接的升级请求，反向代理把第一次请求的返回给 cache 住，然后第二次请求到来时直接把 cache 住的请求给返回（无意义的返回）。

`Sec-WebSocket-Key` 主要目的并不是确保数据的安全性，因为 `Sec-WebSocket-Key`、`Sec-WebSocket-Accept` 的转换计算公式是公开的，而且非常简单，最主要的作用是预防一些常见的意外情况（非故意的）。

### 数据掩码的作用

WebSocket 协议中，数据掩码的作用是增强协议的安全性。但数据掩码并不是为了保护数据本身，因为算法本身是公开的，运算也不复杂。除了加密通道本身，似乎没有太多有效的保护通信安全的办法。

那么为什么还要引入掩码计算呢，除了增加计算机器的运算量外似乎并没有太多的收益（这也是不少同学疑惑的点）。

答案还是两个字：安全。但并不是为了防止数据泄密，而是为了防止早期版本的协议中存在的`代理缓存污染攻击（proxy cache poisoning attacks）`等问题。

通过WebSocket协议成为被攻击对象的，除了终端设备之外还有其他部分的web基础设施，比如代理服务器就可能成为攻击的对象。

随着websocket协议被开发出来，一项针对代理服务器的攻击（污染那些广泛部署的缓存代理服务器）实验也开始进行。

**一般形式的攻击是跟被攻击者控制的服务器建立连接，并构造一个类似WebSocket握手一样的UPGRADE请求，随后通过UPGRADE建立的连接发送看起来就像GET请求的frame去获取一个已知资源（在攻击场景中可能是一个点击跟踪脚本或广告服务网络中的资源）。**

**之后远程服务器会返回某些东西，就像对于这个伪造GET请求的响应，并且这个响应会被很多广泛部署的网络中间设备缓存，从而达到了污染缓存服务器的目的。对于这个攻击的产生的效应，可能一个用户被诱导访问受攻击者操控的服务器，攻击者就有可能污染这个用户以及其他共享相同缓存服务用户的缓存服务器，并跨域执行恶意脚本，破坏web安全模型。**

### 和socket区别

Socket可以有很多意思，和IT较相关的本意大致是指**在端到端的一个连接中，这两个端叫做Socket**。对于IT从业者来说，它往往指的是TCP/IP网络环境中的两个连接端，大多数的API提供者（如操作系统，JDK）往往会提供基于这种概念的接口，所以对于开发者来说也往往是在说一种编程概念。同时，操作系统中进程间通信也有Socket的概念，但这个Socket就不是基于网络传输层的协议了。它工作在 OSI 模型会话层（第5层）

是为了方便大家直接使用更底层协议（一般是[TCP](http://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A//en.wikipedia.org/wiki/Transmission_Control_Protocol)或[UDP](http://link.zhihu.com/?target=https%3A//link.jianshu.com/%3Ft%3Dhttp%3A//en.wikipedia.org/wiki/User_Datagram_Protocol)）而存在的一个抽象层。



![](/home/xsh/桌面/markdown/imgs/v2-838f8d6c325c3a73cbf85f0095598cd4_hd.jpg)



