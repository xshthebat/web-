# js数据类型

## 动态类型

JavaScript 是一种**弱类型**或者说**动态**语言。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一个变量保存不同类型的数据：

```js
var foo = 42;    // foo is a Number now
var foo = "bar"; // foo is a String now
var foo = true;  // foo is a Boolean now
```

## 数据类型

最新的 ECMAScript 标准定义了 7 种数据类型:

- 6 基本类型(栈内存)
  - Boolean
  - Null
  - Undefined
  - Number
  - String
  - Symbol
- 引用类型(堆内存) 
  - Object
  - Boolean
  - Number
  - String
  - Function
  - Array
  - Date
  - ...

### 原始值

除 Object 以外的所有类型都是不可变的（值本身无法被改变）。例如，与 C 语言不同，JavaScript 中字符串是不可变的（译注：如，JavaScript 中对字符串的操作一定返回了一个新字符串，原始字符串并没有被改变）。我们称这些类型的值为“原始值”。

基本类型的变量是存放在栈内存（Stack）里的

```js
var a,b;
a = "zyj";
b = a;
console.log(a);   // zyj
console.log(b);   // zyj
a = "呵呵";       // 改变 a 的值，并不影响 b 的值
console.log(a);   // 呵呵
console.log(b);   // zyj
```



#### 布尔类型

布尔表示一个逻辑实体，可以有两个值：`true` 和 `false`。

Boolean()函数转换规则

| 数据类型  |         转化为true         | 转化为false  |
| :-------: | :------------------------: | :----------: |
|  Boolean  |            true            |    false     |
|  String   |       任何非空字符串       | ""(空字符串) |
|  Number   | 任何非零数字值(包括无穷大) |    0和NaN    |
|  Object   |          任何对象          |     null     |
|  Symbol   |         任何Symbol         |    不适用    |
| Undefined |           不适用           |  Undefined   |

#### NUll类型

Null 类型只有一个值： `null`

```js
null == undefined //true
```



#### Undefined类型

一个没有被赋值的变量会有个默认值 `undefined`

void求值然后返回undefined 会触发get操作和delete不同



void 0和undefined区别联系 void 是不能被重写的（cannot be overidden）

- 通过采用`void 0`取`undefined`比采用字面上的`undefined`更靠谱更安全，应该优先采用`void 0`这种方式。 undefined非保留字 可以作为全局变量使用
- 填充`<a>`的`href`确保点击时不会产生页面跳转; 填充`<image>`的`src`，确保不会向服务器发出垃圾请求。

#### 数字类型

8进制数在严格模式下会报错 

 根据 ECMAScript 标准，JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值（-(263 -1) 到 263 -1）。**它并没有为整数给出一种特定的类型**。除了能够表示浮点数外，还有一些带符号的值：`+Infinity`，`-Infinity` 和 `NaN` (非数值，Not-a-Number)。最大为1.797693148623157e+308为5e-324可以使用isFinite()函数判断是否在区间内

