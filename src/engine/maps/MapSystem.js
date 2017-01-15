const EntityManager = require('../composition/EntityManager');

module.exports = function MapSystem(runtime) {

    runtime.onInitialize(function () {
        EntityManager.createEntity({
            ref: 1,
            pos: [150,16],
            prefab: 'hero'
        });
    });

};
