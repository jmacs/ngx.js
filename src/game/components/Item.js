import Component from '../../core/Component';

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

export default Item;