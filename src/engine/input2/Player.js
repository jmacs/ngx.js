const Controllers = require('./ControllerPool');

class Player {

    constructor(index) {
        this.index = index;
        this.name = 'player' + index;
        this.enabled = false;
        this.controller = null;
    }

    get actions() {
        return this.controller.actions;
    }


}

module.exports = Player;