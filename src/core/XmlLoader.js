const MIME_TYPE = 'text/xml';
var _parser = new DOMParser();

function parseText(response) {
    return response.text();
}

function downloadAsset(asset, resource, promise) {
    return fetch(asset)
        .then(parseText)
        .then(function(data) {
            var xmlDocument = _parser.parseFromString(data, MIME_TYPE);
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
