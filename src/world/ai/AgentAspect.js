import EntityStore from '../../core/EntityStore';
import Aspect from '../../core/Aspect';
import AgentScript from './AgentScript';

const ASPECT_ID = 'world.agents';

var limit = 500; // ~2 thoughts per second
var time = 0;
var timeToThink = false;

function onStart() {
    EntityStore.addFilter(ASPECT_ID, filterEntity);
}

function onStop() {
    EntityStore.removeFilter(ASPECT_ID);
}

function filterEntity(entity) {
    return entity.agent;
}

function onUpdate(delta) {
    time -= delta;
    timeToThink = time < 0;

    var entities = EntityStore.getCache(ASPECT_ID);

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

export default Aspect.create({
    id: ASPECT_ID,
    onUpdate: onUpdate,
    isInActivationRange: isInActivationRange,
    onStart: onStart,
    onStop: onStop
});

