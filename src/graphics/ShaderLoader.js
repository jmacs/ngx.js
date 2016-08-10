const MIME_TYPE = 'text/xml';
var _parser = new DOMParser();

function parseText(response) {
    return response.text();
}

function parseXml(text) {
    var xml = _parser.parseFromString(text, MIME_TYPE);
    return {
        name: xml.getElementsByTagName('shader')[0].getAttribute('name'),
        fragment: xml.getElementsByTagName('fragment')[0].textContent,
        vertex: xml.getElementsByTagName('vertex')[0].textContent
    };
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
    return ['x-ngx/shader'];
}

module.exports = {
    getSupportedMediaTypes: getSupportedMediaTypes,
    downloadAsset: downloadAsset
};
