
function onAgentAwake(self, delta, agent) {

}

function onAgentUpdate(self, delta, agent) {
    var input = self.components.input;

    agent.time = agent.time + delta;
    if (agent.time > 100) {
        agent.time = 0;
        agent.move = !agent.move;
    }
    if (agent.move) {
        input.right = 1;
        input.left = 0;
    } else {
        input.right = 0;
        input.left = 1;
    }
}

function onAgentSleep(self, delta, agent) {

}

function onAgentKilled(self, delta, agent) {

}

module.exports = {
    name: 'MobAgent',
    AgentAwake: onAgentAwake,
    AgentUpdate: onAgentUpdate,
    AgentSleep: onAgentSleep,
    AgentKilled: onAgentKilled
};
