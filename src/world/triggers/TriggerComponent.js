var Component = require('../../core/Component');

class TriggerComponent extends Component {

    constructor() {
        super();
        this.event = null;
        this.data = null;
    }

    hydrate(state) {
        this.event = state.event || null;
        this.data = state.data || null;
    }
}

TriggerComponent.id = 'trigger';

module.exports = TriggerComponent;