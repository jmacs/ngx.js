const MIME_TYPE = 'text/xml';
var _parser = new DOMParser();

function parseText(response) {
    return response.text();
}

function parseXml(text) {
    return _parser.parseFromString(text, MIME_TYPE);
}

function downloadAsset(asset, resource, promise) {
    return fetch(asset.url)
        .then(parseText)
        .then(parseXml)
        .then(function(data) {
            resource.onAssetDownloaded(data, asset);
            promise.resolve(asset);
        });
}

function getSupportedMediaTypes() {
    return ['text/xml'];
}

module.exports = {
    getSupportedMediaTypes: getSupportedMediaTypes,
    downloadAsset: downloadAsset
};
