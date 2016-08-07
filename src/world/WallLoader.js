var Request = require('../core/Request');
var Walls = require('./Walls.js');

function WallLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Walls.add(data);
    });
}

module.exports = {
    id: 'walls',
    load: WallLoader
}
