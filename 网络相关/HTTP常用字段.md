# HTTP常用字段

##  HTTP/1.1通用首部字段

### Cache-Control(控制缓存行为)

```http
Cache-Control:private,max-age:0,no-cache
```

### Connection(keep-Alive,close)

Connection首部字段具备如下两个作用：

1，控制不再转发给代理的首部字段

2，管理持久连接

### Date(创建报文时间)

首部字段Date表明创建HTTP报文的日期和时间。

```http
date: Wed, 21 Nov 2018 05:43:14 GMT
```

### Pragma(报文指令)

Pragma 是 HTTP/1.1 之前版本的历史遗留字段，仅作为与 HTTP/1.0 的向后兼容而定义。
规范定义的形式唯一，如下所示。

```http
Pragma: no-cache
```

该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不返回缓存 的资源。

所有的中间服务器如果都能以 HTTP/1.1 为基准，那直接采用 Cache-Control: no-cache 指定缓存的处理方式 是最为理想的。但要整体掌握全部中间服务器使用的 HTTP 协议版本却是不现实的。因此，发送的请求会同 时含有下面两个首部字段。

### Trailer(报文末端的首部一览)

首部字段Trailer会事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在HTTP/1.1版本版本分块传输编码时。

```http
HTTP/1.1 200 OK
Date: Tue, 03 Jul 2012 04:40:56 GMT
Content-Type: text/html
...
Transfer-Encoding: chunked
Trailer: Expires
...(报文主体)...
0
Expires: Tue, 28 Sep 2004 23:59:59 GMT
```

### Transfer-Encoding(规定了传输报文主体时采用的编码方式)

```http
TTP/1.1 200 OK
Date: Tue, 03 Jul 2012 04:40:56 GMT
Cache-Control: public, max-age=604800
Content-Type: text/javascript; charset=utf-8
Expires: Tue, 10 Jul 2012 04:40:56 GMT
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Encoding: gzip
Transfer-Encoding: chunked
Connection: keep-alive
 
cf0    ←16进制(10进制为3312)
 
...3312字节分块数据...
 
392    ←16进制(10进制为914)
 
...914字节分块数据...
 

```

以上用例中，正如在首部字段 Transfer-Encoding 中指定的那样，有效使用分块传输编码，且分别被分成 3312 字节和 914 字节大小的分块数据。

### Upgrade(升级为其他协议)

首部字段 Upgrade 用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定 一个完全不同的通信协议。

请注意此处两个字段首部字段的对应关系，Connection的值被指定为Upgrade。Upgrade首部字段产生作用的Upgrade对象仅限于客户端和领接服务器之间。因此，使用首部字段Upgrade是，还需要额外指定Connection:Upgrade。对于附有首部字段Upgrade的请求

### Via(代理服务器的相关信息)

使用首部字段 Via 是为了追踪客户端与服务器之间的请求和响应报文的传输路径。

使用首部字段Via是为了追踪客户端与服务器之间的请求和响应报文的传输路径。报文经过代理或网关是，会先在首部字段Via中附加该服务器的信息，然后再进行转发。这个做法和traceroute及电子邮件的Received首部的工作机制很类似。首部字段Via不仅用于追踪报文的转发，还可避免请求回环的发生。所以必须在经过代理时附加该首部的字段内容。



### Warning(错误通知)

HTTP/1.1 的 Warning 首部是从 HTTP/1.0 的响应首部（Retry-After）演变过来的。该首部通常会告知用户一 些与缓存相关的问题的警告。

```http
Warning: 113 gw.hackr.jp:8080 "Heuristic expiration" Tue, 03 Jul 2012 05:09:44 GMT
```

Warning 首部的格式如下。最后的日期时间部分可省略。

```http
Warning: [警告码][警告的主机:端口号]“[警告内容]”([日期时间])
```

## HTTP1.1请求首部字段

### Accept(用户代理可处理的媒体类型)

```http
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
```

Accept 首部字段可通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用 type/subtype 这种形式，一次指定多种媒体类型。

文本文件

```http
text/html, text/plain, text/css ...
application/xhtml+xml, application/xml ...
```

图片文件

```http
image/jpeg, image/gif, image/png ...
```

