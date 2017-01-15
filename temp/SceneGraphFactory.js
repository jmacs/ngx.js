var SceneNode = require('./../src/engine/graphics/SceneNode');
var SceneGraph = require('./SceneGraph');

var _nodeTypeRegistry = Object.create(null);

function registerNodeTypes(types) {
    for (var i = 0, l = types.length; i < l; i++) {
        var type = types[i];
        if (type.prototype instanceof SceneNode) {
            _nodeTypeRegistry[type.name] = type;
        } else {
            throw new Error('Node must extend SceneNode: ' + type.name);
        }
    }
}

function reset() {
    _nodeTypeRegistry = Object.create(null);
}

function createNodeInstance(parent, xml) {
    var SceneNodeClass = _nodeTypeRegistry[xml.tagName];
    if (!SceneNodeClass) {
        throw new Error('Unregistered SceneNode: ' + xml.tagName);
    }
    var node = new SceneNodeClass();
    node.setParent(parent);
    node.readXml(xml);
    return node;
}

function populateTree(parent, xml) {
    if (xml.nodeType === xml.ELEMENT_NODE) {
        var node = createNodeInstance(parent, xml);
        for (var i = 0, l = xml.childNodes.length; i < l; i++) {
            populateTree(node, xml.childNodes[i]);
        }
    }
}

function createSceneGraph(xmlDocument) {
    var rootElement = xmlDocument.getElementsByTagName('View')[0];
    var rootNode = new SceneNode();
    rootNode.readXml(rootElement);
    for (var i = 0, l = rootElement.childNodes.length; i < l; i++) {
        populateTree(rootNode, rootElement.childNodes[i]);
    }
    return new SceneGraph(rootNode);
}

module.exports = {
    reset: reset,
    registerNodeTypes: registerNodeTypes,
    createSceneGraph: createSceneGraph
};
