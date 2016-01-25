import Component from '../../core/Component';
import Entity from '../../core/Entity.js';

class Position extends Component {

    constructor() {
        super();
        this.xy = [0.0, 0.0];
    }

    initialize(def) {
        if(def.xy) {
            this.xy[0] = def.xy[0];
            this.xy[1] = def.xy[1];
        }
    }
}

Entity.addComponent('position', Position);