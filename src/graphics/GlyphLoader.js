import Request from '../core/Request';
import GlyphMap from './GlyphMap';

export default function(asset) {
    return Request.get(asset.url).then(function(xhr) {
        var options = JSON.parse(xhr.responseText);
        GlyphMap.create(options);
    });
}
