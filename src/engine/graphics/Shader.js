var Graphics = require('./Graphics');

class Shader {

    constructor(name) {
        this.name = name;
        this.program = null;
        this.vertex = null;
        this.fragment = null;
    }
}

Shader.create = function(shaderData) {
    var vertex = Graphics.createShader(shaderData.vertex, true);
    var fragment = Graphics.createShader(shaderData.fragment, false);
    var program = Graphics.createProgram(vertex, fragment);

    var shader = new Shader(shaderData.name);
    shader.program = program;
    shader.vertex = vertex;
    shader.fragment = fragment;

    return shader;
};

Shader.delete = function(shader) {
    Graphics.deleteProgram(shader.program);
    Graphics.deleteShader(shader.vertex);
    Graphics.deleteShader(shader.fragment);
};

module.exports = Shader;