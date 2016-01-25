import Request from '../core/Request.js';
import Entity from './Entity.js';

const REGEX_PREFAB_JSON = /\.prefab\.json$/;

class PrefabLoader {

    handles(url) {
        return url.match(REGEX_PREFAB_JSON);
    }

    load(url, done) {
        Request.get(url, function(xhr, err) {
            if(err) {
                done(url, err);
                return;
            }

            try {
                var data = JSON.parse(xhr.responseText);
                var keys = Object.keys(data);
                for(var i = 0, l = keys.length; i < l; i++) {
                    var key = keys[i];
                    Entity.addPrefab(key, data[key]);
                }
            } catch(err) {
                done(url, err);
                return;
            }

            done(url, null);

        });
    }

}

export default PrefabLoader;