# HTML语义化

## HTML语义化是什么?

> 语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化），便于开发者阅读和写出更优雅的代码的同时，让浏览器的爬虫和机器很好的解析。



## 为什么要语义化

* 有利于SEO，有助于爬虫抓取更多的有效信息，爬虫是依赖于标签来确定上下文和各个关键字的权重。
* 语义化的HTML在没有CSS的情况下也能呈现较好的内容结构与代码结构
* 方便其他设备的解析
* 便于团队开发和维护

## 写HTML代码时，应该注意什么

1.尽可能少的使用无语义的标签div和span；

2.在语义不明显时，既可以使用div或者p时，尽量用p, 因为p在默认情况下有上下间距，对兼容特殊终端有利；

3.不要使用纯样式标签，如：b、font、u等，改用css设置。

4.需要强调的文本，可以包含在strong或者em标签中（浏览器预设样式，能用CSS指定就不用他们），strong默认样式是加粗（不要用b），em是斜体（不用i）；

5.使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td；

6.表单域要用fieldset标签包起来，并用legend标签说明表单的用途；

7.每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。

## 常见HTML语义标签

html语义化标签包括 body, article, nav, aside, section, header, footer, hgroup, 还有 h1-h6 address等。

![](/home/xsh/桌面/markdown/imgs/165bd6dede604a15.png)



### header元素

header代表“网页”或者“section”的页眉，通常包含h1-h6 元素或者 hgroup, 作为整个页面或者一个内容快的标题。也可以包裹一节的目录部分，一个搜索框，一个nav，或者相关logo。

```html
 <header>
        <hgroup>
            <h1>网站标题<h1>
            <h2>网站副标题</h2>
        </hgroup>
 <header>
```

注意事项：

1. 可以是“网页”或者任意“section”的头部部分
2. 没有个数限制
3. 如果hgroup或者h1-h6自己就能工作得很好，那么就没必要用header

#### hgroup元素

`hgroup` 元素代表“网页”或“section”的标题，当元素有多个层级时，该元素可以将`h1`到`h6`元素放在其内，譬如文章的主标题和副标题组合

```html
<hgroup>
    <h1>这是一个主标题</h1>
    <h2>这是一个副标题</h2>
</hgroup>
```

注意事项：

1. 如果只需要一个h1-h6标签就不用hgroup
2. 如果有连续多个h1-h6标签就用hgroup
3. 如果有连续多个标题和其他文章数据，h1-h6标签就用hgroup包住，和其他文章元数据一起放入header标签

#### footer 元素

`footer`元素代表“网页”或任意“section”的页脚，通常含有该节的一些基本信息，譬如：作者，相关文档链接，版权资料。如果`footer`元素包含了整个节，那么它们就代表附录，索引，提拔，许可协议，标签，类别等一些其他类似信息。

```html
<footer>
    COPYRGHT@someone
</footer>
```

注意事项：

1. 可以是“网页”或者任意“section”的底部部分
2. 没有个数限制，除了包裹的内容不一样，其他跟header类似

#### nav 元素

nav 元素代表页面的导航链接区域。用于定义页面的主要导航部分。

```html
<nav>
    <ul>
        <li>HTML语义化</li>
        <li>CSS 语义化</li>
    </ul>
</nav>
```

侧边栏上目录、面包屑导航、搜索样式、或者下一篇上一篇文章我们可能会想要用到nav，但是事实上规范上说nav只能用在页面主要导航部分上。页脚区域中的链接列表，虽然指向不同网站的不同区域，譬如服务条款，版权页等，这些footer元素就能够用了

注意事项：

1. 用于整个页面的主要导航部分，不适合就不要用nav元素了

#### article 元素

article 代表一个在文档，页面或者网站中自成一体的内容，其目的是为了让开发者独立开发或重用。
除了它的内容，article会有一个标题(通常会在`header`里)，一个`footer`页脚。

```html
<article>
    <h1>你好，我是这边文章的标题</h1>
    <p>你好，我是文章的内容</p>
    <footer>
        <p>最终解释权归XXX所有</p>
    </footer>
</article>

```

这是一个最简单的例子，如果在article内部再嵌套article，那就代表内嵌的article是与它外部的内容有关联的，如博客文章下面的评论，如下：

