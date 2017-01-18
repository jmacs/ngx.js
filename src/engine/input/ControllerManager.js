const Controller = require('./Controller');

const NOOP = function () {};

var _inputMappers = [];
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

function getControllers() {
    return _controllers;
}

function registerInputMappers(mappers) {
    for (var i = 0, l = mappers.length; i < l; i++) {
        _inputMappers.push(mappers[i]);
    }
}

function assignGamepadInputMapper(index, id) {
    var controller = _controllers[index] || createController(index);
    for (var i = 0, l = _inputMappers.length; i < l; i++) {
        var inputMapper = _inputMappers[i];
        if (inputMapper.match(id)) {
            controller.id = id;
            controller.type = inputMapper.name;
            controller.gamepadMapper = inputMapper.map;
            console.debug('Assigned controller %s to %s mapper', index, inputMapper.name);
        }
    }
}

function unassignGamepadMapper(index) {
    var controller = _controllers[index];
    if (controller) {
        controller.id = null;
        controller.type = null;
        controller.gamepadMapper = NOOP;
        if (!controller.keepAlive) {
            _controllers[index] = null;
        }
    }
}

module.exports = {
    createController: createController,
    destroyController: destroyController,
    getController: getController,
    getControllers: getControllers,
    registerInputMappers: registerInputMappers,
    assignGamepadInputMapper: assignGamepadInputMapper,
    unassignGamepadMapper: unassignGamepadMapper
};
