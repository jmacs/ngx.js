var Component = require('../composition/Component');
var ResourceManager = require('../core/ResourceManager');

const NO_FRAMES = [];

class AnimationComponent extends Component {

    constructor() {
        super();
        this.index = 0;
        this.animationId = 0;
        this.frames = NO_FRAMES;
        this.length = 0;
        this.time = 0.0;
    }

    hydrate(state) {
        if (state.animationId) {
            this.change(state.animationId);
        }
    }

    change(animationId) {
        var animation = ResourceManager.get('animation', animationId);
        if (!animation) return;
        var frames = animation.frames;
        this.animationId = animationId;
        this.frames = frames;
        this.length = animation.length;
        this.time = 0.0;
        this.index = 0;
    }

}

AnimationComponent.id = 'animation';

module.exports = AnimationComponent;