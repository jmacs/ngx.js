import Scene from '../core/Scene';
import GameClock from '../core/GameClock';
import System from '../core/GameClock';
import Entity from '../core/Entity';
import Assets from '../core/Assets';

import Stage from './Stage';
import SpatialIndex from './collision/SpatialIndex';

import CollisionAspect from './collision/CollisionAspect';
import PhysicsAspect from './physics/PhysicsAspect';
import AgentAspect from './ai/AgentAspect';
import InputAspect from './input/InputAspect';
import StageAspect from './StageAspect';
import CameraAspect from './CameraAspect';

import InputComponent from './input/InputComponent';
import AgentComponent from './ai/AgentComponent';
import BoxComponent from './collision/BoxComponent';

import WallLoader from './WallLoader';

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