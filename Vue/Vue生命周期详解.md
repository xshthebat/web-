# Vue生命周期详解

![](/home/xsh/桌面/markdown/imgs/lifecycle.png)



可以看到在vue一整个的生命周期中会有很多**钩子函数**提供给我们在vue生命周期不同的时刻进行操作, 那么先列出所有的钩子函数，然后我们再一一详解:

- **beforeCreate**
- **created**
- **beforeMount**
- **mounted**
- **beforeUpdate**
- **updated**
- **beforeDestroy**
- **destroyed**

## beforeCreate(在vue组件实例化时,_init方法中,data未初始化,vuex,vue-router是在这里做混合的)

一般来说，**如果组件在加载的时候需要和后端有交互**，放在这俩个钩子函数执行都可以，**如果是需要访问 `props`、`data` 等数据的话，就需要使用 `created` 钩子函数**

在这个生命周期之间，进行**初始化事件，进行数据的观测**，可以看到在**created**的时候数据已经和**data属性进行绑定**（放在data中的属性当值发生改变的同时，视图也会改变）。
注意看下：此时还是没有el选项

## **created(在vue实例化,_init方法里state,props,provide,injections已经初始化)**

**可以访问data,props并且已经是处于响应被监听了**

## **beforeMount**(mount,dom挂载前,mountComponent)

在执行 `vm._render()` 函数渲染 VNode 之前，执行了 `beforeMount` 钩子函数，在执行完 `vm._update()` 把 VNode patch 到真实 DOM 后，执行 `mouted` 钩子。注意，这里对 `mouted` 钩子函数执行有一个判断逻辑，`vm.$vnode` 如果为 `null`，则表明这不是一次组件的初始化过程，而是我们通过外部 `new Vue` 初始化过程。那么对于组件，它的 `mounted` 时机在哪儿呢

我们可以看到，每个子组件都是在这个钩子函数中执行 `mouted` 钩子函数，并且我们之前分析过，`insertedVnodeQueue` 的添加顺序是先子后父，所以对于同步渲染的子组件而言，`mounted` 钩子函数的执行顺序也是先子后父。

**这里是未渲染,然是已经执行了模板编译函数**

## **mounted**(在执行完 `vm._update()` 把 VNode patch 到真实 DOM 后，执行 `mouted` 钩子)

dom已经挂载到文档中,可以通过el获取dom

## beforeUpdate(的执行时机是在渲染 Watcher 的 `before` 函数中)

注意这里有个判断，也就是在组件已经 mounted 之后，才会去调用这个钩子函数。

## update(执行时机是在`flushSchedulerQueue` 函数调用的时候)

可以先大概了解一下，`updatedQueue` 是 更新了的 `wathcer` 数组，那么在 `callUpdatedHooks` 函数中，它对这些数组做遍历，只有满足当前 `watcher`为 `vm._watcher` 以及组件已经 `mounted` 这两个条件，才会执行 `updated` 钩子函数

## beforeDestroy(`beforeDestroy` 钩子函数的执行时机是在 `$destroy` 函数执行最开始的地方，接着执行了一系列的销毁动作，包括从 `parent` 的 `$children` 中删掉自身，删除 `watcher`，当前渲染的 VNode 执行销毁钩子函数等)

## Destroy(上述执行完毕后再调用 `destroy` 钩子函数)

在 `$destroy` 的执行过程中，它又会执行 `vm.__patch__(vm._vnode, null)` 触发它子组件的销毁钩子函数，这样一层层的递归调用，所以 `destroy` 钩子函数执行顺序是先子后父，和 `mounted` 过程一样



## activated & deactivated(详情见keep-alive)

`activated` 和 `deactivated` 钩子函数是专门为 `keep-alive` 组件定制的钩子





## vue1.0和vue2.x生命周期区别

vue1.0的生命周期为

```js
init                     ->初始化
created                  ->创建
beforeCompile            ->编译之前
compiled                 ->编译完成
ready        √           -> mounted
beforeDestroy            ->销毁之前
destroyed                ->已经销毁
```

vue2.0的生命周期为(标*的为经常用的)

```js
beforeCreate    组件实例刚刚被创建,属性都没有
created         实例已经创建完成，属性已经绑定
beforeMount     模板编译之前
mounted         模板编译之后，代替之前ready  *
beforeUpdate    组件更新之前
updated         组件更新完毕    *
beforeDestroy   组件销毁前
destroyed       组件销毁后
```

