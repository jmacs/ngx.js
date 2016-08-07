var scripts = Object.create(null);

// todo rename script events, remove "on", onCollision -> stay

class ColliderScript {
    onEnter() {}
    onCollision() {}
    onExit() {}
}

var noop = new ColliderScript();

function create(id) {
    var script = new ColliderScript();
    scripts[id] = script;
    return script;
}

function get(id) {
    return scripts[id] || noop;
}

module.exports = {
    get: get,
    create: create
}