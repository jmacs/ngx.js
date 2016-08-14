var ResourceManager = require('./ResourceManager');

var identity = 0;

class Entity {

    constructor(id, ref, prefab) {
        this.__id = id;
        this.__ref = ref || 0;
        this.__prefab = prefab;
        this.position = [0.0, 0.0, 0.0];
    }

    get id() {
        return this.__id;
    }

    get ref() {
        return this.__ref;
    }

    get prefab() {
        return this.__prefab;
    }
}

function create(ref, prefabName) {
    var prefab = ResourceManager.get('prefab', prefabName);

    if (!prefab) {
       console.error('unknown prefab: %s', prefabName);
        return;
    }

    // todo: pool entities
    var entity = new Entity(++identity, ref, prefab.name);
    for (var i = 0, l = prefab.size; i < l; i++) {
        var component = prefab.componentAt(i);
        attachComponent(component.type, entity, component.state);
    }

    return entity;
}

function release(entity) {
    // todo: release to pool
}

function attachComponent(componentType, entity, state) {
    var components = ResourceManager.getResource('component');
    if (entity[componentType]) {
        console.warn('attachComponent: entity %s:%s already has component %s', entity.name, entity.ref, type);
        return;
    }

    var ComponentClass = components.get(componentType);
    if (!ComponentClass) {
        console.warn('attachComponent: %s is not a registered component type', componentType);
        return;
    }

    // todo: pool component types
    var instance = new ComponentClass();
    entity[componentType] = instance;
    instance.initialize(entity);

    if (state) {
        instance.hydrate(state);
    }

    return instance;
}

function detachComponent(componentType, entity) {
    var component = entity[componentType];
    if (!component) {
        console.warn('detachComponent: %s:%s does not have component %s', entity.ref, entity.name, componentType);
        return;
    }
    entity[componentType].destroy();
    delete entity[componentType];
}

module.exports = {
    create: create,
    release: release,
    attachComponent: attachComponent,
    detachComponent: detachComponent
};
