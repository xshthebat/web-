# HTML5新增属性(input新增)

## a和area下的media属性

为了和link元素保存一致性，a元素和area元素也都增加了media属性，只有在href存在时菜有效。media属性的意思是目标 URL 是为何种媒介/设备优化的，默认值是all

```HTML
<a href="att_a_media.asp?output=print" media="print and (resolution:300dpi)">
HTML5 a media attribute.
</a>
```

media 属性规定目标URL将显示在什么设备上。

该属性使用与指定的URL显示在指定的设备上 (如 iPhone) , 音频或者打印媒介。

该attribute可以接受多个值。

仅在使用了href属性才需要media 属性

## area下的hreflang, type, rel属性

为了保存和a元素以及link元素的一致性，area元素增加了hreflang, type, rel等属性。[·](http://caibaojian.com/html5-new-properties.html)

| 属性     | 值                                                           | 描述                                 |
| -------- | ------------------------------------------------------------ | ------------------------------------ |
| hreflang | language_code                                                | 规定目标 URL 的语言                  |
| media    | media query                                                  | 规定目标 URL 是为何种媒介/设备优化的 |
| rel      | alternate, author, bookmark, external, help, license, next, nofollow, noreferrer, prefetch, prev, search, sidebar, tag | 规定当前文档与目标 URL 之间的关系    |
| type     | mime_type                                                    | 规定目标 URL 的 MIME 类型            |

## base下的target属性

base下的target属性和a的target属性是一样的，目的很多老版本浏览器早就一起支持了。

## meta下的charset属性

charset是用来定义文档的encoding方式的，如果在XML里定义了该属性，则charset的值必须是不区分大小写的ASCII以便match UTF-8，因为XML文档强制使用UTF-8作为encoding方式的。[·](http://caibaojian.com/html5-new-properties.html)

注：meta属性上的charset属性在XML文档里是不起作用的，仅仅是为了方便与XHTML直接互相迁移。

不能声明多个带有charset属性的meta元素。

在HTML4里，我们不得不这样定义：

```
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
```

在[HTML5](http://caibaojian.com/t/html5)里，我们这样定义就行了：

```
//code from http://caibaojian.com/html5-new-properties.html
<meta charset="ISO-8859-1">
```

##  autofocus属性(input, select, textarea和button Internet Explorer 9 及之前的版本不支持 <input> 标签的 autofocus 属性)

Internet Explorer 9 及之前的版本不支持 <input> 标签的 autofocus 属性

HTML5为**input, select, textarea和button**元素增加了一个autofocus属性（hidden的input不能使用），它提供了一种声明式的方式来定义当页面 load以后，焦点自动作用于当前元素上。使用autofocus可以提高用户体验，比如我们在登录页面设置，页面load以后自动将焦点设置到用户名的 textbox上。

```HTML
<input maxlength="256" name="loginName" value="" autofocus>
<input type="submit" value="Login">
```

注1：一个页面声明一次autofocus属性。

注2：一个页面里不是必须要设置autofocus的。



## placeholder属性(input和textarea)

input和textarea元素新增加了placeholder属性，该属性是提升用户输入内容。当用户点击的时候，该内容文本自动消失，离开焦 点并且值为空的话，再次显示。以前我们都是使用[JavaScript](http://caibaojian.com/t/javascript)代码来实现，其实蛮复杂的，有了placeholder属性就爽了，直接写成下面下这 样的代码：

```HTML
<input type="username" placeholder="请输入你的用户名">
```

## form属性(除了 Internet Explorer，几乎所有的主流浏览器都支持 form 属性。)

form属性（不是<form>元素），是一个划时代的属性，它允许你将<form>表单里的表单控件声明在表单外门，只 需要在相应的控件上设置form属性为指定的<form>表单的id就行了，不需要非得把元素声明在<form>元素里了

```HTML
<label>Email:
 <input type="email" form="foo" name="email">
</label>
<form id="foo"></form>
```

支持该属性的元素有：input, output, select, textarea, button, label, object和fieldset。

在form元素里面的表单元素可以不用添加form属性，如果你想利用form获取所有表单元素的值，那么在form元素外面的表单元素就必须添加form属性，input、select、textarea等元素都满足该功能。

## required属性(input, select和textarea)

input 都支持　required 属性适用于下面的 input 类型：text、search、url、tel、email、password、date pickers、number、checkbox、radio 和 file

textarea:除了 Internet Explorer 和 Safari，其他主流浏览器都支持 required 属性。

select:都不支持

required属性是一个验证属性，表明该控件是**必填项**，在submit表单之前必须填写。可用的元素是：**input, select和textarea（例外： type类型为hidden, image或类似submit的input元素）**。

如果在select上使用required属性，那就得设置一个带有空值的占位符option。代码如下

```HTML
<label>Color: <select name=color required>
 <option value="">Choose one
 <option>Red
 <option>Green
 <option>Blue
</select></label>
```

## fieldset下的disabled属性

当fieldset的设置disabled属性时，其所有的子控件都被禁用掉了，但不包括legend里的元素。name属性是用来脚本访问的。

当fieldset的设置disabled属性时，其所有的子控件都被禁用掉了，但不包括legend里的元素。name属性是用来脚本访问的。

```HTML
<form>
<fieldset name="clubfields" disabled>
 <legend> <label>
  <input type=checkbox name=club onchange="form.clubfields.disabled = !checked">
  Use Club Card
 </label> </legend>
 <p><label>Name on card: <input name=clubname required></label></p>
 <p><label>Card number: <input name=clubnum required pattern="[-0-9]+"></label></p>
 <p><label>Expiry date: <input name=clubexp type=month></label></p>
</fieldset>
</form>
```

当点击legend里的checkbox的时候，会自动切换fieldset子元素的disabled状态。

```HTML
<form>
<fieldset name="clubfields">
    <legend>
        <label>
            <input type="checkbox" name="club" onchange="form.clubfields.disabled = !checked">
            Use Club Card
        </label>
    </legend>
    <p>
        <label>
            Name on card:
            <input name="clubname" required></label></p>
    <fieldset name="numfields">
        <legend>
            <label>
                <input type="radio" checked name="clubtype" onchange="form.numfields.disabled = !checked">
                My card has numbers on it
            </label>
        </legend>
        <p>
            <label>
                Card number:
                <input name="clubnum" required pattern="[-0-9]+"></label></p>
    </fieldset>
    <fieldset name="letfields" disabled>
        <legend>
            <label>
                <input type="radio" name="clubtype" onchange="form.letfields.disabled = !checked">
                My card has letters on it
            </label>
        </legend>
        <p>
            <label>
                Card code:
                <input name="clublet" required pattern="[A-Za-z]+"></label></p>
    </fieldset>
</fieldset>
</form>
```

在这个例子，当你外面的 “Use Club Card” checkbox没有选中的时候，里面的子控件都是被禁用的，如果选中了，两个radiobutton都可用了，然后可以选择哪一个子fieldset你想让它可用。原文链接：

http://caibaojian.com/html5-new-properties.html

## input下的新属性(autocomplete, min, max, multiple, pattern, step,list)(重点)

input下增加了几个用于约束输入内容的属性（autocomplete, min, max, multiple, pattern和step），目前只有部分浏览器支持required和autocomplete属性，其它属性尚未支持

### autocomplete(form除了 Opera，其他主流浏览器都支持 autocomplete 属性,input所有主流浏览器都支持 autocomplete 属性。)

**autocomplete** 属性规定输入字段是否应该启用自动完成功能, 自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项

```html
<form action="demo_form.asp" method="get" autocomplete="on">
  First name:<input type="text" name="fname" /><br />
  Last name: <input type="text" name="lname" /><br />
  E-mail: <input type="email" name="email" autocomplete="off" /><br />
  <input type="submit" />
</form>
```

注释：autocomplete 属性适用于 <form>，以及下面的 <input> 类型：**text, search, url, telephone, email, password, datepickers, range 以及 color。**

### list(Safari 或者 Internet Explorer 9 及之前的版本不支持 <input> 标签的 list 属性。)

**list**属性，用来和存放数据的datalist元素关联：

```html
<form>
<label>Homepage: <input name=hp type=url list=hpurls></label>
<datalist id=hpurls>
 <option value="http://www.google.com/" label="Google">
 <option value="http://www.reddit.com/" label="Reddit">
</datalist>
</form>
```



当input为空的时候，双击它，就会弹出提示选项（选项内容就是定义的label（Google/Reddit））。选择一个label就会将对应的value地址更新到input里（目前FF支持）

### **max/min/step**(Firefox 或者 Internet Explorer 9 及之前的版本不支持 <input> 标签的 min 属性。)

**注意：**由于 Internet Explorer 10 不支持这些 input 类型，min 属性将不适用于 IE 10 中的 date 和 time。)

限制值的输入范围，以及值的变化程度。

```html
<input type="number" name="points" step="3">
```



### multiple(Internet Explorer 9 及之前的版本不支持 <input> 标签的 multiple 属性)

规定输入字段可选择多个值      

```html
 <input type="file" name="img" multiple>
```



### **pattern**(Safari 或者 Internet Explorer 9 及之前的版本不支持 <input> 标签的 pattern 属性)

**验证input输入域的格式，即正则表达式**

```
<input type="text" name="name" pattern="[A-z0-9]{8}"/>
```



### 当input的type为image的时候，input还支持width和height属性用来指定图片的大小

### step(Internet Explorer 10、Opera、Chrome 和 Safari 支持 step 属性)

```html
<form action="demo_form.html">
<input type="number" name="points" step="3">
<input type="submit">
</form>

```

step 属性规定 <input> 元素的合法数字间隔。

## dirname属性(input 和 textarea)

input 和 textarea 元素有了一个新元素 dirname，用于用户所设置的提交的方向性的控制(译注，即书写的方向性，ltr或rtl)。

```html
<form action="addcomment.cgi" method=post>
 <p><label>Comment: <input type=text name="comment" dirname="comment.dir" required></label></p>
 <p><button name="mode" type=submit value="add">Post Comment</button></p>
</form>
```

用户提交的时候，浏览器会接收到3个参数，分别是：comment, comment.dir和mode，类似下面这样：comment=Hello&comment.dir=ltr&mode=add[·](http://caibaojian.com/html5-new-properties.html)

如果是阿拉伯文的浏览器，输入的是阿拉伯文مرحبًا的话，那传回的参数就应该是这样的：

comment=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7&comment.dir=rtl&mode=add

## textarea下的maxlength和wrap属性

textarea新增的maxlength和input的maxlength是一样的，都是限制最大长度的。增的wrap属性为枚举值（soft/hard），意思分别是：

- hard：自动硬回车换行，换行标记一同被传送到服务器中去，必须与cols同时使用才能判断多少字符换行；
- soft：自动软回车换行，换行标记不会传送到服务器中去

## form下的novalidate属性(**注意：**在 Safari 和 Internet Explorer 9 及之前的版本中不支持 novalidate 属性。)

新增属性novalidate的意思是允许form表单不验证即可提交（不用管form里的元素是否有验证条件，例如required, min, max等）。

**注意：**在 Safari 和 Internet Explorer 9 及之前的版本中不支持 novalidate 属性。

```html
<form action="demo-form.php" novalidate>
E-mail: <input type="email" name="user_email">
<input type="submit">
</form>
```

## input与button下的新属性(formaction, formenctype, formmethod, formnovalidate和formtarget)

input和button元素新增加了几个新属性（formaction, formenctype, formmethod, formnovalidate和formtarget），如果这些设置这些属性的话，那所对应的form属性值将被覆盖，即input或button所属 的form元素的action, enctype, method, novalidate和target属性的值将被覆盖。

```html
<form action="demo_form.asp" method="get">
First name: <input type="text" name="fname" /><br />
Last name: <input type="text" name="lname" /><br />
<input type="submit" value="Submit" />
<input type="submit" formmethod="post" formaction="demo_post.asp" value="Submit" />
</form>

<form action="demo_form.asp" method="get">
  First name: <input type="text" name="fname" /><br />
  Last name: <input type="text" name="lname" /><br />
  <input type="submit" value="Submit" /><br />
  <input type="submit" formaction="demo_admin.asp" value="Submit as admin" />
</form>

<form action="demo_form.asp" method="get">
  First name: <input type="text" name="fname" /><br />
  Last name: <input type="text" name="lname" /><br />
<input type="submit" value="Submit" />
<input type="submit" formtarget="_blank" value="Submit" />
</form>
```

### formaction(Internet Explorer 9 及之前的版本不支持 <input> 标签的 formaction 属性)

The formaction 属性用于描述表单提交的URL地址.

The formaction 属性会覆盖<form> 元素中的action属性.

### formenctype(同上)

formenctype 属性描述了表单提交到服务器的数据编码 (只对form表单中 method="post" 表单)

formenctype 属性覆盖 form 元素的 enctype 属性。

### formmethod(同上)

formmethod 属性定义了表单提交的方式。

formmethod 属性覆盖了 <form> 元素的 method 属性

### formnovalidate(Safari 或者 Internet Explorer 9 及之前的版本不支持 <input> 标签的 formnovalidate 属性)

novalidate 属性是一个 boolean 属性.

novalidate属性描述了 <input> 元素在表单提交时无需被验证。

formnovalidate 属性会覆盖 <form> 元素的novalidate属性.

### formtarget(Internet Explorer 9 及之前的版本不支持 <input> 标签的 formtarget 属性)

formtarget 属性指定一个名称或一个关键字来指明表单提交数据接收后的展示。

The formtarget 属性覆盖 <form>元素的target属性.

```html
<form action="demo-form.php">
  First name: <input type="text" name="fname"><br>
  Last name: <input type="text" name="lname"><br>
  <input type="submit" value="正常提交">
  <input type="submit" formtarget="_blank"
  value="提交到一个新的页面上">
</form>
```

## menu下的type和label属性(主流浏览器并不支持 menu 标签)

menu 元素有了两个新属性：type 和 label。它们允许元素转化成典型用户界面里的菜单，并结合全局 contextmenu 属性提供上下文菜单。

**注意：**目前主流浏览器并不支持 menu 标签。

## style下的scoped属性(只有 Firefox属性支持 scoped 属性 )



使用 scope 属性描述 <div> 元素的样式：

scoped 属性是一个布尔属性。

如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素。

```html
<div>
<style type="text/css" scoped>
h1 {color:red;}
p {color:blue;}
</style>
<h1>这个标题是红色的</h1>
<p>这个段落是蓝色的。</p>
</div>
```

## script下的async属性(Internet Explorer 9 及之前的版本不支持 <script> 标签的 async 属性)

```html
<script src="demo_async.js" async></script>
```

async 属性是一个布尔属性。

async 属性一旦脚本可用，则会异步执行。

async 属性仅适用于外部脚本（只有在使用 src 属性时）

- 如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
- 如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
- 如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本

## html下的manifest属性(Internet Explorer 9 及之前的版本不支持 manifest 属性。)

manifest 属性规定文档的缓存 manifest 的位置。

HTML5 引入了应用程序缓存，这意味着 Web 应用程序可以被缓存，然后在无互联网连接的时候进行访问。

应用程序缓存使得应用程序有三个优点：

1. 离线浏览 - 用户可以在离线时使用应用程序
2. 快速 - 缓存的资源可以更快地加载
3. 减少服务器加载 - 浏览器只从服务器上下载已更新/已更改的资源

manifest 属性应该被 Web 应用程序中您想要缓存的每个页面包含。

manifest 文件是一个简单的文本文件，列举出了浏览器用于离线访问而缓存的资源。

首先，需要先创建manifest文件

```
CACHE MANIFEST
#This is a comment

CACHE #需要缓存的文件
index.html
style.css

NETWORK: #不需要缓存的文件
search.php
login.php

FALLBACK: #资源不可用的情况下，重定向的地址
/api offline.html
```

然后加该文的地址加到html属性里：

```html
//code from http://caibaojian.com/html5-new-properties.html
<html manifest="/offline.manifest">
```

## link下的sizes属性(目前几乎没有主流浏览器支持 sizes 属性。)

```html
<link rel="icon" href="demo_icon.gif" type="image/gif" sizes="16x16">
```

sizes 属性规定视觉媒体图标的尺寸。

只有当被链接资源是图标时 (rel="icon")，才能使用该属性。

## ol下的reversed属性(目前只有 Chrome 和 Safari 6 支持 reversed 属性。)



reversed 属性是一个布尔属性。

reversed 属性规定列表顺序为降序 (9, 8, 7...)，而不是升序 (1, 2, 3...)。

```html
<ol reversed>
<li>Coffee</li>
<li>Tea</li>
<li>Milk</li>
</ol>
```



## [iframe](http://caibaojian.com/t/iframe)下的sanddbox, seamless和srcdoc属性

#### sanddbox

Opera 和 Internet Explorer 9 及之前的版本不支持 sandbox 属性。

iframe 元素有了三个新属性分别是 sandbox, seamless, 和 srcdoc，用以允许沙箱内容，例如，博客评论。[·](http://caibaojian.com/html5-new-properties.html)

```html
<iframe src="demo_iframe_sandbox.htm" sandbox=""></iframe>
```

如果指定了空字符串（sandbox=""），该属性对呈现在iframe框架中的内容启用一些额外的限制条件。

sandbox 属性的值既可以是一个空字符串（将会启用所有的限制），也可以是用空格分隔的一系列指定的字符串。

HTML 5通过sandbox属性提升iFrame的安全性。sandbox属性可以防止不信任的Web页面执行某些操作。

HTML 5规范的编辑Ian Hickson谈到了sandbox的好处，它可以防止如下操作：

- 访问父页面的DOM（从技术角度来说，这是因为相对于父页面iframe已经成为不同的源了）
- 执行脚本
- 通过脚本嵌入自己的表单或是操纵表单
- 对cookie、本地存储或本地SQL数据库的读写

#### seamless

只有 Chrome 和 Safari 6 支持 <iframe> 标签的 seamless 属性。

```html
<iframe src="demo_iframe.htm" seamless></iframe>
```

seamless 属性是一个布尔属性。

seamless 属性规定 <iframe> 看起来像是包含的文档的一部分（没有边框和滚动条）。

#### srcdoc

srcdoc 属性规定要显示在内联框架中的页面的 HTML 内容。

```html
<iframe srcdoc="<p>Hello world!</p>" src="demo_iframe_srcdoc.htm"></iframe>
```

该属性应该与 sandbox 和 seamless 属性一起使用。

如果浏览器支持 srcdoc 属性，且指定了 srcdoc 属性，它将覆盖在 src 属性中规定的内容。

如果浏览器不支持 srcdoc 属性，且指定了 srcdoc 属性，它将显示在 src 属性中规定的文件。

## video和audio的play属性

HTML5也使得所有来自HTML4的事件处理属性（那些形如 onevent-name 的属性）变成全局属性，并为其定义的新的事件添加了几个新的事件处理属性。比如，媒体元素(video 和 audio)API所使用的 play 事件。[·](http://caibaojian.com/html5-new-properties.html)



## 可编辑属性(contenteditable)

```html\
<p contenteditable="true">这是一个可编辑段落。</p>
```

contenteditable 属性指定元素内容是否可编辑。

```
true,或者是一个空字符串,表明该元素可编辑.
false 表明该元素不可编辑.
inherit 表明该元素继承了其父元素的可编辑状态.
```

## **废除的属性**

|                                                              |                                                        |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------ |
| **在HTML 4中使用的属性**                                     | **使用该属性的元素**                                   | **在HTML 5中的替代方案**                                     |
| **rev**                                                      | link、a                                                | rel                                                          |
| **charset**                                                  | link、a                                                | 在被链接的资源的中使用[HTTP](http://caibaojian.com/t/http) Content-type头元素 |
| **shape****、coords**                                        | a                                                      | 使用area元素代替a元素                                        |
| **longdesc**                                                 | img、iframe                                            | 使用a元素链接到校长描述                                      |
| **target**                                                   | link                                                   | 多余属性，被省略                                             |
| **nohref**                                                   | area                                                   | 多余属性，被省略                                             |
| **profile**                                                  | head                                                   | 多余属性，被省略                                             |
| **version**                                                  | html                                                   | 多余属性，被省略                                             |
| **name**                                                     | img                                                    | id                                                           |
| **scheme**                                                   | meta                                                   | 只为某个表单域使用scheme                                     |
| **archive****、chlassid、codebose、codetype、declare、standby** | object                                                 | 使用data与typc属性类调用插件。需要使用这些属性来设置参数时，使用param属性 |
| **valuetype****、type**                                      | param                                                  | 使用name与value属性，不声明之的MIME类型                      |
| **axis****、abbr**                                           | td、th                                                 | 使用以明确简洁的文字开头、后跟详述文字的形式。可以对更详细内容使用title属性，来使单元格的内容变得简短 |
| **scope**                                                    | td                                                     | 在被链接的资源的中使用HTTP Content-type头元素                |
| **align**                                                    | caption、input、legend、div、h1、h2、h3、h4、h5、h6、p | 使用[CSS](http://caibaojian.com/css3/)样式表替代             |
| **alink**、link、text、vlink、background、bgcolor            | body                                                   | 使用CSS样式表替代                                            |
| **align**、bgcolor、border、cellpadding、cellspacing、frame、rules、width** | table                                                  | 使用CSS样式表替代                                            |
| **alig*、char、charoff、height、nowrap、valign**             | tbody、thead、tfoot                                    | 使用CSS样式表替代                                            |
| **align**、bgcolor、char、charoff、height、nowrap、valign、width** | td、th                                                 | 使用CSS样式表替代                                            |
| **align**、bgcolor、char、charoff、valign**                  | tr                                                     | 使用CSS样式表替代                                            |
| **align**、char、charoff、valign、width**                    | col、colgroup                                          | 使用CSS样式表替代                                            |
| **align**、border、hspace、vspace**                          | object                                                 | 使用CSS样式表替代                                            |
| **clear**                                                    | br                                                     | 使用CSS样式表替代                                            |
| **compace**、type                                            | ol、ul、li                                             | 使用CSS样式表替代                                            |
| **compace**                                                  | dl                                                     | 使用CSS样式表替代                                            |
| **compace**                                                  | menu                                                   | 使用CSS样式表替代                                            |
| **width**                                                    | pre                                                    | 使用CSS样式表替代                                            |
| **align**、hspace、vspace                                    | img                                                    | 使用CSS样式表替代                                            |
| **align**、noshade、size、width**                            | hr                                                     | 使用CSS样式表替代                                            |
| **align**、frameborder、scrolling、marginheight、marginwidth | iframe                                                 | 使用CSS样式表替代                                            |
| **autosubmit**                                               | menu                                                   |                                                              |