视频文件

```http
video/mpeg, video/quicktime ...
```

应用程序使用的二进制文件

```http
application/octet-stream, application/zip ...​
```

比如，如果浏览器不支持 PNG 图片的显示，那 Accept 就不指定 image/png，而指定可处理的 image/gif 和 image/jpeg 等图片类型。 若想要给显示的媒体类型增加优先级，则使用 q= 来额外表示权重值 1，用分号（;）进行分隔。权重值 q 的 范围是 0~1（可精确到小数点后 3 位），且 1 为最大值。不指定权重 q 值时，默认权重为 q=1.0。
1 原文是“品質係数”。在 RFC2616 定义中，此处的 q 是指 qvalue，即 quality factor。直译的话就是质量数，但经过综合考虑理 解记忆的便利性后，似乎采用权重值更为稳妥。——译者注
当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。

### Accept-Charset(优先字符集)

```http
Accept-Charset: iso-8859-5, unicode-1-1;q=0.8
```

Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次 性指定多种字符集。与首部字段 Accept 相同的是可用权重 q 值来表示相对优先级。
该首部字段应用于内容协商机制的服务器驱动协商。

### Accept-Encoding(优先内容编码)

```http
Accept-Encoding: gzip, deflate​
```

Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指 定多种内容编码。
下面试举出几个内容编码的例子。

**gzip**
   由文件压缩程序 gzip（GNU zip）生成的编码格式（RFC1952），采用 Lempel-Ziv 算法    （LZ77）及 32 位循环冗余校验（Cyclic Redundancy Check，通称 CRC）。
​    **compress**
​    由 UNIX 文件压缩程序 compress 生成的编码格式，采用 Lempel-Ziv-Welch 算法（LZW）。
​    **deflate**
​    组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法（RFC1951）生成的编码格式。
​    **identity**
​    不执行压缩或不会变化的默认编码格式
采用权重 q 值来表示相对优先级，这点与首部字段 Accept 相同。另外，也可使用星号（*）作为通配符，指 定任意的编码格式。

### Accept-Language(优先的语言)

```http
Accept-Language: zh-cn,zh;q=0.7,en-us,en;q=0.3
```

首部字段 Accept-Language 用来告知服务器用户代理能够处理的自然语言集（指中文或英文等），以及自然 语言集的相对优先级。可一次指定多种自然语言集。
和 Accept 首部字段一样，按权重值 q 来表示相对优先级。在上述图例中，客户端在服务器有中文版资源的情 况下，会请求其返回中文版对应的响应，没有中文版时，则请求返回英文版响应。

### Authorization(Web认证信息)

```http
`Authorization: Basic dWVub3NlbjpwYXNzd29yZA==`
```

首部字段 Authorization 是用来告知服务器，用户代理的认证信息（证书值）。通常，想要通过服务器认证的 用户代理会在接收到返回的 401 状态码响应后，把首部字段 Authorization 加入请求中。共用缓存在接收到含 有 Authorization 首部字段的请求时的操作处理会略有差异。

### Expect(期待服务器的特定行为)

```http
Expect: 100-continue​
```

客户端使用首部字段 Expect 来告知服务器，期望出现的某种特定行为。因服务器无法理解客户端的期望作出 回应而发生错误时，会返回状态码 417 Expectation Failed。
客户端可以利用该首部字段，写明所期望的扩展。虽然 HTTP/1.1 规范只定义了 100-continue（状态码 100 Continue 之意）。
等待状态码 100 响应的客户端在发生请求时，需要指定 Expect:100-continue

### From(用户的邮箱地址)

```
From:xxx＠saad.com
```



首部字段 From 用来告知服务器使用用户代理的用户的电子邮件地址。通常，其使用目的就是为了显示搜索 引擎等用户代理的负责人的电子邮件联系方式。使用代理时，应尽可能包含 From 首部字段（但可能会因代 理不同，将电子邮件地址记录在 User-Agent 首部字段内）。

### Host(请求资源所在服务器)

```http
Host: www.hackr.jp​
```

首部字段 Host 会告知服务器，请求的资源所处的互联网主机名和端口号。Host 首部字段在 HTTP/1.1 规范内是唯一一个必须被包含在请求内的首部字段。
首部字段 Host 和以单台服务器分配多个域名的虚拟主机的工作机制有很密切的关联，这是首部字段 Host 必须存在的意义

