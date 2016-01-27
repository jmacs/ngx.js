import Component from '../../core/Component';
import Entity from '../../core/Entity.js';

class Item extends Component {

    constructor() {
        super();
        this.type = 0;
    }

    hydrate(state) {
        if (state.type) {
            this.type = state.type;
        }
    }
}

Entity.addComponent('item', Item);