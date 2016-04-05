import GameModules from '../core/GameModules';
import GameClock from '../core/GameClock';
import System from '../core/GameClock';
import Entity from '../core/Entity';
import Assets from '../core/Assets';

import Stage from './Stage';
import SpatialIndex from './collision/SpatialIndex';

import './collision/CollisionAspect';
import './StageAspect';
import './physics/PhysicsAspect';
import './ai/AgentAspect';
import './input/InputAspect';
import './StageAspect';

import InputComponent from './input/InputComponent';
import AgentComponent from './ai/AgentComponent';
import BoxComponent from './collision/BoxComponent';

import WallLoader from './WallLoader';

GameClock.on('bootstrap', function() {
    Entity.addComponent('input', InputComponent);
    Entity.addComponent('agent', AgentComponent);
    Entity.addComponent('box', BoxComponent);

    Assets.registerLoader('walls', WallLoader);
});

GameModules.include('world', {
    Stage: Stage,
    SpatialIndex: SpatialIndex,
    BoxComponent: BoxComponent,
    AgentComponent: AgentComponent
});