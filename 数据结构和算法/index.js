let arrs = [12,23,213,233,1,23,32];
function sort(arr,low,heigh){
    arr[0] = arr[low]; //存放基准
    while(low<heigh){ //两者相遇停止
        while(low<heigh&&arr[heigh]>=arr[0]) 
        　　　--heigh //heigh比基准大　heigh-1
        arr[low] = arr[heigh];　//　height小　往low移
        while(low<heigh&&arr[low]<arr[0])
         ++low　　　//low比基准小　　low+1
        arr[heigh] = arr[low]　　//low大　往height移动
    }
    //为什么能移　因为只要low移动　hiegh复制一份到原来的low了　反之heigh移动　low已经复制一份到height了 
    arr[low] = arr[0]　// 恢复基准
    return low;
}
//整体取第一个为基轴　然后将按这个基轴讲数组分为大小两份　再递归处理
function Qsort(arr,low,heigh){
    if(low<heigh){
        var pos = sort(arr,low,heigh);
        Qsort(arr,low,pos-1);
        Qsort(arr,pos+1,heigh);
    }
}
function haha(arr){
    arr.unshift(0);
    Qsort(arr,1,arr.length-1);
    arr.shift();
}
haha(arrs);
console.log(arrs);