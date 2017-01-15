var Component = require('.././Component');

class Health extends Component {

    constructor() {
        super();
        this.value = 0;
        this.onKill = null;
    }

    hydrate(state) {
        if (state.value) {
            this.value = state.value;
        }
        if (state.onKill) {
            this.onKill = state.onKill;
        }
    }
}

Health.id = 'health';

module.exports = Health;