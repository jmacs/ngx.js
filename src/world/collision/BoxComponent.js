import Component from '../../core/Component';

class BoxComponent extends Component {

    constructor() {
        super();
        this.ref = 0;
        this.minX = 0;  // bottom
        this.minY = 0;  // left
        this.maxX = 0;  // top
        this.maxY = 0;  // right
        this.centerX = 0;
        this.centerY = 0;
        this.mask = 0;
        this.width = 0;
        this.halfWidth = 0;
        this.height = 0;
        this.halfHeight = 0;
        this.collider = 0;
        this.collidingWith = Object.create(null);
    }

    destroy() {
        super.destroy();
        this.collidingWith = Object.create(null);
    }

    sync() {
        var position = this.entity.position;
        this.ref = this.entity.ref;
        this.minX = position[0];
        this.minY = position[1];
        this.maxX = position[0] + this.width;
        this.maxY = position[1] + this.height;
        this.centerX = this.halfWidth + position[0];
        this.centerY = this.halfHeight + position[1];
        return this;
    }

    hydrate(state) {
        if (state.width) {
            this.width = state.width;
            this.halfWidth = state.width * 0.5;
            this.maxX = this.width;
        }
        if (state.height) {
            this.height = state.height;
            this.halfHeight = state.height * 0.5;
            this.maxY = this.height;
        }
        if (state.mask) {
            this.mask = state.mask;
        }
        if (state.collider) {
            this.collider = state.collider;
        }
    }
}

export default BoxComponent;
