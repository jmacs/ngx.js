var Graphics = require('./Graphics.js');
var Color = require('./Color.js');
var {mat4} = require('gl-matrix');

const DEFAULT_ZOOM = 500.0;
const MAX_ZOOM = 100.0;
const MIN_ZOOM = 0;
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

var pMatrix = mat4.create();
var vMatrix = mat4.create();
var posX = 0.0;
var posY = 0.0;
var width = 0;
var height = 0;
var aspect = 0;
var rotationAngle = 0.0;
var zoomFactor = DEFAULT_ZOOM;
var isDirty = true;
var canvas = null;

function initialize(options) {
    var gl = Graphics.getContext();
    var color = Color.fromHex(0x75ffff);

    Graphics.setOptions({
        glClear: gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT
    });

    gl.enable(gl.BLEND);
    gl.clearColor(color.r, color.b, color.g, 1.0);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    width = options.width || DEFAULT_WIDTH;
    height = options.height || DEFAULT_HEIGHT;
    aspect = width / height;

    gl.canvas.width = width;
    gl.canvas.height = height;
    gl.viewport(posX, posY, width, height);

    isDirty = true;
    if (!canvas) {
        zoomFactor = width;
        canvas = gl.canvas;
        document.body.appendChild(canvas);
    }

    zoomTo(256);
    lookAt(150, 100);
}

function getProjectionMatrix() {
    return pMatrix;
}

function getModelViewMatrix() {
    return vMatrix;
}

function lookAt(x, y) {
    posX = x;
    posY = y;
    isDirty = true;
}

function zoomTo(value) {
    zoomFactor = value;
    isDirty = true;
}

function pan(x, y) {
    posX += x;
    posY += y;
    isDirty = true;
}

function zoom(value) {
    zoomFactor += value;
    isDirty = true;
}

function angle(value) {
    rotationAngle = value;
    isDirty = true;
}

function rotate(value) {
    rotationAngle += value;
    isDirty = true;
}

function transform() {
    if (!isDirty) return;
    mat4.perspective(pMatrix, 45, aspect, 0, 100);
    mat4.identity(vMatrix);
    mat4.translate(vMatrix, vMatrix, [-posX, -posY, -zoomFactor]);
    mat4.rotateZ(vMatrix, vMatrix, rotationAngle);
    isDirty = false;
}

function clear() {
    Graphics.clear(clearbit);
}

module.exports = {
    lookAt: lookAt,
    pan: pan,
    zoom: zoom,
    zoomTo: zoomTo,
    angle: angle,
    rotate: rotate,
    initialize: initialize,
    transform: transform,
    clear: clear,
    getProjectionMatrix: getProjectionMatrix,
    getModelViewMatrix: getModelViewMatrix
};
