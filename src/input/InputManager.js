var _devices = Object.create(null);

function registerDevice(device) {
    _devices[device.type] = device;
}

function enableDevice(type) {
    if (_devices[type]) {
        _devices[type].enable();
        console.info('Input device enabled "%s"', type);
    } else {
        console.error('unknown device type "%s"', type);
    }
}

function disableDevice(type) {
    if (_devices[type]) {
        _devices[type].disable();
        console.info('Input device disabled "%s"', type);
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

export default {
    registerDevice: registerDevice,
    enableDevice: enableDevice,
    disableDevice: disableDevice,
    getDevice: getDevice,
};
