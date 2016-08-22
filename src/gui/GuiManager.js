var ResourceManager = require('../core/ResourceManager');
var ControlFactory = require('./ControlFactory');
var Screen = require('./Screen');
var Viewport = require('../graphics/Viewport');

var _screen = new Screen();

function loadGui(name) {
    _screen.setViewportSize(Viewport.getWidth(), Viewport.getHeight());

    var gui = ResourceManager.get('gui', name);
    var root = gui.children.length && gui.children[0];

    for (var i = 0, l = root.children.length; i < l; i++) {
        var control = ControlFactory.create(root.children[i]);
        _screen.addControl(control);
    }

    _screen.update();

    return _screen;
}

function render() {

}

function log() {
    console.log(_screen);
}

module.exports = {
    loadGui: loadGui,
    log: log
};
