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
        if (!item.type) {
            console.error('manifest "%s" has undefined type', item.name);
            hasError = true;
        }
        if (!item.url) {
            console.error('manifest "%s" has undefined url', item.name);
            hasError = true;
        }
        if (!hasError) {
            _manifest[item.url] = item;
        }
    }
}

var defer = function() {
    var result = {};
    result.promise = new Promise(function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
};

function download(assets) {
    var promises = [];
    for (var i = 0, ii = assets.length; i < ii; i++) {
        var asset = assets[i];

        if (!asset) {
            console.error('missing manifest asset "%s"', urls[i]);
            continue;
        }

        var resource = _resources[asset.type];
        if (!resource) {
            console.error('unregistered resource type "%s" for asset "%s"', asset.type, asset.url);
            continue;
        }

        var mediaType = resource.getMediaType();
        var mediaLoader = _mediaLoaders[mediaType];
        if (!mediaLoader) {
            console.error('no loader for media type "%s" in asset "%s"', mediaType, asset.url);
            continue;
        }

        var deferred = createDeferred();
        mediaLoader.downloadAsset(asset, resource, deferred);

        promises.push(deferred);
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
    download(assets);
}

function get(resourceName, id) {
    return _resources[resourceName].get(id);
}

function clearAll() {
    for (var key in _resources) {
        _resources[key].clear();
    }
}

function getResources() {
    return _resources;
}

function memorySize() {
    return Profiler.sizeOf(_resources);
}

module.exports = {
    registerMediaLoaders: registerMediaLoaders,
    registerResources: registerResources,
    getResources: getResources,
    loadManifest: loadManifest,
    download: download,
    downloadAll: downloadAll,
    clearAll: clearAll,
    memorySize: memorySize,
    get: get
};
