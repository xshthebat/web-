# js强制类型转换

具体代码例子

```js
//++ --
let num = "11";
console.log(typeof num--, num); //str->number 10 将数字字符串转为数字
num = "11-";
console.log(typeof num--, num); //str->number NaN 将非数字字符串转为NaN
num = false;
console.log(typeof num--, num);//boolen->number 0 将布尔false转0
num = true;
console.log(typeof num--, num);//boolen->number 0 将布尔ture转1
num = {
    valueOf: () => {
        return '0123';
    }
}
console.log(typeof num--, num);//对象先调用valueOf,然后再调用toString()

//布尔操作! 
let bo = { xxx: 'dssa' };
console.log(Boolean(bo), typeof Boolean(bo));
console.log(!bo, typeof !bo); //{}->boolean 都为false
//转换规则和Ｂoolean函数相同
//逻辑操作　&&
let obj1 = {};
console.log(obj1 && false);//若第一个是对象　直接返回第二个值
console.log(false && (function () { console.log('1') })()); //若第一个为false返回false
console.log(true && 'sadas');//若第一个为true则返回第二个值　同对象
console.log(null && 'asdasd');//若第一个为null返回null 
console.log(NaN && 'asdas'); //若第一个为ＮａＮ返回NaN
console.log(undefined && 'dasdad');//若第一个是undefined返回undefined
//短路操作,若第一个能够决定结果就不会对第二个操作数求值
//逻辑　||
console.log({} || 'asdsad');//若第一个是对象,直接返回对象;
console.log(false || 'sdada');//若第一个值为false,直接返回第二个对象
console.log(null || null);//返回null
console.log(NaN || NaN);//返回NaN
console.log(undefined || undefined);//返回undefined;
//短路操作,若第一个能决定结果就不会对第二个操作数求值;


//乘性操作符
console.log(1 * -1); //若两值都为数值,正常运算,若超过范围则为　Infinity ,如果只有一个有符号
console.log(NaN * 123);//若有一个NaN结果都是NaN
console.log(Infinity * 0);//NaN
console.log(Infinity * 123);//Infinity
console.log(Infinity * Infinity);//Infinity
let num1 = {
    valueOf: () => {
        return this;
    },
    toString:()=>{
        return '3';
    }
}
console.log(num1*num1); //若非数值先调用Number()函数转化为数值

//除性操作符
console.log(+1/1);//若两值都为数值,正常运算,若超过范围则为　Infinity ,如果只有一个有符号
console.log(123/NaN,NaN/213,NaN/NaN); //若含有一个就为NaN
console.log(Infinity/-Infinity,Infinity/Infinity);//NaN
console.log(Infinity/0,12312/0,-Infinity/0);//Infinity
console.log(Infinity/1,Infinity/-1);//＋－Infinity
console.log(num1/num1);//若不是数值,则调用Number()
console.log(NaN%NaN,23132%NaN,NaN%123321,Infinity%Infinity);//%类似于/

//＋

console.log(123+NaN,NaN+NaN,NaN+Infinity); //有一个NaN就是NaN
console.log(Infinity+Infinity,Infinity+-Infinity,Infinity+123,-Infinity+-Infinity); //Infinity NaN Infinity -Infinity
console.log(+0+(+0),-0+-0,+0+-0) // 0 -0 0
//若有一个是字符串
console.log('sadsa'+'asdas'); //若两者都是字符串则直接拼接
console.log('1231'+'sada'); //若一个是,则将另一个转换为string
console.log({toString:()=>{  return 'sada' }}+'213',undefined+'123',[]+'1231',null+'asdsad'); //对象调用toString方法然后同上
//减法同上　不过是对字符串调用　Number();
//对象则先调用　valueOf,若没有则调用toString在转化为数字;
console.log(num1-num1);


//关系操作符
console.log(1<2); //数值直接比较
console.log('ac'<'ab');//比较字符编码值
console.log(1<'adas',1<NaN);//若一个是数字,则将另一个转化为数字　任何数和NaN比较都是NaN
//若一个是对象,则调用valueOf,若不是数字,则调用toString转化为数字
console.log(false<true); //bool值转为数字

//相等操作符　==(会发生强制转换)　值的比较
console.log(true==1);// 若有一个布尔值,比较前讲true转化为１,false为０
console.log('1'==1); //若有一个字符串,先将其转换为数字再比较
console.log(null==undefined);//对象比较调用valueOf再按之前比较
console.log(NaN==NaN);//若有一个NaN就是false
//若两个都是对象,则比较他们指向;
let obj2 = {
    valueOf:()=>{
        console.log('haha');
        return 1;
    }
};
let obj3 = obj2
console.log(obj2==1); //true
console.log(obj2==obj3); //true
console.log(Math.max());
```

## 对象转基本值(共性)



１．对象转字符串



![](/home/xsh/桌面/markdown/imgs/164c55d1f00870e9 (2).png)

```js
// 模拟 toString 返回的不是基本类型值
var obj = {
    toString: function() {
        return {}
    }
}
var obj = {
    toString: function() {
        return {}
    },
    valueOf:function(){
        return null
    }
}
var obj = {
    toString: function() {
        return {}
    },
    valueOf:function(){
        return {}
    }
}

String(obj)   // Uncaught TypeError: Cannot convert object to primitive value
String(obj)   // "null"
String(obj)  // Uncaught TypeError: Cannot convert object to primitive value
```

2.对象转数字

和转换为字符串流程差不多，区别在于转换为数字先判断 valueOf 方法，再判断 toString 方法。

```js
var obj = {
    valueOf:function(){
        return null
    },
    toString:function(){
        return 1
    }
}

Number(obj)  // 0
var obj = {
    valueOf:function(){
        return {}
    },
    toString:function(){
        return {}
    }
}
Object.create(null) 创建的对象没有 valueOf 和 toString 方法，因此转换时会报错

Number(obj)  // Uncaught TypeError: Cannot convert object to primitive value
```

