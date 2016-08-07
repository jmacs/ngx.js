var AgentScript = require('../../world/ai/AgentScript');

var script = AgentScript.create(100);

script.awake = function() {

};

script.update = function(entity, delta) {
    var agent = entity.agent;
    agent.time = agent.time + delta;
    if (agent.time > 100) {
        agent.time = 0;
        agent.move = !agent.move;
    }
    if (agent.move) {
        entity.input.right = 1;
        entity.input.left = 0;
    } else {
        entity.input.right = 0;
        entity.input.left = 1;
    }
};

script.sleep = function() {

};