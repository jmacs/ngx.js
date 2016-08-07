
class Prefab {

    constructor(options) {
        this.__id = options.id;
        this.__type = options.type || 0;
        this.__name = options.name || 'undefined';
        this.__components = [];
        var keys = Object.keys(options.components);
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            this.__components.push({
                type: key,
                state: options.components[key] || Object.create(null)
            });
        }
        this.__size = this.__components.length;
    }

    get id() {
        return this.__id;
    }

    get type() {
        return this.__type;
    }

    get name() {
        return this.__name;
    }

    get size() {
        return this.__size;
    }

    componentAt(index) {
        return this.__components[index];
    }
}

module.exports = Prefab;