const Controller = require('./Controller');

var _controllers = [null,null,null,null];

function createController(index) {
    var controller = new Controller(index);
    _controllers[index] = controller;
    return controller;
}

function destroyController(index) {
    _controllers[index] = null;
}

function getController(index) {
    return _controllers[index];
}

module.exports = {
    createController: createController,
    destroyController: destroyController,
    getController: getController
};
