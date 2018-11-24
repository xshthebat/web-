# JS深浅拷贝

## 为什么有深拷贝和浅拷贝？

这个要从js中的数据类型说起，js中数据类型分为**基本数据类型**和**引用数据类型**。

`基本类型值`指的是那些保存在**栈**内存中的简单数据段，即这种值是完全保存在内存中的一个位置。包含`Number`，`String`，`Boolean`，`Null`，`Undefined` ，`Symbol`。

 `引用类型值`指的是那些保存在**堆**内存中的对象，所以引用类型的值保存的是一个指针，这个指针指向存储在**堆**中的一个对象。除了上面的 6 种基本数据类型外，剩下的就是引用类型了，统称为 `Object` 类型。细分的话，有：`Object` 类型、`Array` 类型、`Date` 类型、`RegExp` 类型、`Function` 类型 等。

正因为引用类型的这种机制， 当我们从一个变量向另一个变量复制引用类型的值时，实际上是将这个引用类型在**栈**内存中的引用地址复制了一份给新的变量，其实就是一个**指针**。因此当操作结束后，这两个变量实际上指向的是同一个在**堆**内存中的对象，改变其中任意一个对象，另一个对象也会跟着改变

![](/home/xsh/桌面/markdown/imgs/2063708726-5937c22f1a4ca_articlex.png)



​    因此深拷贝和浅拷贝只发生在**引用类型**中。简单来说他们的区别在于：

#### 1. 层次

- **浅拷贝** 只会将对象的各个属性进行依次复制，并不会进行递归复制，也就是说只会赋值目标对象的第一层属性。
- **深拷贝**不同于浅拷贝，它不只拷贝目标对象的第一层属性，而是`递归`拷贝目标对象的所有属性。



#### 2. 是否开辟新的栈

- **浅拷贝** 对于目标对象第一层为`基本数据类型`的数据，就是直接赋值，即「传值」；而对于目标对象第一层为`引用数据类型`的数据，就是直接赋存于栈内存中的堆内存地址,即「传址」,并`没有开辟新的栈`，也就是复制的结果是两个对象指向同一个地址，修改其中一个对象的属性，则另一个对象的属性也会改变，
- **深拷贝** 而深复制则是`开辟新的栈`，两个对象对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性。

## 浅拷贝

以下是实现浅拷贝的几种实现方式：

#### 1.**Array.concat()**

```js
 const arr = [1,2,3,4,[5,6]];
   const copy = arr.concat(); \\ 利用concat()创建arr的副本
   
   \\改变基本类型值,不会改变原数组
   copy[0] = 2; 
   arr; //[1,2,3,4,[5,6]];

   \\改变数组中的引用类型值，原数组也会跟着改变
   copy[4][1] = 7;
   arr; //[1,2,3,4,[5,7]];
```

能实现类似效果的还有slice()和Array.from()等，大家可以自己尝试一下～

#### 2.**Object.assign()**

```js
const obj1 = {x: 1, y: 2};
const obj2 = Object.assign({}, obj1);

obj2.x = 2; \\修改obj2.x,改变对象中的基本类型值
console.log(obj1) //{x: 1, y: 2} //原对象未改变
console.log(obj2) //{x: 2, y: 2}
```

```js
const obj1 = {
    x: 1, 
    y: {
        m: 1
    }
};
const obj2 = Object.assign({}, obj1);

obj2.y.m = 2; \\修改obj2.y.m,改变对象中的引用类型值
console.log(obj1) //{x: 1, y: {m: 2}} 原对象也被改变
console.log(obj2) //{x: 2, y: {m: 2}}
```

## 深拷贝

#### 1.JSON.parse()和JSON.stringify()

```js
const obj1 = {
    x: 1, 
    y: {
        m: 1
    }
};
const obj2 = JSON.parse(JSON.stringify(obj1));
console.log(obj1) //{x: 1, y: {m: 1}}
console.log(obj2) //{x: 1, y: {m: 1}}

obj2.y.m = 2; //修改obj2.y.m
console.log(obj1) //{x: 1, y: {m: 1}} 原对象未改变
console.log(obj2) //{x: 2, y: {m: 2}}
```

这种方法使用较为简单，可以满足基本日常的深拷贝需求，而且能够处理JSON格式能表示的所有数据类型，但是有以下几个缺点：

- undefined、任意的函数、正则表达式类型以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时)；
- 它会抛弃对象的constructor。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object；
- 如果对象中存在循环引用的情况无法正确处理。
- 本身递归实现会爆栈
- 如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象用法简单，然而使用这种方法会有一些隐藏的坑：因为在序列化JavaScript对象时，所有函数和原型成员会被有意忽略。
- 如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象；
- 如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null
-  通俗点说，`JSON.parse(JSON.stringfy(X))`，其中X只能是`Number`, `String`, `Boolean`, `Array`, 扁平对象，即那些能够被 JSON 直接表示的数据结构。



