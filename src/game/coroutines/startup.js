/*import Coroutine from '../../world/Coroutine';
import Assets from '../../core/Assets';
import Scene from '../../core/Scene';

var script = Coroutine.create('startup');

script.init = function(process) {
    console.debug('startup -> downloading manifest');
    Assets.downloadManifest('assets/manifest.json').then(function() {
        process.next(script.downloadAssets);
    });
    process.pause();
};

script.downloadAssets = function(process) {
    console.debug('startup -> downloading assets');
    Assets.downloadAll().then(function() {
        process.next(script.startStage);
    });
    process.pause();
};

script.startStage = function() {
    console.debug('startup -> start stage');
    World.loadStage('test');
};*/