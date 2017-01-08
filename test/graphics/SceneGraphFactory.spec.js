var SceneGraphFactory = _require('src/graphics/SceneGraphFactory');
var Transform = _require('src/graphics/nodes/Transform');
var Surface = _require('src/graphics/nodes/Surface');
var parseXml = _require('test/helpers/parseXml');

describe('src/graphics/SceneGraphFactory', function() {
    var _document;

    beforeEach(function() {
        _document = parseXml('test/mocks/scene.xml');
        SceneGraphFactory.registerNodeTypes([
            Transform,
            Surface
        ]);
    });

    afterEach(function() {
        SceneGraphFactory.reset();
    });

    it('should create scene graph from xml document', function() {
        var graph = SceneGraphFactory.createSceneGraph(_document);
        assert.equal(graph.root.id, 'main');
        assert.equal(graph.root.nodeAt(0).id, 'world_camera');
        assert.equal(graph.root.nodeAt(0).nodeAt(0).id, 'map');
        assert.equal(graph.root.nodeAt(0).nodeAt(1).id, 'sprites');
    });

    it('should find node by id', function() {
        var graph = SceneGraphFactory.createSceneGraph(_document);
        graph.initialize();
        var node = graph.findNode('sprites');
        assert.equal(graph.root.nodeAt(0).nodeAt(1), node);
    });

    it('should set viewport', function() {
        var graph = SceneGraphFactory.createSceneGraph(_document);
        graph.setScreenSize(1280, 720);
        graph.initialize();

        var transform = graph.root.nodeAt(0);

        var x = transform.__viewport
    });

});

