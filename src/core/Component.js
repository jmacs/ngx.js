
class Component {

    constructor() {
        this.entity = null;
    }

    initialize(entity) {
        this.entity = entity;
    }

    hydrate(state) {
    }

    destroy() {
        this.entity = null;
    }
}

export default Component;