# class类继承

```js
class A{
}
class B extends A{
}
console.log(B.__proto__===A,B.__proto__,A); //ture classA
console.log(B.__proto__===A.prototype,B.prototype.__proto__===A.prototype); //false  true
console.log(B.constructor===B.__proto__.constructor,'===Function'); //true Function
console.log(B.constructor.prototype===Function.prototype)//true
console.log(B.constructor===B) //false
console.log(A.__proto__===Function.prototype,'===anonymous');//true
console.log(B.constructor.prototype.__proto__===Object.prototype)//true
```

## 类的 prototype 属性和__proto__属性

大多数浏览器的 ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```js
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

上面代码中，子类`B`的`__proto__`属性指向父类`A`，子类`B`的`prototype`属性的`__proto__`属性指向父类`A`的`prototype`属性。 

这样的结果是因为，类的继承是按照下面的模式实现的。

```js
class A {
}

class B {
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);
//B.prototype===A.prototype
// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);
//B.__proto__===A
const b = new B();
```

这两条继承链，可以这样理解：作为一个对象，子类（`B`）的原型（`__proto__`属性）是父类（`A`）；作为一个构造函数，子类（`B`）的原型对象（`prototype`属性）是父类的原型对象（`prototype`属性）的实例

### 实例的 __proto__ 属性 

子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，子类的原型的原型，是父类的原型。

```javascript
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
```

上面代码中，`ColorPoint`继承了`Point`，导致前者原型的原型是后者的原型。

因此，通过子类实例的`__proto__.__proto__`属性，可以修改父类实例的行为

