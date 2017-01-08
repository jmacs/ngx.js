var ResourceManager = require('../core/ResourceManager');
var ControlFactory = require('./../SceneGraphFactory');
var Screen = require('././Screen');
var Graphics = require('../graphics/Graphics');

var _screen = new Screen();

function loadGui(name) {
    var canvas = Graphics.getCanvas();

    _screen.setViewportSize(canvas.width, canvas.height);

    var gui = ResourceManager.get('gui', name);
    var root = gui.children.length && gui.children[0];

    for (var i = 0, l = root.children.length; i < l; i++) {
        var control = ControlFactory.create(root.children[i]);
        _screen.addControl(control);
    }

    _screen.update();

    return _screen;
}

function log() {
    console.log(_screen);
}

module.exports = {
    loadGui: loadGui,
    log: log
};
