const Component = require('../composition/Component');
const Color = require('../graphics/Color');

class SpriteComponent extends Component {

    constructor() {
        super();
        this.width = 32;
        this.height = 32;
        this.tid = 0;
        this.color = Color.create();
    }

    hydrate(state) {
        if (state.width) {
            this.width = state.width;
        }
        if (state.height) {
            this.height = state.height;
        }
        if (state.color) {
            this.color.copy(state.color);
        }
        if (state.tid) {
            this.tid = state.tid;
        }
    }

}

SpriteComponent.id = 'sprite';

module.exports = SpriteComponent;