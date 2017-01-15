class MouseState {

    constructor() {
        this.buttons = [];
        this.x = 0;
        this.y = 0;
        this.wheelY = 0;
        this.wheelX = 0;
        this.clear();
    }

    clear() {
        for (var i = 0; i < 3; i++) {
            this.buttons[i] = false;
        }
    }
}
module.exports = MouseState;