
class EntityFilter {

    constructor(name, filter) {
        this.__name = name;
        this.__filter = filter;
        this.__index = [];
        this.__size = 0;
    }

    accept(entity) {
        return this.__filter(entity);
    }

    add(entity) {
        var id = entity.id;
        if (this.__index.indexOf(id) === -1) {
            this.__index.push(id);
            this.__size++;
        }
    }

    remove(entity) {
        var len = this.__size;
        var arr = this.__index;
        if (!len) return false;
        var n = this.__index.indexOf(entity.id);
        while (n < len) {
            arr[n] = arr[n+1];
            n++
        }
        arr.length--;
    }

    each(entities, callback, delta) {
        var size = this.__size;
        var index = this.__index;
        for (var i = 0; i < size; i++) {
            var entity = entities[index[i]];
            if (entity) {
                callback(entity, delta);
            }
        }
    }

    clear() {
        this.__index.length = 0;
    }

    destroy() {
        this.__index = null;
        this.__filter = null;
    }

}

module.exports = EntityFilter;