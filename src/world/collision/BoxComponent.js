import Component from '../../core/Component';

class BoxComponent extends Component {

    constructor() {
        super();
        this.ref = 0;
        this.minX = 0;  // bottom
        this.minY = 0;  // left
        this.maxX = 0;  // top
        this.maxY = 0;  // right
        this.mask = 0;
        this.width = 0;
        this.height = 0;
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
        return this;
    }

    hydrate(state) {
        if (state.width) {
            this.width = state.width;
            this.maxX = this.width;
        }
        if (state.height) {
            this.height = state.height;
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
