const ResourceManager = require('../resources/ResourceManager');
//const ProcessManager = require('./ProcessManager');

// resources
const CoroutineResource = require('./CoroutineResource');

module.exports = function MultitaskingModule(runtime) {

    //ProcessManager.initialize();

    ResourceManager.registerResources([
        new CoroutineResource()
    ]);

};
