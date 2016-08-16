var ResourceManager = require('../../core/ResourceManager');
var EntityManager = require('../../core/EntityManager');

const FILTER = 'world.agents';
const DEFAULT_BEHAVIOR = {
    update: function(){},
    onCollisionStay: function(){},
    onCollisionExit: function(){}
};

var agents = null;
var limit = 500; // ~2 thoughts per second
var time = 0;
var timeToThink = false;

function onSceneLoad() {
    agents = ResourceManager.getResource('agent');
    EntityManager.addFilter(FILTER, filterEntity);
}

function onSceneUnload() {
    agents = null;
    EntityManager.removeFilter(FILTER);
}

function filterEntity(entity) {
    return entity.components.agent;
}

function onSceneUpdate(delta) {
    time -= delta;
    timeToThink = time < 0;

    var entities = EntityManager.getCache(FILTER);

    for (var i = 0, l = entities.length; i < l; i++) {
        var entity = entities[i];
        var agentState = entity.components.agent;

        var inRange = isInActivationRange(entity);

        if (inRange && timeToThink) {
            if (!agentState.awake) {
                agentState.awake = true;
                entity.message('AgentAwake', delta, agentState);
            }
            time = limit;
            entity.message('AgentUpdate', delta, agentState);
        }

        if (!inRange && agentState.awake) {
            agentState.awake = false;
            entity.message('AgentSleep', delta, agentState);
        }
    }

    if (timeToThink) {
        time = limit;
    }
}

function isInActivationRange(entity) {
    return true;
}

module.exports = {
    name: 'Agents',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneUpdate: onSceneUpdate
};
