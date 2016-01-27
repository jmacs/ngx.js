import Component from '../../core/Component';
import Entity from '../../core/Entity.js';

class Health extends Component {

    constructor() {
        super();
        this.value = 0;
        this.onKill = null;
    }

    hydrate(state) {
        if (state.value) {
            this.value = state.value;
        }
        if (state.onKill) {
            this.onKill = state.onKill;
        }
    }
}

Entity.addComponent('health', Health);