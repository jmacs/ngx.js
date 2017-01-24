const Controller = require('./Controller');

var _maxControllers = 4;
var _inputMappers = [];
var _controllers = [null,null,null,null];

function setMaxControllers(num) {
    if (num < 0) num = 0;
    if (num > 4) num = 4;
    _maxControllers = num;
}

function createController(index) {
    if (index > _maxControllers - 1) return;
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
            controller.gamepadMapper = inputMapper.map;
            console.debug('Assigned controller %s to %s mapper', index, inputMapper.name);
        }
    }
}

function unassignGamepadMapper(index) {
    var controller = _controllers[index];
    if (!controller) return;
    controller.unmapGamepad();
    if (!controller.keepAlive) {
        _controllers[index] = null;
    }
}

module.exports = {
    setMaxControllers: setMaxControllers,
    createController: createController,
    destroyController: destroyController,
    getController: getController,
    getControllers: getControllers,
    registerInputMappers: registerInputMappers,
    assignGamepadInputMapper: assignGamepadInputMapper,
    unassignGamepadMapper: unassignGamepadMapper
};
