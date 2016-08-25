
class EntityList {

    constructor() {
        this.array = [];
        this.hash = Object.create(null);
        this.refs = Object.create(null);
        this.size = 0;
    }

    get nullspace() {
        return this.array.length - this.size;
    }

    add(entity) {
        if (this.hash[entity.id]) return;
        entity.index = this.size;
        this.array.push(entity);
        this.hash[entity.id] = entity;
        this.size++;
    }

    remove(entity) {
        if (!this.hash[entity.id]) return;
        this.hash[entity.id] = null;
        this.refs[entity.ref] = null;
        if (this.size > 1) { // fix this
            var i = entity.index;
            this.array[i] = this.array[this.size-1];
            this.array[i].index = i;
        }
        this.array[this.size] = null;
        this.size--;
    }

    shrink() {
        this.array.length = this.size;
        for (var r in this.refs) {
            if (this.refs[r] === null) {
                delete this.refs[r];
            }
        }
        for (var h in this.hash) {
            if (this.hash[h] === null) {
                delete this.hash[h];
            }
        }
    }

}

module.exports = EntityList;