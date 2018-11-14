# HTML5拖放(dragEvent)

拖放（Drag 和 drop）是 HTML5 标准的组成部分。

拖放是一种常见的特性，即抓取对象以后拖到另一个位置。

在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

## 拖动

### draggable

draggable属性：设置元素是否可拖动。语法：`<element draggable="true | false | auto" >`

- true: 可以拖动
- false: 禁止拖动
- auto: 跟随浏览器定义是否可以拖动

## 拖动过程的一些事件

| 针对对象     | 事件名称  | 说明                                                         |
| ------------ | --------- | ------------------------------------------------------------ |
| 被拖动的元素 | dragstart | 在元素开始被拖动时候触发                                     |
|              | drag      | 在元素被拖动时反复触发                                       |
|              | dragend   | 在拖动操作完成时触发                                         |
|              |           |                                                              |
| 目的地对象   | dragenter | 当被拖动元素进入目的地元素所占据的屏幕空间时触发,触发drop需阻止默认 |
|              | dragover  | 当被拖动元素在目的地元素内时触发，触发drop需阻止默认         |
|              | dragleave | 当被拖动元素没有放下就离开目的地元素时触发                   |
|              | drop      | 当被拖动元素在目的地元素里放下时触发，一般需要取消浏览器的默认行为。 |

dragenter和dragover事件的默认行为是拒绝接受任何被拖放的元素。因此，我们必须阻止浏览器这种默认行为。e.preventDefault();

## DataTransfer对象

与拖放操作所触发的事件同时派发的对象是DragEvent，它派生于MouseEvent，具有Event与MouseEvent对象的所有功能，并增加了dataTransfer属性。该属性用于保存拖放的数据和交互信息，返回DataTransfer对象。
// DataTransfer dataTransfer = DragEvent.dataTransfer
DataTransfer对象定义的属性和方法有很多种，我们看下列入标准的几个

| 属性                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [types](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDataTransfer%2Ftypes) | 只读属性。它返回一个我们在dragstart事件中设置的拖动数据格式的数组。 格式顺序与拖动操作中包含的数据顺序相同。IE10+、Edge、safari3.1、Firefox3.5+ 和Chrome4以上支持该属性 |
| [files](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDataTransfer%2Ffiles) | 返回拖动操作中的文件列表。包含一个在数据传输上所有可用的本地文件列表。如果拖动操作不涉及拖动文件，此属性是一个空列表。 |
| [dropEffect](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FDataTransfer%2FdropEffect) | 获取当前选定的拖放操作的类型或将操作设置为新类型。它应该始终设置成effectAllowed的可能值之一【none、move、copy、link】。dragover事件处理程序中针对放置目标来设置dropEffect。 |
| [effectAllowed](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDataTransfer%2FeffectAllowed) | 指定拖放操作所允许的效果。必须是其中之一【 none, copy, copyLink, copyMove, link, linkMove, move, all, uninitialized】默认为uninitialized 表示允许所有的效果。ondragstart处理程序中设置effectAllowed属性 |



| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [void setData(format, data)](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FDataTransfer%2FsetData) | 将拖动操作的拖动数据设置为指定的数据和类型。format可以是MIME类型 |
| [String getData(format)](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FDataTransfer%2FgetData) | 返回指定格式的数据，format与setData()中一致                  |
| [void clearData([format\])](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FDataTransfer%2FclearData) | 删除给定类型的拖动操作的数据。如果给定类型的数据不存在，此方法不执行任何操作。如果不给定参数，则删除所有类型的数据。 |
| [void setDragImage(img, xOffset, yOffset)](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDataTransfer%2FsetDragImage) | 指定一副图像，当拖动发生时，显示在光标下方。大多数情况下不用设置，因为被拖动的节点被创建成默认图片。x,y参数分别指示图像的水平、垂直偏移量 |

```html
//IE10及之前版本，不支持扩展的MIME类型名
//Firefox 5版本之前，不能正确的将url和text映射为text/uri-list 和text/plain
var dataTransfer = event.dataTransfer;
//读取文本,
var text = dataTransfer.getData("Text");
//读取URL,
var url = dataTransfer.getData("url") || dataTransfer.getData("text/uri-list");
```

## **note**



`dataTransfer.items` 只有Chrome支持

`dropzone`属性，目前没有浏览器支持

Firefox支持`.setDragImage`任何类型的DOM元素。Chrome必须有`HTMLImageElement`或者任何DOM元素，该DOM元素附加到DOM 和浏览器的`.setDragImage`视口(viewport)内。
  1.部分支持是指不支持`dataTransfer.files` 或者 `.types`对象
  2.部分支持是指不支持`.setDragImage`
  3.部分支持是指`dataTransfer.setData / getData` 的有限支持格式

`getData()`在chrome 62.0浏览器中，只能在`drop`事件中生效。

如果使用

```
setDragImage
```

方法，指定的图像不存在，则拖动过程：

1. safari 11.0.1 浏览器，只会触发`dragstart`和`dragend`事件。
2. chrome、opera 和 Firefox会正常触发其他事件。

每一次拖放操作，Firefox都会执行一次新开一个页面的动作，并且自动搜索`dataTransfer.getData()`得到的内容。
解决方法，在`drop`事件中，添加： `e.stopPropagation();// 不再派发事件。解决Firefox浏览器，打开新窗口的问题`。

opera 49版本中，链接默认不可以拖动，必须把`draggable`属性设置为`true`，才可以拖动。

关于 

```
dropEffect
```

 和 

```
effectAllowed
```

 。

1. `effectAllowed` 允许拖放操作的效果，最多不会超过那么几种。`dropEffect` 设置拖放操作的具体效果，只能是四种可能之一。
2. 如果`effectAllowed`设置为`none`，则不允许拖放元素。但是各个浏览器能触发的事件不一样。（注意：safari可以拖放元素，而且会触发所有事件）
3. 如果`dropEffect`设置为`none`，则不允许被拖放到目的地元素中。
4. 如果设置了`effectAllowed`的值，那么如果要设置`dropEffect`的值，其值必须和`effectAllowed`的值一致，否则拖动效果无效，而且不允许将被拖放元素放到目的地元素中。(注：safari11.0.1有效果，而且也能拖动到目的地元素中，但是这不符合标准)。

