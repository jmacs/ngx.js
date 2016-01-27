import GameModules from '../core/GameModules';
import GameClock from '../core/GameClock';
import System from '../core/GameClock';
import Entity from '../core/Entity';
import Assets from '../core/Assets';

import CollisionWorld from './collision/SpatialIndex';

import './collision/CollisionAspect';
import './maps/StageAspect';
import './physics/PhysicsAspect';
import './ai/AgentAspect';
import './input/InputAspect';
import StageAspect from './maps/StageAspect';

import InputComponent from './input/InputComponent';
import AgentComponent from './ai/AgentComponent';
import BoxComponent from './collision/BoxComponent';

import WallLoader from './maps/WallLoader';

GameClock.on('bootstrap', function initialize() {
    Entity.addComponent('input', InputComponent);
    Entity.addComponent('agent', AgentComponent);
    Entity.addComponent('box', BoxComponent);

    Assets.registerLoader('walls', WallLoader);
});

GameModules.include('world', {
    AgentComponent: AgentComponent,
    StageAspect: StageAspect,
    BoxComponent: BoxComponent,
    CollisionWorld: CollisionWorld
});