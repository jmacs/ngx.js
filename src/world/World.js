import Scene from '../core/Scene';
import Entity from '../core/Entity';
import Stage from './maps/Stage';

var _nextEntityId = 1000000;
var _current = null;
var _cache = Object.create(null);
var _cacheSize = 0;

function request(url, startWhenDone) {
    return fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        var stage = new Stage(data.id);
        stage.build(data);

        _cacheSize++;
        _cache[stage.id] = stage;

        if (startWhenDone) {
            start(stage.id);
        }

        return stage;
    });
}

function start(stageId) {
    var stage = _cache[stageId];
    if (stage) {
        _current = stage;
        Scene.enterStage(_current);
        populateEntities(_current);
    } else {
        console.error('undefined stage "%s"', stageId);
    }
}

function spawn(prefabId, x, y) {
    var entity = Entity.create(++_nextEntityId, prefabId);
    entity.position[0] = x;
    entity.position[y] = y;
    Scene.enterEntity(entity);
    return entity;
}

function populateEntities(stage) {
    var manifest = stage.manifest;
    for (var i = 0, ii = manifest.length; i < ii; i++) {
        var entity = createEntity(manifest[i]);
        if (entity === null) continue;
        Scene.enterEntity(entity);
    }
}

function createEntity(mob) {
    var entity = Entity.create(mob.ref, mob.prefab);
    entity.position[0] = mob.pos[0];
    entity.position[1] = mob.pos[1];

    var props = mob.props;
    if (props) {
        for (var i = 0, ii = props.length; i < ii; i++) {
            var prop = props[i];
            if (entity[prop.cid]) {
                entity[prop.cid].hydrate(prop);
            }
        }
    }

    return entity;
}

export default {
    spawn: spawn,
    request: request,
    start: start
};