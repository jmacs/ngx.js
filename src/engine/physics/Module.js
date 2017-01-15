const PhysicsSystem = require('./PhysicsSystem');

module.exports = function PhysicsModule(runtime) {


    runtime.onSceneLoad(bindPhysicsSystem);

};

function bindPhysicsSystem(runtime, scene) {
    if (!scene.physics) return;
    PhysicsSystem(runtime, scene);
}
