import Prefab from './Prefab';

var componentClasses = Object.create(null);
var prefabs = Object.create(null);

class Entity {

    constructor(ref, prefab) {
        this.__ref = ref || 0;
        this.__prefab = prefab;
        this.position = [0.0, 0.0, 0.0];
        this.visible = false;
    }

    get ref() {
        return this.__ref;
    }

    get prefab() {
        return this.__prefab;
    }
}

function prefabType(prefabId) {
    var prefab = prefabs[prefabId];
    return prefab ? prefab.type : 0;
}

function create(ref, prefabId) {
    var prefab = prefabs[prefabId];
    if (!prefab) {
        throw new Error('unknown prefab: ' + prefabId);
    }

    // todo: pool entities
    var entity = new Entity(ref, prefab);
    for (var i = 0, ii = prefab.size; i < ii; i++) {
        var component = prefab.componentAt(i);
        attachComponent(component.type, entity, component.state);
    }

    return entity;
}

function release(entity) {
    // todo: release to pool
}

function addComponent(name, ComponentClass) {
    if (!validateComponentName(name)) return;
    componentClasses[name] = ComponentClass;
}

function addPrefab(options) {
    var prefab = new Prefab(options);
    if (!prefabs[prefab.id]) {
        prefabs[prefab.id] = prefab;
    } else {
        console.warn('prefab "%s:%s" is already defined', prefab.id, prefab.name);
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

function validateComponentName(name) {
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
    if (name === 'visible') {
        console.error('reserved component name "position"');
        return false;
    }
    if (name === 'ref') {
        console.error('reserved component name "ref"');
        return false;
    }
    if (name.charAt(0) === '_') {
        console.error('component names cannot start with an underscore');
        return false;
    }
    return true;
}

export default {
    create: create,
    release: release,
    prefabType: prefabType,
    addPrefab: addPrefab,
    addComponent: addComponent,
    attachComponent: attachComponent,
    detachComponent: detachComponent
}