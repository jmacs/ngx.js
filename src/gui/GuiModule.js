var ResourceManager = require('../core/ResourceManager');

// resources
var ControlResource = require('./ControlResource');
var GuiResource = require('./GuiResource');

function initialize() {

    ResourceManager.registerResources([
        new ControlResource(),
        new GuiResource()
    ]);

}

module.exports = {
    initialize: initialize
};