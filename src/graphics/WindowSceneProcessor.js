const Deferred = require('../core/Deferred');

module.exports = function WindowSceneProcessor(runtime, scene) {

    if (!scene.windows) {
        console.warn('No windows defined in scene');
        return;
    }

    console.debug('Creating windows');


};
