console.log('自引用前')
let self = require('./self.js');
console.log('自引用后',self);
var haha=1;
module.exports = {
    haha:haha
};
console.log(module.exports);
