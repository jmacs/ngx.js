// todo: implement max instances, rename get() -> create()
class ObjectPool {

    constructor(options) {
        this.__pool = [];
        this.__create = options.create || function(){};
        this.__initialize = options.initialize || function(){};
        this.__release = options.release || function(){};
        this.__count = 0;
    }

    get size() {
        return this.__pool.length;
    }

    get referenced() {
        return this.__count;
    }

    create() {
        this.__count++;
        var instance = null;
        if (this.__pool.length) {
            instance = this.__pool.pop();
        } else {
            instance = this.__create();
        }
        this.__initialize(instance);
        return instance;
    }

    release(instance) {
        this.__count--;
        this.__release(instance);
        this.__pool.push(instance);
    }

    allocate(count) {
        for (var i = 0; i < count; i++) {
            var instance = this.__create();
            this.__pool.push(instance);
        }
    }
}

module.exports = ObjectPool;