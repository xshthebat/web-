## 概念问题一：什么是webpack和grunt和gulp有什么不同

答案：Webpack是一个模块打包器，他可以递归的打包项目中的所有模块，最终生成几个打包后的文件。他和其他的工具最大的不同在于他支持code-splitting(代码分割)、模块化(AMD，ESM，CommonJs)、全局分析。

Grunt的**优点**是：

- 灵活，它只负责执行你定义的任务；
- 大量的可复用插件封装好了常见的构建任务。

Grunt的缺点是集成度不高，要写很多配置后才可以用，无法做到开箱即用

## 概念问题二：什么是bundle,什么是chunk，什么是module?

> 答案：bundle是由webpack打包出来的文件，chunk是指webpack在进行模块的依赖分析的时候，代码分割出来的代码块。module是开发中的单个模块。
>
>

## 概念问题三：什么是Loader?什么是Plugin?

答案：
1）Loaders是用来告诉webpack如何转化处理某一类型的文件，并且引入到打包出的文件中
2）Plugin是用来自定义webpack打包过程的方式，一个插件是含有apply方法的一个对象，通过这个方法可以参与到整个webpack打包的各个流程(生命周期)。

## 配置问题:如何可以自动生成webpack配置？

> 答案： webpack-cli /vue-cli /etc ...脚手架工具

## 配置问题:webpack配置多页面



## 开发问题一：webpack-dev-server和http服务器如nginx有什么区别?

> 答案：webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，他比传统的http服务对开发更加简单高效。

## 开发问题二：webpack中的hash、chunkhash、contenthash区别

hash一般是结合CDN缓存来使用，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容改变的话，那么对应文件哈希值也会改变，对应的HTML引用的URL地址也会改变，触发CDN服务器从源服务器上拉取对应数据，进而更新本地缓存。但是在实际使用的时候，这几种hash计算还是有一定区别

hash

hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值构建生成的文件hash值都是一样的，所以hash计算是跟整个项目的构建相关，同一次构建过程中生成的哈希都是一样的(每次构建不同)

chunkhash

采用hash计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即chunkhash。

chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。

由于采用chunkhash，所以项目主入口文件Index.js及其对应的依赖文件Index.css由于被打包在同一个模块，所以共用相同的chunkhash，但是公共库由于是不同的模块，所以有单独的chunkhash。这样子就保证了在线上构建的时候只要文件内容没有更改就不会重复构建

contenthash

在chunkhash的例子，我们可以看到由于index.css被index.js引用了，所以共用相同的chunkhash值。但是这样子有个问题，如果index.js更改了代码，css文件就算内容没有任何改变，由于是该模块发生了改变，导致css文件会重复构建。

使用extra-text-webpack-plugin里的contenthash值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建。

## 开发问题二:什么 是模块热更新？

> 答案:模块热更新是webpack的一个功能，他可以使得代码修改过后不用刷新浏览器就可以更新，是高级版的自动刷新浏览器。

## 优化问题一：什么是长缓存？在webpack中如何做到长缓存优化？

> 答案：浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称。在webpack中可以在output纵输出的文件指定chunkhash,并且分离经常更新的代码和框架代码。通过NameModulesPlugin或是HashedModuleIdsPlugin使再次打包文件名不变。

## 优化问题二：什么是Tree-shaking?CSS可以Tree-shaking吗

答案：Tree-shaking是指在打包中去除那些引入了，但是在代码中没有被用到的那些死代码。在webpack中Tree-shaking是通过uglifySPlugin来Tree-shaking
JS。Css需要使用Purify-CSS。

## 优化问题三：加快打包速度,减少打包体积

### **减小文件搜索范围**(路径准确)

Webpack的`resolve.modules`配置模块库（即 *node_modules*）所在的位置，在 js 里出现 `import 'vue'` 这样不是相对、也不是绝对路径的写法时，会去 *node_modules* 目录下找。但是默认的配置，会采用向上递归搜索的方式去寻找，但通常项目目录里只有一个 *node_modules*，且是在项目根目录，为了减少搜索范围，可以直接写明 `node_modules` 的全路径；同样，对于别名(`alias`)的配置，亦当如此：

### **设置 test & include & exclude**

`Webpack` 的装载机(loaders)，允许每个子项都可以有以下属性：

> **test：**必须满足的条件（正则表达式，不要加引号，匹配要处理的文件）
> **exclude：**不能满足的条件（排除不处理的目录）
> **include：**导入的文件将由加载程序转换的路径或文件数组（把要处理的目录包括进来）
> **loader：**一串“！”分隔的装载机（2.0版本以上，”-loader”不可以省略）
> **loaders：**作为字符串的装载器阵列

