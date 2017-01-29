
function ActionAxisState(action) {
    this.action = action;
    this.time = 0;
    this.pressed = false;
    this.lastDownTime = 0;
    this.lastUpTime = 0;
    this.prevDownTime = 0;
    this.prevUpTime = 0;
}

ActionAxisState.prototype.set = function(value, delta) {
    this.time += delta;
    this.value = value;

    if (this.pressed && !value) { // not moving
        this.prevDownTime = this.lastDownTime;
        this.lastDownTime = this.time;
        this.pressed = false;
        this.time = 0;
    } else if (!this.pressed && value) { // moving
        this.prevUpTime = this.lastUpTime;
        this.lastUpTime = this.time;
        this.pressed = true;
        this.time = 0;
    }

};

module.exports = ActionAxisState;