var Profiler = require('./Profiler');

var _mediaLoaders = Object.create(null);
var _manifest = Object.create(null);
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

function loadManifest(url) {
    return fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        readManifestData(data);
    });
}

function readManifestData(data) {
    for (var i = 0, ii = data.length; i < ii; i++) {
        var item = data[i];
        var hasError = false;

        if (!item.url) {
            console.warn('Manifest asset has undefined url, skipping');
            hasError = true;
        }

        if (!item.type) {
            console.warn('Manifest asset "%s" has undefined type, skipping', item.url);
            hasError = true;
        }

        if (!hasError) {
            _manifest[item.url] = item;
        }
    }
}

function download(assets) {
    var promises = [];
    for (var i = 0, ii = assets.length; i < ii; i++) {
        var asset = assets[i];

        if (!asset) {
            console.warn('Missing manifest asset "%s"', asset.url);
            continue;
        }

        var resource = _resources[asset.type];
        if (!resource) {
            console.warn('Unregistered resource type "%s" for asset "%s"', asset.type, asset.url);
            continue;
        }

        var mediaType = resource.getMediaType();
        var mediaLoader = _mediaLoaders[mediaType];
        if (!mediaLoader) {
            console.warn('No registered loader for "%s" required by asset "%s"', mediaType, asset.url);
            continue;
        }

        var deferred = createDeferred();
        mediaLoader.downloadAsset(asset, resource, deferred);

        promises.push(deferred.promise);
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

function downloadAll() {
    var assets = [];
    for(var key in _manifest) {
        assets.push(_manifest[key]);
    }
    return download(assets);
}

function downloadTypeOf(resourceTypes) {
    var assets = [];
    var keys = Object.keys(_manifest);
    for (var i = 0, l = keys.length; i < l; i++) {
        var asset = _manifest[keys[i]];
        if (resourceTypes.indexOf(asset.type) > -1) {
            assets.push(asset);
        }
    }
    return download(assets);
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

function getObjectSize() {
    return Profiler.sizeOf(_resources);
}

function logResources() {
    console.log(_resources);
}

module.exports = {
    registerMediaLoaders: registerMediaLoaders,
    registerResources: registerResources,
    getResource: getResource,
    loadManifest: loadManifest,
    download: download,
    downloadAll: downloadAll,
    downloadTypeOf: downloadTypeOf,
    clearAll: clearAll,
    clearTypeOf: clearTypeOf,
    getObjectSize: getObjectSize,
    logResources: logResources,
    get: get
};
