var EntityManager = require('../../core/EntityManager');
var Entity = require('../../core/Entity');

function createEntities(manifest) {
    for (var i = 0, l = manifest.length; i < l; i++) {
        var entry = manifest[i];
        var entity = createEntity(entry);
        if (entity === null) continue;
        EntityManager.addEntity(entity);
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
            var component = entity[prop.component];
            if (component) {
                component.hydrate(prop);
            }
        }
    }

    return entity;
}

module.exports = {
    createEntities: createEntities
};
