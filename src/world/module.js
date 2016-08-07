var Scene = require('../core/Scene');
var GameClock = require('../core/GameClock');
var System = require('../core/GameClock');
var Entity = require('../core/Entity');
var Assets = require('../core/Assets');

var Stage = require('./Stage');
var SpatialIndex = require('./collision/SpatialIndex');

var CollisionAspect = require('./collision/CollisionAspect');
var PhysicsAspect = require('./physics/PhysicsAspect');
var AgentAspect = require('./ai/AgentAspect');
var InputAspect = require('./input/InputAspect');
var StageAspect = require('./StageAspect');
var CameraAspect = require('./CameraAspect');

var InputComponent = require('./input/InputComponent');
var AgentComponent = require('./ai/AgentComponent');
var BoxComponent = require('./collision/BoxComponent');

var WallLoader = require('./WallLoader');

GameClock.addEventListener('GameClockLoaded', function() {

    Entity.registerComponents([
        InputComponent,
        AgentComponent,
        BoxComponent
    ]);

    Assets.registerLoaders([
        WallLoader
    ]);

    Scene.registerAspects([
        StageAspect,
        PhysicsAspect,
        AgentAspect,
        InputAspect,
        StageAspect,
        CollisionAspect,
        CameraAspect
    ]);
});