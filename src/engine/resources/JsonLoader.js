
function parseJSON(response) {
    if (!response.ok) {
        throw new Error(response.status + ': ' + response.url);
    }
    return response.json();
}

function downloadAsset(asset, resource, promise) {
    return fetch(asset).then(parseJSON).then(function(data) {
        resource.onAssetDownloaded(data, asset);
        promise.resolve(asset);
    });
}

function getSupportedMediaTypes() {
    return ['application/json'];
}

module.exports = {
    getSupportedMediaTypes: getSupportedMediaTypes,
    downloadAsset: downloadAsset
};
