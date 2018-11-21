# CSS3文字

| ext-shadow    | 4.0               | 10.0 | 3.5           | 4.0              | 9.5          |
| ------------- | ----------------- | ---- | ------------- | ---------------- | ------------ |
| box-shadow    | 10.0 4.0 -webkit- | 9.0  | 4.0 3.5 -moz- | 5.1 3.1 -webkit- | 10.5         |
| text-overflow | 4.0               | 6.0  | 7.0           | 3.1              | 11.0 9.0 -o- |
| word-wrap     | 23.0              | 5.5  | 3.5           | 6.1              | 12.1         |
| word-break    | 4.0               | 5.5  | 15.0          | 3.1              | 15.0         |

## CSS3 的文本阴影(text-shadow)

您指定了水平阴影，垂直阴影，模糊的距离，以及阴影的颜色：

```css
h1
{
    text-shadow: 5px 5px 5px #FF0000;
}
```



## CSS3 box-shadow属性

CSS3 中 CSS3 box-shadow 属性适用于盒子阴影

```css
div {
    box-shadow: 10px 10px 5px #888888;
}
```



## CSS3 Text Overflow属性

CSS3文本溢出属性指定应向用户如何显示溢出内容

```
p.test1 {
    white-space: nowrap; 
    width: 200px; 
    border: 1px solid #000000;
    overflow: hidden;
    text-overflow: clip; 
}
 
p.test2 {
    white-space: nowrap; 
    width: 200px; 
    border: 1px solid #000000;
    overflow: hidden;
    text-overflow: ellipsis; 
}
```

## CSS3 单词拆分换行

CSS3 单词拆分换行属性指定换行规则：

```css
p.test1 {
    word-break: keep-all;
}
 
p.test2 {
    word-break: break-all;
}
```

