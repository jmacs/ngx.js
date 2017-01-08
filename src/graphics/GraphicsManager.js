var Graphics = require('./Graphics');
var Color = require('./Color');

var gl = null;
var _canvas = null;
var _glClearFlags;
var _sceneGraph;

function initialize() {

    gl = Graphics.createContext('webgl');

    _glClearFlags = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 1.0);

    var width = 1280;
    var height = 720;

    gl.canvas.width = width;
    gl.canvas.height = height;
    gl.viewport(0, 0, width, height);

    if (!_canvas) {
        _canvas = gl.canvas;
        document.body.appendChild(_canvas);
    }

}

function loadScene(scene) {
    // build scene graph
}

function unloadScene() {
    if (_sceneGraph) {
        _sceneGraph.dispose();
        _sceneGraph = null;
    }
}

function onGameClockDraw(delta) {
    _sceneGraph.update(delta);
}

function findNode(id) {
    return _sceneGraph.findNode(id);
}

function log() {
    console.log('SceneGraph: %o', _sceneGraph);
}

module.exports = {
    initialize: initialize,
    loadScene: loadScene,
    unloadScene: unloadScene,
    findNode: findNode,
    log: log
};
