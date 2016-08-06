var gl = null;
var canvas = null;
var programs = Object.create(null);
var textures = Object.create(null);

createContext('webgl');

function getContext() {
    return gl;
}

function getProgram(id) {
    return programs[id] || null;
}

function getTexture(id) {
    return textures[id] || null;
}

function createContext(contextType, contextAttributes) {
    if (window.gl) return gl;
    try {
        canvas = document.createElement('canvas');
        gl = canvas.getContext(contextType, contextAttributes);
        window.gl = gl;
        return gl;
    } catch(ex) {
        console.error('unable to create WebGL rendering context: ', ex.message);
        return null;
    }
}

function createProgram(id, vertexSource, fragmentSource) {
    if (programs[id]) return programs[id];
    var vertexShader = compileShaderSource(vertexSource, gl.VERTEX_SHADER);
    var fragmentShader = compileShaderSource(fragmentSource, gl.FRAGMENT_SHADER);
    var program = linkProgram(vertexShader, fragmentShader);
    programs[id] = program;
    return program;
}

function compileShaderSource(shaderSource, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var lastError = gl.getShaderInfoLog(shader);
        var message = '\n*** Error compiling shader ***\n' + lastError + '\n\n' + addLineNumbers(shaderSource);
        gl.deleteShader(shader);
        throw new Error(message);
    }
    return shader;
}

function linkProgram(vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var lastError = gl.getProgramInfoLog(program);
        var message = 'error in program linking: ' + lastError;
        gl.deleteProgram(program);
        throw new Error(message);
    }
    return program;
}

function addLineNumbers(src) {
    return src.split("\n").map(function(line, ndx) {
        return (ndx + 1) + ": " + line;
    }).join("\n");
}

function createTexture(tex, src) {
    return new Promise(function(resolve, reject) {
        var image = new Image();
        image.onload = function() {
            image.onload = null;
            image.onerror = null;
            var texture = onImageLoaded(tex, image);
            resolve(texture);
        };
        image.onerror = function() {
            image.onload = null;
            image.onerror = null;
            reject(src);
        };
        image.src = src;
    });
}

function onImageLoaded(tex, image) {
    var texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    textures[tex] = texture;
    return texture;
}

export default {
    getContext: getContext,
    getProgram: getProgram,
    getTexture: getTexture,
    createContext: createContext,
    createProgram: createProgram,
    createTexture: createTexture
};