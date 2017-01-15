const ResourceManager = require('../resources/ResourceManager');
const AnimationResource = require('./AnimationResource');

module.exports = function ActorsModule() {

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