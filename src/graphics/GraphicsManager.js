var GameClock = require('../core/GameClock');
var ResourceManager = require('../core/ResourceManager');
var Graphics = require('./Graphics');
var Color = require('./Color');
var Camera = require('./Camera');
var CameraRenderer = require('./CameraRenderer');

var gl = null;
var _canvas = null;
var _glClearFlags;
var _renderers = [];
var _renderersLength = 0;
var _cameras = Object.create(null);

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
    var renderers = ResourceManager.getResource('renderer');

    // create cameras
    for (var i = 0, l = scene.cameras.length; i < l; i++) {
        var sceneCamera = scene.cameras[i];

        var camera = Camera.create({
            name: sceneCamera.name,
            width: gl.canvas.width,
            height: gl.canvas.height,
            depth: i,
            backgroundColor: sceneCamera.backgroundColor,
            orthographic: sceneCamera.orthographic
        });

        if (camera.name === 'main') {
            var bclr = camera.backgroundColor;
            gl.clearColor(bclr[0], bclr[1], bclr[2], 1.0);
        }

        var rendererTypes = sceneCamera.renderers;

        for (var j = 0, m = rendererTypes.length; j < m; j++) {
            var Renderer = renderers.get(rendererTypes[j]);
            if (!Renderer) {
                console.error('Unknown renderer "%s" in camera "%s"', rendererTypes[j], camera.name);
                continue;
            }
            pushRenderer(Renderer, camera);
        }

        _cameras[camera.name] = camera;
    }
}

function pushRenderer(Renderer, camera) {
    var renderer = new Renderer(camera);
    _renderers.push(renderer);
    _renderersLength = _renderers.length;
}

function onSceneUnload() {
    for (var i = 0; i < _renderersLength; i++) {
        _renderers[i].dispose();
    }
    _cameras = Object.create(null);
    _renderers.length = 0;
    _renderersLength = 0;
}

function onGameClockDraw(delta) {
    for (var i = 0; i < _renderersLength; i++) {
        _renderers[i].draw(delta);
    }
}

function getCamera(name) {
    return _cameras[name];
}

function log() {
    console.log('cameras: %o', _cameras);
    console.log('commands: %o', _renderers);
}

module.exports = {
    getCamera: getCamera,
    initialize: initialize,
    log: log
};