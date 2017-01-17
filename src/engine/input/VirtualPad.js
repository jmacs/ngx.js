const NOOP = function () {};

class VirtualPad {

    constructor(index) {
        this.index = index;
        this.state = [];
        this.clear();
        this.onSyncKeyboardState = NOOP;
        this.onSyncGamepadState = NOOP;
    }

    clear() {
        var state = this.state;
        state[0] = 0.0;
        state[1] = 0.0;
        state[2] = 0.0;
        state[3] = 0.0;
        state[4] = 0.0;
        state[5] = 0.0;
        state[6] = 0.0;
        state[7] = 0.0;
        state[8] = 0.0;
        state[9] = 0.0;
        state[10] = 0.0;
        state[11] = 0.0;
        state[12] = 0.0;
        state[13] = 0.0;
        state[14] = 0.0;
        state[15] = 0.0;
        state[16] = 0.0;
        state[17] = 0.0;
    }

    sync() {
        this.clear();
        this.onSyncKeyboardState(this);
        this.onSyncGamepadState(this);
    }

}

module.exports = VirtualPad;
