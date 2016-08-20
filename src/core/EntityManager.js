var EntityFilter = require('./EntityFilter');

var _entityIndex = Object.create(null);
var _entitiesLength = 0;
var _filters = [];
var _filtersLength = 0;
var _filterIndex = Object.create(null);

function addFilter(name, accept) {
    if (_filterIndex[name]) return;
    var filter = new EntityFilter(name, accept);
    _filters.push(filter);
    _filtersLength++;
    _filterIndex[name] = filter;
}

function removeFilter(name) {
    var filter = _filterIndex[name];
    if (!filter) return;
    var n = _filters.indexOf(filter);
    if (n === -1) return;
    filter.destroy();
    _filters.splice(n, 1);
    _filtersLength--;
    delete _filterIndex[name];
}

function clearFilters() {
    for (var i = 0; i < _filtersLength; i++) {
        _filters[i].clear();
    }
}

function addEntity(entity) {
    if (_entityIndex[entity.id]) return;
    for (var i = 0; i < _filtersLength; i++) {
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
    for (var i = 0; i < _filtersLength; i++) {
        var filter = _filters[i];
        if (filter.accept(entity)) {
            filter.remove(entity);
        }
    }
    delete _entityIndex[entity.id];
    _entitiesLength--;
}

function forEach(filterName, callback, delta) {
    var filter = _filterIndex[filterName];
    filter.each(_entityIndex, callback, delta);
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
    clearFilters: clearFilters,
    addFilter: addFilter,
    removeFilter: removeFilter,
    addEntity: addEntity,
    removeEntity: removeEntity,
    count: count,
    getEntity: getEntity,
    forEach: forEach
};
