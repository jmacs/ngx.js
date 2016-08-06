function KeyboardInfo() {
    this.type = 'keyboard';
    for (var i = 8; i < 223; i++) {
        this[i] = false;
    }
}

function MouseInfo() {
    this.x = 0;
    this.y = 0;
}

var keys = new KeyboardInfo();
var mouse = new MouseInfo();



function onKeyDown(event) {
    keys[event.keyCode] = true;
}

function onKeyUp(event) {
    keys[event.keyCode] = false;
}

function onMouseDown(event) {
    //mouse.right = true;
    //console.log(event);
}

function onMouseUp(event) {
    //mouse.right = false;
    //console.log(event);
}

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);

export default {
    keys: keys
}