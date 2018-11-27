1.编译环境不一样

Sass的安装需要Ruby环境,是在服务端处理的,而Less是需要引入less.js来处理Less代码输出css到浏览器,也可以在开发环节使用Less,然后编译成css文件,直接放到项目中。

2.变量符不一相,less是@,而scss是$,而且它们的作用域也不一样,less是块级作用域

3.输出设置,Less没有输出设置,sass供4种输出选项,nested,compact,compressed和expanded

nested:嵌套缩进的css代码(默认)

expanded:展开的多行css代码                                                                                           compact:简洁格式的css代码                                                                                          compressed:压缩后的css代码

4.sass支持条件语句,可以使用if{}else{},for{}循环等等,而less不行

5.引用外部css文件,sass引用外部文件必须以_开头,文件名如果以下划线_形状,sass会认为该文件是一个引用文件,不会将其编译为css文件。less引用外部文件和css中的@import没什么差异。

6.sass和less的工具库不同。sass有工具库Compass,简单说,sass和Compass的关系有点像Javascript和jQuery的关系,Compass是sass的工具库。在它的基础上,封装了一系列有用的模块和模板,补充强化了sass的功能。less有UI组件库Bootstrap,Bootstrap是web前端开发中一个比较有名的前端UI组件库,Bootstrap的样式文件部分源码就是采用less语法编写。

总结:不管是sass,还是less,都可以视为一种基于CSS之上的高级语言,其目的是使得CSS开发更灵活和更强大,sass的功能比less强大,基本可以说是一种真正的编程语言了,less则相对清晰明了,易于上手,对编译环境要求比较宽松。考虑到编译sass要安装Ruby,而Ruby官网在国内访问不了,个人在实际开发中更倾向于选择less