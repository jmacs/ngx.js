var Graphics = require('./Graphics');
var Renderer = require('./Renderer');

class CameraRenderer extends Renderer {

    constructor(camera) {
        super();
        this.__setClearColor = true;
        this.__camera = camera;
        this.__context = Graphics.getContext();
    }

    draw() {
        var camera = this.__camera;
        var gl = this.__context;

        camera.transform();

        if (camera.__depth === 0) {

            //todo: fix this mess
            if (this.__setClearColor) {
                var color = camera.backgroundColor;
                gl.clearColor(color[0], color[1], color[2], 1.0);
                this.__setClearColor = false;
            }

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }

        // todo: use glClear glScissor and glViewport
    }

}
module.exports = CameraRenderer;
