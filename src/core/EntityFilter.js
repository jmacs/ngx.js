
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

    }

    filterOn(dataset) {
        this.__dataset = dataset;
    }

    each(callback, delta) {
        var dataset = this.__dataset;
        var size = this.__size;
        var index = this.__index;
        for (var i = 0; i < size; i++) {
            var data = dataset[index[i]];
            callback(data, delta);
        }
    }

    rebuild() {
        var dataset = this.__dataset;
        var keys = Object.keys(this.__dataset);
        for (var i = 0, l = keys.length; i < l; i++) {
            var entity = dataset[keys[i]];
            if (this.accept(entity)) {
                this.add(entity);
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