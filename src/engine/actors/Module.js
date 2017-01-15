const ResourceManager = require('../resources/ResourceManager');
const AnimationResource = require('./AnimationResource');
const AnimationSystem = require('./AnimationSystem');

module.exports = function ActorsModule(runtime) {
    runtime.onSceneLoad(bindAnimationSystem);

    ResourceManager.registerResources([
        new AnimationResource()
    ]);

    ResourceManager.getResource('component').register([
        require('./AnimationComponent'),
        require('./SpriteComponent'),
        require('./AgentComponent'),
    ]);

    ResourceManager.getResource('script').register([
        require('./SpriteRenderer')
    ]);

};

function bindAnimationSystem(runtime, scene) {
    if (!scene.animation) return;
    AnimationSystem(runtime, scene);
}
