var _entities = Object.create(null);
var _cache = Object.create(null);
var _filters = [];
var _filtersLength = 0;
var _count = 0;

function addFilter(key, accept) {
    if (!_cache[key]) {
        _cache[key] = [];
        _filters.push({key: key, accept: accept});
        _filtersLength++;
    }
}

function removeFilter(key) {
    for (var i = 0, l = _filtersLength; i < l; i++) {
        if (_filters[i].key === key) {
            _filters.removeAt(i);
            _filtersLength--;
            delete _cache[key];
        }
    }
}

function addEntity(entity) {
    if (_entities[entity.id]) return;
    for (var i = 0, l = _filtersLength; i < l; i++) {
        var filter = _filters[i];
        if (filter.accept(entity)) {
            _cache[filter.key].push(entity);
        }
    }
    _entities[entity.id] = entity;
    _count++;
}

function removeEntity(entity) {
    if (!_entities[entity.id]) return;
    for (var i = 0, l = _filtersLength; i < l; i++) {
        var filter = _filters[i];
        if (filter.accept(entity)) {
            cache[filter.key].remove(entity);
        }
    }
    delete _entities[entity.id];
    _count--;
}

function getCache(key) {
    return _cache[key] || null;
}

function getEntity(id) {
    return _entities[id] || null;
}

function count() {
    return _count;
}

function clearCache() {
    _count = 0;
    _cache = Object.create(null);
    for (var i = 0, l = _filtersLength; i < l; i++) {
        _cache[_filters[i].key] = [];
    }
}

function rebuildCache() {
    clearCache();
    var entities = Object.keys(_entities);
    for (var i = 0, l = entities.length; i < l; i++) {
        addEntity(entities[i]);
    }
}

function clear() {
    _entities = Object.create(null);
    clearCache();
}

function log() {
    console.debug('count: %s', _count);
    console.debug('cache: %o', _cache);
    console.debug('entities: %o', _entities);
}

module.exports = {
    log: log,
    clear: clear,
    rebuildCache: rebuildCache,
    addFilter: addFilter,
    removeFilter: removeFilter,
    addEntity: addEntity,
    removeEntity: removeEntity,
    count: count,
    getCache: getCache,
    getEntity: getEntity
};
