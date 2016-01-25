import Component from '../../core/Component';
import Entity from '../../core/Entity.js';
import Color from '../../graphics/Color.js';
import Tileset from '../../graphics/Tileset.js';

class Sprite extends Component {

    constructor() {
        super();
        this.width = 32;
        this.height = 32;
        this.tileId = 0;
        this.color = new Color();
    }

    initialize(def) {
        if(def.width) {
            this.width = def.width;
        }
        if(def.height) {
            this.height = def.height;
        }
        if(def.color) {
            this.color.copy(def.color);
        }
        if(def.tileId) {
            this.tileId = def.tileId;
        }
    }

}

Entity.addComponent('sprite', Sprite);