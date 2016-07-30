import Entity from '../core/Entity';
import EntityStore from '../core/EntityStore';
import Scene from '../core/Scene';
import Color from '../graphics/Color';
import Walls from './Walls';
import Cell from './Cell';

var _cache = Object.create(null);
var _id = 0;
var _shift = 0;
var _cellSize = 0;
var _gridWidth = 0;
var _gridHeight = 0;
var _boundsX = 0;
var _boundsY = 0;
var _color = new Color();
var _map = [];
var _manifest = null;

function id() {
    return _id;
}

function color() {
    return _color;
}

function shift() {
    return _shift;
}

function cellSize() {
    return _cellSize;
}

function pixelWidth() {
    return _boundsX * _cellSize;
}

function pixelHeight() {
    return _boundsY * _cellSize;
}

function initialize(shift, width, height) {
    _shift = shift;
    _gridWidth = width;
    _gridHeight = height;
    _cellSize = Math.pow(2, shift);

    for (var x = 0; x < _gridWidth; x++) {
        var column = [];
        for (var y = 0; y < _gridHeight; y++) {
            var cell = new Cell();
            cell.position[0] = x * _cellSize;
            cell.position[1] = y * _cellSize;
            cell.material = 0;
            cell.layers = [];
            cell.x = x;
            cell.y = y;
            column.push(cell);
        }
        _map[x] = column;
    }
}

function build(data) {
    empty();
    _id = data.id;
    _boundsX = data.width;
    _boundsY = data.height;
    _manifest = data.manifest;
    var layer0 = data.layer0;
    for (var i = 0, l = layer0.length; i < l; i++) {
        var cell = layer0[i];
        setCell(0, cell[0], cell[1], cell[2]);
    }
}

function setCell(layer, x, y, wallId) {
    var wall = Walls.get(wallId);
    if (!wall)  return;

    var cell = _map[x][y];
    cell.void = false;
    cell.layers[layer] = wall.tiles[0];

    if (layer === 0) {
        cell.material = wall.material;
    }
}

function selectCells(min, max, callback) {
    var minX = min[0] >> _shift;
    var minY = min[1] >> _shift;
    var maxX = Math.min(_boundsX, max[0] >> _shift);
    var maxY = Math.min(_boundsY, max[1] >> _shift);

    for (var x = minX; x < maxX; x++) {
        for (var y = minY; y < maxY; y++) {
            var cell = _map[x][y];
            if (!cell.void) {
                callback(_map[x][y], _cellSize, _color);
            }
        }
    }
}

function selectSolidCells(callback) {
    for (var x = 0; x < _gridWidth; x++) {
        for (var y = 0; y < _gridHeight; y++) {
            var cell = _map[x][y];
            if (cell.material > 0) {
                callback(cell);
            }
        }
    }
}

function empty() {
    _id = 0;
    for (var x = 0; x < _gridWidth; x++) {
        for (var y = 0; y < _gridHeight; y++) {
            _map[x][y].empty();
        }
    }
}

function createEntities() {
    for (var i = 0, ii = _manifest.length; i < ii; i++) {
        var entity = createEntity(_manifest[i]);
        if (entity === null) continue;
        EntityStore.addEntity(entity);
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

function request(url, startWhenDone) {
    return fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        _cache[data.id] = data;
        if (startWhenDone) {
            start(data.id);
        }
    });
}

function start(id) {
    var data = _cache[id];

    if (!data) {
        console.error('unknown stage "%s"', id);
        return;
    }

    Scene.exitStage(_id);
    build(data);
    Scene.enterStage(id);
    createEntities();
}

export default {
    id: id,
    request: request,
    shift: shift,
    cellSize: cellSize,
    pixelWidth: pixelWidth,
    pixelHeight: pixelHeight,
    initialize: initialize,
    createEntities: createEntities,
    color: color,
    start: start,
    setCell: setCell,
    selectCells: selectCells,
    selectSolidCells: selectSolidCells
};