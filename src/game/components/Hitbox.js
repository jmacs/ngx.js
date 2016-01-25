import Component from '../../core/Component';
import Entity from '../../core/Entity.js';

class Hitbox extends Component {

    constructor() {
        super();
        this.x = 0.0;
        this.y = 0.0;
        this.h = 0.0;
        this.w = 0.0;
    }

    initialize(def) {
        this.value = def.value;
    }

    get bottom() {
        return this.y;
    }

    get left() {
        return this.x;
    }

    get top() {
        return this.y + this.h;
    }

    get right() {
        return this.x + this.w;
    }
}

Entity.addComponent('hitbox', Hitbox);