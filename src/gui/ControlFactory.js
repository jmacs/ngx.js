var ResourceManager = require('../core/ResourceManager');
var Control = require('./Control');

function create(node) {

    var control = instantiateControl(node.tagName);
    control.readXml(node);

    for (var i = 0, l = node.children.length; i < l; i++) {
        var child = create(node.children[i]);
        control.addControl(child);
    }

    return control;
}

function instantiateControl(name) {
    if (name.toUpperCase() === 'CONTROL') {
        return new Control();
    }
    var ControlClass = ResourceManager.get('control', name.toUpperCase());
    if (!ControlClass) {
        throw new Error('Unregistered control: ' + name);
    }
    return new ControlClass();
}

module.exports = {
    create: create
};
