var Component = require('.././Component');
var Entity = require('.././Entity');

class BoxComponent extends Component {

    constructor() {
        super();
        this.offsetX = 0;
        this.offsetY = 0;
        this.ref = 0;
        this.minX = 0;  // bottom
        this.minY = 0;  // left
        this.maxX = 0;  // top
        this.maxY = 0;  // right
        this.centerX = 0;
        this.centerY = 0;
        this.mask = 0;
        this.width = 0;
        this.height = 0;
        this.halfWidth = 0;
        this.halfHeight = 0;
        this.behavior = null;
        this.collidingWith = Object.create(null);
    }

    destroy() {
        super.destroy();
        this.collidingWith = Object.create(null);
        this.behavior = null;
    }

    sync() {
        var position = this.entity.position;
        this.ref = this.entity.ref;
        this.centerX = position[0] + this.offsetX;
        this.centerY = position[1] + this.offsetY;
        this.minX = this.centerX - this.halfWidth;
        this.minY = this.centerY - this.halfHeight;
        this.maxX = this.centerX + this.halfWidth;
        this.maxY = this.centerY + this.halfHeight;
        return this;
    }

    hydrate(state) {

        if (state.width) {
            this.width = state.width;
            this.halfWidth = this.width * 0.5;
            this.offsetX = this.halfWidth;
        }

        if (state.height) {
            this.height = state.height;
            this.halfHeight = this.height * 0.5;
            this.offsetY = this.halfHeight
        }

        if (state.offset) {
            // offsets are percentages of pixels on the bottom left and top right
            var minOffsetX = state.width * state.offset[0];
            var minOffsetY = state.height * state.offset[1];
            var maxOffsetX = state.width * state.offset[2];
            var maxOffsetY = state.height * state.offset[3];

            // calculate the width & height of the smaller (or larger) rect
            this.width = this.width + minOffsetX + maxOffsetX;
            this.height = this.height + minOffsetY + maxOffsetY;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;

            // calculate the center offset
            this.offsetX = this.halfWidth + Math.abs(minOffsetX);
            this.offsetY = this.halfHeight + Math.abs(minOffsetY);
        }

        if (state.mask) {
            this.mask = state.mask;
        }

        if (state.behavior) {
            this.behavior = state.behavior;
            Entity.attachScript(state.behavior, this.entity);
        }
    }
}

BoxComponent.id = 'box';
module.exports = BoxComponent;
