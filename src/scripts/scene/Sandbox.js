
module.exports = function(scene) {

    scene.addEventListener('SceneLoad', function(resources) {
        console.info('Sandbox SceneLoad');
        var config = resources.get('config', 'game');
        console.log(config);
    });

    scene.addEventListener('SceneStart', function() {
        console.info('Sandbox SceneStart');
        var aspect = scene.getAspect('graphics.animation');
        console.log(aspect);
        setTimeout(function() {
            scene.triggerEvent('DoorOpened', 12345, 'abcd', 99999);
        }, 2000);
    });

};
