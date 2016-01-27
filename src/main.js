import GameClock from './core/GameClock';
import Scene from './core/Scene';
import Assets from './core/Assets';
import World from './world/World';
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
        return World.request('assets/maps/test.json');
    }).then(function() {
        return Scene.request('assets/scenes/sandbox.json', true);
    }).then(function() {
        World.start(1234);
    });

});