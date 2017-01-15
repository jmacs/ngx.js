const CameraManager = require('./CameraManager');
const Graphics = require('./Graphics');

module.exports = function GraphicsSystem(runtime) {
    const gl = Graphics.getContext();
    const GL_CLEAR_FLAGS = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
    const VIEWPORT_WIDTH = Graphics.getViewportWidth();
    const VIEWPORT_HEIGHT = Graphics.getViewportHeight();

    runtime.onInitialize(function () {
        gl.enable(gl.BLEND);
        gl.enable(gl.SCISSOR_TEST);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        CameraManager.initializeAllCameras();
    });

    runtime.onPreDraw(function () {
        gl.clearColor(0, 0, 0, 1.0);
        gl.scissor(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        gl.viewport(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        gl.clear(GL_CLEAR_FLAGS);
    });

    runtime.onDraw(function (delta) {
        var cameras = CameraManager.cameras();

        for (var i = 0, l = cameras.length; i < l; i++) {
            var camera = cameras[i];
            var color = camera.backgroundColor;
            var viewport = camera.viewport;

            gl.clearColor(color[0], color[1], color[2], 1.0);
            gl.scissor(viewport[0], viewport[1], viewport[2], viewport[3]);
            gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
            gl.clear(GL_CLEAR_FLAGS);

            camera.transform();
            camera.draw(delta);
        }

    });

    runtime.onFinalize(function () {
        CameraManager.destroyAllCameras();
    });

};
