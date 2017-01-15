const MapSystem = require('./MapSystem');

module.exports = function MapModule(runtime) {

    runtime.onSceneLoad(bindGraphicsSystem);
};

function bindGraphicsSystem(runtime, scene) {
    if (!scene.map) return;
    MapSystem(runtime, scene);
}
