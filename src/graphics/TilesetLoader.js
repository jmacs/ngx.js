var Request = require('../core/Request');
var Tileset = require('./Tileset.js');

function TilesetLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Tileset.add(data);
    });
}

module.exports = {
    id: 'tileset',
    load: TilesetLoader
}
