global.expect = require('chai').expect;
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