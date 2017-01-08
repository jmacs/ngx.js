var Component = require('.././Component.js');

class InputComponent extends Component {

    constructor() {
        super();
        this.index = 0;
        this.human = false;
        this.up = 0.0;
        this.down = 0.0;
        this.left = 0.0;
        this.right = 0.0;
    }

    hydrate(state) {
        if (state.index) {
            this.index = state.index;
        }
        if (state.human) {
            this.human = state.human;
        }
    }
}

InputComponent.id = 'input';

module.exports = InputComponent;