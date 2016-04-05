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

GameClock.on('start', function() {
    Assets.downloadManifest('assets/manifest.json').then(function() {
        return Assets.downloadAll();
    }).then(function() {
        return Stage.request('assets/maps/test.json');
    }).then(function() {
        return Scene.request('assets/scenes/sandbox.json', true);
    }).then(function() {
        Stage.start(1234);
    });

});