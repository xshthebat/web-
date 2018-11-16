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

