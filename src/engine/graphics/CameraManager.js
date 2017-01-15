const ResourceManager = require('../resources/ResourceManager');
const Graphics = require('./Graphics');
const Camera = require('./Camera');

var _cameras = Object.create(null);
var _enabledCameras = [];

function get(name) {
    return _cameras[name];
}

function cameras() {
    return _enabledCameras;
}

function clear() {
    _cameras = Object.create(null);
    _enabledCameras.length = 0;
}

function showCamera(name) {
    var camera = _cameras[name];
    if (!camera) return;
    var n = _enabledCameras.indexOf(camera);
    if (n > -1) return;
    _enabledCameras.push(camera);
    camera.enabled = true;
    camera.triggerCallback('Show');
    _enabledCameras.sort(sortByDepth);
}

function hideCamera(name) {
    var camera = _cameras[name];
    if (!camera) return;
    var n = _enabledCameras.indexOf(camera);
    if (n === -1) return;
    _enabledCameras.splice(n, 1);
    camera.enabled = false;
    camera.triggerCallback('Hide');
}

function sortByDepth(a, b) {
    if (a.__depth < b.__depth) return -1;
    if (a.__depth > b.__depth) return 1;
    return 0;
}

function destroyCamera(name) {
    var camera = _cameras[name];
    if (!camera) return;
    camera.triggerCallback('Destroy');
    var n = _enabledCameras.indexOf(camera);
    if (n === -1) return;
    _enabledCameras.splice(n, 1);
    delete _cameras[name];
}

function createCamera(options) {
    var viewportUnit = options.rectangle || [0, 0, 12, 12];
    var backgroundColor = 0;
    var camera = new Camera(options.name);

    camera.__depth = options.depth || 0;

    camera.__viewport[0] = Graphics.getHorizontalPx(viewportUnit[0]);
    camera.__viewport[1] = Graphics.getVerticalPx(viewportUnit[1]);
    camera.__viewport[2] = Graphics.getHorizontalPx(viewportUnit[2]);
    camera.__viewport[3] = Graphics.getVerticalPx(viewportUnit[3]);

    camera.__aspect = camera.__viewport[2] / camera.__viewport[3];

    camera.__orthographic = options.orthographic || false;
    camera.__nearClipPlane = options.nearClipPlane || 0;
    camera.__farClipPlane = options.farClipPlane || 100;
    camera.__fieldOfView = options.fieldOfView || 45;
    camera.updatePerspective();

    camera.__cameraScale[0] = options.scaleX || 1.0;
    camera.__cameraScale[1] = options.scaleY || 1.0;

    camera.__cameraPosition[0] = options.x || 0.0;
    camera.__cameraPosition[1] = options.y || 0.0;

    if (typeof options.clearColor === 'string') {
        backgroundColor = parseInt(options.clearColor, 16) || 0;
    } else {
        backgroundColor = options.clearColor || 0;
    }

    camera.setBackgroundColorHex(backgroundColor);

    _cameras[camera.name] = camera;

    if (options.scripts) {
        var scripts = options.scripts ;
        for (var i = 0, l = scripts.length; i < l; i++) {
            var script = ResourceManager.get('script', scripts[i]);
            if (!script) {
                console.warn('unknown camera script: %s', scripts[i]);
                continue;
            }
            script(camera);
        }
    }

    camera.triggerCallback('Initialize');

    if (options.enabled) {
        showCamera(camera.name);
    }

    return camera;
}

module.exports = {
    get: get,
    clear: clear,
    cameras: cameras,
    showCamera: showCamera,
    hideCamera: hideCamera,
    createCamera: createCamera,
    destroyCamera: destroyCamera
};
