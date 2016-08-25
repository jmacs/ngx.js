var GameClock = require('../core/GameClock');
var Graphics = require('./Graphics');
var Color = require('./Color');
var Camera = require('./Camera');

var gl = null;
var _canvas = null;
var _glClearFlags;
var _cameras = [];
var _renderers = [];
var _renderersLength = 0;

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

    GameClock.onDraw(onGameClockDraw);
    GameClock.addEventListener('SceneLoad', onSceneLoad);
    GameClock.addEventListener('SceneUnload', onSceneUnload);
}

function onSceneLoad(scene) {

    // create cameras
    for (var i = 0, l = scene.cameras.length; i < l; i++) {
        var sceneCamera = scene.cameras[i];

        var camera = Camera.create({
            name: sceneCamera.name,
            width: gl.canvas.width,
            height: gl.canvas.height,
            depth: 0,
            backgroundColor: sceneCamera.backgroundColor,
            orthographic: sceneCamera.orthographic,
            renderers: sceneCamera.renderers
        });

        if (camera.name === 'main') {
            var bclr = camera.backgroundColor;
            gl.clearColor(bclr[0], bclr[1], bclr[2], 1.0);
        }

        // build render stack
        var renderers = camera.renderers;

        for (var j = 0, m = renderers.length; j < m; j++) {
            var renderer = renderers[j];
            _renderers.push(renderer);
        }
    }

    _renderersLength = _renderers.length;
}

function onSceneUnload() {
    for (var i = 0; i < _renderersLength; i++) {
        _renderers[i].dispose();
    }
    _cameras.length = 0;
    _renderers.length = 0;
    _renderersLength = 0;
}

function onGameClockDraw(delta) {
    gl.clear(_glClearFlags);

    for (var i = 0; i < _renderersLength; i++) {
        var renderer = _renderers[i];
        if (renderer.enabled) {
            renderer.draw(delta);
        }
    }

}

function log() {
    console.log('cameras: %o', _cameras);
    console.log('renderers: %o', _renderers);
}

module.exports = {
    initialize: initialize,
    log: log
};