// 保持引用关系
// function cloneForce(x) {
//     // =============
//     const uniqueList = []; // 用来去重
//     // =============
//     let root = {};
//     // 循环数组
//     const loopList = [
//         {
//             parent: root, //根
//             key: undefined,
//             data: x,
//         }
//     ];
//     while (loopList.length) {
//         // 深度优先
//         const node = loopList.pop();
//         const parent = node.parent; //当前需要拷贝的根
//         const key = node.key;　//键值
//         const data = node.data;　//值
//         // console.log(key,data);
//         // (除第一次外)初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
//         let res = parent;
//         if (typeof key !== 'undefined') {
//             res = parent[key] = {};
//         }

//         // =============
//         // 数据已经存在
//         let uniqueData = find(uniqueList, data);
//         if (uniqueData) {
//             parent[key] = uniqueData.target;
//             continue; // 中断本次循环
//         }

//         // 数据不存在
//         // 保存源数据，在拷贝数据中对应的引用
//         uniqueList.push({
//             source: data,
//             target: res,
//         });
//         // =============

//         for (let k in data) {
//             if (data.hasOwnProperty(k)) {
//                 if (typeof data[k] === 'object') {
//                     // 下一次循环
//                     loopList.push({
//                         parent: res,
//                         key: k,
//                         data: data[k],
//                     });
//                 } else {
//                     res[k] = data[k];
//                 }
//             }
//         }
//     }

//     return root;
// }

// function find(arr, item) {
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].source === item) {
//             return arr[i];
//         }
//     }

//     return null;
// }
// 实现深拷贝
// var b = {};
// var a = {};
// b.a = a;
// a.b = b;

// console.log(a);
// console.log(cloneForce(a));