##### JSON.stringify()

该**JSON.stringify()**方法将JavaScript对象或值转换为JSON字符串，如果指定了replacer函数，则可选地替换值，或者如果指定了replacer数组，则可选地仅包括指定的属性。

```js
console.log(JSON.stringify({ x: 5, y: 6 }));
// expected output: "{"x":5,"y":6}"

console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
// expected output: "[3,"false",false]"

console.log(JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }));
// expected output: "{"x":[10,null,null,null]}"

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// expected output: ""2006-01-02T15:04:05.000Z""
```

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)找到循环引用时引发（“循环对象值”）异常。

`JSON.stringify()` 将值转换为表示它的JSON表示法：

- 如果值具有[toJSON（）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)方法，则它负责定义将序列化的数据。
- [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)，[`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)和[`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)对象字符串化期间转化为相应的基本值，在符合传统转换语义。
- 在转换过程中遇到if [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)，a [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)或a [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)时，它被省略（当它在对象中找到时）或被删除[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)（当它在数组中找到时）。`JSON.stringify()`也可以`undefined`在传递“纯”值时返回，如`JSON.stringify(function(){})`或`JSON.stringify(undefined)`。
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)即使使用该`replacer`功能，也会完全忽略所有键控的属性。
- **通过返回一个字符串来[`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)实现该`toJSON()`函数的实例（与之相同`date.toISOString()`）。因此，它们被视为字符串。**
- 数字[`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity)和[`NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)数值[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)都被考虑在内  `null`。
- 所有其他[`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)情况下（包括[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)，[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)，[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)，和[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)）将连载只有他们的枚举的属性。

```js
JSON.stringify({});                    // '{}'
JSON.stringify(true);                  // 'true'
JSON.stringify('foo');                 // '"foo"'
JSON.stringify([1, 'false', false]);   // '[1,"false",false]'
JSON.stringify([NaN, null, Infinity]); // '[null,null,null]'
JSON.stringify({ x: 5 });              // '{"x":5}'

JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)) 
// '"2006-01-02T15:04:05.000Z"'

JSON.stringify({ x: 5, y: 6 });
// '{"x":5,"y":6}'
JSON.stringify([new Number(3), new String('false'), new Boolean(false)]);
// '[3,"false",false]'

// String-keyed array elements are not enumerable and make no sense in JSON
let a = ['foo', 'bar'];
a['baz'] = 'quux';      // a: [ 0: 'foo', 1: 'bar', baz: 'quux' ]
JSON.stringify(a); 
// '["foo","bar"]'

JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }); 
// '{"x":[10,null,null,null]}' 

// Standard data structures
JSON.stringify([new Set([1]), new Map([[1, 2]]), new WeakSet([{a: 1}]), new WeakMap([[{a: 1}, 2]])]);
// '[{},{},{},{}]'

// TypedArray
JSON.stringify([new Int8Array([1]), new Int16Array([1]), new Int32Array([1])]);
// '[{"0":1},{"0":1},{"0":1}]'
JSON.stringify([new Uint8Array([1]), new Uint8ClampedArray([1]), new Uint16Array([1]), new Uint32Array([1])]);
// '[{"0":1},{"0":1},{"0":1},{"0":1}]'
JSON.stringify([new Float32Array([1]), new Float64Array([1])]);
// '[{"0":1},{"0":1}]'
 
// toJSON()
JSON.stringify({ x: 5, y: 6, toJSON(){ return this.x + this.y; } });
// '11'

// Symbols:
JSON.stringify({ x: undefined, y: Object, z: Symbol('') });
// '{}'
JSON.stringify({ [Symbol('foo')]: 'foo' });
// '{}'
JSON.stringify({ [Symbol.for('foo')]: 'foo' }, [Symbol.for('foo')]);
// '{}'
JSON.stringify({ [Symbol.for('foo')]: 'foo' }, function(k, v) {
  if (typeof k === 'symbol') {
    return 'a symbol';
  }
});
// undefined

// Non-enumerable properties:
JSON.stringify( Object.create(null, { x: { value: 'x', enumerable: false }, y: { value: 'y', enumerable: true } }) );
// '{"y":"y"}'
```

##### replacer参数

述`replacer`参数可以是一个函数或数组。

**作为一个函数**，它需要两个参数：键和值被字符串化。找到密钥的对象作为替换器的`this`参数提供。

