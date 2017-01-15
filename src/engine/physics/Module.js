const PhysicsSystem = require('./PhysicsSystem');

module.exports = function PhysicsModule(runtime) {


    runtime.registerSceneLoaders([bindPhysicsSystem]);

};

function bindPhysicsSystem(runtime, scene) {
    if (!scene.physics) return;
    PhysicsSystem(runtime);
}
