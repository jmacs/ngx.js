global.assert = require('chai').assert;
global.__root = __dirname.replace('/test', '');
global._require = function(name) {
    return require(global.__root + '/' + name);
};

function noop() {}

global.window = {
    addEventListener: noop
};

global.document = {
    addEventListener: noop
};

_require('src/core/Arrays');