最初，`replacer`使用空字符串调用函数作为表示要进行字符串化的对象的键。然后调用对象或数组上的每个属性进行字符串化。

它应该返回应该添加到JSON字符串的值，如下所示：

- 如果返回a [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)，则将与该数字对应的字符串用作添加到JSON字符串时的属性值。
- 如果返回a [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)，则在将该字符串添加到JSON字符串时，该字符串将用作属性的值。
- 如果返回a [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)，则在将其添加到JSON字符串时，将“true”或“false”用作属性的值（如果适用）。
- 如果返回`null`，`null`将添加到JSON字符串中。
- 如果返回任何其他对象，则会以递归方式将对象字符串化为JSON字符串，并`replacer`在每个属性上调用该函数，除非该对象是函数，在这种情况下，不会向JSON字符串添加任何内容。
- 如果返回`undefined`，则不会在输出JSON字符串中包含该属性（即，过滤掉）。

###### 示例替换器，作为函数

```js
function replacer(key, value) {
  // Filtering out properties
  if (typeof value === 'string') {
    return undefined;
  }
  return value;
}

var foo = {foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7};
JSON.stringify(foo, replacer);
// '{"week":45,"month":7}'
```

###### 示例替换器，作为数组

如果`replacer`是数组，则数组的值指示对象中应包含在结果JSON字符串中的属性的名称。

```js
JSON.stringify(foo, ['week', 'month']);  
// '{"week":45,"month":7}', only keep "week" and "month" properties
```



##### space

该`space`参数可用于控制最终字符串中的间距。

- **如果是数字**，则字符串化中的连续级别将由这么多空格字符（最多10个）缩进。
- **如果是字符串**，则连续的级别将由此字符串（或其前十个字符）缩进。

```js
JSON.stringify({ a: 2 }, null, ' ');
// '{
//  "a": 2
// }'
```

使用制表符可模拟标准的漂亮外观：

```
JSON.stringify({ uno: 1, dos: 2 }, null, '\t');
// returns the string:
// '{
//     "uno": 1,
//     "dos": 2
// }'
```

##### toJSON()行为

如果要进行字符串化的对象具有名为`toJSON`其值为函数的属性，则该`toJSON()`方法将自定义JSON字符串化行为：而不是被序列化的对象，该`toJSON()`方法在调用时返回的值将被序列化。使用一个参数`JSON.stringify()`调用`toJSON`：

- 如果此对象是属性值，则为属性名称
- 如果它在数组中，则数组中的索引为字符串
- 如果`JSON.stringify()`直接在此对象上调用，则为空字符串

```js
ar obj = {
    data: 'data',
    
    toJSON(key){
        if(key)
            return `Now I am a nested object under key '${key}'`;
        
        else
            return this;
    }
};

JSON.stringify(obj);
// '{"data":"data"}'

JSON.stringify({ obj })
// '{"obj":"Now I am a nested object under key 'obj'"}'

JSON.stringify([ obj ])
// '["Now I am a nested object under key '0'"]'
```

##### JSON.stringify()序列化循环引用时

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)如果尝试使用循环引用对对象进行编码，则将抛出a 

```js
const circularReference = {};
circularReference.myself = circularReference;

// Serializing circular references throws "TypeError: cyclic object value"
JSON.stringify(circularReference);
```

要序列化循环引用，您可以使用支持它们的库（例如Douglas Crockford的[cycle.js](https://github.com/douglascrockford/JSON-js/blob/master/cycle.js)）或自己实现解决方案，这需要通过可序列化的值查找和替换（或删除）循环引用。

##### JSON.parse()

`JSON.parse()` 可以接受第二个参数，它可以在返回之前转换对象值。比如这例子中，将返回对象的属性值大写： 

该**JSON.parse()**方法解析JSON字符串，构造字符串描述的JavaScript值或对象。可以提供可选的**reviver**函数，以在返回结果对象之前对其执行转换

```js
var json = '{"result":true, "count":42}';
obj = JSON.parse(json);

console.log(obj.count);
// expected output: 42

console.log(obj.result);
// expected output: true

```

```js
JSON.parse（text [，reviver ]）
```

`text` 要解析为JSON的字符串。有关[`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)JSON语法的说明，请参阅该对象。

`reviver` 可选的

如果是一个函数，这就规定了在返回之前如何转换最初由解析产生的值

```js
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null
```

##### 使用`reviver`参数

如果`reviver`指定了a ，则在返回之前*转换*通过解析计算的值。具体来说，计算的值及其所有属性（从最嵌套的属性开始并继续到原始值本身）分别通过`reviver`。然后调用它，包含属性的对象被处理为`this`，并且属性名称作为字符串，属性值作为参数。如果`reviver`函数返回[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)（或者不返回任何值，例如，如果执行从函数末尾开始），则从对象中删除该属性。否则，将属性重新定义为返回值。

如果  `reviver` 仅转换某些值而不转换其他值，请确保按原样返回所有未转换的值，否则将从结果对象中删除它们。

```hs
JSON.parse('{"p": 5}', (key, value) =>
  typeof value === 'number'
    ? value * 2 // return value * 2 for numbers
    : value     // return everything else unchanged
);

// { p: 10 }

JSON.parse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}', (key, value) => {
  console.log(key); // log the current property name, the last is "".
  return value;     // return the unchanged property value.
});

