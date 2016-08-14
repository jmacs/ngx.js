var EntityManager = require('../../core/EntityManager');
var AgentScript = require('./AgentScript');

const FILTER = 'world.agents';

var limit = 500; // ~2 thoughts per second
var time = 0;
var timeToThink = false;

function onSceneLoad() {
    EntityManager.addFilter(FILTER, filterEntity);
}

function onSceneUnload() {
    EntityManager.removeFilter(FILTER);
}

function filterEntity(entity) {
    return entity.agent;
}

function onSceneUpdate(delta) {
    time -= delta;
    timeToThink = time < 0;

    var entities = EntityManager.getCache(FILTER);

    for (var i = 0, l = entities.length; i < l; i++) {
        var entity = entities[i];
        var agentState = entity.agent;
        var agentScript = AgentScript.get(agentState.script);
        var inRange = isInActivationRange(entity);

        if (inRange && timeToThink) {
            if (!agentState.awake) {
                agentState.awake = true;
                agentScript.awake();
            }
            time = limit;
            agentScript.update(entity, delta);
        }

        if (!inRange && agentState.awake) {
            agentState.awake = false;
            agentScript.sleep(entity);
        }
    }

    if (timeToThink) {
        time = limit;
    }
}

function isInActivationRange(entity) {
    return true;
}

module.exports = function Agents(scene) {
    scene.addEventListener('SceneLoad', onSceneLoad);
    scene.addEventListener('SceneStop', onSceneUnload);
    scene.addEventListener('SceneUpdate', onSceneUpdate);
};

