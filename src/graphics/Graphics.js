var gl = null;
var programs = Object.create(null);
var textures = Object.create(null);

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
    if(gl) return gl;
    try {
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        gl = canvas.getContext(contextType, contextAttributes);
        // refactor this out of here
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        // end
        return gl;
    } catch(ex) {
        console.error('unable to create WebGL rendering context: ', ex.message);
        return null;
    }
}

function createProgram(id, vertexSource, fragmentSource) {
    if(programs[id]) return programs[id];
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

function linkProgram(vertextShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertextShader);
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

function createTexture(id, src, callback) {
    if(textures[id]) return textures[id].handle;
    var image = new Image();
    image.id = id;
    image.callback = callback;
    image.onload = onTextureLoaded;
    image.onerror = onTextureLoadError;
    image.src = src;
}

function onTextureLoadError() {
    var image = this;
    image.callback(null, {message: 'error loading ' + image.src});
    image.callback = null;
    image.onload = null;
    image.onerror = null;
}

function onTextureLoaded() {
    var image = this;
    var texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    textures[image.id] = texture;

    image.onload = null;
    image.callback(true, null);
    image.callback = null;
    image.onload = null;
    image.onerror = null;
}

function setClearColor(color) {
    gl.clearColor(color.r, color.g, color.b, 1.0);
}

export default {
    getContext: getContext,
    getProgram: getProgram,
    getTexture: getTexture,
    setClearColor: setClearColor,
    createContext: createContext,
    createProgram: createProgram,
    createTexture: createTexture
};