var ResourceManager = require('./ResourceManager');

var componentClasses = Object.create(null);
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

function create(ref, prefabId) {
    var prefab = ResourceManager.get('prefab', prefabId);

    if (!prefab) {
        throw new Error('unknown prefab: ' + prefabId);
    }

    // todo: pool entities
    var entity = new Entity(++identity, ref, prefab);
    for (var i = 0, ii = prefab.size; i < ii; i++) {
        var component = prefab.componentAt(i);
        attachComponent(component.type, entity, component.state);
    }

    return entity;
}

function release(entity) {
    // todo: release to pool
}

function registerComponents(modules) {
    for (var i = 0, l = modules.length; i < l; i++) {
        var module = modules[i];
        if (!validateComponent(module)) continue;
        componentClasses[module.id] = module;
    }
}

function attachComponent(componentType, entity, state) {
    if (entity[componentType]) {
        console.warn('attachComponent: entity %s:%s already has component %s', entity.name, entity.ref, type);
        return;
    }

    var ComponentClass = componentClasses[componentType];
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

function validateComponent(module) {
    var name = module.id || '';
    if (name.length === 0) {
        console.warn('component "%s" does not define a static id', module.name);
        return false;
    }
    if (componentClasses[name]) {
        console.warn('component "%s" is already defined', name);
        return false;
    }
    if (name === 'prefab') {
        console.error('reserved component name "prefab"');
        return false;
    }
    if (name === 'position') {
        console.error('reserved component name "position"');
        return false;
    }
    if (name === 'ref') {
        console.error('reserved component name "ref"');
        return false;
    }
    if (name === 'id') {
        console.error('reserved component name "id"');
        return false;
    }
    if (name.charAt(0) === '_') {
        console.error('component names cannot start with an underscore');
        return false;
    }
    return true;
}

module.exports = {
    create: create,
    release: release,
    attachComponent: attachComponent,
    detachComponent: detachComponent,
    registerComponents: registerComponents
};
