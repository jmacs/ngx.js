const DefaultInputConfig = require('./DefaultInputConfig');
const DefaultInputMapper = require('./DefaultInputMapper');

function cloneDefaultConfig() {
    return JSON.parse(JSON.stringify(DefaultInputConfig));
}

class Controller {

    constructor(index) {
        this.index = index;
        this.state = [];
        this.config = cloneDefaultConfig();
        this.map = DefaultInputMapper;
        this.clear();
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
        this.map(this);
    }

}

module.exports = Controller;
