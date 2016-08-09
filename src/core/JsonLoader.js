
function parseJSON(response) {
    return response.json();
}

function downloadAsset(asset, resource, promise) {
    return fetch(asset.url).then(parseJSON).then(function(data) {
        resource.onAssetDownloaded(data, asset);
        promise.resolve(asset);
    });
}

function getSupportedMediaTypes() {
    return ['json', 'text/json', 'application/json'];
}

module.exports = {
    getSupportedMediaTypes: getSupportedMediaTypes,
    downloadAsset: downloadAsset
};
