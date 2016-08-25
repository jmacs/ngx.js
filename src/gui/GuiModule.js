var ResourceManager = require('../core/ResourceManager');

// resources
var ControlResource = require('./ControlResource');
var GuiResource = require('./GuiResource');

function initialize() {

    ResourceManager.registerResources([
        new ControlResource(),
        new GuiResource()
    ]);

    ResourceManager.getResource('renderer').register([
        require('./GuiRenderer')
    ]);

}

module.exports = {
    initialize: initialize
};