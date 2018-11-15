# css选择器优先级

## 样式优先级原则



> 总的原则
> 1.CSS规定拥有更高确定度的选择器优先级更高
> 2.如果样式中包含冲突的规则，且它们具有相同的确定度。那么，后出现的规则优先级高。

**优先级：由高到低**(从上到下)

- !important(js无法修改)

1、IE6及更早浏览器下，`!important`在同一条规则集内不生效。
 2、如果`!important`被用于一个简写的样式属性，那么这条简写的样式属性所代表的子属性都会被作用上`!important`。
 3、关键字`!important`必须放在一行样式的末尾并且要放在该行分号前，否则就没有效果。

- 内联(1,0,0,0)
- id: (0,1,0,0)
- 类：(0,0,1,0)
- 伪类/属性
- 元素：(0,0,0,1)
- 通配符



- 每个选择器都有权值，权值越大越优先
- 继承的样式优先级低于自身指定样式
- ！important优先级最高 js也无法修改
- 权值相同时，靠近元素的样式优先级高 顺序为内联样式表（标签内部）> 内部样式表（当前文件中）> 外部样式表（外部文件中）

# CSS选择器的权重(选择器横向)

共分为4个等级：

第一等：代表内联样式，如: style="xxx"，权值为**1000**。

第二等：代表ID选择器，如：#content，权值为**100**。

第三等：代表类，伪类和属性选择器，如.content，:hover，[attribute]，权值为**10**。

第四等：代表元素选择器和伪元素选择器，如div，p，权值为**1**。

注意：通用选择器（*），子选择器（>）和相邻同胞选择器（+）并不在这四个等级中，所以他们的权值都为0。

![](/home/xsh/桌面/markdown/imgs/1666407-84d2ed9a8c9f7542.webp)



自己拿些例子，下面是一段HTML代码的CSS样式，知道最后h2标签是什么颜色吗？



```css
#content div#main-content h2{
    color:red;
}
//    100(#content) + 1(div) + 1000(#main-content) + 1(h2) = 202
```

```css
#content #main-content>h2 {
    color:blue
}
//    100(#content) + 1000(#main-content) + 1(h2) = 201
```

```css
body #content div[id="main-content"] h2 {
    color:green;
}
//    1(body) + 100(#content) + 1(div) + 10([id="main-content"]) + 1(h2) = 113
```

```css
#main-content div.paragraph h2 {
    color:orange;
}
// 100(#main-content) + 1(div) + 10(.paragraph) + 1(h2) = 112
```

```css
#main-content [class="paragraph"] h2 {
    color:yellow;
}
// 100(#main-content) + 10(class="paragraph") + 1(h2) = 111
```

```css
div#main-content div.paragraph h2.first {
    color:pink;
}
// 1(div) + 100(#main-content) + 1(div) + 10(.paragraph) + 1(h2) + 10(.first) = 123
```

这里是HTML代码：

```css
<div id="content">
            <div id="main-content">
                <h2>CSS简介</h2>
                <p>CSS（Cascading Style Sheet，可译为“层叠样式表”或“级联样式表”）是一组格式设置规则，用于控制Web页面的外观。</p>
                <div class="paragraph">
                    <h2 class="first">使用CSS布局的优点</h2>
                    <p>1、表现和内容相分离 2、提高页面浏览速度 3、易于维护和改版 4、使用CSS布局更符合现在的W3C标准.</p>
                </div>
            </div>
        </div>
```

Red