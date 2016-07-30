import Request from '../core/Request';
import GlyphMap from './GlyphMap';

function GlyphLoader(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var options = JSON.parse(xhr.responseText);
        GlyphMap.create(options);
    });
}

export default {
    id: 'glyph',
    load: GlyphLoader
}
