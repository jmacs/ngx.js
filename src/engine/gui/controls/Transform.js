var SceneNode = require('../SceneNode');
var Rectangle = require('../Rectangle');
var {vec3,mat4} = require('gl-matrix');

class Transform extends SceneNode {

    constructor() {
        super();
        this.__dirty = true;
        this.__fieldOfView = 45;
        this.__nearClipPlane = 0;
        this.__farClipPlane = 100;
        this.__orthographic = false;
        this.__viewport = new Rectangle();
        this.__projectionMatrix = mat4.create();
        this.__modelMatrix = mat4.create();
        this.__position = vec3.create();
        this.__scale = vec3.create();
        this.__scale[0] = 1.0;
        this.__scale[1] = 1.0;
        this.__scale[2] = 1.0;
        this.__rotation = 0.0;
    }

    onInitialize(state) {

        // calculate pixel location of viewport
        this.__calculateScreenRectangle(
            this.__viewport,
            state.screenWidth,
            state.screenHeight
        );

        // set perspective
        if (this.__orthographic) {
            mat4.ortho(
                this.__projectionMatrix,
                0,
                this.__viewport.width,
                0,
                this.__viewport.height,
                this.__nearClipPlane,
                this.__farClipPlane
            );
        } else {
            mat4.perspective(
                this.__projectionMatrix,
                this.__fieldOfView,
                this.__viewport.aspect,
                this.__nearClipPlane,
                this.__farClipPlane
            );
        }
    }

    onUpdate(state) {
        var local = this.__modelMatrix;
        var world = state.model;

        if (this.__dirty) {
            mat4.identity(local);
            mat4.translate(local, local, this.__position);
            mat4.scale(local, local, this.__scale);
            mat4.rotateZ(local, local, this.__rotation);
            this.__dirty = false;
        }

        mat4.multiply(world, world, local);
        mat4.copy(state.projection, this.__projectionMatrix);
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

    onReadXml(xml) {
        this.__orthographic = xml.getAttribute('type') === 'orthographic';
        this.__nearClipPlane = xml.getAttribute('near') || this.__nearClipPlane;
        this.__farClipPlane = xml.getAttribute('far') || this.__farClipPlane;
        this.__fieldOfView = xml.getAttribute('fov') || this.__fieldOfView;
    }

    __calculateScreenRectangle(rectangle, width, height) {
        const ratio = 12;

        rectangle.x = 0;
        rectangle.y = 0;
        rectangle.width = 0;
        rectangle.height = 0;

        if (this.__x) {
            rectangle.x = width / (ratio / this.__x);
        }

        if (this.__y) {
            rectangle.y = height / (ratio / this.__y);
        }

        if (this.__width) {
            rectangle.width = width / (ratio / this.__width);
        }

        if (this.__height) {
            rectangle.height = height / (ratio / this.__height);
        }
    }
}

module.exports = Transform;
