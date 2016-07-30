import InputManager from './InputManager';
import EntityStore from '../../core/EntityStore';
import Aspect from '../../core/Aspect';

var NullDevice = {type: null};

const ASPECT_ID = 'world.input';
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const ZERO = 0.0;

function onStart() {
    EntityStore.addFilter(ASPECT_ID, filterEntity);
}

function onStop() {
    EntityStore.removeFilter(ASPECT_ID);
}

function filterEntity(entity) {
    return entity.input && entity.input.human;
}

function onUpdate(delta) {
    var entities = EntityStore.getCache(ASPECT_ID);

    for (var i = 0, l = entities.length; i < l; i++) {
        var entity = entities[i];
        tick(delta, entity.input);
    }
}

function tick(delta, component) {
    var device = getDevice(component.index);

    if (!device.type) return;

    if (device[KEY_UP]) {
        component.up += delta;
    } else {
        component.up = ZERO;
    }

    if (device[KEY_DOWN]) {
        component.down += delta;
    } else {
        component.down = ZERO;
    }

    if (device[KEY_RIGHT]) {
        component.right += delta;
    } else {
        component.right = ZERO;
    }

    if (device[KEY_LEFT]) {
        component.left += delta;
    } else {
        component.left = ZERO;
    }
}

function getDevice(index) {
    if (index === 0) {
        return InputManager.keys;
    } else {
        return NullDevice;
    }
}

export default  Aspect.create({
    id: ASPECT_ID,
    onStart: onStart,
    onStop: onStop,
    onUpdate: onUpdate
});
