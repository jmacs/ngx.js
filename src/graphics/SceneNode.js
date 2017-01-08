class SceneNode {

    constructor() {
        this.__id = null;
        this.__x = 0;
        this.__y = 0;
        this.__width = 0;
        this.__height = 0;
        this.__parent = null;
        this.__nodes = [];
        this.__count = 0;
    }

    get id() {
        return this.__id;
    }

    get hasChildren() {
        return this.__count > 0;
    }

    initialize(state) {
        this.onInitialize(state);
        for (var i = 0, l = this.__count; i < l; i++) {
            this.__nodes[i].initialize(state);
        }
    }

    update(state) {
        this.onUpdate(state);
        for (var i = 0, l = this.__count; i < l; i++) {
            this.__nodes[i].update(state);
        }
    }

    dispose() {
        this.onDispose();
        for (var i = 0, l = this.__count; i < l; i++) {
            this.__nodes[i].dispose();
        }
    }

    setParent(parent) {
        if (this.__parent) {
            this.remove();
        }
        if (parent !== null) {
            this.__parent = parent;
            parent.__nodes.push(this);
            parent.__count++;
        }
    }

    remove() {
        if (this.__parent) {
            var n = this.__parent.__nodes.indexOf(this);
            if (n === -1) return;
            this.__nodes.splice(n, 1);
            this.__parent.__count--;
            this.__parent = null;
        }
        return this;
    }

    readXml(xml) {
        this.__id = xml.getAttribute('id');
        this.__x = parseInt(xml.getAttribute('x')) || 0;
        this.__y = parseInt(xml.getAttribute('y')) || 0;
        this.__width = parseInt(xml.getAttribute('width')) || 12;
        this.__height = parseInt(xml.getAttribute('height')) || 12;
        this.onReadXml(xml);
    }

    findNode(id) {
        if (this.__id === id) {
            return this;
        }
        for (var i = 0, l = this.__nodes.length; i < l; i++) {
            var node = this.__nodes[i].findNode(id);
            if (node) return node;
        }
    }

    nodeAt(index) {
        return this.__nodes[index];
    }

    onInitialize() { }

    onUpdate(state) { }

    onReadXml(xml) { }

    onDispose() { }

}

module.exports = SceneNode;