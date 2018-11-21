# GET和POST区别(具体)

## 参数

GET传递的参数只能带URL后面，文本格式QueryString，各浏览器一般有长度限制，一般认为是2083，如果有中文字符更短。提交到服务器端的数据量小(HTTP协议没有对传输的数据大小进行限制)

OST可以传递application/x-www-form-urlencoded的类似QueryString、multipart/form-data的二进制报文格式（支持文件信息嵌入报文传输）、纯文本或二进制的body参数。提交到服务器端的数据量大(实际各个WEB服务器会规定对post提交数据大小进行限制，Apache、IIS6都有各自的配置。)



## 用途

GET用于从服务器端获取数据，包括静态资源(HTML|JS|CSS|Image等等)、动态数据展示(列表数据、详情数据等等)

POST用于向服务器提交数据，比如增删改数据，提交一个表单新建一个用户、或修改一个用户等

## 缓存

- GET时默认可以复用前面的请求数据作为缓存结果返回，此时以完整的URL作为缓存数据的KEY。所以有时候为了强制每次请求都是新数据，我们可以在URL后面加上一个随机参数Math.random或时间戳new Date().getTime()、或版本号，比如abc.com?a=1&rnd=0.123987之类的。这也是目前一些静态资源后面加一个很长的版本号的原因，jquery-min.js?v=13877770表示一个版本，当页面引用jquery-min.js?v=13877771时浏览器必然会重新去服务器请求这个资源。jQuery.ajax方法，如果cache=false，则会在GET请求参数中附加”_={timestamp}”来禁用缓存。
- POST一般则不会被这些缓存因素影响。



## 安全性

- 默认对于nginx的access log，会自动记录get或post的完整URL，包括其中带的参数。（csrf）
- 对于POST来说，请求的报文却不会被记录，这些对于敏感数据来说，POST更安全一些。

1. GET在浏览器回退时是无害的，而POST会再次提交请求。
2. GET请求会被浏览器主动cache，而POST不会，除非手动设置。
3. GET请求只能进行url编码，而POST支持多种编码方式。
4. GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
5. GET请求在URL中传送的参数是有长度限制的，而POST么有。
6. 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
7. GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
8. GET参数通过URL传递，POST放在Request body中。

## GET 方法

##  有关 GET 请求的其他一些注释：

请注意，查询字符串（名称/值对）是在 GET 请求的 URL 中发送的：

- GET 请求可被缓存
- GET 请求保留在浏览器历史记录中
- GET 请求可被收藏为书签
- GET 请求不应在处理敏感数据时使用
- GET 请求有长度限制
- GET 请求只应当用于取回数据

## POST 方法

请注意，查询字符串（名称/值对）是在 POST 请求的 HTTP 消息主体中发送的：



有关 POST 请求的其他一些注释：

- POST 请求不会被缓存
- POST 请求不会保留在浏览器历史记录中
- POST 不能被收藏为书签
- POST 请求对数据长度没有要求

### POST发送的数据(from:enctype,Content-Type:)

#### application/x-www-form-urlencoded

这应该是最常见的 POST 提交数据的方式了。浏览器的原生 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。请求类似于下面这样（无关的请求头在本文中都省略掉了）：

#### multipart/form-data

> 这又是一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让 表单的 enctyped 等于 multipart/form-data。直接来看一个请求示例：

```http
OST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png

PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
```

这个例子稍微复杂点。首先生成了一个 boundary 用于分割不同的字段，为了避免与正文内容重复，boundary 很长很复杂。然后 Content-Type 里指明了数据是以 multipart/form-data 来编码，本次请求的 boundary 是什么内容。消息主体里按照字段个数又分为多个结构类似的部分，每部分都是以 –boundary 开始，紧接着是内容描述信息，然后是回车，最后是字段具体内容（文本或二进制）。如果传输的是文件，还要包含文件名和文件类型信息。消息主体最后以 –boundary– 标示结束。关于 multipart/form-data 的详细定义，请前往 rfc1867 查看。 
这种方式一般用来上传文件，各大服务端语言对它也有着良好的支持。 
上面提到的这两种 POST 数据的方式，都是浏览器原生支持的，而且现阶段标准中原生 表单也只支持这两种方式（通过 元素的 enctype 属性指定，默认为 application/x-www-form-urlencoded。其实 enctype 还支持 text/plain，不过用得非常少）。 
随着越来越多的 Web 站点，尤其是 WebApp，全部使用 Ajax 进行数据交互之后，我们完全可以定义新的数据提交方式，给开发带来更多便利。

#### application/json

application/json 这个 Content-Type 作为响应头大家肯定不陌生。实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串。由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify，服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。 
JSON 格式支持比键值对复杂得多的结构化数据，这一点也很有用。记得我几年前做一个项目时，需要提交的数据层次非常深，我就是把数据 JSON 序列化之后来提交的。不过当时我是把 JSON 字符串作为 val，仍然放在键值对里，以 x-www-form-urlencoded 方式提交。 
Google 的 AngularJS 中的 Ajax 功能，默认就是提交 JSON 字符串。例如下面这段代码：

```http
POST http://www.example.com HTTP/1.1 
Content-Type: application/json;charset=utf-8
{"title":"test","sub":[1,2,3]}
```

#### text/xml

```http
POST http://www.example.com HTTP/1.1 
Content-Type: text/xml

<?xml version="1.0"?>
<methodCall>
<methodName>examples.getStateName</methodName>
<params>
    <param>
        <value><i4>41</i4></value>
    </param>
</params>
</methodCall>
```



|                  | GET                                                          | POST                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 后退按钮/刷新    | 无害                                                         | 数据会被重新提交（浏览器应该告知用户数据会被重新提交）。     |
| 书签             | 可收藏为书签                                                 | 不可收藏为书签                                               |
| 缓存             | 能被缓存                                                     | 不能缓存                                                     |
| 编码类型         | application/x-www-form-urlencoded                            | application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。 |
| 历史             | 参数保留在浏览器历史中。                                     | 参数不会保存在浏览器历史中。                                 |
| 对数据长度的限制 | 是的。当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的（URL 的最大长度是 2048 个字符）。 | 无限制。                                                     |
| 对数据类型的限制 | 只允许 ASCII 字符。                                          | 没有限制。也允许二进制数据。                                 |
| 安全性           | 与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分。在发送密码或其他敏感信息时绝不要使用 GET ！ | POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中。 |
| 可见性           | 数据在 URL 中对所有人都是可见的。                            | 数据不会显示在 URL 中。                                      |

####  其他 HTTP 请求方法

下面的表格列出了其他一些 HTTP 请求方法：

| 方法    | 描述                                              |
| ------- | ------------------------------------------------- |
| HEAD    | 与 GET 相同，但只返回 HTTP 报头，不返回文档主体。 |
| PUT     | 上传指定的 URI 表示。                             |
| DELETE  | 删除指定资源。                                    |
| OPTIONS | 返回服务器支持的 HTTP 方法。                      |
| CONNECT | 把请求连接转换到透明的 TCP/IP 通道。              |



 