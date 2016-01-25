import Graphics from './Graphics.js';
import {mat4} from 'gl-matrix';

const DEFAULT_ZOOM = 500.0;
const MAX_ZOOM = 100.0;
const MIN_ZOOM = 0;

var pMatrix = mat4.create();
var vMatrix = mat4.create();

var posX = 0.0;
var posY = 0.0;

var width = 1280;//gl.canvas.clientWidth;
var height = 720;//gl.canvas.clientHeight;
var aspect = width /  height;

var zoomFactor = DEFAULT_ZOOM;
var rotationAngle = 0.0;

var isDirty = true;

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

function move(x, y) {
    posX += x;
    posY += y;
    isDirty = true;
}

function zoom(value) {
    zoomFactor += value;
    if(zoomFactor > MAX_ZOOM) {
        zoomFactor = MAX_ZOOM;
    }
    isDirty = true;
}

function rotate(value) {
    rotationAngle += value;
    isDirty = true;
}

function initialize() {
    var gl = Graphics.getContext();
    gl.canvas.width = width;
    gl.canvas.height = height;
    gl.viewport(posX, posY, width, height);
    isDirty = true;
}

function transform() {
    if(!isDirty) return;
    mat4.perspective(pMatrix, 45, aspect, 0, 100);
    mat4.identity(vMatrix);
    mat4.translate(vMatrix, vMatrix, [-posX, -posY, -1280]);
    //mat4.rotateZ(vMatrix, vMatrix, rotationAngle);
    isDirty = false;
}

export default {
    lookAt: lookAt,
    move: move,
    zoom: zoom,
    rotate: rotate,
    initialize: initialize,
    transform: transform,
    getProjectionMatrix: getProjectionMatrix,
    getModelViewMatrix: getModelViewMatrix
}