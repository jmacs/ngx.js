
function downloadAsset(asset, resource, promise) {
    var image = new Image();
    image.onload = function() {
        image.onload = null;
        image.onerror = null;
        resource.onAssetDownloaded(image, asset);
        promise.resolve(asset);
    };
    image.onerror = function() {
        image.onload = null;
        image.onerror = null;
        promise.reject(asset);
    };
    image.src = asset.url;
}

function getSupportedMediaTypes() {
    return ['image', 'png', 'jpg'];
}

module.exports = {
    getSupportedMediaTypes: getSupportedMediaTypes,
    downloadAsset: downloadAsset
};
