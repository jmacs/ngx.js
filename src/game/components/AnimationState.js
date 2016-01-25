import Component from '../../core/Component';
import Entity from '../../core/Entity.js';
import Animation from '../../graphics/Animation.js';

const NO_FRAMES = [];

class AnimationState extends Component {

    constructor() {
        super();
        this.index = 0;
        this.animationId = 0;
        this.frames = NO_FRAMES;
        this.length = 0;
        this.time = 0.0;
    }

    initialize(def) {
        if(def.animationId) {
            this.change(def.animationId);
        }
    }

    change(animationId) {
        var animation = Animation.get(animationId);
        if(!animation) return;
        var frames = animation.frames;
        this.animationId = animationId;
        this.frames = frames;
        this.length = animation.length;
        this.time = 0.0;
        this.index = 0;
    }

}

Entity.addComponent('animation', AnimationState);