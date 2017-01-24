
function ButtonActionState(element, action) {
    this.element = element;
    this.action = action;
    this.time = 0;
    this.pressed = false;
    this.lastDownTime = 0;
    this.lastUpTime = 0;
    this.prevDownTime = 0;
    this.prevUpTime = 0;
}

ButtonActionState.prototype.clear = function() {
    this.time = 0;
    this.pressed = false;
    this.lastDownTime = 0;
    this.lastUpTime = 0;
    this.prevDownTime = 0;
    this.prevUpTime = 0;
};

ButtonActionState.prototype.set = function(value, delta) {
    this.time += delta;

    if (this.pressed && !value) { // up
        this.prevDownTime = this.lastDownTime;
        this.lastDownTime = this.time;
        this.pressed = false;
        this.time = 0;
    } else if (!this.pressed && value) { // down
        this.prevUpTime = this.lastUpTime;
        this.lastUpTime = this.time;
        this.pressed = true;
        this.time = 0;
    }

};

// returns 1 if pressed, else 0
ButtonActionState.prototype.getValue = function() {
    return this.pressed ? 1.0 : 0.0;
};

// returns true if the button is pressed
ButtonActionState.prototype.isPressed = function() {
    return this.pressed;
};

// returns true if the button is currently pressed or
// if the button was last pressed within the specified window
ButtonActionState.prototype.wasPressed = function(win) {
    return this.pressed || this.time - win < 1;
};

// returns true on first frame the button is released
ButtonActionState.prototype.isUp = function() {
    return !this.pressed && this.time === 0;
};

// return true on first frame the button is pressed
ButtonActionState.prototype.isDown = function() {
    return this.pressed && this.time === 0;
};

// return true on first frame the button is released and the press time
// was longer than the specified time
ButtonActionState.prototype.isLongPressUp = function(time) {
    return !this.pressed && this.time === 0
        && this.lastDownTime > time;
};

// return true on first frame the button is released and the press time
// was shorter than the specified time
ButtonActionState.prototype.isShortPressUp = function(time) {
    return !this.pressed && this.time === 0
        && this.lastDownTime < time;
};

// return true if the button has been pressed greater than or equal to "time"
ButtonActionState.prototype.isHeld = function(time) {
    return this.pressed && this.time >= time;
};

// return true if the button has not been pressed greater than or equal to "time"
ButtonActionState.prototype.isReleased = function(time) {
    return !this.pressed && this.time >= time;
};

// returns true if the the button this is the first frame that
// the button is down and last press duration was less than "speed"
// and the time between button presses was less than the window "win"
ButtonActionState.prototype.isDoubleDown = function(speed, win) {
    return this.pressed && this.time === 0
        && this.lastDownTime < speed
        && this.lastUpTime < win;
};

// the last press duration must be less than "speed"
// and button release window is less than "win"
ButtonActionState.prototype.isDoubleUp = function(speed, win) {
    return !this.pressed && this.time === 0
        && this.lastUpTime < speed
        && this.lastDownTime < win;
};

ButtonActionState.prototype.isDoublePress = function(speed, win) {
    return false;
};

// ----====----===---===---===---===-----======

module.exports = ButtonActionState;