const ResourceManager = require('../resources/ResourceManager');

const PrefabResource = require('./PrefabResource');
const ComponentResource = require('./ComponentResource');

module.exports = function CompositionModule() {

    ResourceManager.registerResources([
        new PrefabResource(),
        new ComponentResource()
    ]);

};
