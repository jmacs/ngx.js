var scripts = Object.create(null);

class AgentScript {
    spawn(entity) { }
    awake(entity) { }
    update(entity, delta) { }
    sleep(entity) { }
    kill(entity) { }
}

function create(id) {
    var script = new AgentScript();
    scripts[id] = script;
    return script;
}

function get(id) {
    return scripts[id] || null;
}

export default {
    create: create,
    get: get
}