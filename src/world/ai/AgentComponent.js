import Component from '../../core/Component';

class AgentComponent extends Component {

    constructor() {
        super();
        this.script = 0;
        this.awake = false;
        this.time = 0;
    }

    hydrate(state) {
        if (state.script) {
            this.script = state.script;
        }
    }
}

export default AgentComponent;