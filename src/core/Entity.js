import System from './System.js';
import identity from './identity';

var ASCII_UNDERSCORE = 95;

var componentListeners = Object.create(null);
var componentClasses = Object.create(null);
var prefabs = Object.create(null);
var entities = Object.create(null);

function get(id) {
    return entities[id];
}

function forEach(callback) {
    var keys = Object.keys(entities);
    for (var i = 0, len = keys.length; i < len; i++) {
        var entity = entities[keys[i]];
        callback(entity);
    }
}

function spawn(name) {
    var entity = new Entity(name);
    entities[entity.id] = entity;
    var prefab = prefabs[name];
    if(prefab) {
        for (var i = 0, len = prefab.length; i < len; i++) {
            var component = prefab[i];
            entity.attach(component.type, component.value);
        }
    } else {
        console.error('spawn: undefined prefab "%s"', name);
    }
    return entity;
}

function kill(id) {
    var entity = entities[id];
    if(entity) {
        entity.kill();
    } else {
        console.warn('kill: "%s" does not exist', entity.id);
    }
}

function addComponent(name, ComponentClass) {
    if(!componentClasses[name]) {
        componentClasses[name] = ComponentClass;
        componentListeners[name] = [];
    } else {
        console.warn('addComponent: "%s" is already defined', name);
    }
}

function addPrefab(name, prefab) {
    if(prefab instanceof Array) {
        for (var i = 0, len = prefab.length; i < len; i++) {
            var type = componentClasses[prefab[i].type];
            if(!type) {
                console.warn('addPrefab: unknown component type "%s"', type);
            }
        }
        prefabs[name] = prefab;
    } else {
        console.error('addPrefab: "%s" must define an array of prefab components', name);
    }
}

function sendComponentAttach(entity, type, component) {
    var listeners = componentListeners[type];
    for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i].onComponentAttach(entity, component, type);
    }
}

function sendComponentDetach(entity, type, component) {
    var listeners = componentListeners[name];
    for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i].onComponentDetach(entity, component, type);
    }
}

function linkEvents(type, attachCallback, detachCallback) {
    var listeners = componentListeners[type];
    if(listeners) {
        listeners.push({
            onComponentAttach: attachCallback,
            onComponentDetach: detachCallback
        });
    } else {
        console.error('linkEvents: invalid component type "%s"', type);
    }
}

function clear(context) {
    var keys = Object.keys(entities);
    for (var i = 0, len = keys.length; i < len; i++) {
        var entity = entities[keys[i]];
        if(entity.context === context) {
            delete entities[entity.id];
        }
    }
}

class Entity {

    constructor(name) {
        this._name = name;
        this._id = identity(entities);
        this._context = System.getContext();
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get context() {
        return this._context;
    }

    set context(context) {
        var keys = Object.keys(this);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if(key.charAt(0) === ASCII_UNDERSCORE) continue;
            var component = this[key];
            sendComponentDetach(this, key, component);
            this._context = context;
            sendComponentAttach(this, key, component);
        }
        this._context = context;
    }

    attach(type, values) {
        if(this[type]) return;
        var ComponentClass = componentClasses[type];
        if(!ComponentClass) {
            console.warn('%s is not a registered component type', type);
        }
        var instance = new ComponentClass();
        this[type] = instance;
        if(values) {
            instance.initialize(values);
        }
        sendComponentAttach(this, type, instance);
    }

    detach(type) {
        var component = this[type];
        if(!component) return;
        sendComponentDetach(this, type, component);
        component.destroy();
        delete this[type];
    }

    kill() {
        var keys = Object.keys(this);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if(key.charAt(0) === ASCII_UNDERSCORE) continue;
            var component = this[key];
            sendComponentDetach(this, key, component);
            component.destroy();
        }
        delete entities[id];
    }
}

export default {
    get: get,
    spawn: spawn,
    kill: kill,
    forEach: forEach,
    addPrefab: addPrefab,
    addComponent: addComponent,
    linkEvents: linkEvents,
    clear: clear
}