### If-Match(比较E-tag,相同返回200,不同412)

```http
If-Match:"123456"
```

首部字段If-Match，附带条件之一，它会告知服务器匹配资源所用的实体标记（Etag）值。这时的服务器无法使用弱ETag值。服务器会比对If-Match的字段值和资源的ETag值，仅当两者一致时，才会执行。反之，则返回状态码412Precondition Failed的响应。还可以使用星号（*）指定If-Match的字段值。针对这种情况，服务器将会忽略ETag的值，只要资源存在就处理请求。

### If-Modified-Since(比较资源更新时间,无更新304,更新200)

```http
If-Modified-Since: Wed, 21 Nov 2018 05:43:14 GMT
```



首部字段If-Modified-Since，属附带条件之一，它会告知服务器若If-Modified-Since字段值早于资源的更新时间，则希望能处理该请求。而在指定If-Modified-Since字段值的日期时间之后，如果请求的资源都没有过更新，则返回状态码304 Not Modified的响应。If-Modified-Since用于确认代理或客户端拥有的本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段Last-Modified来确定。

### If-None-Match(比较E-Tag,不同相应200,相同304)

```http
if-none-match:"12313"
```



首部字段If-None-Match属于附带条件之一。它和首部字段If-Match作用相反。用于指定If-None-Match字段值的实体标记（ETag）值与请求资源的Etag不一致时，它就告知服务器处理该请求。在GET或HEAD方法中使用首部字段If-None-Match可获取最新的资源。因此，这与使用首部字段If-Modified-Since时有些类似。

### If-Range(资源未更新时发送实体Byte范围请求)

首部字段If-Range属于附带条件之一。它告知服务器若指定的If-Range字段值（ETag值或者时间）和请求资源的ETag值或时间相一致时，则作为范围请求时。反之，则返回全体资源。

一致返回指定部分资源,不一致　返回全部资源

在不使用If-Range的情况下。服务器端的资源如果更新，那客户端持有资源中的一部分也会随之无效，当然，范围请求作为前提是无效的。这时，服务器会暂且以状态码412 Precondition Failed作为响应返回，其目的是催促客户端再次发送请求。这样一来，与使用首部字段If-Range比起来，就需要花费两倍的功夫。



### If-Unmodified-Since(比较资源更新事件,时间后更新412,未更新200)

```http
If-Unmodified-Since: Thu, 03 Jul 2012 00:00:00 GMT
```

首部字段If-Unmodified-Since和首部字段If-Modified-Since的作用相反。它的作用是告知服务器，指定的请求资源只有在字段值内指定日期时间之内，未发生更新的情况下，才能处理请求。如果在指定日期时间后发生了更新，则以状态码412 Precondition Failed作为响应返回。

### Max-Forwards(最大传输逐跳数)

```http
Max-Forwards:10
```

通过TRACE方法或OPTIONS方法，发送包含首部字段Max-Forwards的请求时，该字段以十进制整数形式指定可经过的服务器最大数目。服务器在往下一个服务器转发请求之前，Max-Forwards的值减1后重新赋值。当服务器接收到Max-Forwards值为0的请求时，则不再进行转发，而是直接返回响应。使用HTTP协议通信时，请求可能会经过代理等多台服务器。途中，如果代理服务器由于某些原因导致请求转发失败，客户端也就等不到服务器返回的响应了。因此，我们无从可知。可以灵活使用首部字段Max-Forwards，针对以上问题产生的原因展开调查。由于当Max-Forwards字段值为0时，服务器就会立即返回响应，由此我们至少可以对以那台服务器未终点的传输路径的通信状况有所把握

### Proxy-Authorization(代理服务器要求客户端的认证信息)

```http
Proxy-Authorization:Basic dGlwPjlpNLAGfFyS
```

接收到从代理服务器发来的认证质询时，客户端会发送包含首部字段Proxy-Authorization的请求，以告知服务器认证所需要的信息。这个行为是与客户端和服务器之间HTTP访问认证相类似的，不同之处在于，认证行为发生在客户端与代理之间。客户端与服务器之间的认证，使用首部字段Authorization可起到相同作用。