```html
<article>

    <header>
        <h1>web 语义化</h1>
        <p><time pubdate datetime="2018-03-23">2018-03-23</time></p>
    </header>

    <p>文章内容..</p>

    <article>
        <h2>评论</h2>

        <article>
            <header>
                <h3>评论者: 专业水军</h3>
                <p><time pubdate datetime="2018-03-23T15:10-08:00">~1 min ago</time</p>
            </header>
            <p>还行</p>
        </article>

        <article>
            <header>
                <h3>评论者: 大水怪</h3>
                <p><time pubdate datetime="2018-03-23T15:10-08:00">~1 hour    ago</time</p>
            </header>
            <p>楼上说的对</p>
        </article>

    </article>

</article>
```

article 内部可以嵌套article，表示评论或者其他跟文章有关联的内容。article内部还可以嵌套section，如下：

```html
<article>

    <h1>web语义化</h1>
    <p>什么是语义化？</p>

    <section>
        <h2>语义化详解</h2>
        <p>语义化就是。。。</p>
    </section>

    <section>
        <h2>语义化特点</h2>
        <p>语义化特点就是。。。</p>
    </section>

</article>

```

文章内section是独立的部分，但是它们只能算是组成整体的一部分，从属关系，article是大主体，section是构成这个大主体的一个部分。

注意事项：

1. 自身独立情况下：用article
2. 是相关内容： 用section
3. 没有语义的： 用div

#### section 元素

`section` 元素代表文档中的“节”或“段”，“段”可以是指一片文章里按照主题的分段；“节”可以是指一个页面里的分组。`section`通常还带标题，虽然html5中section会自动给标题h1-h6降级，但是最好手动给他们降级。

```html
<section>
    <h1>section是啥？</h1>
    <article>
        <h2>关于section</h2>
        <p>section的介绍</p>
        <section>
            <h3>关于其他</h3>
            <p>关于其他section的介绍</p>
        </section>
    </article>
</section>
```

注意事项：

1. 一张页面可以用section划分为简介、文章条目和联系信息。不过在文章内页，最好用article。section不是一般意义上的容器元素，如果想作为样式展示和脚本的便利，可以用div。
2. 表示文档中的节或者段。
3. acticle、nav、aside可以理解为特殊的section，如果可以用article、nav、aside就不要用section，没有实际意义的就用div

#### aside元素

`aside` 元素被包含在`article`元素中作为主要内容的附属信息部分，其中的内容可以是与当前文章有关的相关资料，标签，名词解释等。
在`article`元素之外使用作为页面或站点全局的附属信息部分。最典型的是侧边栏，其中的内容可以是日志串连，其他组的导航，甚至广告，这些内容相关的页面。

```html
<article>
    <p>内容</p>
    <aside>
        <h1>作者简介</h1>
        <p>小维,哈哈哈</p>
    </aside>
</article>
```

注意事项：

1. aside 在 article 内表示主要内容的附属信息。
2. 在article之外侧可以做侧边栏，没有article与之对应，最好不用
3. 如果是广告，其他日志链接或者其他分类导航也可以用。

#### 常用语义化标签

1. `<h1>`~`<h6>`作为标题,依次递减

2. `<p>`段落标记(文字会自动换行,字母不会换行)

3. `<ul><ol><li><cl>`ul无序列表ol有序列表,ul列表多用于导航

4. `<dl><dt><dd>`表格,dl不单独用常用与dt和dd一起使用,dl定义列表dt定义名称dd表示描述

   ```html
   <dl>
     <dt>Coffee</dt>
     <dd>Black hot drink</dd>
     <dt>Milk</dt>
     <dd>White cold drink</dd>
   </dl>
   ```

5. `<em><strong>`em斜体做强调 strong做加重强调

6. `<table><thead><tbody><td><th><caption>`表格

### 不同标签的区别

#### em vs i

虽然em标签也是显示为斜体的效果，但不能说因为效果一样就使用i标签来代替em标签。因为二者表示的含义不同。

举个例子。em标签：just *do* it already! 
那么一个人或者一个软件在读这句话时，就会以强调加重的语气来读do这个单词。
对于i标签：The word the is an article。那么在这句话中斜体并没有强调的语气。只是表明the是一个article，而不是我们平时的冠词。

#### em vs strong

在HTML4中，strong一般指的是更强的强调。HTML5中strong表示的是内容的重要性。em被用来改变一个句子的含义，例如" I *love* carrots" vs " I love *carrots*"。而strong通常用来给部分句子增加重要性。例如"**Warning!**This is **very dangerous**"

#### strong vs b

strong 和 b 算是最相似的两个元素了。那么二者之间的差别。strong表示的是一种逻辑状态，而bold表示的是物理状态。逻辑状态是从内容中分离出来，以各种不同的形式来展现，可能你想标记为红色或者下划线或者其他，那么改变strong的属性比改变bold的属性更有意义。因为bold只是making bold，并不做任何重点性强调性的区分。





