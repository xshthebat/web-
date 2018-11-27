# cookie,session,token

## cookie

Netscape官方文档中的定义为，Cookie是指在HTTP协议下，服务器或脚本可以维护客户端计算机上信息的一种方式 。通俗地说，Cookie是一种能够让网站Web服务器把少量数据储存到客户端的硬盘或内存里，或是从客户端的硬盘里读取数据的一种技术。 Cookie文件则是指在浏览某个网站时，由Web服务器的CGI脚本创建的存储在浏览器客户端计算机上的一个小文本文件，其格式为：用户名@网站地址 ［数字］.txt。

再通俗一点的讲，由于HTTP是一种无状态的协议，服务器单从网络连接上无从知道客户身份。怎么办呢？就给客户端们颁发一个通行证，每人一个，无论谁访问都必须携带自己通行证。这样服务器就能从通行证上确认客户身份了。

![](/home/xsh/桌面/markdown/imgs/c4bbf94c761094d78f415f7d833285a9.png)

## cookie的作用　

HTTP协议是一种无状态、无连接的协议，不能在服务器上保持一次会话的连续状态信息。Cookie的作用是记录用户的有关信息，它最根本的用途是帮助Web站点保存有关访问者的信息。如身份识别号码ID、密码、浏览过的网页、停留的时间、用户在Web站点购物的方式或用户访问该站点的次数等，当用户再次链接Web服务器时，浏览器读取Cookie信息并传递给Web站点。

## cookie的属性

　　我们先来看一张图：

![](/home/xsh/桌面/markdown/imgs/3c959bc547bca47124268e9c43ec3668.png)

在谷歌浏览器开发者模式中，我们可以看到网站的cookie，所以，相应的，我们就可以知道cookie的一些属性了，接下来介绍Cookie中的一些属性

如图所示，cookie具有的属性有 Name、value、Domain、path、Expires/Max-Age、Size、HTTP、Secure等等，我们接下来详细了解了解

### **Name：**

该Cookie的名称，一旦创建，名称便不可更改

### **value**:

该Cookie的值，如果值为Unicode字符，需要为字符编码,如果值为二进制数据，则需要使用BASE64编码

### **domain**：

可以访问该Cookie的域名。如果设置为”.google.com”,则所有以”google.com”结尾的域名都可以访问该Cookie。注意第一个字符必须为“**.**”主域

这个domain稍作解释：

非顶级域名，如二级域名或者三级域名，设置的cookie的domain只能为顶级域名或者二级域名或者三级域名本身，不能设置其他二级域名的cookie，否则cookie无法生成。

 顶级域名只能设置domain为顶级域名，不能设置为二级域名或者三级域名，否则cookie无法生成。

 二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。所以要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。
顶级域名只能获取到domain设置为顶级域名的cookie，其他domain设置为二级域名的无法获取。

像 Yahoo! 这种大型网站，都会有许多 name.yahoo.com 形式的站点（例如：my.yahoo.com, finance.yahoo.com 等等）。将一个 cookie 的 `domain` 选项设置为 `yahoo.com`，就可以将该 cookie 的值发送至所有这些站点。浏览器会把 `domain` 的值与请求的域名做一个尾部比较（即从字符串的尾部开始比较），并将匹配的 cookie 发送至服务器。

`domain` 选项的值必须是发送 `Set-Cookie` 消息头的主机名的一部分，例如我不能在 google.com 上设置一个 cookie，因为这会产生安全问题。不合法的 `domain` 选择将直接被忽略。

### **Path:**

path字段为可以访问此cookie的页面路径。 比如domain是abc.com,  path是/detail，那么只有/detail 路径下的页面可以读取此cookie。 

### **Expires/Max-Age:** 

该Cookie失效时间，单位秒。如果为正数，则Cookie在maxAge秒之后失效。

​    如果为负数，该Cookie为临时Cookie，关闭浏览器即失效，浏览器也不会以任何形式保存Cookie.

​    如果为0，表示删除Cookie。默认是-1

### size:

