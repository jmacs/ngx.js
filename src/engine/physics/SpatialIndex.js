var ResourceManager = require('./ResourceManager');
var BoxFunctions = require('./BoxFunctions');

var _counter = 0;
var _unitWidth = 0;
var _unitHeight = 0;
var _cellSize = 0;
var _shift = 0;
var _boundsX = 0;
var _boundsY = 0;
var _objects = null;
var _keys = [];
var _keysLength = 0;

const aabbIntersection = BoxFunctions.aabbIntersection;

const DEFAULT_BEHAVIOR = {
    onCollisionEnter: function(){},
    onCollisionStay: function(){},
    onCollisionExit: function(){}
};

function build(cellUnits, widthUnits, heightUnits) {
    clearObjects();
    _shift = cellUnits;
    _cellSize = Math.pow(2, cellUnits);
    _unitWidth = widthUnits;
    _unitHeight = heightUnits;
    _boundsX = _cellSize * widthUnits;
    _boundsY = _cellSize * heightUnits;
    _objects = Object.create(null);
    _counter = 0;
    _keys.length = 0;
    for (var x = 0; x < widthUnits + 1; x++) {
        for (var y = 0; y <= heightUnits + 1; y++) {
            var key = pair(x, y);
            _keys.push(key);
            _objects[key] = [];
        }
    }
    _keysLength = _keys.length;
}

function insertObject(box) {
    if (!inBoundary(box)) return;

    var sx = box.minX >> _shift,
        sy = box.minY >> _shift,
        ex = box.maxX >> _shift,
        ey = box.maxY >> _shift,
        x, y;

    _counter++;

    for (y = sy; y <= ey; y++) {
        for (x = sx; x <= ex; x++) {
            var key = pair(x, y);
            _objects[key].push(box);
        }
    }
}

function clearObjects() {
    if (_counter === 0) return;
    _counter = 0;
    for (var k = 0; k < _keysLength; k++) {
        var boxes = _objects[_keys[k]];
        if (boxes.length > 0) {
            boxes.length = 0;
        }
    }
}

function raycast(pointA, pointB, callback) {
    // cancel
}

function shapecast(cuboid, callback) {

}

function broadphase() {
    var i, j, k, c1, c2, e1, e2;

    var collisions = Object.create(null);

    for (k = 0; k < _keysLength; k++) {
        var key = _keys[k];
        var boxes = _objects[key];

        var length = boxes.length;

        for (i = 0; i < length; i++) {
            c1 = boxes[i];

            for (j = i + 1; j < length; j++) {
                c2 = boxes[j];

                var p = pair(c1.ref, c2.ref);
                if (collisions[p]) continue;
                collisions[p] = true;

                // todo: find a better way to track old collisions
                var wasColliding = c1.collidingWith[c2.ref];

                if (aabbIntersection(c1, c2) === true) {
                    e1 = c1.entity;
                    e2 = c2.entity;

                    if (wasColliding) {
                        e1.message('CollisionStay', e2);
                        e2.message('CollisionStay', e1);
                    } else {
                        c1.collidingWith[c2.ref] = true;
                        c2.collidingWith[c1.ref] = true;
                        e1.message('CollisionEnter', e2);
                        e2.message('CollisionEnter', e1);
                    }
                }
                else if (wasColliding) {
                    e1 = c1.entity;
                    e2 = c2.entity;
                    delete c1.collidingWith[c2.ref];
                    delete c2.collidingWith[c1.ref];
                    e1.message('CollisionExit', e2);
                    e2.message('CollisionExit', e1);
                }
            }
        }
    }

    collisions = null;
}

function inBoundary(box) {
    return !(
        box.minX < 0 ||
        box.minY < 0 ||
        box.maxX > _boundsX ||
        box.minY > _boundsY
    );
}

function pair(x, y) {
    return x << 16 & 0xffff0000 | y & 0x0000ffff;
}

function depair(p) {
    return [p >> 16 & 0xFFFF, p & 0xFFFF];
}

module.exports = {
    build: build,
    insertObject: insertObject,
    clearObjects: clearObjects,
    raycast: raycast,
    shapecast: shapecast,
    broadphase: broadphase
}