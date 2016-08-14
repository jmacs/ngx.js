var GameClock = require('../core/GameClock');
var Entity = require('../core/Entity');
var ResourceManager = require('../core/ResourceManager');

// resources
var MapResource = require('./maps/WorldMapResource');

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
        require('./physics/PhysicsScript'),
        require('./ai/AgentScript'),
        require('./input/InputScript'),
        require('./camera/CameraScript'),
        require('./maps/WorldMapScript')
    ]);

});