要检查值是否大于或小于 `+/-Infinity`，你可以使用常量 [`Number.MAX_VALUE`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE) 和 [`Number.MIN_VALUE`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE)。另外在 ECMAScript 6 中，你也可以通过 [`Number.isSafeInteger()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) 方法还有 [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) 和 [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) 来检查值是否在双精度浮点数的取值范围内。因此 JS 中能精准表示的最大整数是 Math.pow(2, 53), 超出这个范围，JavaScript 中的数字不再安全了，也就是只有 second mathematical interger 可以在 JavaScript 数字类型中正确表现。

数字类型只有一个整数，它有两种表示方法： 0 可表示为 -0 和 +0（"0" 是 +0 的简写）。 在实践中，这也几乎没有影响。 例如 `+0 === -0` 为真。 但是，你可能要注意除以0的时候：

```js
42 / +0; // Infinity
42 / -0; // -Infinity
```

- 浮点数精度问题，比如 `0.1 + 0.2 !== 0.3`
- 大数精度问题，比如 `9999 9999 9999 9999 == 1000 0000 0000 0000 1`
- toFixed 四舍五入结果不准确，比如 `1.335.toFixed(2) == 1.33`

0.1的二进制格式是：0.0001100011....。这是一个**二进制无限循环小数**，但计算机内存有限,会在某个精度点直接舍弃0.1在计算机内部根本就不是精确的0.1，而是一个有**舍入误差**的0.1故浮点数精度和toFixed四舍五入结果问题 而大数进度 则是其超过 [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]精度范围

##### 解决思路

首先考虑的是如何解决浮点数运算的精度问题，有 3 种思路：

- 虑到每次浮点数运算的偏差非常小(其实不然)，可以对结果进行指定精度的四舍五入，比如可以`parseFloat(result.toFixed(12))`;
- 将浮点数转为整数运算，再对结果做除法。比如0.1 + 0.2，可以转化为`(1*2)/3`。
- 把浮点数转化为字符串，模拟实际运算的过程。

先来看第一种方案，在大多数情况下，它可以得到正确结果，但是对一些极端情况，toFixed 到 12 是不够的，比如：

```js
210000 * 10000  * 1000 * 8.2    // 17219999999999.998
parseFloat(17219999999999.998.toFixed(12));    // 17219999999999.998，而正确结果为 17220000000000
```

上面的情况，如果想让结果正确，需要 `toFixed(2)`，这显然是不可接受的。

再看第二种方案，比如 [number-precision](https://github.com/nefe/number-precision) 这个库就是使用的这种方案，但是这也是有问题的，比如：

```js
// 这两个浮点数，转化为整数之后，相乘的结果已经超过了 MAX_SAFE_INTEGER
123456.789 * 123456.789     // 转化为 (123456789 * 123456789)/1000000，结果是 15241578750.19052
```

所以，最终考虑使用第三种方案，目前已经有了很多较为成熟的库，比如 [bignumber.js](https://github.com/MikeMcl/bignumber.js)，[decimal.js](https://github.com/MikeMcl/decimal.js)，以及[big.js](https://github.com/MikeMcl/big.js)等。我们可以根据自己的需求来选择对应的工具。并且，这些库不仅解决了浮点数的运算精度问题，还支持了大数运算，并且修复了原生toFixed结果不准确的问题。

NaN NaN不等于任何数包括其本身 可用isNaN()函数来判断NaN

parseInt('数字','进制');数字前若有0x默认为16进制,0开头为8进制,其余默认10进制

若指定了第二个参数,则不需要带前缀,parseFloat浮点数

Number函数转换

- 如果是Boolean的值,ture和false分别对应1和0
- 如果数字是数字,则直接返回
- 如果是null,则返回0
- 若为字符串
  - 如果包含数字,包括前面正负,则将其转换为十进制"011"变为11
  - 若为浮点数"1.1"则转换为对应浮点数
  - 若包含十六进制"0x"将其转换相同大小的十进制整数值
  - 若为空字符串""则转换为0
  - 如果字符串包含除以上之外,则转换NaN
- 如果是对象,则调用对象的valueOf()方法,然后依照前面的规则转换后的值,若仍不为原始类型,则调用对象toString(),然后同上。若toString被重写则报错

```
var num1 = Number("Hello world"); //NaN
var num2 = Number(""); //0
var num3 = Number("000011"); //11
var num4 = Number("true"); //1
```



#### 字符串类型

JavaScript的字符串类型用于表示文本数据。它是一组16位的无符号整数值的“元素”。在字符串中的每个元素占据了字符串的位置。第一个元素的索引为0，下一个是索引1，依此类推。字符串的长度是它的元素的数量。

不同于类 C 语言，JavaScript 字符串是不可更改的。这意味着字符串一旦被创建，就不能被修改。但是，可以基于对原始字符串的操作来创建新的字符串。

String方法

- 如果值有toString()方法,则调用该方法(不带参数)并返回相应结果
- 如果值是null,则返回null
- 如果undefined,则返回undefined

#### Symbol

Symbol值不能与其他类型的值进行运算

该`Symbol()`函数返回一个类型为**symbol**的值，具有暴露内置对象的几个成员的静态属性，具有公开全局符号注册表的静态方法，类似于内置对象类但作为构造函数不完整，因为它不是支持语法“ `new Symbol()`”。  

返回的每个符号值`Symbol()`都是唯一的。符号值可以用作对象属性的标识符; 这是数据类型的唯一目的。

```js
const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');

console.log(typeof symbol1);
// expected output: "symbol"

console.log(symbol3.toString());
// expected output: "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo'));
// expected output: false

```

使用该`Symbol()`函数的上述语法不会创建整个代码库中可用的全局符号。要创建跨文件甚至跨域（每个域都有自己的全局范围）可用的符号，请使用这些方法[`Symbol.for()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for)并[`Symbol.keyFor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor)从全局符号注册表中设置和检索符号

`**Symbol.for(key)**`方法使用给定键在运行时范围的符号注册表中搜索现有符号，如果找到则返回它。否则，使用此密钥在全局符号注册表中创建新符号

```js
console.log(Symbol.for('bar') === Symbol.for('bar'));
// expected output: true

console.log(Symbol('bar') === Symbol('bar'));
// expected output: false

const symbol1 = Symbol.for('foo');

console.log(symbol1.toString());
// expected output: "Symbol(foo)"
```

该`Symbol.keyFor(sym)`方法从给定符号的全局符号注册表中检索共享符号密钥。

```js
const globalSym = Symbol.for('foo'); // global symbol

console.log(Symbol.keyFor(globalSym));
// expected output: "foo"

const localSym = Symbol(); // local symbol

console.log(Symbol.keyFor(localSym));
// expected output: undefined

console.log(Symbol.keyFor(Symbol.iterator));
// expected output: undefined
```

用法

```js
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

Symbol值作为属性名时，该属性还是公开属性，不是私有属性。

但是这里的Symbol在类外部也是可以访问的，只是不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`返回。但有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有Symbol**属性名**

### 引用对象

#### Object

**Object** 构造函数创建一个对象包装器。

```js
// 对象初始化器（Object initialiser）或对象字面量（literal）
{[nameValuePair1[, nameValuePair2[, ...nameValuePairN]]]} 

// 以构造函数形式来调用
new Object([value])
```



`Object`构造函数为给定值创建一个对象包装器。如果给定值是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，将会创建并返回一个空对象，否则，将返回一个与给定值对应类型的对象。

当以非构造函数形式被调用时，`Object` 等同于 `new Object()`。