```





#### 2.递归(可以采用栈+循环来防止爆栈)

```js
function deepCopy1(obj) {
    // 创建一个新对象
    let result = {}
    let keys = Object.keys(obj),
        key = null,
        temp = null;

    for (let i = 0; i < keys.length; i++) {
        key = keys[i];    
        temp = obj[key];
        // 如果字段的值也是一个对象则递归操作
        if (temp && typeof temp === 'object') {
            result[key] = deepCopy(temp);
        } else {
        // 否则直接赋值给新对象
            result[key] = temp;
        }
    }
    return result;
}

const obj1 = {
    x: {
        m: 1
    },
    y: undefined,
    z: function add(z1, z2) {
        return z1 + z2
    },
    a: Symbol("foo")
};

const obj2 = deepCopy1(obj1);
obj2.x.m = 2;

console.log(obj1); //{x: {m: 1}, y: undefined, z: ƒ, a: Symbol(foo)}
console.log(obj2); //{x: {m: 2}, y: undefined, z: ƒ, a: Symbol(foo)}
```

## 破解递归爆栈

```js
function cloneLoop(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}
```



## 循环引用

#### 1.父级引用

这里的父级引用指的是，当对象的某个属性，正是这个对象本身，此时我们如果进行深拷贝，可能会在子元素->父对象->子元素...这个循环中一直进行，导致栈溢出。比如下面这个例子：

```js\
const obj1 = {
    x: 1, 
    y: 2
};
obj1.z = obj1;

const obj2 = deepCopy1(obj1); \\栈溢出
```

解决办法是:只需要判断一个对象的字段是否引用了这个对象或这个对象的任意父级即可，可以修改上面的deepCopy1函数:

```js
function deepCopy2(obj, parent=null) {
    //创建一个新对象
    let result = {};
    let keys = Object.keys(obj),
         key = null,
         temp = null,
         _parent = parent;
    //该字段有父级则需要追溯该字段的父级
    while(_parent) {
        //如果该字段引用了它的父级，则为循环引用
        if(_parent.originParent === obj) {
            //循环引用返回同级的新对象
            return _parent.currentParent;
        }
        _parent = _parent.parent
    }
    for(let i=0,len=keys.length;i<len;i++) {
        key = keys[i]
        temp = obj[key]
        // 如果字段的值也是一个新对象
        if(temp && typeof temp === 'object') {
            result[key] = deepCopy(temp, {
                //递归执行深拷贝，将同级的待拷贝对象与新对象传递给parent，方便追溯循环引用
                originParent: obj,
                currentParent: result,
                parent: parent
            });
        } else {
            result[key] = temp;
        }
    }
    return result;
}

const obj1 = {
    x:1
}
obj1.z = obj1;

const obj2 = deepCopy2(obj1);
```

#### 2. 同级引用

假设对象obj有a,b,c三个子对象，其中子对象c中有个属性d引用了对象obj下面的子对象a。

```js
const obj= {
    a: {
        name: 'a'
    },
    b: {
        name: 'b'
    },
    c: {

    }
};
c.d.e = obj.a;
```

此时c.d.e和obj.a 是相等的，因为它们引用的是同一个对象

```js
console.log(c.d.e === obj.a); //true
```

如果我们调用上面的deepCopy2函数

```js
const copy = deepCopy2(obj);
console.log(copy.a); // 输出： {name: "a"}
console.log(copy.d.e);// 输出: {name: "a"}
console.log(copy.a === copy.d.e); // 输出： false
```

以上表现我们就可以看出，虽然opy.a 和copy.d.e在字面意义上是相等的，但二者并不是引用的同一个对象，这点上来看对象copy和原对象obj还是有差异的。

这种情况是因为obj.a并不在obj.d.e的父级对象链上，所以deepCopy2函数就无法检测到obj.d.e对obj.a也是一种引用关系，所以deepCopy2函数就将obj.a深拷贝的结果赋值给了copy.d.e。

解决方案：父级的引用是一种引用，非父级的引用也是一种引用，那么只要记录下对象A中的所有对象，并与新创建的对象一一对应即可。

```js
function deepCopy3(obj) {
    // hash表，记录所有的对象的引用关系
    let map = new WeakMap();
    function dp(obj) {
        let result = null;
        let keys = Object.keys(obj);
        let key = null,
            temp = null,
            existobj = null;

        existobj = map.get(obj);
        //如果这个对象已经被记录则直接返回
        if(existobj) {
            return existobj;
        }
        result = {}
        map.set(obj, result);
        for(let i =0,len=keys.length;i<len;i++) {
            key = keys[i];
            temp = obj[key];
            if(temp && typeof temp === 'object') {
                result[key] = dp(temp);
            }else {
                result[key] = temp;
            }
        }
        return result;
    }
    return dp(obj);
}

