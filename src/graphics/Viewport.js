var Graphics = require('./Graphics.js');
var Color = require('./Color');
var {mat4} = require('gl-matrix');

const DEFAULT_ZOOM = 1;
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

var iMatrix = mat4.create();
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
var fov = 100;

function initialize(options) {
    var gl = Graphics.getContext();



    width = options.width || DEFAULT_WIDTH;
    height = options.height || DEFAULT_HEIGHT;
    aspect = width / height;

    gl.canvas.width = width;
    gl.canvas.height = height;
    gl.viewport(0, 0, width, height);

    mat4.identity(iMatrix);

    // screen space
    //mat4.ortho(iMatrix, 0, width, 0, height, 0, 100);
    //mat4.scale(iMatrix, iMatrix, [1, -1, 1]); // flip y

    // projection (screen space)
    //mat4.perspective(pMatrix, 45, aspect, 0, 100); // works
    mat4.ortho(pMatrix, 0, width, 0, height, 0, 100);
    //ortho(out, left, right, bottom, top, near, far)
    //pMatrix[5] = -pMatrix[5];
    //mat4.scale(pMatrix, pMatrix, [-1, 1, 1]);

    isDirty = true;
    if (!canvas) {
        canvas = gl.canvas;
        document.body.appendChild(canvas);
    }

    //zoomTo(256);
    //lookAt(0, 0);
}

function getIdentityMatrix() {
    return iMatrix;
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
var arrayPos = [0, 0, 0];
var arrayScale = [1, 1, 1];

function transform() {
    if (!isDirty) return;
    arrayPos[0] = -posX;
    arrayPos[1] = -posY;
    arrayScale[0] = zoomFactor;
    arrayScale[1] = zoomFactor;
    mat4.identity(vMatrix);
    mat4.translate(vMatrix, vMatrix, arrayPos);
    mat4.scale(vMatrix, vMatrix, arrayScale);
    mat4.rotateZ(vMatrix, vMatrix, rotationAngle);
    isDirty = false;
}

function getWidth() {
    return width;
}

function getHeight() {
    return height;
}

module.exports = {
    getWidth: getWidth,
    getHeight: getHeight,
    lookAt: lookAt,
    pan: pan,
    zoom: zoom,
    zoomTo: zoomTo,
    angle: angle,
    rotate: rotate,
    initialize: initialize,
    transform: transform,
    getIdentityMatrix: getIdentityMatrix,
    getProjectionMatrix: getProjectionMatrix,
    getModelViewMatrix: getModelViewMatrix
};
