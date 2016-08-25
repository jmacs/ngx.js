var EntityFilter = require('./EntityFilter');

var _entityIndex = Object.create(null);
var _entityArray = [];
var _entitiesLength = 0;
var _filters = [];

function createFilter(name, accept) {
    var filter = new EntityFilter(name, accept);
    addFilter(filter);
    return filter;
}

function addFilter(filter) {
    _filters.push(filter);
    filter.filterOn(_entityIndex);
}

function removeFilter(filter) {
    var n = _filters.indexOf(filter);
    if (n === -1) return;
    filter.destroy();
    _filters.removeAt(n);
}

function clearFilters() {
    for (var i = 0, l = _filters.length; i < l; i++) {
        _filters[i].clear();
    }
}

function query(predicate, callback, self) {
    for (var i = 0; i < _entitiesLength; i++) {
        var entity = _entityArray[i];
        if (predicate(entity)) {
            callback(entity, self);
        }
    }
}

function addEntity(entity) {
    if (_entityIndex[entity.id]) return;
    for (var i = 0, l = _filters.length; i < l; i++) {
        var filter = _filters[i];
        if (filter.accept(entity)) {
            filter.add(entity);
        }
    }
    _entityIndex[entity.id] = entity;
    _entitiesLength++;
}

function removeEntity(entity) {
    if (!_entityIndex[entity.id]) return;
    for (var i = 0, l = _filters.length; i < l; i++) {
        var filter = _filters[i];
        if (filter.accept(entity)) {
            filter.remove(entity);
        }
    }
    delete _entityIndex[entity.id];
    _entitiesLength--;
}

function getEntity(id) {
    return _entityIndex[id];
}

function count() {
    return _entitiesLength;
}

function clear() {
    _entityIndex = Object.create(null);
    clearFilters();
}

function log() {
    console.debug('count: %s', _entitiesLength);
    console.debug('filters: %o', _filters);
    console.debug('entities: %o', _entityIndex);
}

module.exports = {
    log: log,
    clear: clear,
    createFilter: createFilter,
    clearFilters: clearFilters,
    addFilter: addFilter,
    removeFilter: removeFilter,
    addEntity: addEntity,
    removeEntity: removeEntity,
    count: count,
    getEntity: getEntity,
    query: query
};
