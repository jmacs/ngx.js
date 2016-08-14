var GameClock = require('../core/GameClock');
var Entity = require('../core/Entity');
var ResourceManager = require('../core/ResourceManager');

// resources
var MapResource = require('./maps/MapResource');

GameClock.addEventListener('GameClockLoaded', function() {

    ResourceManager.registerResources([
        new MapResource()
    ]);

    ResourceManager.getResource('component').register([
        require('./input/InputComponent'),
        require('./ai/AgentComponent'),
        require('./collision/BoxComponent')
    ]);

    ResourceManager.getResource('script').register([
        require('./collision/CollisionScript'),
        require('./physics/PhysicsAspect'),
        require('./ai/AAgentScript'),
        require('./input/InputScript'),
        require('./camera/CameraScript'),
        require('./maps/MapScript')
    ]);

});