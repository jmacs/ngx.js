const Runtime = require('./Runtime');

var _sceneProcessors = [];
var _currentScene = null;

function registerProcessors(processors) {
    for (var i = 0, l = processors.length; i < l; i++) {
        _sceneProcessors.push(processors[i]);
    }
}

function download(url) {
    console.info('Downloading scene "%s"', url);
    return fetch(url).then(function (response) {
        return response.json();
    });
}

function load(scene) {
    unload();

    console.log('Loading scene "%s"', scene.name);
    _currentScene = scene;

    var promises = [];
    for (var i = 0, l = _sceneProcessors.length; i < l; i++) {
        var promise = _sceneProcessors[i](Runtime, scene);
        promises.push(promise);
    }

    Promise.all(promises).then(function () {
        console.info('Scene loaded');
        Runtime.triggerEvent('SceneLoad');
    });
}

function unload() {
    if (!_currentScene) return;
    console.info('Unloading scene');
    Runtime.triggerEvent('SceneUnload');
    Runtime.reset();
    _currentScene = null;
}

module.exports = {
    registerProcessors: registerProcessors,
    download: download,
    load: load,
    unload: unload
};
