var ResourceManager = require('./../core/ResourceManager');

var _identity = 0;

class Entity {

    constructor() {
        this.id = 0;
        this.ref = 0;
        this.index = -1;
        this.prefab = null;
        this.position = [0.0, 0.0, 0.0];
        this.components = Object.create(null);
        this.events = Object.create(null);
    }

    message(event, arg1, arg2, arg3) {
        var callback = this.events[event];
        if (callback) {
            callback(this, arg1, arg2, arg3);
        }
    }

    addEventListener(event, callback) {
        this.events[event] = callback;
    }

    removeEventListener(event) {
        this.event[event] = null;
    }

    toString() {
        return `Entity@${this.prefab}#${this.id}`;
    }
}

function create(ref, prefabName) {
    var prefab = ResourceManager.get('prefab', prefabName);

    if (!prefab) {
       console.error('unknown prefab: %s', prefabName);
        return;
    }

    // todo: pool objects
    var entity = new Entity();
    entity.id = ++_identity;
    entity.ref = ref;
    entity.prefab = prefab.name;

    for (var i = 0, l = prefab.size; i < l; i++) {
        var component = prefab.componentAt(i);
        attachComponent(component.type, entity, component.state);
    }

    return entity;
}

function attachComponent(componentType, entity, state) {
    var components = ResourceManager.getResource('component');

    if (entity.components[componentType]) {
        console.warn('attachComponent: entity %s:%s already has component %s', entity.prefab, entity.id, componentType);
        return;
    }

    var ComponentClass = components.get(componentType);
    if (!ComponentClass) {
        console.warn('attachComponent: %s is not a registered component type', componentType);
        return;
    }

    // todo: pool components
    var instance = new ComponentClass();
    entity.components[componentType] = instance;
    instance.initialize(entity);

    if (state) {
        instance.hydrate(state);
    }

    return instance;
}

function detachComponent(componentType, entity) {
    var component = entity[componentType];
    if (!component) {
        console.warn('detachComponent: %s:%s does not have component %s', entity.prefab, entity.id, componentType);
        return;
    }
    entity[componentType].destroy();
    delete entity[componentType];
}

function attachScript(scriptName, entity) {
    var scripts = ResourceManager.getResource('script');
    scripts.foreachFunction(scriptName, function(event, callback) {
        entity.addEventListener(event, callback);
    });
}

function detachScript(scriptName, entity) {
    var scripts = ResourceManager.getResource('script');
    scripts.foreachFunction(scriptName, function(event, callback) {
        entity.removeEventListener(event, callback);
    });
}

module.exports = {
    create: create,
    attachScript: attachScript,
    detachScript: detachScript,
    attachComponent: attachComponent,
    detachComponent: detachComponent
};
