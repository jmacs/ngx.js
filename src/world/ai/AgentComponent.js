var Component = require('../../core/Component');
var ResourceManager = require('../../core/ResourceManager');

class AgentComponent extends Component {

    constructor() {
        super();
        this.__behavior = null;
        this.awake = false;
        this.time = 0;
    }

    get behavior() {
        return this.__behavior;
    }

    set behavior(value) {
        this.__behavior = value;
    }
    hydrate(state) {
        if (state.behavior) {
            this.__behavior = ResourceManager.get('behavior', state.behavior);
        }
    }

    destroy() {
        this.entity = null;
        this.agent = null;
    }
}

AgentComponent.id = 'agent';

module.exports = AgentComponent;