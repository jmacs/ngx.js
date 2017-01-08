var CollisionInfo = require('./CollisionInfo');

var info = new CollisionInfo();

function blockEntityMovement(entity, other) {
    intersectionDepth(entity.components.box, other.components.box, info);

    if (info.right || info.left) {
        entity.position[0] += info.x;
    } else if (info.top || info.bottom) {
        entity.position[1] += info.y;
    }
}

function intersectionDepth(a, b, info) {
    // Calculate current and minimum-non-intersecting distances between centers.
    var distanceX = a.centerX - b.centerX;
    var distanceY = a.centerY - b.centerY;
    var minDistanceX = a.halfWidth + b.halfWidth;
    var minDistanceY = a.halfHeight + b.halfHeight;

    // If we are not intersecting at all, return (0, 0).
    if (Math.abs(distanceX) >= minDistanceX || Math.abs(distanceY) >= minDistanceY) {
        info.setDepth(0, 0);
        return;
    }

    // Calculate and return intersection depths.
    var depthX = distanceX > 0 ? minDistanceX - distanceX : -minDistanceX - distanceX;
    var depthY = distanceY > 0 ? minDistanceY - distanceY : -minDistanceY - distanceY;

    info.setDepth(depthX, depthY);
}

function aabbIntersection(a, b) {
    return !(
        a.maxX < b.minX ||
        a.maxY < b.minY ||
        a.minX > b.maxX ||
        a.minY > b.maxY
    );
}

module.exports = {
    blockEntityMovement: blockEntityMovement,
    intersectionDepth: intersectionDepth,
    aabbIntersection: aabbIntersection
}