const obj= {
    a: {
        name: 'a'
    },
    b: {
        name: 'b'
    },
    c: {

    }
};
c.d.e = obj.a;

const copy = deepCopy3(obj);
```





## 最终解决

```js
// 保持引用关系
function cloneForce(x) {
    // =============
    const uniqueList = []; // 用来去重
    // =============
    let root = {};
    // 循环数组
    const loopList = [
        {
            parent: root, //根
            key: undefined,　　
            data: x,
        }
    ];
    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // (除第一次外)初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }
        
        // =============
        // 数据已经存在
        let uniqueData = find(uniqueList, data);
        if (uniqueData) {
            parent[key] = uniqueData.target;
            continue; // 中断本次循环
        }

        // 数据不存在
        // 保存源数据，在拷贝数据中对应的引用
        uniqueList.push({
            source: data,
            target: res,
        });
        // =============
    
        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}

function find(arr, item) {
    for(let i = 0; i < arr.length; i++) {
        if (arr[i].source === item) {
            return arr[i];
        }
    }

    return null;
}
```

## 手撕代码

```js
class Song {
    constructor(song) {
        this.song = song
    }
    getsong() {
        return this.song;
    }
}
let MAPS = new WeakMap();

function Deep(obj) {
    return DeepCopy(obj)
}
function DeepCopy(obj) {
    //异常处理
    let ret
    if (MAPS.has(obj)) {
        ret = MAPS.get(obj);
        return ret;
    }
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        ret = []
        MAPS.set(obj, ret);
        obj.forEach((item) => {
            ret.push(DeepCopy(item));

        })
    } else if (!(obj && typeof obj === 'object')) {
        ret = obj;
    } else if (Object.prototype.toString.call(obj) !== '[object Object]') {
        // if (HTMLElement) {
        //     if (obj instanceof HTMLElement) {
        //         ret = obj.cloneNode(true);
        //     } else {
        //         ret = new obj.constructor(obj);
        //     }
        // }
        // else {
        ret = new obj.constructor(obj);
    }
    else {
        ret = {};
        MAPS.set(obj, ret);
        let key = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));

        key.forEach((item) => {
            if (obj[item] && typeof obj[item] === 'object') {
                ret[item] = DeepCopy(obj[item]);
            }
            else {
                if ((typeof obj[item]) === 'function') {
                    if (obj[item].toString().indexOf('[native code]') !== -1) {
                        console.log('haha');
                        ret[item] = obj[item];
                    } else {
                        eval(`ret[item]=${obj[item].toString()}`);
                    }
                }
                else {
                    ret[item] = obj[item]
                }
            }
        })
        Object.setPrototypeOf(ret, Object.getPrototypeOf(obj));
    }
    return ret;
}
let fun = [].push;
let a = {};
let o = {
    b: new Date(),
    [Symbol('xx')]: 'xx',
    c: 0,
    d: null,
    e: undefined,
    f: /sdas/,
    e: new Set(),
    f: new Song('1'),
    g: function () {
        console.log('haha');
    },
    f: new Map(),
    h: fun,
    date: Date(),
    num: new Number(),
    arr: [[{}, [], [[{}]]]]
}
a.o = o;
o.a = a;
console.log(Deep(o))
    MAPS.set(obj, ret);

    // { b: 2018-11-22T11:23:30.280Z,
    //     c: 0,
    //     d: null,
    //     e: Set {},
    //     f: Map {},
    //     g: [Function],
    //     h: [Function: push],
    //     date: 'Thu Nov 22 2018 19:23:30 GMT+0800 (CST)',
    //     num: [Number: 0],
    //     arr: [ [ {}, [], [Array] ] ],
    //     a: { o: [Circular] },
    //     [Symbol(xx)]: 'xx' }

```

