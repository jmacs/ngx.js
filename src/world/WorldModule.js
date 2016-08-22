var ResourceManager = require('../core/ResourceManager');

// resources
var MapResource = require('./maps/WorldMapResource');

function initialize() {

    ResourceManager.registerResources([
        new MapResource()
    ]);

    ResourceManager.getResource('component').register([
        require('./InputComponent'),
        require('./AgentComponent'),
        require('./collision/BoxComponent')
    ]);

}

module.exports = {
    initialize: initialize
};
