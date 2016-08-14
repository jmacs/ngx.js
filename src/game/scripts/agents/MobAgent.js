
function awake() {

}

function update(entity, delta) {
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
}

function sleep() {

}

function kill() {

}

module.exports = {
    name: 'MobAgent',
    awake: awake,
    update: update,
    sleep: sleep,
    kill: kill
};
