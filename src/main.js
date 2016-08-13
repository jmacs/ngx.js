var GameClock = require('./core/GameClock');
var ResourceManager = require('./core/ResourceManager');
var SceneManager = require('./core/SceneManager');
var MapManager = require('./world/maps/MapManager');

require('./core/module');
require('./graphics/module');
require('./input/module');
require('./world/module');
require('./game/module');

document.addEventListener('DOMContentLoaded', function() {
    console.info('DOMContentLoaded');
    GameClock.start();
});

GameClock.addEventListener('GameClockStarted', function() {
    console.info('GameClockStarted');

    downloadRequiredAssets().then(function() {
        SceneManager.activateScene('sandbox');
        MapManager.loadStage('assets/maps/sandbox.json');
    });
});

function downloadRequiredAssets() {
    return ResourceManager.download({
        config: [
            'assets/config/settings.json',
            'assets/config/textures.json'
        ],
        shader: [
            'assets/shaders/sprite.xml',
            'assets/shaders/mesh.xml'
        ],
        scene: [
            'assets/scenes/sandbox.json'
        ]
    }).then(function() {
        return ResourceManager.download({
            texture: [
                'assets/textures/bisasam_font.png',
                'assets/textures/smb3.png'
            ],
            tile: [
                'assets/tiles/smb3.json'
            ],
            animation: [
                'assets/animations/smb_entity.json'
            ],
            prefab: [
                'assets/prefabs/decor.json',
                'assets/prefabs/items.json',
                'assets/prefabs/mobs.json'
            ]
        });
    });
}
