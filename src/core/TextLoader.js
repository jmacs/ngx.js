
function parseText(response) {
    if (!response.ok) {
        throw new Error(response.status + ': ' + response.url);
    }
    return response.text();
}

function downloadAsset(asset, resource, promise) {
    return fetch(asset.url)
        .then(parseText)
        .then(function(data) {
            resource.onAssetDownloaded(data, asset);
            promise.resolve(asset);
        });
}

function getSupportedMediaTypes() {
    return ['text', 'text/plain', 'x/shader', 'shader'];
}

module.exports = {
    getSupportedMediaTypes: getSupportedMediaTypes,
    downloadAsset: downloadAsset
};
