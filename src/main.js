import GameClock from './core/GameClock';
import Scene from './core/Scene';
import Assets from './core/Assets';
import Stage from './world/Stage';
import './core/module';
import './graphics/module';
import './world/module';
import './game/module';

document.addEventListener('DOMContentLoaded', function() {
    console.info('DOMContentLoaded');
    GameClock.start();
});

GameClock.addEventListener('GameClockStarted', function() {
    console.info('GameClockStarted');
    window.clock = GameClock;
    Assets.downloadManifest('assets/manifest.json').then(function() {
        return Assets.downloadAll();
    }).then(function() {
        Scene.create('main', 'sandbox');
        Scene.activate('main');
    }).then(function() {
        return Stage.request('assets/maps/test.json');
    }).then(function() {
        Stage.start(1234);
    });
});