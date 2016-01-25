import Graphics from './Graphics.js';
import Request from '../core/Request.js';
import Tileset from './Tileset.js';

const REGEX_TILES_JSON = /\.tiles\.json$/;

class TilesetLoader {

    handles(url) {
        return url.match(REGEX_TILES_JSON);
    }

    load(url, done) {
        Request.get(url, function(xhr, err) {
            if(err) {
                done(url, err);
                return;
            }

            var data = null;

            try {
                data = JSON.parse(xhr.responseText);
                Tileset.load(data);
            } catch(err) {
                done(url, err);
                return;
            }

            Graphics.createTexture(data.tex, data.src, function(result, err) {
                done(url, err);
            });

        });
    }

}

export default TilesetLoader;