global.assert = require('chai').assert;
global.__root = __dirname.replace('/test', '');

global.rootRequire = function(name) {
    return require(global.__root + '/' + name);
};

// TODO: refactor out all global references to window in src

var noop = function() {};

var window = {};
window.addEventListener = noop;

var document = {};
document.addEventListener = noop;

var gl = {};
gl.FLOAT = 0;

global.window = window;
global.document = document;
window.gl = gl;
global.gl = gl;

rootRequire('src/core/Arrays');