### Range(实体的字节范围请求完成200,后续还有206)

```http
Range: bytes=5001-10000
```

对于只需获取部分资源的范围请求，包含首部字段Range即可告知服务器资源的指定范围。上面的示例表示请求获取从第5001字节至10000字节的资源。接收到附带Range首部字段请求的服务器，会在处理请求之后返回状态码为206 Partial Content的响应。无法处理该范围请求时，则会返回状态码200 OK的响应及全部资源。

### Referer(对请求中URI的原始获取方)

```http
Referer:www.dasdsa.com/index.html
```

首部字段Referer会告知服务器请求的原始资源URI。客户端一般都会发送Referer首部字段给服务器。但当直接在浏览器的地址栏输入URI，或处于安全性的考虑时，也可以不发送该首部字段。因为原始资源的URI中的查询字符串可能含有ID和密码等保密信息，要是写进Referer转发给其他服务器，则有可能导致保密信息的泄露。

### TE(传输编码的优先级)

```http
TE: gzip,deflate;q=0.5
TE:trailers
```

首部字段TE会告知服务器客户端能够处理响应的传输编码方式及相对优先级。它和首部字段Accept-Encoding的功能很相像，但是用于传输编码。首部字段TE除指定传输编码外，还可以指定伴随trailer字段的分块传输编码的方式。应用后者时，只需把trailers赋值给该字段值。

### User-Agent(http客户端信息)

```http
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1
```

首部字段 User-Agent 会将创建请求的浏览器和用户代理名称等信息传达给服务器。
由网络爬虫发起请求时，有可能会在字段内添加爬虫作者的电子邮件地址。此外，如果请求经过代理，那么 中间也很可能被添加上代理服务器的名称。

## HTTP１.1相应首部字段

### Accept-Ranges

当不能处理范围请求时，Accept-Ranges: none

```http
Accept-Ranges: bytes
```

首部字段 Accept-Ranges 是用来告知客户端服务器是否能处理范围请求，以指定获取服务器端某个部分的资 源。
可指定的字段值有两种，可处理范围请求时指定其为 bytes，反之则指定其为 none。

### Age(推算资源创建经过的时间)

```http
Age: 600
```

首部字段 Age 能告知客户端，源服务器在多久前创建了响应。字段值的单位为秒。
若创建该响应的服务器是缓存服务器，Age 值是指缓存后的响应再次发起认证到认证完成的时间值。代理创 建响应时必须加上首部字段 Age。

### ETag(资源匹配信息)

```http
ETag: “82e22293907ce725faf67773957acd12”
```

部字段 ETag 能告知客户端实体标识。它是一种可将资源以字符串形式做唯一性标识的方式。服务器会为每份资源分配对应的 ETag 值。

另外，当资源更新时，ETag 值也需要更新。生成 ETag 值时，并没有统一的算法规则，而仅仅是由服务器来分配。

资源被缓存时，就会被分配唯一性标识。例如，当使用中文版的浏览器访问 http://www.google.com/ 时，就会返回中文版对应的资源，而使用英文版的浏览器访问时，则会返回英文版对应的资源。两者的 URI 是相同的，所以仅凭 URI 指定缓存的资源是相当困难的。若在下载过程中出现连接中断、再连接的情况，都会依照 ETag 值来指定资源。

注意： 
**强 ETag 值和弱 Tag 值**

ETag 中有强 ETag 值和弱 ETag 值之分

强 ETag 值，不论实体发生多么细微的变化都会改变其值。

```http
ETag: “usagi-1234”
```

弱 ETag 值只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变 ETag 值。这时，会在字段值最开始处附加 W/

```html
ETag: W/”usagi-1234”
```

### Location(重定向的URI)

```http
Location: http://www.usagidesign.jp/sample.html
```

使用首部字段 Location 可以将响应接收方引导至某个与请求 URI 位置不同的资源。

基本上，该字段会配合 3xx ：Redirection 的响应，提供重定向的 URI。

几乎所有的浏览器在接收到包含首部字段 Location 的响应后，都会强制性地尝试对已提示的重定向资源的访问。

### Proxy-Authenticate

