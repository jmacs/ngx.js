import Component from '../../core/Component.js';
import Entity from '../../core/Entity.js';

const ZERO = 0.0;

class Input extends Component {

    constructor() {
        super();
        this.index = 0;
        this.human = false;
        this.up = ZERO;
        this.down = ZERO;
        this.left = ZERO;
        this.right = ZERO;
    }

    initialize(def) {
        if(def.index) {
            this.index = def.index;
        }
        if(def.human) {
            this.human = def.human;
        }
    }
}

Entity.addComponent('input', Input);