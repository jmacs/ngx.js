const Clock = require('../Clock');
const ActionPool = require('./ActionPool');

const NOTHING = [];
const NOOP = function () {};

class Controller {

    constructor(index) {
        this.index = index;
        this.gamepadIndex = 0;
        this.device = null;
        this.mapper = NOOP;
        this.contexts = [];
        this.context = 0;
        this.current = NOTHING;
    }

    configure(gamepadIndex, device) {
        this.device = device;
        this.mapper = device.mapper;
        this.gamepadIndex = gamepadIndex;
        var numOfContexts = ActionPool.getNumberOfContexts();

        // create a controller element for each context
        for (var i = 0; i < numOfContexts; i++) {
            this.contexts[i] = [];
            for (var j = 0; j < device.elements; j++) {
                this.contexts[i][j] = null;
            }
        }
        this.current = this.contexts[0];
    }

    assignAction(element, actionState) {
        var context = this.contexts[actionState.action.context];
        if (!context) return;
        if (element < 0 || element >= context.length) return;
        context[element] = actionState;
    }

    unassignAction(element, context) {
        var ctx = this.contexts[context];
        if (!ctx) return;
        if (element < 0 || element >= context.length) return;
        ctx[element] = null;
    }

    setContext(context) {
        if (context < 0 || context >= this.contexts.length) return;
        this.context = context;
        this.current = this.actions[context] || NOTHING;
    }

    send(element, value) {
        var state = this.current[element];
        if (state) {
            state.set(value, Clock.delta);
        }
    }

}

module.exports = Controller;