```http
Proxy-Authenticate: Basic realm=”Usagidesign Auth”	
```

首部字段 Proxy-Authenticate 会把由代理服务器所要求的认证信息发送给客户端。
它与客户端和服务器之间的 HTTP 访问认证的行为相似，不同之处在于其认证行为是在客户端与代理之间进行的。而客户端与服务器之间进行认证时，首部字段 WWW-Authorization 有着相同的作用。有关 HTTP 访问认证，

### Retry-After(再次发出请求的时机会)

```http
Retry-After: 120
```

首部字段 Retry-After 告知客户端应该在多久之后再次发送请求。主要配合状态码 503 Service Unavailable 响应，或 3xx Redirect 响应一起使用。

字段值可以指定为具体的日期时间（Wed, 04 Jul 2012 06：34：24 GMT 等格式），也可以是创建响应后的秒数

### Server(http服务器的安装信息)

```http
Server: Apache/2.2.17 (Unix)
```

首部字段 Server 告知客户端当前服务器上安装的 HTTP 服务器应用程序的信息。不单单会标出服务器上的软件应用名称，还有可能包括版本号和安装时启用的可选项。

```http
Server: Apache/2.2.6 (Unix) PHP/5.2.5
```

### Vary(代理服务器的缓存信息)

```http
Vary: Accept-Language
```

首部字段 Vary 可对缓存进行控制。源服务器会向代理服务器传达关于本地缓存使用方法的命令。

从代理服务器接收到源服务器返回包含 Vary 指定项的响应之后，若再要进行缓存，仅对请求中含有相同 Vary 指定首部字段的请求返回缓存。即使对相同资源发起请求，但由于 Vary 指定的首部字段不相同，因此必须要从源服务器重新获取资源。

### WWW-Authenticate(服务器对客户端的认证信息)

```http
WWW-Authenticate: Basic realm=”Usagidesign Auth”
```

首部字段 WWW-Authenticate 用于 HTTP 访问认证。它会告知客户端适用于访问请求 URI 所指定资源的认证方案（Basic 或是 Digest）和带参数提示的质询（challenge）。状态码 401 Unauthorized 响应中，肯定带有首部字段 WWW-Authenticate。

上述示例中，realm 字段的字符串是为了辨别请求 URI 指定资源所受到的保护策略



## 实体首部字段

### Allow(资源支持http方法)

```http
Allow: GET, HEAD
```

首部字段 Allow 用于通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。当服务器接收到不支持 的 HTTP 方法时，会以状态码 405 Method Not Allowed 作为响应返回。与此同时，还会把所有能支持的 HTTP 方法写入首部字段 Allow 后返回。



### Content-Encoding(资源主体编码格式)

```http
Content-Encoding: gzip
```

首部字段 Content-Encoding 会告知客户端服务器对实体的主体部分选用的内容编码方式。内容编码是指在不 丢失实体信息的前提下所进行的压缩。

主要采用以下 4 种内容编码的方式。（各方式的说明请参考 6.4.3 节 Accept-Encoding 首部字段）。
gzip
compress
deflate
identity

### Content-Language(资源主体的自然语言)

```http
Content-Language: zh-CN
```

首部字段 Content-Language 会告知客户端，实体主体使用的自然语言（指中文或英文等语言）。

### Content-Length(实体主体的大小(单位:字节))

```http
Content-Length: 15000
```

首部字段 Content-Length 表明了实体主体部分的大小（单位是字节）。对实体主体进行内容编码传输时，不 能再使用 Content-Length 首部字段。由于实体主体大小的计算方法略微复杂，所以在此不再展开。



### Content-Location(替代对应资源的URI)

```http
Content-Location: http://www.hackr.jp/index-ja.html​
```

首部字段 Content-Location 给出与报文主体部分相对应的 URI。和首部字段 Location 不同，ContentLocation 表示的是报文主体返回资源对应的 URI。

比如，对于使用首部字段 Accept-Language 的服务器驱动型请求，当返回的页面内容与实际请求的对象不同 时，首部字段 Content-Location 内会写明 URI。（访问 http://www.hackr.jp/ 返回的对象却是 http://www.hackr.jp/index-ja.html 等类似情况）

