#　CSS3媒介查询(media query)

## 1.媒介查询的作用

```css
@media (media-feature-name: value) {
    /* 符合条件时应用的样式 */
}
```

上面是媒体查询的基本结构，根据查看网页的设备的某些重要信息（比如屏幕大小、分辨率、颜色位深等），页面可以分别应用不同的样式甚至替换整个样式表。
如果浏览器当前的条件与圆括号中的条件匹配，它就会采用花括号中的那些样式。如果不匹配，浏览器会忽略这些样式。

## 2.媒介查询常用属性



| 特性名                                                       | 值                                                     | 应用场景                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------ |
| width  min-width  max-width                                  | 显示区域的宽度（对打印机而言是打印表面）               | 改变布局以适应非常窄（如手机）或非常宽的显示器。             |
| height  min-height  max-height                               | 显示区域的高度                                         | 改变布局以适应非常长或非常短的显示器                         |
| device-width  min-device-width  max-device-width             | 当前计算机或设备屏幕的宽度 （或打印输出时纸面的宽度）  | 根据不同设备（如手机）调整布局                               |
| device-height  min-device-height  max-device-height          | 屏幕或纸面的高度                                       | 根据不同设备（如手机）调整布局                               |
| orientation                                                  | landscape（横向）或portrait（纵向）                    | 根据设备的朝向调整布局                                       |
| device-aspect-ratio  min-device-aspect-ratio  max-device-aspect-ratio | 显示区域的宽高比（1/1是正方形）                        | 根据窗口形状调整样式（问题可能比较复杂）                     |
| color  min-color  max-color                                  | 屏幕颜色的位深 （1位表示黑白，目前主流显示器都是24位） | 检查是否支持彩色输出（比如是不是黑白打印），  或者支持的颜色数量 |

虽然有这么多媒体特性，但目前最流行最常用的是如下几个：

max-device-width：用于创建手机版网站

max-width：用于针对窗口宽度设定不同的样式

orientation：用于根据平板电脑或iPad的横向或者竖向来改变布局

## 3.识别特定的移动设备

1）检测手机

使用 

max-device-width

 可以区别普通计算机和移动设备。根据经验，将 

max-device-width

 设置为568像素就能够涵盖目前的iPhone和Android手机（不管横向还是竖向）：

```
`<``link` `rel``=``"stylesheet"` `media``=``"(max-device-width: 568px)"` `href``=``"hangge_mpbile.css"``>`
```

注意：对于高分辨率屏幕的手机上面规则也是适用的，这是由于高分屏手机引入像素比（

pixel ratio

）。

以iPhone5为例，虽然它的物理像素是：640像素*1136像素，但它的像素比是2（两个物理像素对应一个CSS像素）。因此其声明的CSS像素是：320像素*568像素。

2）检测平板

对于iPad等平板，用户经常会改变方向。改变方向虽然会改变 

max-width，但不会改变 max-device-width

。 无论竖向还是横向，iPad始终报告自己的设备宽度为768像素。

所以我们要组合使用 

max-device-width 和 orientation 

属性，以便区别iPad的方向应用不同的样式：

```
`<``link` `rel``=``"stylesheet"``    ``media``=``"(max-device-width: 768px) and (orientation: portrait)"``    ``href``=``"iPad_portrait.css"``>` `<``link` `rel``=``"stylesheet"``    ``media``=``"(max-device-width: 768px) and (orientation: landscape)"``    ``href``=``"iPad_landscape.css"``>`
```

（上面规则不仅限于iPad，其他屏幕大小类似（768像素或更小）的设备也适用）