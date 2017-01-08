var Component = require('.././Component');

class Door extends Component {

    constructor() {
        super();
        this.locked = false;
        this.exitZone = 0;
        this.exitDoor = 0;
        this.onUnlock = null;
    }

    hydrate(state) {
        if (state.exit) {
            this.exitZone = state.exit[0];
            this.exitDoor = state.exit[1];
        }
        if (state.locked) {
            this.locked = true;
        }
        if (state.onUnlock) {
            this.onUnlock = state.onUnlock;
        }
    }
}

Door.id = 'door';
module.exports = Door;