### Content-MD5(主体的报文摘要)

```http
Content-MD5: OGFkZDUwNGVhNGY3N2MxMDIwZmQ4NTBmY2IyTY==
```

首部字段 Content-MD5 是一串由 MD5 算法生成的值，其目的在于检查报文主体在传输过程中是否保持完 整，以及确认传输到达。

### Content-Range(主体的位置范围)

```http
Content-Range: bytes 5001-10000/10000
```

针对范围请求，返回响应时使用的首部字段 Content-Range，能告知客户端作为响应返回的实体的哪个部分 符合范围请求。字段值以字节为单位，表示当前发送部分及整个实体大小。

### Content-Type(主体的媒体类型)

```http
Content-Type: text/html; charset=UTF-8
```

首部字段 Content-Type 说明了实体主体内对象的媒体类型。和首部字段 Accept 一样，字段值用 type/subtype 形式赋值。

### Expires(实体过期时间)

```http
Expires: Wed, 04 Jul 2012 08:26:05 GMT
```

首部字段 Expires 会将资源失效的日期告知客户端。缓存服务器在接收到含有首部字段 Expires 的响应后，会以缓存来应答请求，在 Expires 字段值指定的时间之前，响应的副本会一直被保存。当超过指定的时间后， 缓存服务器在请求发送过来时，会转向源服务器请求资源。



### Last-Modified(资源的最后修改时间)

```http
Last-Modified: Wed, 23 May 2012 09:59:55 GMT
```

首部字段 Last-Modified 指明资源最终修改的时间。一般来说，这个值就是 Request-URI 指定资源被修改的 时间。但类似使用 CGI 脚本进行动态数据处理时，该值有可能会变成数据最终修改时的时间。

## 为 Cookie 服务的首部字段

管理服务器与客户端之间状态的 Cookie，虽然没有被编入标准化 HTTP/1.1 的 RFC2616 中，但在 Web 网 站方面得到了广泛的应用。
Cookie 的工作机制是用户识别及状态管理。Web 网站为了管理用户的状态会通过 Web 浏览器，把一些数据 临时写入用户的计算机内。接着当用户访问该Web网站时，可通过通信方式取回之前发放的 Cookie。

下面的表格内列举了与 Cookie 有关的首部字段

表 6-8：**为 Cookie 服务的首部字段**

**首部字段名                 说明                                                 首部类型**
Set-Cookie                开始状态管理所使用的Cookie信息     响应首部字段
Cookie                      服务器接收到的Cookie信息                请求首部字段

### Set-Cookie

```http
Set-Cookie: status=enable; expires=Tue, 05 Jul 2011 07:26:31 GMT; path=/; domain=.hackr.jp;
```

当服务器准备开始管理客户端的状态时，会事先告知各种信息。

下面的表格列举了 Set-Cookie 的字段值。

**属性                                说明**
NAME=VALUE               赋予 Cookie 的名称和其值（必需项）
expires=DATE               Cookie的有效期（若不明确指定则默认为浏览器关闭前为止）
path=PATH                   将服务器上的文件目录作为Cookie的适用对象（若不指定则默认为文档 所在的文件目录）
domain=域名                作为 Cookie 适用对象的域名 （若不指定则默认为创建 Cookie 的服务 器的域名）
Secure                           仅在 HTTPS 安全通信时才会发送 Cookie
HttpOnly                       加以限制，使 Cookie 不能被 JavaScript 脚本访问

#### **expires 属性**

Cookie 的 expires 属性指定浏览器可发送 Cookie 的有效期。
当省略 expires 属性时，其有效期仅限于维持浏览器会话（Session）时间段内。这通常限于浏览器应用程序被关闭之前。
另外，一旦 Cookie 从服务器端发送至客户端，服务器端就不存在可以显式删除 Cookie 的方法。但可通过覆盖已过期的 Cookie，实现对客户端 Cookie 的实质性删除操作。



### Cookie

```http
Cookie: status=enable
```

首部字段 Cookie 会告知服务器，当客户端想获得 HTTP 状态管理支持时，就会在请求中包含从服务器接收到的 Cookie。接收到多个 Cookie 时，同样可以以多个 Cookie 形式发送。

