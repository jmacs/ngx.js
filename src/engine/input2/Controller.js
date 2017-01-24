const Clock = require('../Clock');
const Enums = require('./Enums');
const ButtonActionState = require('./ButtonActionState');
const AxisActionState = require('./AxisActionState');

const NOTHING = [];

class Controller {

    constructor(numOfElements, numOfGroups) {
        this.actions = [];
        // create a controller element for each group
        for (var i = 0; i < numOfGroups; i++) {
            var actionGroup = [];
            for (var j = 0; i < numOfElements; i++) {
                actionGroup[j] = null;
            }
            this.actions[i] = actionGroup;
        }
        this.current = this.actions[0] || NOTHING;
    }

    assignAction(element, action) {
        if (action.type === Enums.ActionType.AXIS) {
            this.actions[action.group][element] =
                new AxisActionState(element, action);
        } else {
            this.actions[action.group][element] =
                new ButtonActionState(element, action);
        }
    }

    unassignAction(element, group) {
        this.actions[group][element] = null;
    }

    setActionGroup(group) {
        this.group = group;
        this.current = this.actions[group] || NOTHING;
    }

    send(element, value) {
        var state = this.current[element];
        if (state) {
            state.set(value, Clock.delta);
        }
    }

}

module.exports = Controller;
