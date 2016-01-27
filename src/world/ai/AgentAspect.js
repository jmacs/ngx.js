import Aspect from '../../core/Aspect';
import Arrays from '../../core/Arrays';
import AgentScript from './AgentScript';

var aspect = Aspect.create('world.agents');

var entities = [];
var limit = 500; // ~2 thoughts per second
var time = 0;
var timeToThink = false;

aspect.onUpdate = function(delta) {
    time -= delta;
    timeToThink = time < 0;

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
};

function isInActivationRange(entity) {
    return true;
}

aspect.onStageExit = function() {
    entities.length = 0;
};

aspect.onEntityEnter = function(entity) {
    if (entity.agent) {
        entities[entities.length] = entity;
    }
};

aspect.onEntityExit = function(entity) {
    if (entity.agent) {
        Arrays.removeValue(entities, entity);
    }
};