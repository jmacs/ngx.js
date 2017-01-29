

class Player {

    constructor(index) {
        this.index = index;
        this.name = 'player' + index;
        this.enabled = false;
        this.controller = null;
        this.controllerMap = 0;
        this.actions = null;
    }

}

// player.actions[0].isPressed();

module.exports = Player;