## 显式强制类型转换

### 转换为字符串

如果对象有自定义 toString 方法，则返回自定义 toString 方法的结果，但是如果 toString 返回的不是基本类型值，转换时会报错

```js
var obj = {
    toString:function(){
        return {}
    }
}

String(obj) // Uncaught TypeError: Cannot convert object to primitive value

obj + ""   // Uncaught TypeError: Cannot convert object to primitive value

obj.toString()  // {}
```

数组的 toString 方法经过了重新定义。

```js
String( [] ) // ''
String( [null] )  // ''
String( [null, null] )  // ','
String( [undefined] ) // ''
String( [undefined, undefined] ) // ','
String( [{}] ) // '[object Object]' 
String( [{toString:function(){return 1}}] ) // '1' 
```

### 转换为布尔类型

假值有限，因此只要记住所有的假值情况，那么其它的就是真值。

```js
null undefined false +0 -0 NaN ""
```

### 转换为数字类型

```
Number('')    // 0
Number(null)  // 0
Number(undefined)  // NaN
Number(true)  // 1
Number(false)  // 0
```

对象会首先被转换为相应的基本类型值，再进行转换。

```js
Number([])  // 0
```

## 隐式强制类型转换

![](/home/xsh/桌面/markdown/imgs/165124228d0924e7.png)

### 转换为字符串

如果 + 的其中一个操作数是字符串，那么执行字符串拼接操作。因此常用`x + ""` 将 x 转换为字符串。

对象和字符串拼接时，对象转为基本类型值按**转为数字**进行转换，也就是按上面的“对象要被转换为数字”流程进行转换，即先判断 valueOf，再判断 toString

```js
var obj = {
    valueOf: function() {
        return 1
    },
    toString: function() {
        return 2
    }
}

obj + ''  // '1'
```

### 转换为布尔值

下面的情况会发生布尔值隐式强制类型转换。

1. if (..)语句中的条件判断表达式
2. for ( .. ; .. ; .. )语句中的条件判断表达式（第二个）。
3. while (..)和do..while(..)循环中的条件判断表达式。
4. ? :中的条件判断表达式。
5. 逻辑运算符 ||（逻辑或）和 &&（逻辑与）左边的操作数（作为条件判断表达式）

### 转换为数字类型

```js
+ '2'  // 2
'2' - 0  // 2
'2' / 1   // 2
'2' * 1   // 2


+ 'x'  // NaN
'x' - 0 // NaN
'x' / 1 // NaN
'x' * 1  // NaN

1 + '2'  // '12'
1 + + '2'  // 3    即：1 + (+ '2')
```

## == 和 ===

对于两者区别最正确的解释：== 允许在相等比较中进行强制类型转换，而 === 不允许。

## == 比较

### 1、字符串和数字之间的相等比较

字符串先转换为数字，然后再比较。

### 2、其他类型和布尔类型之间的相等比较

布尔类型转换为数字，再进行比较。

### 3、对象和非对象之间的相等比较

对象转换成基本类型值，再进行比较。对象转换优先级最高。

### 4、null 和 undefined

`null == undefined`， 其他类型和 null 均不相等，undefined 也是如此。

### 5、特殊情况

```
NaN == NaN  // false
-0  == +0   // true
```

两个对象比较，判断的是两个对象是否指向同一个值。

## 抽象关系比较

关系比较都会转换为 a < b 进行比较，a > b 会被转换成 b < a，a <= b 会被转换成 !(b<a)，a >= b 转换为 !(a<b)

### 比较规则

1. 比较双方首先转换为基本类型；
2. 若有一方不是字符串，则将其转换为数字再进行比较；
3. 若有一方是 NaN，结果总是 false。

```js
null >= 0 // true
null <= 0 // true
null == 0 // flase
```

## 补充

toString 相关

![](/home/xsh/桌面/markdown/imgs/165124228d44d25a.png)



valueOf 相关

![](/home/xsh/桌面/markdown/imgs/165124228d44d25a.png)



## 实战分析

１．`[]+[] // ""`

1. 首先运算符是 + 运算符而且很明显是二元运算符，并且有对象，所以选择最后一点，操作数是对象，将对象转换为原始值。
2. 两边对象都是数组，左边的数组先调用 valueOf() 方法无果，然后去调用 toString(), 方法，在 toString() 的转化规则里面有『将数组转化为字符串，用逗号分隔』，由于没有其他元素，所以直接是空字符串 “”
3. 因为加号有一边是字符串了，所以另外一边也转为 字符串，所以两边都是空字符串 “”
4. 所以加起来也是空字符串 “”

2.`(! + [] + [] + ![]).length // 9`

1.首先我们会看到挺多一元运算符，「+」、「！」，对于一元运算符是右结合性，所以可以画出以下运算顺序。



![](/home/xsh/桌面/markdown/imgs/165124228d95abe2.png)



2. 对于`+[]`，数组是会被转化为数字的而不是字符串，可见「+ 运算符如何进行类型转化」的第一条，所以经过第一步就会转化为

(!0 + [] + "false").length

3. 第二步比较简单，0 转化为布尔值就是 false，所以经过第二步就转化为

(true + [] + "false").length

\4. 第三步中间的 `[]`会转为空字符串，在「+ 运算符如何进行类型转化」第二条的第三点，对象会被转转化为原始值，就是空字符，所以经过第三步之后就会变成

```js
("true" + "false").length
```

第五步就比较简单啦，最终就是

"truefalse".length // 9

## 附录

![](/home/xsh/桌面/markdown/imgs/16512422ae143ecc.png)

