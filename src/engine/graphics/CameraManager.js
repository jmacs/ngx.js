const ResourceManager = require('../resources/ResourceManager');
const Graphics = require('./Graphics');
const Camera = require('./Camera');

var _cameraHash = Object.create(null);
var _cameraArray = [];

function get(name) {
    return _cameraHash[name];
}

function cameras() {
    return _cameraArray;
}

function clear() {
    _cameraHash = Object.create(null);
    _cameraArray.length = 0;
}

function createCamera(options) {
    var viewportUnit = options.rectangle || [0, 0, 12, 12];

    var viewport = [0, 0, 0, 0];
    viewport[0] = Graphics.getHorizontalPx(viewportUnit[0]);
    viewport[1] = Graphics.getVerticalPx(viewportUnit[1]);
    viewport[2] = Graphics.getHorizontalPx(viewportUnit[2]);
    viewport[3] = Graphics.getVerticalPx(viewportUnit[3]);

    var aspect = viewport[2] / viewport[3];
    var backgroundColor = 0;

    var camera = new Camera(options.name);
    camera.__depth = options.depth || 0;
    camera.__viewport = viewport;
    camera.__aspect = aspect;
    camera.__orthographic = options.orthographic || false;
    camera.__nearClipPlane = options.nearClipPlane || 0;
    camera.__farClipPlane = options.farClipPlane || 100;
    camera.__fieldOfView = options.fieldOfView || 45;
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

    camera.updatePerspective();

    _cameraHash[camera.name] = camera;
    _cameraArray.push(camera);

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

    return camera;
}

module.exports = {
    get: get,
    cameras: cameras,
    clear: clear,
    createCamera: createCamera
};
