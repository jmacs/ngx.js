
class Resource {

    constructor() {
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

    keys() {
        return Object.keys(this.__cache);
    }

    values() {
        var values = [];
        for (var key in this.__cache) {
            values.push(this.__cache[key]);
        }
        return values;
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