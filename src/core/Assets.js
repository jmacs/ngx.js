var _cache = Object.create(null);
var indexed = Object.create(null);
var manifest = [];
var _loaders = Object.create(null);

function parseJSON(response) {
    return response.json();
}

function httpGetJSON(url) {
    return fetch(url).then(parseJSON);
}

function downloadManifest(url) {
    return fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        readManifestData(data);
    });
}

function readManifestData(data) {
    manifest.length = 0;
    indexed = Object.create(null);
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
        if (!item.name) {
            console.error('manifest item at index %s has undefined name', i);
            hasError = true;
        }
        if (!hasError) {
            indexed[item.name] = item;
            manifest.push(item);
        }
    }
}

function download(bundle) {
    var promises = [];
    for (var i = 0, ii = bundle.length; i < ii; i++) {
        var asset = bundle[i];
        var module = _loaders[asset.type];
        if (!asset) throw new Error('undefined asset: ' + bundle[i]);
        if (!module) throw new Error('no loader registered for asset type: ' + asset.type);
        promises.push(module.load(asset));
    }
    return Promise.all(promises);
}

function downloadBundle(assetNames) {
    var bundle = [];
    for (var i = 0, ii = assetNames.length; i < ii; i++) {
        var asset = indexed[assetNames[i]];
        if (!asset) {
            console.error('cannot bundle unknown asset "%s"', assetNames[i]);
        } else {
            bundle.push(asset);
        }
    }
    return download(bundle);
}

function downloadAll() {
    return download(manifest);
}

function downloadAllOfType(type) {
    var bundle = [];
    for(var i = 0, l = manifest.length; i < l; i++) {
        var asset = manifest[i];
        if (asset.type === type) {
            bundle.push(asset);
        }
    }
    return download(bundle);
}

function registerLoaders(modules) {
    for (var i = 0, l = modules.length; i < l; i++) {
        var module = modules[i];
        _loaders[module.id] = module;
    }
}

function registerResources(modules) {
    for (var i = 0, l = modules.length; i < l; i++) {
        var module = modules[i];
        _loaders[module.id] = module;
    }
}

function createCache(name) {
    var cache = Object.create(null);
    _cache[name] = cache;
    return cache;
}

function getCache(name) {
    return _cache[name] || null;
}

module.exports = {
    httpGetJSON: httpGetJSON,
    createCache: createCache,
    getCache: getCache,
    registerLoaders: registerLoaders,
    registerResources: registerResources,
    downloadManifest: downloadManifest,
    downloadBundle: downloadBundle,
    downloadAll: downloadAll,
    downloadAllOfType: downloadAllOfType
};
