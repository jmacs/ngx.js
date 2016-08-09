var events = Object.create(null);
var gl = null;
var canvas = null;

function getContext() {
    return gl;
}

function addEventListener(name, callback) {
    events[name] = events[name] || [];
    events[name].push(callback);
}

function trigger(name, args) {
    var callbacks = events[name] || [];
    for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](args);
    }
}

function createContext(contextType, contextAttributes) {
    if (window.gl) return gl;
    try {
        canvas = document.createElement('canvas');
        gl = canvas.getContext(contextType, contextAttributes);
        window.gl = gl;
        trigger('ContextCreated', {context: gl, canvas: canvas});
        return gl;
    } catch(ex) {
        console.error('unable to create WebGL rendering context: ', ex.message);
        return null;
    }
}

function addLineNumbers(src) {
    return src.split("\n").map(function(line, ndx) {
        return (ndx + 1) + ": " + line;
    }).join("\n");
}

function createProgram(vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var lastError = gl.getProgramInfoLog(program);
        var message = 'error in program linking: ' + lastError;
        gl.deleteProgram(program);
        trigger('GraphicsError', {message: message});
    }
    return program;
}

function deleteProgram(program) {
    gl.deleteProgram(program);
}

function createShader(shaderSource, isVertexShader) {
    var shaderBit = isVertexShader ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
    var shader = gl.createShader(shaderBit);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var lastError = gl.getShaderInfoLog(shader);
        var message = '\n*** Error compiling shader ***\n' + lastError + '\n\n' + addLineNumbers(shaderSource);
        gl.deleteShader(shader);
        trigger('GraphicsError', {message: message});
    }
    return shader;
}

function deleteShader(shader) {
    gl.deleteShader(shader);
}

function createTexture(image) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
}

function deleteTexture(texture) {
    gl.deleteTexture(texture);
}

module.exports = {
    createContext: createContext,
    addEventListener: addEventListener,
    getContext: getContext,
    createContext: createContext,
    createProgram: createProgram,
    deleteProgram: deleteProgram,
    createTexture: createTexture,
    deleteTexture: deleteTexture,
    createShader: createShader,
    deleteShader: deleteShader
};