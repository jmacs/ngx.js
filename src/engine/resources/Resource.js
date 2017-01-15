
class Resource {

    constructor() {
        this.current = null;
        this.__cache = Object.create(null);
    }

    set(id, value) {
        this.__cache[id] = value;
    }

    get(id) {
        return this.__cache[id];
    }

    onAssetDownloaded(payload, asset) {
        // not implemented
    }

    register() {
        // not implemented
    }

    keys() {
        return Object.keys(this.__cache);
    }

    clear() {
        this.__cache = Object.create(null);
    }

    getMediaType() {
        return null;
    }

    getResourceType() {
        return null;
    }
}

module.exports = Resource;