// todo: implement max instances, rename get() -> create()
class ObjectPool {

    constructor(factory, initializer, destructor) {
        this.__pool = [];
        this.__factory = factory;
        this.__initializer = initializer || function(){};
        this.__destructor = destructor || function(){};
        this.__count = 0;
    }

    get size() {
        return this.__pool.length;
    }

    get referenced() {
        return this.__count;
    }

    get() {
        this.__count++;
        var instance = null;
        if (this.__pool.length) {
            instance = this.__pool.pop();
        } else {
            instance = this.__factory();
        }
        this.__initializer(instance);
        return instance;
    }

    release(instance) {
        this.__count--;
        this.__destructor(instance);
        this.__pool.push(instance);
    }

    allocate(count) {
        for (var i = 0; i < count; i++) {
            var instance = this.__factory();
            this.__pool.push(instance);
        }
    }
}

export default ObjectPool;