import CollisionInfo from './CollisionInfo';
import ColliderScript from './ColliderScript';

var counter = 0;
var unitWidth = 0;
var unitHeight = 0;
var cellSize = 0;
var shift = 0;
var boundsX = 0;
var boundsY = 0;
var spatial = null;
var keys = [];
var keysLength = 0;
var infoA = new CollisionInfo();
var infoB = new CollisionInfo();

function build(cellUnits, widthUnits, heightUnits) {
    clear();
    shift = cellUnits;
    cellSize = Math.pow(2, cellUnits);
    unitWidth = widthUnits;
    unitHeight = heightUnits;
    boundsX = cellSize * widthUnits;
    boundsY = cellSize * heightUnits;
    spatial = Object.create(null);
    counter = 0;
    keys.length = 0;
    for (var x = 0; x < widthUnits + 1; x++) {
        for (var y = 0; y <= heightUnits + 1; y++) {
            var key = pair(x, y);
            keys.push(key);
            spatial[key] = [];
        }
    }
    keysLength = keys.length;
}

function inspect() {
    return {
        unitWidth: unitWidth,
        unitHeight: unitHeight,
        cellSize: cellSize,
        shift: shift,
        count: counter,
        buckets: keysLength,
        maxX: boundsX,
        maxY: boundsY
    }
}

function insert(box) {
    if (!inBoundary(box)) return;

    var sx = box.minX >> shift,
        sy = box.minY >> shift,
        ex = box.maxX >> shift,
        ey = box.maxY >> shift,
        x, y;

    counter++;

    for (y = sy; y <= ey; y++) {
        for (x = sx; x <= ex; x++) {
            var key = pair(x, y);
            spatial[key].push(box);
        }
    }
}

function clear() {
    if (counter === 0) return;
    counter = 0;
    for (var k = 0; k < keysLength; k++) {
        var boxes = spatial[keys[k]];
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
    var i, j, k, c1, c2, collider1, collider2;

    var collisions = Object.create(null);

    for (k = 0; k < keysLength; k++) {
        var boxes = spatial[keys[k]];

        var length = boxes.length;
        if (length <= 1) continue;

        for (i = 0; i < length; i++) {
            c1 = boxes[i];

            for (j = i + 1; j < length; j++) {
                c2 = boxes[j];

                var key = pair(c1.ref, c2.ref);
                if (collisions[key]) continue;
                collisions[key] = true;

                var wasColliding = c1.collidingWith[c2.ref];

                if (aabbIntersection(c1, c2) === true) {
                    collider1 = ColliderScript.get(c1.collider);
                    collider2 = ColliderScript.get(c2.collider);

                    if (wasColliding) {
                        narrowPhase(c1, infoA, c2, infoB);
                        collider1.onCollision(c1.entity, c2.entity, infoA);
                        collider2.onCollision(c2.entity, c1.entity, infoB);
                    } else {
                        c1.collidingWith[c2.ref] = true;
                        c2.collidingWith[c1.ref] = true;
                        collider1.onEnter(c1.entity, c2.object);
                        collider2.onEnter(c2.entity, c1.object);
                    }
                }
                else if (wasColliding) {
                    collider1 = ColliderScript.get(c1.collider);
                    collider2 = ColliderScript.get(c2.collider);
                    delete c1.collidingWith[c2.ref];
                    delete c2.collidingWith[c1.ref];
                    collider1.onExit(c1.entity, c2.entity);
                    collider2.onExit(c2.entity, c1.entity);
                }
            }
        }
    }

    collisions = null;
}

// TODO: make this faster
function narrowPhase(a, infoA, b, infoB) {
    // Calculate half sizes
    var widthA = a.maxX - a.minX;
    var heightA = a.maxY - a.minY;
    var halfWidthA = widthA * 0.5;
    var halfHeightA = heightA * 0.5;

    var widthB = b.maxX - b.minX;
    var heightB = b.maxY - b.minY;
    var halfWidthB = widthB * 0.5;
    var halfHeightB = heightB * 0.5;

    // Calculate centers
    var cax = a.minX + halfWidthA;
    var cay = a.minY + halfHeightA;

    var cbx = b.minX + halfWidthB;
    var cby = b.minY + halfHeightB;

    // Calculate current and minimum-non-intersecting distances between centers.
    var distanceX = cax - cbx;
    var distanceY = cay - cby;
    var minDistanceX = halfWidthA + halfWidthB;
    var minDistanceY = halfHeightA + halfHeightB;

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
    return !(box.minX < 0 || box.minY < 0 ||
    box.maxX > boundsX || box.minY > boundsX);
}

function pair(x, y) {
    return x << 16 & 0xffff0000 | y & 0x0000ffff;
}

function depair(p) {
    return [p >> 16 & 0xFFFF, p & 0xFFFF];
}

export default {
    build: build,
    inspect: inspect,
    insert: insert,
    clear: clear,
    raycast: raycast,
    shapecast: shapecast,
    aabbIntersection: aabbIntersection,
    broadphase: broadphase
}