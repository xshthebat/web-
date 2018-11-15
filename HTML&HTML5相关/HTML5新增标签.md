# HTML5新增标签

## 脚本

### `<template>`

**<template> 元素** 是一种用于保存客户端内容的机制，该内容在页面加载时不被渲染，但可以在运行时使用JavaScript进行实例化。

可以将一个模板视为正在被存储以供随后在文档中使用的一个内容片段。

虽然, 在加载页面的同时,解析器确实处理 **<template>**元素的内容，这样做只是确保这些内容是有效的; 然而,元素的内容不会被渲染。



## 章节

| Element | Description                                                  |
| ------- | ------------------------------------------------------------ |
| section | 定义文档中的一个章节。                                       |
| nav     | 定义只包含导航链接的章节。                                   |
| article | 定义可以独立于内容其余部分的完整独立内容块。                 |
| aside   | 定义和页面内容关联度较低的内容——如果被删除，剩下的内容仍然很合理。 |
| header  | 定义页面或章节的头部。它经常包含 logo、页面标题和导航性的目录。 |
| footer  | 定义页面或章节的尾部。它经常包含版权信息、法律信息链接和反馈建议用的地址。 |
| main    | 定义文档中主要或重要的内容。                                 |

## 组织内容

| Element    | Description                |
| ---------- | -------------------------- |
| figure     | 代表一个和文档有关的图例。 |
| figcaption | 代表一个图例的说明。       |

## 文字形式

| Element | Description                                                  |
| ------- | ------------------------------------------------------------ |
| data    | 关联一个内容的*机器可读的等价形式* （该元素只在 WHATWG 版本的 HTML 标准中，不在 W3C 版本的 HTML5 标准中）。 |
| time    | 代表*日期* 和*时间* 值；机器可读的等价形式通过 `datetime` 属性指定。 |
| mark    | 代表一段需要被高亮的*引用* 文字。                            |
| ruby    | 代表被*ruby 注释* 标记的文本，如中文汉字和它的拼音。         |
| rt      | 代表*ruby 注释* ，如中文拼音。                               |
| rp      | 代表 ruby 注释两边的*额外插入文本* ，用于在不支持 ruby 注释显示的浏览器中提供友好的注释显示。 |
| bdi     | 代表需要*脱离* 父元素文本方向的一段文本。它允许嵌入一段不同或未知文本方向格式的文本。 |
| wbr     | 代表*建议换行 (Word Break Opportunity)* ，当文本太长需要换行时将会在此处添加换行符。 |

## 嵌入内容

| Element | Description                                                  |
| ------- | ------------------------------------------------------------ |
| embed   | 代表一个*嵌入* 的外部资源，如应用程序或交互内容。            |
| video   | 代表一段*视频* 及其视频文件和字幕，并提供了播放视频的用户界面。 |
| audio   | 代表一段*声音* ，或*音频流* 。                               |
| source  | 为 `<video>` 或 `<audio>` 这类媒体元素指定*媒体源* 。        |
| track   | 为 `<video>` 或 `<audio>` 这类媒体元素指定*文本轨道（字幕）* 。 |
| canvas  | 代表*位图区域* ，可以通过脚本在它上面实时呈现图形，如图表、游戏绘图等。 |
| svg     | 定义一个嵌入式*矢量图* 。                                    |
| math    | 定义一段*数学公式* 。                                        |

## 表单(重点)

#### datalist(IE 9 和更早版本的 IE 浏览器 以及 Safari 不支持 <datalist> 标签)

为input标签定义一个下拉列表，配合option使用。

datalist 及其选项不会被显示出来，它仅仅是合法的输入值列表。使用 input 元素的 [list属性](http://www.cnblogs.com/starof/p/4587178.html#list)来绑定 datalist

```html
<input type="url" list="url_list" name="link" /> 
<datalist id="url_list"> 
<option label="W3School" value="http://www.W3School.com.cn" /> 
<option label="Google" value="http://www.google.com" /> 
<option label="Microsoft" value="http://www.microsoft.com" /> 
</datalist>
```

![](/home/xsh/桌面/markdown/imgs/231411029709629.png)



#### keygen

定义表单里一个生产的键值，加密信息传送。

keygen 元素是密钥对生成器（key-pair generator）。当提交表单时，会生成两个键，一个是私钥，一个公钥。私钥（private key）存储于客户端，公钥（public key）则被发送到服务器。公钥可用于之后验证用户的客户端证书（client certificate）。

```html
<form action="demo_keygen.asp" method="get">
Username: <input type="text" name="usr_name" />
Encryption: <keygen name="security" />
<input type="submit" />
</form>
```

这里我们加入了一个“name”为“security”的 Keygen 控件，在该表单提交时，浏览器会提示您输入密码以确保提交安全，如下图所示：（支持浏览器 Firefox，Chrome，Safari 和 Opera）。点击“submit”时，会弹出“password”对话框。【没测试成功】

![](/home/xsh/桌面/markdown/imgs/231417265494046.gif)



#### progress

态标签（任务过程：安装、加载）。

表示运行中的进程，可以使用progress元素显示JavaScript中耗时时间函数的进程。等待中……、请稍后等。

```html
<progress value="40" max="100">40%</progress>
```

![](/home/xsh/桌面/markdown/imgs/231729220025410.png)

#### meter



<meter> 用于表示一个范围内的值。

```html
<p>your score is :
<meter value="88.7" min="0" max="100" low="65" high="96" optimum="100">B+</meter>
</p>
```

![](/home/xsh/桌面/markdown/imgs/231726138618820.png)

## 交互元素

| Element | Description                                           |
| ------- | ----------------------------------------------------- |
| embed   | 代表一个用户可以(点击)获取额外信息或控件的*小部件* 。 |
| summary | 代表 `<details>` 元素的*综述* 或*标题* 。             |
| summary | 代表一个用户可以点击的菜单项。                        |
| menu    | 代表菜单。                                            |

# 废除标签

## 1、可以使用css代替的标签

 删除basefont,big,center,font,s,strike,tt,u这些纯表现的元素,html5中提倡把画面展示性功能放在css中统一编辑。。

## 2、html5不再使用frame

不再用frame,noframes和frameset，这些标签对可用性产生负面影响。HTML5中不支持frame框架，只支持iframe框架，或者用服务器方创建的由多个页面组成的符合页面的形式，删除以上这三个标签。

## 3、只有个别浏览器支持的标签

bgsound背景音乐，blink文字闪烁，marquee文字滚动,applet

## 4、其他不常用的标签

ul替代dir

pre替代listing

code替代xmp

ruby替代rb

abbr替代acronym

废除isindex使用form与input相结合的方式替代。

废除listing使用pre替代

废除nextid使用guids

废除plaintex使用“text/plian”（无格式正文）MIME类型替代。

# 重新定义的html标签

<b>：代表内联文本，通常是粗体，没有传递表示重要的意思。

<i>：代表内联文本，通常斜体，没有传递表示重要的意思。

<dd>:可以和details与figure一同使用，定义包含文本，djalog也可用

<dt>：可以和details与figure一同使用，汇总细节，dialog也可用

<menu>：重新定义用户界面的菜单，配合commond或者menuitem使用

<small>：表示小字体，例如打印注释或者法律条款

<strong>：表示重要性而不是强调符号