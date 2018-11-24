# Doctype

1、HTML 中 Doctype 的用途是什么？

具体谈谈，以下每种情况下会发生什么：

- Doctype 不存在。(DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现)
- 使用了 HTML4 Doctype，但 HTML 页面使用了 HTML5 的标签，如 <audio> 或 <video>。它会导致任何错误吗？(不会)
- 使用了无效的 Doctype　(DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现)。

## 简介

<!DOCTYPE> 声明位于文档中的最前面的位置，处于 <html> 标签之前。

<!DOCTYPE> 声明不是一个 HTML 标签；它是用来告知 Web 浏览器页面使用了哪种 HTML 版本。

在 HTML 4.01 中，<!DOCTYPE> 声明需引用 DTD （文档类型声明），因为 HTML 4.01 是基于 SGML （Standard Generalized Markup Language 标准通用标记语言）。DTD 指定了标记语言的规则，确保了浏览器能够正确的渲染内容。

HTML5 不是基于 SGML，因此不要求引用 DTD。

**提示：**总是给您的 HTML 文档添加 <!DOCTYPE> 声明，确保浏览器能够预先知道文档类型。

**注释：**<!DOCTYPE> 标签没有结束标签。

**提示：**<!DOCTYPE> 声明不区分大小写。

首先，浏览器并没有所谓的“HTML 5 模式"，而是只有三种：怪异模式（Quirks)，几乎标准的模式（Limited Quirks）和标准模式（Standards），其中几乎标准的模式和标准模式之间的唯一差异在于是否对 <img> 元素给定行高（line-height）和基线（baseline）

几乎标准模式中，如果 <img> 标签所在行没有其他的行内元素，将不指定基线（baseline）， <img> 标签因此会紧贴着父元素底部在标准模式中，行框总是会包含类似字母 g，f 尾巴下伸出来的那一部分空间（针对下行字母），即使行框内并没有任何内容。因此这种情况下你看到的 <img> 跟父元素底部几个像素的间隙实际上就是为”字母尾巴“预留的

使用 XHTML Transitional Doctype 会是浏览器运行在”几乎标准模式（Limited Quirks）”。如果你使用XHTML Strict 或者HTML 4 Strict模式，你将看到和使用HTML 5 模式同样的间隙，因为这是标准模式（Standards mode）

DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现

\1. 该标签可声明三种 DTD 类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。

\2. HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset。

\3. XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。

\4. Standards （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，而 Quirks（包容）模式（也就是松散呈现模式或者兼容模式）用于呈现为传统浏览器而设计的网页。

## 常见的 DOCTYPE 声明

```
语法：<!DOCTYPE 根元素 可用性 "注册//组织//类型 标签 定义//语言" "URL">
```

### HTML 5

<!DOCTYPE html>

### HTML 4.01 Strict

这个 DTD 包含所有 HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的。

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

### HTML 4.01 Transitional

这个 DTD 包含所有 HTML 元素和属性，包括表象或过时的元素（如 font ）。框架集是不允许的。

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

### HTML 4.01 Frameset

这个 DTD 与 HTML 4.01 Transitional 相同，但是允许使用框架集内容。

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">

### XHTML 1.0 Strict

这个 DTD 包含所有 HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的。结构必须按标准格式的 XML 进行书写。

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

### XHTML 1.0 Transitional

这个 DTD 包含所有 HTML 元素和属性，包括表象或过时的元素（如 font ）。框架集是不允许的。结构必须按标准格式的 XML 进行书写。

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

### XHTML 1.0 Frameset

这个 DTD 与 XHTML 1.0 Transitional 相同，但是允许使用框架集内容。

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

### XHTML 1.1

这个 DTD 与 XHTML 1.0 Strict 相同，但是允许您添加模块（例如为东亚语言提供 ruby 支持）。

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
</!doctype>

<!DOCTYPE html> 是 HTML5 中唯一的 doctype，也被视作将网页 "升级" 到 HTML5 的第一步。

很多国外网站的 <!DOCTYPE html> 和 <HEAD> 之间都会有一段注释,如:

```
<!—[if IE 6 ]><html class="ie ielt9 ielt8 ielt7 ie6" lang="en-US"><![endif]—>
<!—[if IE 7 ]><html class="ie ielt9 ielt8 ie7" lang="en-US"><![endif]—>
<!—[if IE 8 ]><html class="ie ielt9 ie8" lang="en-US"><![endif]—>
<!—[if IE 9 ]><html class="ie ie9" lang="en-US"><![endif]—>
<!—[if (gt IE 9)|!(IE)]><!—><html lang="en-US"><!—<![endif]—>
```

改代码作用于 css，来写一些针对 IE 各版本的样式差异。

先判断用户用的哪个 IE 版本，然后在标签上加上该版本的 class，这样可以方便 hack。

css 文件是这样写的：

```
.ie6 xxx {};
.ie7 xxx {};
```

这是目前最好的 hack 方式之一





