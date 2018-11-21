
var counter = {
    num: 3
};
setTimeout(()=>{
    module.exports = {
        counter: counter,
    };
    counter.num++;
},1000)
console.log(module.exports,'a');