对于`include`，更精确指定要处理的目录，这可以减少不必要的遍历，从而减少性能损失。同样，对于已经明确知道的，不需要处理的目录，则应该予以排除，从而进一步提升性能。假设你有一个第三方组件的引用，它肯定位于*node_modules*，通常它将有一个 src 和一个 dist 目录。如果配置 `Webpack` 来排除 *node_modules*，那么它将从 dist 已经编译的目录中获取文件。否则会再次编译它们。故而，合理的设置 include & exclude，将会极大地提升 `Webpack` 打包优化速度，比如像这样

### **增强代码代码压缩工具**

`Webpack` 默认提供的 `UglifyJS` 插件，由于采用单线程压缩，速度颇慢 ；推荐采用 [webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin) 插件，她可以并行运行 UglifyJS 插件，更加充分而合理的使用 `CPU` 资源，这可以大大减少的构建时间

### **设置 babel 的 cacheDirectory 为true**

所以不仅要使用`exclude`、`include`，尽可能准确的指定要转化内容的范畴，而且要充分利用缓存，进一步提升性能。`babel-loader` 提供了 `cacheDirectory`特定选项（默认 `false`）：设置时，给定的目录将用于缓存加载器的结果。

未来的 `Webpack` 构建将尝试从缓存中读取，以避免在每次运行时运行潜在昂贵的 `Babel` 重新编译过程。如果值为空（loader: ‘babel-loader?cacheDirectory’）或`true`（loader: babel-loader?cacheDirectory=true），**node_modules/.cache/babel-loader** 则 *node_modules* 在任何根目录中找不到任何文件夹时，加载程序将使用默认缓存目录或回退到默认的OS临时文件目录

### **设置 noParse**(没有其他依赖)

如果你确定一个模块中，没有其它新的依赖，就可以配置这项， `Webpack` 将不再扫描这个文件中的依赖，这对于比较大型类库，将能促进性能表现，具体可以参见以下配置：

### **拷贝静态文件**

在前文 [Webpack 打包优化之体积篇](https://jeffjade.com/2017/08/06/124-webpack-packge-optimization-for-volume/)中提到，引入 `DllPlugin` 和 `DllReferencePlugin` 来提前构建一些第三方库，来优化 `Webpack` 打包。而在生产环境时，就需要将提前构建好的包，同步到 `dist` 中；这里拷贝静态文件，你可以使用 `copy-webpack-plugin` 插件：把指定文件夹下的文件复制到指定的目录；其配置如下：

## 上线问题:webpack打包上线流程

1.安装bable相关包

2.在项目根目录下创建一个babel的配置文件.babelrc

3.配置babel

4.

## 版本问题:4为什么比3快(?)

### 

## entry

entry: 用来写入口文件，它将是整个依赖关系的根

```JS
var baseConfig = {
        entry: './src/index.js'
    }
```

## output

output: 即使入口文件有多个，但是只有一个输出配置

```JS
var path = require('path')
    var baseConfig = {
        entry: {
            main: './src/index.js'
        },
        output: {
            filename: 'main.js',
            path: path.resolve('./build')
        }
    }
    module.exports = baseConfig
```

## Loader

**loader的作用**： 
1、实现对不同格式的文件的处理，比如说将scss转换为css，或者typescript转化为js
2、转换这些文件，从而使其能够被添加到依赖图中
loader是webpack最重要的部分之一，通过使用不同的Loader，我们能够调用外部的脚本或者工具，实现对不同格式文件的处理，loader需要在webpack.config.js里边单独用module进行配置，配置如下：

```JS
test: 匹配所处理文件的扩展名的正则表达式（必须）
    loader: loader的名称（必须）
    include/exclude: 手动添加处理的文件，屏蔽不需要处理的文件（可选）
    query: 为loaders提供额外的设置选项
    ex: 
        var baseConfig = {
            // ...
            module: {
                rules: [
                    {
                        test: /*匹配文件后缀名的正则*/,
                        use: [
                            loader: /*loader名字*/,
                            query: /*额外配置*/
                        ]
                    }
                ]
            }
        }
```

## Plugins

plugins和loader很容易搞混，说都是外部引用有什么区别呢？ 事实上他们是两个完全不同的东西。这么说**loaders负责的是处理源文件的如css、jsx，一次处理一个文件。而plugins并不是直接操作单个文件，**它直接对整个构建过程起作用下面列举了一些我们常用的plugins和他的用法
ExtractTextWebpackPlugin: 它会将入口中引用css文件，都打包都独立的css文件中，而不是内嵌在js打包文件中。下面是他的应用

```JS
var ExtractTextPlugin = require('extract-text-webpack-plugin')
        var lessRules = {
            use: [
                {loader: 'css-loader'},
                {loader: 'less-loader'}
            ]
        }
        
        var baseConfig = {
            // ... 
            module: {
                rules: [
                    // ...
                    {test: /\.less$/, use: ExtractTextPlugin.extract(lessRules)}
                ]
            },
            plugins: [
                new ExtractTextPlugin('main.css')
            ]
        }
```

