//最长不重复子序列
// hashmap法
// var lengthOfLongestSubstring = function(s) {
//     let arr =s.split('');
//     let start=-1,end=0;
//     let obj={};
//     let max = 0;
//     while(end<arr.length){
//         if(!obj[arr[end]]){
//             obj[arr[end]]=1;
//             end++;
//             if(end-start-1>max){
//                 max = end-start-1;
//             }
//         } else{
//            start = start+1;
//            end = start+1;
//            obj={};
//         }
//     }
//     return max;
// };
// console.log(lengthOfLongestSubstring("abad"));

//动态规划 同上只不过记住了每个位置的maxleng值输出最后一个就行　Math.max(count,dp[i-1]);
// var lengthOfLongestSubstring = function (s) {
//     let dp = [];
//     dp[0] = 0;　//0为０
//     dp[1] = 1;　//1为１　
//     let str = [];
//     let len = s.length;
//     for (let i = 2; i <= s.length; i++) {
//         let count = 1;
//         str.push(s[i - 1]);
//         for (let j = i - 2; j >= 0; j--) {
//             if (str.indexOf(s[j]) == -1) {
//                 str.push(s[j]);
//                 count++;
//             } else {
//                 str = [];
//                 break;
//             }
//         }
//         str = [];
//         dp[i] = Math.max(count, dp[i - 1]);
//     }
//     return dp[len];
// };


//尺取法
// reduce(function(add,value,index));
var lengthOfLongestSubstring = function (s) {
    const map = {};
    var left = 0;
    return s.split('').reduce(
        (max, v, i) => {
            console.log(map);
        left = map[v] >= left ? map[v] + 1 : left;
        map[v] = i;
        return Math.max(max, i - left + 1);
    }, 0)
}
lengthOfLongestSubstring("ababac");