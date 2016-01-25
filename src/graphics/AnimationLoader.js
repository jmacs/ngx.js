import Request from '../core/Request.js';
import Animation from './Animation.js';

const REGEX_ANIM_JSON = /\.anim\.json$/;

class AnimationLoader {

    handles(url) {
        return url.match(REGEX_ANIM_JSON);
    }

    load(url, done) {
        Request.get(url, function(xhr, err) {
            if(err) {
                done(url, err);
                return;
            }

            try {
                var data = JSON.parse(xhr.responseText);
                Animation.load(data);
            } catch(err) {
                done(url, err);
                return;
            }

            done(url, null);

        });
    }

}

export default AnimationLoader;