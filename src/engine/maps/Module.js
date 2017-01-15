const MapSystem = require('./MapSystem');

module.exports = function MapModule(runtime) {

    runtime.registerSceneLoaders([bindGraphicsSystem]);
};

function bindGraphicsSystem(runtime, scene) {
    if (!scene.map) return;
    MapSystem(runtime, scene);
}
