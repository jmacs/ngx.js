
class KeyboardState {

    constructor() {
        this.keys = [];
        this.clear();
    }

    clear() {
        for (var i = 0; i < 223; i++) {
            this.keys[i] = false;
        }
    }
}

module.exports = KeyboardState;