import CollisionInfo from './CollisionInfo';
import ColliderScript from './ColliderScript';

var _counter = 0;
var _unitWidth = 0;
var _unitHeight = 0;
var _cellSize = 0;
var _shift = 0;
var _boundsX = 0;
var _boundsY = 0;
var _objects = null;
var _walls = null;
var _keys = [];
var _keysLength = 0;
var _infoA = new CollisionInfo();
var _infoB = new CollisionInfo();

function build(cellUnits, widthUnits, heightUnits) {
    clearObjects();
    _shift = cellUnits;
    _cellSize = Math.pow(2, cellUnits);
    _unitWidth = widthUnits;
    _unitHeight = heightUnits;
    _boundsX = _cellSize * widthUnits;
    _boundsY = _cellSize * heightUnits;
    _objects = Object.create(null);
    _walls = Object.create(null);
    _counter = 0;
    _keys.length = 0;
    for (var x = 0; x < widthUnits + 1; x++) {
        for (var y = 0; y <= heightUnits + 1; y++) {
            var key = pair(x, y);
            _keys.push(key);
            _objects[key] = [];
            _walls[key] = [];
        }
    }
    _keysLength = _keys.length;
}

function insertWall(x, y) {
    x = x * 16;
    y = y * 16;
    var sx = x >> _shift;
    var sy = y >> _shift;
    var key = pair(sx, sy);
    if (_walls[key]) {
        _walls[key].push({
            minX: x,
            minY: y,
            maxX: x + 16,
            maxY: y + 16
        });
    }
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

function clearWalls() {
    _counter = 0;
    for (var k = 0; k < _keysLength; k++) {
        _walls[_keys[k]].lenght = 0;
    }
}

function raycast(pointA, pointB, callback) {
    // cancel
}

function shapecast(cuboid, callback) {

}

function broadphase() {
    var i, j, k, c1, c2, script1, script2;

    var collisions = Object.create(null);

    for (k = 0; k < _keysLength; k++) {
        var key = _keys[k];
        var boxes = _objects[key];

        var length = boxes.length;
        //if (length <= 1) continue;

        for (i = 0; i < length; i++) {
            c1 = boxes[i];

            checkWallCollisions(_keys[k], c1);

            for (j = i + 1; j < length; j++) {
                c2 = boxes[j];

                var p = pair(c1.ref, c2.ref);
                if (collisions[p]) continue;
                collisions[p] = true;

                var wasColliding = c1.collidingWith[c2.ref];

                if (aabbIntersection(c1, c2) === true) {
                    script1 = ColliderScript.get(c1.collider);
                    script2 = ColliderScript.get(c2.collider);

                    if (wasColliding) {
                        narrowPhase(c1, _infoA, c2, _infoB);
                        script1.onCollision(c1.entity, c2.entity, _infoA);
                        script2.onCollision(c2.entity, c1.entity, _infoB);
                    } else {
                        c1.collidingWith[c2.ref] = true;
                        c2.collidingWith[c1.ref] = true;
                        script1.onEnter(c1.entity, c2.object);
                        script2.onEnter(c2.entity, c1.object);
                    }
                }
                else if (wasColliding) {
                    script1 = ColliderScript.get(c1.collider);
                    script2 = ColliderScript.get(c2.collider);
                    delete c1.collidingWith[c2.ref];
                    delete c2.collidingWith[c1.ref];
                    script1.onExit(c1.entity, c2.entity);
                    script2.onExit(c2.entity, c1.entity);
                }
            }
        }
    }

    collisions = null;
}

function checkWallCollisions(key, box) {
    var walls = _walls[key];
    var length = walls.length;
    if (!length) return;

    for (var i = 0; i < length; i++) {
        var wall = walls[i];
        if (aabbIntersection(box, wall)) {
            
        }
    }
}

function pointOverlap(x, y, box) {
    return y < box.maxY && y > box.minY && x < box.maxX && x > box.minX;
}

function narrowPhase(a, infoA, b, infoB) {
    // Calculate current and minimum-non-intersecting distances between centers.
    var distanceX = a.centerX - b.centerX;
    var distanceY = a.centerY - b.centerY;
    var minDistanceX = a.halfWidth + b.halfWidth;
    var minDistanceY = a.halfHeight + b.halfHeight;

    // If we are not intersecting at all, return (0, 0).
    if (Math.abs(distanceX) >= minDistanceX || Math.abs(distanceY) >= minDistanceY) {
        infoA.setDepth(0, 0);
        infoB.setDepth(0, 0);
        return;
    }

    // Calculate and return intersection depths.
    var depthX = distanceX > 0 ? minDistanceX - distanceX : -minDistanceX - distanceX;
    var depthY = distanceY > 0 ? minDistanceY - distanceY : -minDistanceY - distanceY;

    infoA.setDepth(depthX, depthY);
    infoB.setDepth(depthX * -1, depthY * -1);
}

function aabbIntersection(a, b) {
    return !(
        a.maxX < b.minX ||
        a.maxY < b.minY ||
        a.minX > b.maxX ||
        a.minY > b.maxY
    );
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

export default {
    build: build,
    insertWall: insertWall,
    clearWalls: clearWalls,
    insertObject: insertObject,
    clearObjects: clearObjects,
    raycast: raycast,
    shapecast: shapecast,
    aabbIntersection: aabbIntersection,
    broadphase: broadphase
}