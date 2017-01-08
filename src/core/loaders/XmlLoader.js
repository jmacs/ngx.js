var _parser = new DOMParser();

function parseText(response) {
    return response.text();
}

function downloadAsset(asset, resource, promise) {
    return fetch(asset)
        .then(parseText)
        .then(function(data) {
            var xmlDocument = _parser.parseFromString(data, 'text/xml');
            resource.onAssetDownloaded(xmlDocument, asset);
            promise.resolve(asset);
        });
}

function getSupportedMediaTypes() {
    return ['application/xml'];
}

module.exports = {
    getSupportedMediaTypes: getSupportedMediaTypes,
    downloadAsset: downloadAsset
};
