var ResourceManager = require('../../core/ResourceManager');
var EntityManager = require('../../core/EntityManager');
var GameClock = require('../../core/GameClock');

var agents = null;
var limit = 500; // ~2 thoughts per second
var time = 0;
var timeToThink = false;
var filter = null;

function onSceneLoad() {
    agents = ResourceManager.getResource('agent');
    filter = EntityManager.createFilter('world.agents', function(entity) {
        return entity.components.agent;
    });
}

function onSceneUnload() {
    agents = null;
    filter = null;
}

function onSceneUpdate(delta) {
    time -= delta;
    timeToThink = time < 0;

    if (timeToThink) {
        filter.each(updateAgent, delta);
        time = limit;
    }
}

function updateAgent(entity, delta) {
    var agentState = entity.components.agent;

    var inRange = isInActivationRange(entity);

    if (inRange) {
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

function isInActivationRange(entity) {
    return true;
}

module.exports = {
    name: 'Agents',
    SceneLoad: onSceneLoad,
    SceneStop: onSceneUnload,
    SceneUpdate: onSceneUpdate
};