cookie的大小

Microsoft指出InternetExplorer8增加cookie限制为每个域名50个，但IE7似乎也允许每个域名50个cookie。

　　Firefox每个域名cookie限制为50个。

　　Opera每个域名cookie限制为30个。

　　Safari/WebKit貌似没有cookie限制。但是如果cookie很多，则会使header大小超过[服务器](http://product.it168.com/files/0402search.shtml)的处理的限制，会导致错误发生。

　Firefox和Safari允许cookie多达4097个字节，包括名（name）、值（value）和等号。

　　Opera允许cookie多达4096个字节，包括：名（name）、值（value）和等号。

　　Internet Explorer允许cookie多达4095个字节，包括：名（name）、值（value）和等号。

​      注：多字节字符计算为两个字节。在所有浏览器中，任何cookie大小超过限制都被忽略，且永远不会被设置。

### **secure：**

  设置是否只能通过https来传递此条cookie

### sameSite:Strict

严格模式，表明这个 cookie 在任何情况下都不可能作为第三方 cookie，绝无例外。比如说假如 b.com 设置了如下 cookie：

你在 a.com 下发起的对 b.com 的任意请求中，foo 这个 cookie 都不会被包含在 Cookie 请求头中，但 bar 会。举个实际的例子就是，假如淘宝网站用来识别用户登录与否的 cookie 被设置成了 SameSite=Strict，那么用户从百度搜索页面甚至天猫页面的链接点击进入淘宝后，淘宝都不会是登录状态，因为淘宝的服务器不会接受到那个 cookie，其它网站发起的对淘宝的任意请求都不会带上那个 cookie。

### SameSite=Lax：

宽松模式，比 Strict 放宽了点限制：假如这个请求是我上面总结的那种同步请求（改变了当前页面或者打开了新页面）且同时是个 GET 请求（因为从语义上说 GET 是读取操作，比 POST 更安全），则这个 cookie 可以作为第三方 cookie。比如说假如 b.com 设置了如下 cookie：

## cookie的特性



1、一个浏览器针对一个网站最多存20个Cookie，浏览器一般只允许存放300个Cookie

​      2、每个Cookie的长度不能超过4KB（稀缺）。但不同的浏览器实现的不同

​      3、Cookie的不可跨域名性。

​     例如：Cookie在客户端是由浏览器来管理的，浏览器能够保证Google只会操作Google的Cookie而不会操作Baidu的Cookie，从而保证用户的隐私安全

## js操作cookie

在使用JavaScript存取 cookie 时，必须要使用Document对象的 cookie 属性；一行代码介绍如何创建和修改一个 cookie ：

```js
　　document.cookie  = 'username=Darren'

```

以上代码中'username'表示 cookie 名称，'Darren'表示这个名称对应的值。假设 cookie 名称并不存在，那么就是创建一个新的 cookie；如果存在就是修改了这个 cookie 名称对应的值。如果要多次创建 cookie ，重复使用这个方法即可

### cookie的读取

```js

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}　
```

### 设置 cookie 值的函数

```js
function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
```

### 删除Cookie

```js
function delCookie ( name )
{
    setCookie ( name, "", -1 ) ;
}
```

## Cookie的实现原理

1）客户端在浏览器的地址栏中键入Web服务器的URL，浏览器发送读取网页的请求。 

（2）服务器接收到请求后，产生一个Set-Cookie报头，放在HTTP报文中一起回传客户端，发起一次会话。 

（3）客户端收到应答后，若要继续该次会话，则将Set-Cook-ie中的内容取出，形成一个Cookie.txt文件储存在客户端计算机里。

（4）当客户端再次向服务器发出请求时，浏览器先在电脑里寻找对应该网站的Cookie.txt文件。如果找到，则根据此Cookie.txt产生Cookie报头，放在HTTP请求报文中发给服务器。

（5）服务器接收到包含Cookie报头的请求，检索其Cookie中与用户有关的信息，生成一个客户端所请示的页面应答传递给客户端。 浏览器的每一次网页请求，都可以传递已存在的Cookie文件，例如，浏览器的打开或刷新网页操作。

## Cookie的安全问题 

   通常cookie信息都是使用http连接传递数据，这种传递方式很容易被查看，而且js里面直接有一个document.cookie方法，可以直接获取到用户的cooie,所以cookie存储的信息容易被窃取。假如cookie中所传递的内容比较重要，那么就要求使用加密的数据传输。

　　**如何来防范cookie的安全呢？有以下几种方法：**

（1）HttpOnly属性
   如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。

（2）secure属性
​    当设置为true时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，如果是 HTTP 连接则不会传递该信息，所以不会被盗取到Cookie 的具体内容。

**登录时候用cookie的话，安全性问题怎么解决？**

这个问题，网上找了比较久的答案，比较满意的有两种答案（答案是网上找的）

**第一种是：**

​    把用户对象（包含了用户ID、用户名、是否登录..）序列化成字符串再加密存入Cookie。

​    密钥是：客户端IP+浏览器Agent+用户标识+固定的私有密钥

​    当cookie被窃取后，只要任一信息不匹配，就无法解密cookie，进而也就不能登录了。

​    这样做的缺点是IP不能变动、频繁加密解密会加重CPU负担

**第二种是：**

将用户的认证信息保存在一个cookie中，具体如下： 
1.cookie名：uid。推荐进行加密，比如MD5(‘站点名称’)等。 
2.cookie值：登录名|有效时间Expires|hash值。hash值可以由”登录名+有效时间Expires+用户密码（加密后的）的前几位 +salt” (**salt是保证在服务器端站点配置文件中的随机数)**



## Session

Cookie机制弥补了HTTP协议无状态的不足。在Session出现之前，基本上所有的网站都采用Cookie来跟踪会话。

与Cookie不同的是，session是以服务端保存状态的。

### session机制原理

当客户端请求创建一个session的时候，服务器会先检查这个客户端的请求里是否已包含了一个session标识 - sessionId，

当客户端请求创建一个session的时候，服务器会先检查这个客户端的请求里是否已包含了一个session标识 - sessionId，

sessionId的值一般是一个既不会重复，又不容易被仿造的字符串，这个sessionId将被在本次响应中返回给客户端保存。保存sessionId的方式大多情况下用的是cookie。

cookie 和session 的区别：

1、cookie数据存放在客户的浏览器上，session数据放在服务器上。

2、cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗
   考虑到安全应当使用session。

3、session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
   考虑到减轻服务器性能方面，应当使用COOKIE。

4、单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

5、所以个人建议：
   将登陆信息等重要信息存放为SESSION
   其他信息如果需要保留，可以放在COOKIE中

1、存放位置不同

Cookie保存在客户端，Session保存在服务端。

2 、存取方式的不同

 Cookie中只能保管ASCII字符串，假如需求存取Unicode字符或者二进制数据，需求先进行编码。Cookie中也不能直接存取Java对象。若要存储略微复杂的信息，运用Cookie是比拟艰难的。 

而Session中能够存取任何类型的数据，包括而不限于String、Integer、List、Map等。Session中也能够直接保管Java Bean乃至任何Java类，对象等，运用起来十分便当。能够把Session看做是一个Java容器类。 

3、安全性（隐私策略）的不同 

Cookie存储在浏览器中，对客户端是可见的，客户端的一些程序可能会窥探、复制以至修正Cookie中的内容。而Session存储在服务器上，对客户端是透明的，不存在敏感信息泄露的风险。 假如选用Cookie，比较好的方法是，敏感的信息如账号密码等尽量不要写到Cookie中。最好是像Google、Baidu那样将Cookie信息加密，提交到服务器后再进行解密，保证Cookie中的信息只要本人能读得懂。而假如选择Session就省事多了，反正是放在服务器上，Session里任何隐私都能够有效的保护。 

4、有效期上的不同 

只需要设置Cookie的过期时间属性为一个很大很大的数字，Cookie就可以在浏览器保存很长时间。 由于Session依赖于名为JSESSIONID的Cookie，而Cookie JSESSIONID的过期时间默许为–1，只需关闭了浏览器（一次会话结束），该Session就会失效。

5、对服务器造成的压力不同 

Session是保管在服务器端的，每个用户都会产生一个Session。假如并发访问的用户十分多，会产生十分多的Session，耗费大量的内存。而Cookie保管在客户端，不占用服务器资源。假如并发阅读的用户十分多，Cookie是很好的选择。

6、 跨域支持上的不同 

Cookie支持跨域名访问，例如将domain属性设置为“.baidu.com”，则以“.baidu.com”为后缀的一切域名均能够访问该Cookie。跨域名Cookie如今被普遍用在网络中。而Session则不会支持跨域名访问。Session仅在他所在的域名内有效。 

### SESSION 的数据保存在哪里呢？(可以放在内存,数据库)

## token

1. Token 完全由应用管理，所以它可以避开同源策略
2. Token 可以避免 [CSRF 攻击](https://link.juejin.im/?target=http%3A%2F%2Fwww.cnblogs.com%2Fshanyou%2Fp%2F5038794.html)
3. Token 可以是无状态的，可以在多个服务间共享



Token 是在服务端产生的。如果前端使用用户名/密码向服务端请求认证，服务端认证成功，那么在服务端会返回 Token 给前端。前端可以在每次请求的时候带上 Token 证明自己的合法地位。如果这个 Token 在服务端持久化（比如存入数据库），那它就是一个永久的身份令牌。

## 需要设置有效期吗？(看业务)



## 什么是JWT

WT是JSON Web Token的缩写。 JSON Web Token（JWT）是一个开放标准（RFC 7519），它定义了一种紧凑且独立的方式，可以在各方之间作为JSON对象安全地传输信息。此信息可以通过数字签名进行验证和信任。 JWT可以使用加密算法（例如HMAC算法）或使用RSA或ECDSA的公钥/私钥对进行签名。 虽然JWT可以加密以在各方之间提供保密，但我们将专注于签名令牌。签名令牌可以验证其中包含的声明的完整性，而加密令牌则隐藏其他方的声明。当使用公钥/私钥对签署令牌时，签名还证明只有持有私钥的一方是签署私钥的一方。



### JWT的结构

JWT由三部分组成，使用'.'号连接：

Header部分 标头通常由两部分组成：令牌的类型，即JWT，以及正在使用的散列算法，例如HMAC SHA256或RSA。，比如`{ "alg": "HS256", "typ": "JWT" }`表示使用了HS256来生成签名。Header部分会使用Base64Url编码设置到JWT的第一部分。

Payload部分： 令牌的第二部分是有效负载，其中包含声明。声明是关于实体（通常是用户）和其他数据的声明。声明有三种类型：注册，公开和私有声明。
 注册声明：这些是一组预定义的声明，它们不是强制性的，但是建议使用，以提供一组有用的，可互操作的声明。其中一些是：iss（发行人），exp（到期时间），sub（主题），aud（观众）等。
 公开声明：这些可以由使用JWT的人随意定义。但是为避免冲突，应在[IANA JSON Web](https://link.juejin.im?target=https%3A%2F%2Fwww.iana.org%2Fassignments%2Fjwt%2Fjwt.xhtml)令牌注册表中定义它们，或者将其定义为包含防冲突命名空间的URI。
 私有声明：这些是为在同意使用它们的各方之间共享信息而创建的自定义声明，既不是注册声明也不是公开声明。
 一个Payload示例

```js
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
 }
```

Payload也会和Header一样Base64Url编码，放在JWT第二部分。

- Signature部分： 要创建签名部分，必须采用编码标头(Header)，编码的有效负载(Payload)，秘钥，标头中指定的算法，并对其进行签名。 例如，如果要使用HMAC SHA256算法，将按以下方式创建签名：

```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```





![](/home/xsh/桌面/markdown/imgs/16894865298b0f8fc60c.png)



