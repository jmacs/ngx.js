var ResourceManager = require('../core/ResourceManager');
var Color = require('./Color');
var {vec3, mat4} = require('gl-matrix');

var _identity = 0;

class Camera {

    constructor() {
        this.__name = null;
        this.__aspect = 0;
        this.__backgroundColor = Color.create();
        this.__clearFlags = 0;
        this.__renderers = [];
        this.__renderersLength = 0;
        this.__depth = 0;
        this.__fieldOfView = 100;
        this.__nearClipPlane = 0;
        this.__farClipPlane = 0;
        this.__orthographic = false;
        this.__pixelWidth = 0;
        this.__pixelHeight = 0;
        this.__cameraToWorldMatrix = mat4.create();
        this.__worldToCameraMatrix = null;
        this.__projectionMatrix = mat4.create();
        this.__worldMatrix = mat4.create();
        this.__cameraPosition = vec3.create();
        this.__cameraScale = vec3.create();
        this.__cameraScale[0] = 1.0;
        this.__cameraScale[1] = 1.0;
        this.__cameraScale[2] = 1.0;
        this.__cameraRotation = 0.0;
        this.__dirty = true;
    }

    get name() {
        return this.__name;
    }

    get backgroundColor() {
        return this.__backgroundColor;
    }

    get renderers() {
        return this.__renderers;
    }

    get projectionMatrix() {
        return this.__projectionMatrix;
    }

    get worldMatrix() {
        return this.__worldMatrix;
    }

    setBackgroundColorHex(value) {
        Color.fromHex(this.__backgroundColor, value);
    }

    setClipPlane(near, far) {
        this.__nearClipPlane = near;
        this.__farClipPlane = far;
    }

    disableRenderer(index) {
        if (index >= this.__renderersLength) return;
        this.__renderers[index].enabled = false;
    }

    updatePerspective() {
        if (this.__orthographic) {
            mat4.ortho(this.__projectionMatrix,
                0,
                this.__pixelWidth,
                0,
                this.__pixelHeight,
                this.__nearClipPlane,
                this.__farClipPlane
            );
        } else {
            mat4.perspective(
                this.__projectionMatrix,
                this.__fieldOfView,
                this.__aspect,
                this.__nearClipPlane,
                this.__farClipPlane
            );
        }
        mat4.identity(this.__worldMatrix);
    }

    update() {
        if (!this.__dirty) return;
        var world = this.__worldMatrix;
        mat4.identity(world);
        mat4.translate(world, world, this.__cameraPosition);
        mat4.scale(world, world, this.__cameraScale);
        mat4.rotateZ(world, world, this.__cameraRotation);
        this.__dirty = false;
    }

    draw() {
        var renderers = this.__renderers;
        var length = this.__renderersLength;
        for (var i = 0; i < length; i++) {
            var renderer = renderers[i];
            if (renderer.enabled) {
                renderers[i].draw(this);
            }
        }
    }

    setPosition(x, y) {
        this.__cameraPosition[0] = x;
        this.__cameraPosition[1] = y;
        this.__dirty = true;
    }

    pan(x, y) {
        this.__cameraPosition[0] += x;
        this.__cameraPosition[1] += y;
        this.__dirty = true;
    }

    scale(x, y) {
        this.__cameraScale[0] += x;
        this.__cameraScale[1] += y;
        this.__dirty = true;
    }

    rotate(value) {
        this.__cameraRotation += value;
    }

}

Camera.create = function(options) {
    var width = options.width || 1024;
    var height = options.height || 768;
    var aspect = width / height;
    var backgroundColor = 0;

    _identity++;

    var camera = new Camera();
    camera.__name = options.name || 'camera' + _identity;
    camera.__depth = options.depth || 0;
    camera.__pixelWidth = width;
    camera.__pixelHeight = height;
    camera.__aspect = aspect;
    camera.__orthographic = options.orthographic || false;
    camera.__nearClipPlane = options.nearClipPlane || 0;
    camera.__farClipPlane = options.farClipPlane || 100;
    camera.__fieldOfView = options.fieldOfView || 45;
    camera.__cameraScale[0] = options.scaleX || 1.0;
    camera.__cameraScale[1] = options.scaleY || 1.0;
    camera.__cameraPosition[0] = options.x || 0.0;
    camera.__cameraPosition[1] = options.y || 0.0;

    if (!options.renderers) {
        throw new Error('Camera has no renderers defined: ' + camera.name);
    }

    var renderers = ResourceManager.getResource('renderer');
    var rendererTypes = options.renderers;

    for (var i = 0, l = rendererTypes.length; i < l; i++) {
        var RendererType = renderers.get(rendererTypes[i]);
        if (!RendererType) {
            console.error('Unknown renderer "%s"', rendererTypes[i]);
            continue;
        }
        camera.__renderers.push(new RendererType(camera));
    }
    camera.__renderersLength = camera.__renderers.length;

    if (options.backgroundColor instanceof String) {
        backgroundColor = parseInt(options.backgroundColor) || 0;
    } else {
        backgroundColor = options.backgroundColor || 0;
    }

    camera.setBackgroundColorHex(backgroundColor);

    camera.updatePerspective();

    return camera;
};

module.exports = Camera;
