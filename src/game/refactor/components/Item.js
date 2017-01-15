var Component = require('.././Component');

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

Item.id = 'item';

module.exports = Item;