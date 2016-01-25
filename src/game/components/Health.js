import Component from '../../core/Component';
import Entity from '../../core/Entity.js';

class Health extends Component {

    constructor() {
        super();
        this.value = 0;
    }

    initialize(def) {
        this.value = def.value;
    }
}

Entity.addComponent('health', Health);