var CollisionWorld = GameModules('world.CollisionWorld');

function createCuboid(x, y, w, h) {
    return {minX: x, minY: y, maxX: x + w, maxY: y + h};
}

describe('world/collision/CollisionWorld', function() {

    before(function() {
        CollisionWorld.buildGrid(7, 4, 2);
    });

    afterEach(function() {
        CollisionWorld.clear();
    });

    it('should have correct dimensions', function() {
        var result = CollisionWorld.inspect();
        assert.deepEqual(result, {
            buckets: 20,
            cellSize: 128,
            count: 0,
            maxY: 256,
            maxX: 512,
            shift: 7,
            unitHeight: 2,
            unitWidth: 4
        });
    });

    it('a cuboid inside another is intersecting', function() {
        var a = createCuboid(0, 0, 10, 10);
        var b = createCuboid(5, 5, 2, 2);
        var result = CollisionWorld.aabbIntersection(a, b);
        assert.isTrue(result);
    });

    it('two cuboids in same space are intersecting', function() {
        var a = createCuboid(0, 0, 10, 10);
        var b = createCuboid(5, 5, 10, 10);
        var result = CollisionWorld.aabbIntersection(a, b);
        assert.isTrue(result);
    });

    it('two cuboids NOT in same space are NOT intersecting', function() {
        var a = createCuboid(0, 0, 10, 10);
        var b = createCuboid(0, 11, 10, 10);
        var result = CollisionWorld.aabbIntersection(a, b);
        assert.isFalse(result);
    });

    xit('test broadphase collision', function() {
        var counter = 0;
        var a = createCuboid(129, 490, 10, 10);
        var b = createCuboid(125, 485, 10, 10);
        CollisionWorld.insert(a);
        CollisionWorld.insert(b);
        CollisionWorld.broadphase(function(r, t) {
            assert.equal(a, r);
            assert.equal(b, t);
            counter++;
        });
        assert.equal(1, counter);
    });

});