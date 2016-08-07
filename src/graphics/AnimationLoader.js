var Request = require('../core/Request');
var Animation = require('./Animation.js');

function AnimationLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var data = JSON.parse(xhr.responseText);
        Animation.add(data);
    });
}

module.exports = {
    id: 'animation',
    load: AnimationLoader
}
