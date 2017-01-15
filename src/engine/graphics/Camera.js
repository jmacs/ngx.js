const Color = require('./Color');
const {vec3, mat4} = require('gl-matrix');

var _identity = 0;

class Camera {

    constructor(name) {
        _identity++;
        this.enabled = false;
        this.__id = _identity;
        this.__name = name || 'camera' + _identity;
        this.__aspect = 0;
        this.__backgroundColor = Color.create();
        this.__depth = 0;
        this.__fieldOfView = 100;
        this.__nearClipPlane = 0;
        this.__farClipPlane = 0;
        this.__orthographic = false;
        this.__viewport = [0,0,0,0];
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
        this.__renderLayers = [];
        this.__renderLayersLength = 0;
        this.__callbacks = Object.create(null);
        this.__dirty = true;
    }

    get name() {
        return this.__name;
    }

    get backgroundColor() {
        return this.__backgroundColor;
    }

    get viewport() {
        return this.__viewport;
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

    updatePerspective() {
        if (this.__orthographic) {
            mat4.ortho(this.__projectionMatrix,
                0,
                this.__viewport[2],
                0,
                this.__viewport[3],
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
        this.__dirty = true;
    }

    transform() {
        if (!this.__dirty) return;
        var world = this.__worldMatrix;
        mat4.identity(world);
        mat4.translate(world, world, this.__cameraPosition);
        mat4.scale(world, world, this.__cameraScale);
        mat4.rotateZ(world, world, this.__cameraRotation);
        this.__dirty = false;
    }

    setPosition(x, y) {
        this.__cameraPosition[0] = x;
        this.__cameraPosition[1] = y;
        this.__dirty = true;
    }

    setScale(x, y) {
        this.__cameraScale[0] = x;
        this.__cameraScale[1] = y;
        this.__dirty = true;
    }

    setRotation(value) {
        this.__cameraRotation = value;
        this.__dirty = true;
    }

    pan(x, y) {
        this.__cameraPosition[0] -= x;
        this.__cameraPosition[1] -= y;
        this.__dirty = true;
    }

    scale(x, y) {
        this.__cameraScale[0] += x;
        this.__cameraScale[1] += y;
        this.__dirty = true;
    }

    rotate(value) {
        this.__cameraRotation += value;
        this.__dirty = true;
    }

    draw(delta) {
        for (var i = 0, l = this.__renderLayersLength; i < l; i++) {
            this.__renderLayers[i].invoke(delta);
        }
    }

    __addRenderLayer(index, callback) {
        this.__renderLayers.push({
            index: index,
            invoke: callback
        });
        this.__renderLayersLength = this.__renderLayers.length;
        this.__renderLayers.sort(this.__sortByIndex);
    }

    __sortByIndex(a, b) {
        if (a.index < b.index) return -1;
        if (a.index > b.index) return 1;
        return 0;
    }

    __addCallback(name, callback) {
        this.__callbacks[name] = this.__callbacks[name] || [];
        this.__callbacks[name].push(callback);
    }

    triggerCallback(name) {
        var callbacks = this.__callbacks[name];
        if (!callbacks) return;
        for (var i = 0, l = callbacks.length; i < l; i++) {
            callbacks[i]();
        }
    }

    onInitialize(callback) {
        this.__addCallback('Initialize', callback);
    }

    onDrawLayer0(callback) {
        this.__addRenderLayer(1, callback);
    }

    onDrawLayer1(callback) {
        this.__addRenderLayer(2, callback);
    }

    onDrawLayer2(callback) {
        this.__addRenderLayer(3, callback);
    }

    onDrawLayer3(callback) {
        this.__addRenderLayer(4, callback);
    }

    onDestroy(callback) {
        this.__addCallback('Destroy', callback);
    }

    onShow(callback) {
        this.__addCallback('Show', callback);
    }

    onHide(callback) {
        this.__addCallback('Hide', callback);
    }
}

module.exports = Camera;