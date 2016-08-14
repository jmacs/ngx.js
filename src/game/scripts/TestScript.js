
function onSceneLoad() {
    console.debug('TestScript SceneLoad');
}

function onSomethingInteresting() {
    console.debug('something interesting happened');
}

module.exports = {
    name: 'TestScript',
    SceneLoad: onSceneLoad,
    SomethingInteresting: onSomethingInteresting
};
