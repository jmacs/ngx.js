import GameModules from './GameModules';

import GameClock from './GameClock';
import ObjectPool from './ObjectPool';
import Scene from './Scene';
import Events from './Events';
import Entity from './Entity';
import Coroutine from './Coroutine';
import Assets from './Assets';
import Coprocessor from './Coprocessor';
import PrefabLoader from './PrefabLoader';

GameClock.on('bootstrap', function() {
    Scene.bindGameClock();
    Assets.registerLoader('prefab', PrefabLoader);
});

GameModules.include('core', {
    Coroutine: Coroutine,
    Entity: Entity,
    Events: Events,
    Assets: Assets,
    GameClock: GameClock,
    Scene: Scene,
    ObjectPool: ObjectPool,
    Coprocessor: Coprocessor
});