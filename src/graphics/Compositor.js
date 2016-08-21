var Graphics = require('./Graphics');

var spriteBuffer = null;
var _layers = [];

function initialize() {

}

function addLayer(index, callback) {
    _layers.push({
        index: index || 0,
        draw: callback
    });
    _layers.sort(sortLayers);
}

function removeLayer(callback) {
    var n = _layers.indexOf(callback);
    if (n === -1) return;
    _layers.removeAt(n);
    _layers.sort(sortLayers);
}

function reset() {
    _layers.length = 0;
}

function clearScreen() {
    Graphics.clear();
}

function sortLayers(a, b) {
    return a.index - b.index;
}

function draw(delta) {
    for (var i = 0, l = _layers.length; i < l; i++) {
        _layers[i].draw(delta);
    }
}

module.exports = {
    addLayer: addLayer,
    removeLayer: removeLayer,
    clearScreen: clearScreen,
    reset: reset,
    draw: draw
};
