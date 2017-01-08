var _devices = Object.create(null);

function registerDevice(device) {
    _devices[device.type] = device;
}

function enableDevice(type) {
    if (_devices[type]) {
        _devices[type].enable();
        console.debug('Input device enabled "%s"', type);
    } else {
        console.error('unknown device type "%s"', type);
    }
}

function disableDevice(type) {
    if (_devices[type]) {
        _devices[type].disable();
        console.debug('Input device disabled "%s"', type);
    } else {
        console.error('unknown device type "%s"', type);
    }
}

function getDevice(type) {
    if (_devices[type]) {
        return _devices[type];
    } else {
        console.error('unknown device type "%s"', type);
        return null;
    }
}

module.exports = {
    registerDevice: registerDevice,
    enableDevice: enableDevice,
    disableDevice: disableDevice,
    getDevice: getDevice,
};
