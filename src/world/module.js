var Scene = require('../core/Scene');
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

    ResourceManager.getResource('aspect').register([
        require('./collision/CollisionAspect'),
        require('./physics/PhysicsAspect'),
        require('./ai/AgentAspect'),
        require('./input/InputAspect'),
        require('./camera/CameraAspect')
    ]);

});