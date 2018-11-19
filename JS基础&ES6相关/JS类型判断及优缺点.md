

# JS类型判断及优缺点

## typeof

typeof 能检测出六种类型的值

```js
Undefined、Null、Boolean、Number、String、Symbol、Object
undefined、object、boolean、number、string、Symbol、object
```

只能检测undefined,boolean,number,string,Symbol(基本类型)

除了NULL和Object(及其他引用对象)都无法通过typeof检测

## Object.prototype.toString

当 toString 方法被调用的时候，下面的步骤会被执行：

1. 如果 this 值是 undefined，就返回 [object Undefined]
2. 如果 this 的值是 null，就返回 [object Null]
3. 让 O 成为 ToObject(this) 的结果
4. 让 class 成为 O 的内部属性[[NativeBrand]] 的值,让*tag*成为表中的值
5. 最后返回由 "[object " 和 class 和 "]" 三个部分组成的字符串

[[Class]]是一个内部属性,所有的对象(原生对象和宿主对象)都拥有该属性.在规范中,[[Class]]是这么定义的

[ES6](http://people.mozilla.org/~jorendorff/es6-draft.html)目前还只是工作草案,但能够肯定的是,**[[class]]内部属性没有了**,取而代之的是另外一个内部属性[[NativeBrand]].[[NativeBrand]]属性是这么定义的:

[[NativeBrand]]内部属性用来识别某个原生对象是否为符合本规范的某一种特定类型的对象.[[NativeBrand]]内部属性的值为下面这些枚举类型的值中的一个:NativeFunction, NativeArray, StringWrapper, BooleanWrapper, NumberWrapper, NativeMath, NativeDate, NativeRegExp, NativeError, NativeJSON, NativeArguments, NativePrivateName.[[NativeBrand]]内部属性仅用来区分区分特定类型的ECMAScript原生对象.只有在表10中明确指出的对象类型才有[[NativeBrand]]内部属性.可见,和[[class]]不同的是,并不是每个对象都拥有[[NativeBrand]].

通过规范，我们至少知道了调用 Object.prototype.toString 会返回一个由 "[object " 和 class 和 "]" 组成的字符串，而 class 是要判断的对象的内部属性

```js
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) // [object Null]

var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]
```

故能检测出一下14种

```js

var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)

console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

function a() {
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
a();
console.log(Object.prototype.toString.call(Symbol('1231'))); // [object Symbol]
console.log(Object.prototype.toString.call(new Promise(function(res,res){
    res();
}))) //[object Promise]
```

作为通用的判断所有数据(基本类型和对象类型)类型的方法，稍微调整一下以便该方法对基本类型数据的行为与typeof保持一致(对null的处理不一致，但是显然这里更符合预期)且能对非用户自定义对象类型输出精确类型描述：

```js
function type(o) {
	var show = Object.prototype.toString.call(o);
	return show.substring(8,show.length - 1).toLowerCase();
}
```

缺点:不支持用户自定义对象

优点:内置对象支持良好

## instanceof

```js
function Aaa(){
}

var a1 = new Aaa();

//alert( a1 instanceof Aaa);  //true判断a1和Aaa是否在同一个原型链上，是的话返回真，否则返回假

    var arr = [];
    alert( arr instanceof Aaa);//false
    var str = 'hello';
    alert(str instanceof String);//false
    var bool = true;
    alert(bool instanceof Boolean);//false
    var num = 123;
    alert(num instanceof Number);//false
    var nul = null;
    alert(nul instanceof Object);//false
    var und = undefined;
    alert(und instanceof Object);//false
    var oDate = new Date();
    alert(oDate instanceof Date);//true
    var json = {};
    alert(json instanceof Object);//true
    var arr = [];
    alert(arr instanceof Array);//true
    var reg = /a/;
    alert(reg instanceof RegExp);//true
    var fun = function(){};
    alert(fun instanceof Function);//true
    var error = new Error();
    alert(error instanceof Error);//true
```

基本数据类型是没有检测出他们的类型

缺点不能检测基本类型　优点能检测自制对象

## constructor

```js
Aaa.prototype.constructor = Aaa
  var str = 'hello';
    alert(str.constructor == String);//true
    var bool = true;
    alert(bool.constructor == Boolean);//true
    var num = 123;
    alert(num.constructor ==Number);//true
   // var nul = null;
   // alert(nul.constructor == Object);//报错
    //var und = undefined;
    //alert(und.constructor == Object);//报错
    var oDate = new Date();
    alert(oDate.constructor == Date);//true
    var json = {};
    alert(json.constructor == Object);//true
    var arr = [];
    alert(arr.constructor == Array);//true
    var reg = /a/;
    alert(reg.constructor == RegExp);//true
    var fun = function(){};
    alert(fun.constructor ==Function);//true
    var error = new Error();
    alert(error.constructor == Error);//true
```

从上面的测试中我们可以看到，undefined和null是不能够判断出类型的，并且会报错。因为null和undefined是无效的对象，因此是不会有constructor存在的

同时我们也需要注意到的是：使用constructor是不保险的，因为constructor属性是可以被修改的，会导致检测出的结果不正确

| 不同类型的优缺点 | typeof                       | instanceof                         | constructor                                 | Object.prototype.toString.call   |
| ---------------- | ---------------------------- | ---------------------------------- | ------------------------------------------- | -------------------------------- |
| 缺点             | 只能检测出基本类型（除null） | 不能检测出基本类型，且不能跨iframe | constructor易被修改，也不能跨iframe         | IE6下，undefined和null均为Object |
| 优点             | 使用简单                     | 能检测出引用类型                   | 基本能检测所有的类型（除了null和undefined） | 检测出所有的类型                 |

## 附录

#### 判断纯对象

```js
// 上节中写 type 函数时，用来存放 toString 映射结果的对象
var class2type = {};

// 相当于 Object.prototype.toString
var toString = class2type.toString;

// 相当于 Object.prototype.hasOwnProperty
var hasOwn = class2type.hasOwnProperty;

function isPlainObject(obj) {
    var proto, Ctor;

    // 排除掉明显不是obj的以及一些宿主对象如Window
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }

    /**
     * getPrototypeOf es5 方法，获取 obj 的原型
     * 以 new Object 创建的对象为例的话
     * obj.__proto__ === Object.prototype
     */
    proto = Object.getPrototypeOf(obj);

    // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
    if (!proto) {
        return true;
    }

    /**
     * 以下判断通过 new Object 方式创建的对象
     * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
     * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
     */
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;

    // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
    return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}
```

```js
console.log(hasOwn.toString.call(Ctor)); // function Object() { [native code] }
console.log(Object.prototype.toString.call(Ctor)); // [object Function]
```

Function.prototype.toString 

1.判断对象是否为null或者undefined和内置对象

2.获取对象原型getPrototypeOf

3.判断构造函数类型以及和原生构造函数代码比较

#### 判断空对象,但不能表示其是对象

```js
function isEmptyObject( obj ) {

        var name;

        for ( name in obj ) {
            return false;
        }

        return true;
}
```

其实所谓的 isEmptyObject 就是判断是否有属性，for 循环一旦执行，就说明有属性，有属性就会返回 false。

#### Window对象(等内置bom,localtion)

```js
function isWindow( obj ) {
    return obj != null && obj === obj.window;
}
```

#### 判断类数组

```js
function isArrayLike(obj) {

    // obj 必须有 length属性
    var length = !!obj && "length" in obj && obj.length;
    var typeRes = type(obj);

    // 排除掉函数和 Window 对象
    if (typeRes === "function" || isWindow(obj)) {
        return false;
    }

    return typeRes === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
} //缺少最大长度判断

//var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

//var isArrayLike = function(collection) {
  //  var length = getLength(collection);
    //return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
//};
```

所以如果 isArrayLike 返回true，至少要满足三个条件之一：

1. 是数组
2. 长度为 0
3. lengths 属性是大于 0 的数字类型，并且obj[length - 1]仅仅要求最后一个元素必须存在

#### isElement(判断dom)

```js
isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
};
```



#### 遍历对象属性

##### Object.keys()(遍历自身可枚举的属性 (可枚举，非继承属性)不含symbol )

1. 在javascript中对象的属性分为可枚举与不可枚举之分,他们是由属性的 **enumerable** 的值决定的。可枚举性
   决定了这个属性是否可以被 **for-in** 遍历到。
2. javascript的对象一般都处于原型链中，它会从上层原型对象上继承一些属性

根据这两点特性，我们可以分为 **4** 种情况来遍历javascript对象属性

> 1.遍历自身可枚举的属性 (可枚举，非继承属性) **Object.keys()** 方法

该方法会返回一个由一个给定**对象**的自身可枚举属性组成的**数组**，数组中的属性名的排列顺序和使用**for..in**遍历该对象时返回的顺序一致（两者的区别是 **for ..in**还会枚举其原型链上的属性 ）

```js
/**Array 对象**/
var arr = ['a','b','c'];
console.log(Object.keys(arr));  
// ['0','1','2']

/**Object对象**/
var obj = {foo:'bar',baz:42};
console.log(Object.keys(obj));
// ["foo","baz"]

/**类数组 对象  随机key排序**/
var anObj ={100:'a',2:'b',7:'c'};
console.log(Object.keys);
//['2','7','100']

/***getFoo 是一个不可枚举的属性**/
var my_obj = Object.create(
   {}, 
   { getFoo : { value : function () { return this.foo } } }
);
my_obj.foo = 1;

console.log(Object.keys(my_obj)); 
// ['foo']
```

> 2.遍历自身的所有属性(可枚举，不可枚举，非继承属性) **Object.getOwnPropertyNames()**方法

##### Object.getOwnPropertyNames()(可枚举，不可枚举，非继承属性,但不包括**Symbol**值作为名称的属性)

该方法返回一个由指定对象的所有自身属性组成的数组(包括不可枚举属性但不包括**Symbol**值作为名称的属性)

```js
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]

// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
  console.log(val + " -> " + obj[val]);
});
// 输出
// 0 -> a
// 1 -> b
// 2 -> c

//不可枚举属性
var my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
```

> 3.遍历可枚举的自身属性和继承属性 （可枚举，可继承的属性） **for in**

##### for-in(遍历可枚举的自身属性和继承属性 （可枚举，可继承的属性） 不含symbol)

```js
遍历对象的属性
var obj={
    name：'张三',
    age : '24',
    getAge:function(){
        console.log(this.age);
    }
}
var arry ={};
for(var i in obj){
    if(obj.hasOwnProperty(i)&& typeOf obj[i] != 'function'){
        arry[i] = obj[i];
    }
}
console.log(arry);
{name:'张三',age:24}

注: hasOwnProperty()方法判断对象是有某个属性(本身的属性，不是继承的属性)
```

##### 遍历所有的自身属性和继承属性

```js
(function () {
    var getAllPropertyNames = function (obj) {
        var props = [];
        do {
            props = props.concat(Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));
        return props;
    }
    var propertys = getAllPropertyNames(window);
    alert(propertys.length);          //276
    alert(propertys.join("\n"));      //toString等
})()
```

##### Reflect.ownKeys(obj)(返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.getOwnPropertyNames+getOwnPropertySymbols)

```js
var obj = {'0':'a','1':'b','2':'c'};
Reflect.ownKeys(obj).forEach(function(key){

console.log(key,obj[key]);

});
```

##### 遍历不可枚举

```js
var target = myObject;　
var enum_and_nonenum = Object.getOwnPropertyNames(target);//全都有
var enum_only = Object.keys(target);//可眉笔
var nonenum_only = enum_and_nonenum.filter(function(key) {
  var indexInEnum = enum_only.indexOf(key);　//过滤
  if (indexInEnum == -1) {
    // Not found in enum_only keys,
    // meaning that the key is non-enumerable,
    // so return true so we keep this in the filter
    return true;
  } else {
    return false;
  }
});

console.log(nonenum_only);
```

##### **getOwnPropertySymbols**

方法返回直接在给定对象上找到的所有符号属性的数组。

```js
const object1 = {};
const a = Symbol('a');
const b = Symbol.for('b');

object1[a] = 'localSymbol';
object1[b] = 'globalSymbol';

const objectSymbols = Object.getOwnPropertySymbols(object1);

console.log(objectSymbols.length);
```

