## 问题一栏

 如何判断一个变量是否为数组

数组的原生方法有哪些？

如何将一个类数组变量转化为数组？

说一说ES6中对于数组有哪些扩展

数组去重，你能说出多少种方法？

你知道Array.prototype的类型是什么吗？

如何“打平”一个嵌套数组，如[1,[2,[3]],4,[5]] => [1,2,3,4,5]?你能说出多少种方法？

如何克隆一个数组？你能说出多少种？

说一说Array.prototype.sort()方法的原理？（追问：不传递参数会如何？）

找出Array中的最大元素，你能说出几种方法？

## 如何判断一个变量是否为数组?(Object,isArray,instanceof,Contructor)

1.利用Object的toString方法

```js
Object.prototype.toString.call(list);    //[object Array]
```

2.利用ES6的Array.isArray()方法

```js
var list = [1,2,3];
Array.isArray(list);    //true
```

## 数组的原生方法有哪些？

**会改变自身的方法**

[Array.prototype.copyWithin()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) 在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。

[Array.prototype.fill()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) 将数组中指定区间的所有元素的值，都替换成某个固定的值。

[Array.prototype.pop()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)删除数组的最后一个元素，并返回这个元素。

[Array.prototype.push()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)在数组的末尾增加一个或多个元素，并返回数组的新长度。

[Array.prototype.reverse()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。

[Array.prototype.shift()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)删除数组的第一个元素，并返回这个元素。

[Array.prototype.sort()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)对数组元素进行排序，并返回当前数组。

[Array.prototype.splice()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)在任意的位置给数组添加或删除任意个元素。

[Array.prototype.unshift()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)在数组的开头增加一个或多个元素，并返回数组的新长度。



**不会改变自身的方法**

[Array.prototype.concat()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。

[Array.prototype.includes()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) 判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。

[Array.prototype.join()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)连接所有数组元素组成一个字符串。

[Array.prototype.slice()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)抽取当前数组中的一段元素组合成一个新数组。

[Array.prototype.toSource()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSource) 返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 [Object.prototype.toSource()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toSource) 方法。

[Array.prototype.toString()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 [Object.prototype.toString()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

[Array.prototype.toLocaleString()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 [Object.prototype.toLocaleString()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString) 方法。

[Array.prototype.indexOf()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

[Array.prototype.lastIndexOf()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。



**\*遍历方法***

[Array.prototype.forEach()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)为数组中的每个元素执行一次回调函数。

[Array.prototype.entries()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

[Array.prototype.every()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。

[Array.prototype.some()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

[Array.prototype.filter()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。

[Array.prototype.find()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。

[Array.prototype.findIndex()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。

[Array.prototype.keys()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys) 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。

[Array.prototype.map()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)返回一个由回调函数的返回值组成的新数组。

[Array.prototype.reduce()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

[Array.prototype.reduceRight()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

[Array.prototype.values()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values) 返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。

[Array.prototype[@@iterator]()](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/%40%40iterator) 和上面的 values() 方法是同一个函数。

## 将类数组转化为数组(Array.from,Array.clice)

```js
Array.from()
```

```js
Array.prototype.slice.call
```

```js
...
```

## 数组去重，你能说出多少种方法？(空object,weakmap,set结构)

1.利用一个空Object来实现

```js
Array.prototype.unique = function(){
	var tmp = {},res=[];
	this.forEach(function(i){
		!tmp[i] && res.push(i) && (tmp[i] = true);
	})
	return res;
}
var list = [0,0,1,2,3,6,6];
console.log(list.unique());    //[0,1,2,3,6]
```

2.利用ES6 的Set数据结构

```js
console.log([...new Set(list)]);    //[0,1,2,3,6]
```

3.weekmap

## 你知道Array.prototype的类型是什么吗？(数组)

很多人都不知道，其实Array.prototype是一个数组，只不过length为0

## 如何“打平”一个嵌套数组，如[1,[2,[3]],4,[5]] => [1,2,3,4,5]?你能说出多少种方法？(递归)

1.利用Array.prototype.toString()方法

```js
var list = [1,[2,[3]],4,[5]];
console.log(list.toString());    //1,2,3,4,5
```

原理：toString 方法返回一个字符串，该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成　内部必须都为数字

2.利用Array.prototype.join()方法

```js
var list = [1,[2,[3]],4,[5]];
console.log(list.join());    //1,2,3,4,5
```

原理：join方法会让所有的数组元素转换成字符串，再用一个分隔符将这些字符串连接起来。如果元素是undefined 或者null， 则会转化成空字符串。

PS:如果你觉得上面输出的不是一个数组，可以稍微加工一下

## 如何克隆一个数组？你能说出多少种？(简单concat,slice,浅赋值),深需要深拷贝



1.借用concat方法

```js
var arr1 = [1,2,3];
var arr2 = arr1.concat();
```

2.借用slice方法

```js
var arr1 = [1,2,3];
var arr2 = arr1.slice(0);
```

3.Object.assign

```js
let arr1 = [1,2,3];
let arr2 = Object.assign([],arr1);
console.log(arr2===arr1);
```

## 说一说Array.prototype.sort()方法的原理？（追问：不传递参数会如何？）

sort方法接受一个“比较函数”作为参数。

**如果调用该方法时没有使用参数**，将按字母顺序对数组中的元素进行排序，说得更精确点，是**按照字符编码的顺序进行排序**。要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。

## 找出Array中的最大元素，你能说出几种方法？Math.max.apply(null, list);    //[1, 2, 9, 23, 43, 65, 100]

１.排序

２．Math.max