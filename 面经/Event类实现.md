```js
class Event {
    constructor() {
        this.task = {};
    }
    on(name, cb) {
        if (!this.task[name]) {
            this.task[name] = [];
        }
        this.task[name].push(cb);
        return this;　　//对应事件下push 订阅
    }
    off(name, cb) {
        let item = this.tasks[name];
        if (item) {
            for (let i = 0; i < item.length; i++) {
                if (item[i] == cb) {
                    item.splice(i, 1);
                    break;
                }
            }
        }　　　　　　//对应事件下push 移除
        return this;
    }
    once(name, cb) {
        if (!this.task[name]) {
            this.task[name] = [];
        }
        cb.tag = 'once';
        this.task[name].push(cb);
        return this;
    }　　//设置标记一次
    emit(name) {
        let tasklist = this.task[name],
            args = [].slice.call(arguments, 1);
        if (tasklist) {
            for (let i = 0; i < tasklist.length; i++) {
                tasklist[i].apply(this, args);
                if (tasklist[i].tag && tasklist[i].tag == 'once') {
                    tasklist.splice(i, 1); //删除一个
                    i--;　　　
                }
            }　　//触发
        }
        return this;
    }
}


let myEvent = new Event();
myEvent.on('console1', () => {
    console.log('on1');
}).once('console2', () => {
    console.log('once');
}).on('console2', () => {
    console.log('on2');
}).emit('console2').emit('console2');

```

