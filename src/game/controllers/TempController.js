const EntityManager = require('.././EntityManager');

module.exports = function TempController(runtime) {
    runtime.addLifecycleHook('Update', onUpdate);
    runtime.addEventListener('SceneStart', onSceneStart);
    runtime.addEventListener('SceneStop', onSceneStop);

    function onSceneStart() {
        console.log('SceneStart');
    }

    function onSceneStop() {
        console.log('SceneStop');
    }

    function onUpdate(delta) {
        //console.log(delta);
    }

};