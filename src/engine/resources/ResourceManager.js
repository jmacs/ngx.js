var ObjectProfiler = require('../ObjectProfiler');

var _mediaLoaders = Object.create(null);
var _resources = Object.create(null);

function registerResources(modules) {
    for (var i = 0, l = modules.length; i < l; i++) {
        var module = modules[i];
        var resourceType = module.getResourceType();
        _resources[resourceType] = module;
    }
}

function registerMediaLoaders(modules) {
    for (var i = 0, l = modules.length; i < l; i++) {
        var module = modules[i];
        var mediaTypes = module.getSupportedMediaTypes();
        for (var j = 0, k = mediaTypes.length; j < k; j++) {
            var mediaType = mediaTypes[j];
            _mediaLoaders[mediaType] = module;
        }
    }
}

function download(bundle) {
    var promises = [];
    var resourceTypes = Object.keys(bundle);

    for (var i = 0, l = resourceTypes.length; i < l; i++) {
        var resourceType = resourceTypes[i];
        var assetUrls = bundle[resourceType];

        var resource = _resources[resourceType];
        if (!resource) {
            console.warn('Bundle contains an unregistered resource type "%s"', resourceType);
            continue;
        }

        var mediaType = resource.getMediaType();
        var mediaLoader = _mediaLoaders[mediaType];
        if (!mediaLoader) {
            console.warn('No registered loader for "%s" required by resource "%s"', mediaType, resourceType);
            continue;
        }

        for (var j = 0, m = assetUrls.length; j < m; j++) {
            var asset = assetUrls[j];
            var deferred = createDeferred();
            mediaLoader.downloadAsset(asset, resource, deferred);
            promises.push(deferred.promise);
        }
    }

    return Promise.all(promises);
}

function createDeferred() {
    var result = {};
    result.promise = new Promise(function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
}

function clearTypeOf(resourceType) {
    var keys = Object.keys(_resources);
    for (var i = 0, l = keys.length; i < l; i++) {
        var resource = _resources[keys[i]];
        if (resource.getResourceType() === resourceType) {
            resource.clear();
        }
    }
}

function clearAll() {
    var keys = Object.keys(_resources);
    for (var i = 0, l = keys.length; i < l; i++) {
        _resources[keys[i]].clear();
    }
}

function get(resourceName, id) {
    var resource = _resources[resourceName];
    if (!resource) {
        console.error('unknown resource type "%s"', resourceName);
        return null;
    }
    return resource.get(id);
}

function getResource(resourceName) {
    return _resources[resourceName];
}

function log() {
    console.log('bytes: %s', ObjectProfiler.sizeOf(_resources));
    console.log('resources: %o', _resources);
}

module.exports = {
    registerMediaLoaders: registerMediaLoaders,
    registerResources: registerResources,
    getResource: getResource,
    download: download,
    clearAll: clearAll,
    clearTypeOf: clearTypeOf,
    log: log,
    get: get
};
