
class Component {

    constructor() {
        this.entity = null;
    }

    initialize(entity) {
        this.entity = entity;
    }

    attached(entity) {
    }

    detatched(entity) {
    }

    hydrate(state) { // setState(state)
    }

    dehydrate(state) { // getState(state)
    }

    destroy() {
        this.entity = null;
    }
}

module.exports = Component;