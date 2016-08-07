var Request = require('../core/Request');
var GlyphMap = require('./GlyphMap');

function GlyphLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var options = JSON.parse(xhr.responseText);
        GlyphMap.create(options);
    });
}

module.exports = {
    id: 'glyph',
    load: GlyphLoader
}
