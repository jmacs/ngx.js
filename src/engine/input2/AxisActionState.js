
function ActionAxisState(action) {
    this.action = action;
    this.time = 0;
    this.pressed = false;
    this.lastDownTime = 0;
    this.lastUpTime = 0;
    this.prevDownTime = 0;
    this.prevUpTime = 0;
}

module.exports = ActionAxisState;