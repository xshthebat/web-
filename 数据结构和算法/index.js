// let arrs = [12,23,213,233,1,23,32];
// function sort(arr,low,heigh){
//     arr[0] = arr[low]; //存放基准
//     while(low<heigh){ //两者相遇停止
//         while(low<heigh&&arr[heigh]>=arr[0]) 
//         　　　--heigh //heigh比基准大　heigh-1
//         arr[low] = arr[heigh];　//　height小　往low移
//         while(low<heigh&&arr[low]<arr[0])
//          ++low　　　//low比基准小　　low+1
//         arr[heigh] = arr[low]　　//low大　往height移动
//     }
//     //为什么能移　因为只要low移动　hiegh复制一份到原来的low了　反之heigh移动　low已经复制一份到height了 
//     arr[low] = arr[0]　// 恢复基准
//     return low;
// }
//整体取第一个为基轴　然后将按这个基轴讲数组分为大小两份　再递归处理
// function Qsort(arr,low,heigh){
//     if(low<heigh){
//         var pos = sort(arr,low,heigh);
//         Qsort(arr,low,pos-1);
//         Qsort(arr,pos+1,heigh);
//     }
// }
// function haha(arr){
//     arr.unshift(0);
//     Qsort(arr,1,arr.length-1);
//     arr.shift();
// }
// haha(arrs);
// console.log(arrs);


// //折半插入排序

// function BiInsertSort(arr){
//     arr.unshift(0); //监视哨
//     let low,heigh,mid;
//     let i,j,len;
//     for(i=2,len = arr.length;i<=len;i++){
//         arr[0] = arr[i];
//         low = 1; //第一个
//         high=i-1;　//第i个
//         while(low<=high){　//当lo<high
//             mid = Math.floor((low+high)/2);  //取中间
//             if(arr[0]<arr[mid])　
//             high = mid-1;
//             else
//             low = mid+1;
//         } //
//         //讲此域向后移
//         for(j=i-1;j>=low;j--){
//             arr[j+1]=arr[j];
//             arr[low]=arr[0];
//         }
//     }
//      arr.shift();
//     return arr;
// }

// console.log(BiInsertSort(arrs));



// Function.prototype.bind2 = function (context) {

//     var self = this;
//     var args = Array.prototype.slice.call(arguments, 1);

//     var fNOP = function () {};

//     var fBound = function () {
//         var bindArgs = Array.prototype.slice.call(arguments);
//         console.log(this instanceof fNOP,context);
//         return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
//     }
//     fNOP.prototype = this.prototype;
//     fBound.prototype = new fNOP();
//     return fBound;
// }
// function haha(){
//     console.log(this.value);
// }
// let a ={
//     value:2
// }
// haha.bind2(a)()








// let haha = {
//     val:3,
//     left:{
//         val:9,
//         left:null,
//         right:null
//     },
//     right:{
//         val:20,
//         left:{
//             val:15,
//             left:null,
//             right:null
//         },
//         right:{
//             val:7,
//             left:null,
//             right:null
//         }
//     }
// }


//二叉树的前序遍历(循环+栈)　//中左右　　不停的访问左子树　先获取本节点在访问　然后知道没有　出栈进入右子树
// var preorderTraversal = function (root) {
//     let stack = [];  //栈
//     let ret = [];　//遍历序列
//     let p = null; 　//指针
//     p = root;
//     while (p !== null || stack.length) {
//         while (p !== null) {
//             ret.push(p.val); //讲当前节点访问;
//             stack.push(p); //当前节点入栈;
//             p = p.left; // p进入左子树
//         }
//         if (stack.length) {
//             p = stack.pop(); //节电出栈
//             console.log(stack,'haha');
//             p = p.right; //访问右子树
//         }
//     }
//     return ret;
// };
// preorderTraversal(haha)
//二叉树的中序遍历


 //左中右　　　　//不停地访问左子树,直到空　才访问　然后进入右子树
// var levelOrder = function(root) {
//     let stack = []; //栈
//     let ret = []; //结果
//     let p = null;//指针
//     p = root;
//     while(p!==null||stack.length){
//         while(p!==null){
//             stack.push(p);
//             p = p.left;
//         }
//         if(stack.length){
//             p = stack.pop();
//             ret.push(p.val);
//             p = p.right;
//         }
//     }
//     return ret;
// };



//第二种方法

// var levelOrder = function(root) {
//     let stack = []; //栈
//     let ret = []; //结果
//     let p = null;//指针
//     p = root;
//     while(p!==null||stack.length){
//         if(p!==null){
//             stack.push(p);
//             p = p.left;
//         }
//         else{
//             p = stack.pop();
//             ret.push(p.val);
//             p = p.right;
//         }
//     }
//     return ret;
// };

//二叉树的后序遍历

//一直遍历左子树直到为空　若栈顶节点右子书为空或者访问过访问当前节点标记访问,当前节点置空(需要重新取栈)),否则进入右子数
// var postorderTraversal = function(root) {
//     let stack = []; //栈
//     let ret = []; //结果
//     let p = null;//指针
//     let q = null;//标记
//     let i=0;
//     p = root;
//     while(p!==null||stack.length){
//         while(p!==null){
//             stack.push(p);
//             p = p.left; //一直进入左子树　直到为空
//         }　
//         if(stack.length){
//             p = stack[stack.length-1]//取栈顶
//             if(p.right===null||p.right===q){
//                 //若这个节点右子书为空或者访问过了
//                 p = stack.pop();
//                 console.log(p.val);
//                 ret.push(p.val); //访问
//                 q = p; //标记访问
//                 p = null ;
//             }
//             else p=p.right;
//         }
//     }
//     return ret;
// };

//层次遍历序列　

// var levelOrder = function(root) {
//     let queue = []; //队列
//     let p = root ;//指针
//     let ret = []; //返回值
//     queue.push(p);//入队
//     while(queue.length){
//         p = queue.shift();　//出队
//         ret.push(p.val);　//放入当层数组
//         if(p.left){
//             queue.push(p.left);
//         }
//         if(p.right){
//             queue.push(p.right);
//         }
//     }
//     return ret;
// };



// var levelOrder = function(root) {
//     let queue = []; //队列
//     let p = root ;//指针
//     let ret = []; //返回值
//     if(root){
//         queue.push(p);//入队
//     }
//     while(queue.length){
//         let level = [];
//         let len = queue.length;
//         for(let i=0;i<len;i++){
//             p = queue.shift();
//             level.push(p.val);
//             if(p.left!==null){
//                 queue.push(p.left);
//             }
//             if(p.right!==null){
//                 queue.push(p.right);
//             }
//         }
//         ret.push(level);
//     }
//     return ret;
// };
// console.log(levelOrder(haha));




