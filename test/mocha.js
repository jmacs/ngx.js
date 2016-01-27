global.assert = require('chai').assert;

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

require('../dist/game.bundle');

global.GameModules = window.GameModules;