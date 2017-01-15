var Component = require('../composition/Component');
var Entity = require('../composition/Entity');

class AgentComponent extends Component {

    constructor() {
        super();
        this.behavior = null;
        this.awake = false;
        this.time = 0;
    }

    hydrate(state) {
        if (state.behavior) {
            this.behavior = state.behavior;
            Entity.attachScript(state.behavior, this.entity);
        }
    }

    destroy() {
        this.entity = null;
        this.agent = null;
    }
}

AgentComponent.id = 'agent';

module.exports = AgentComponent;