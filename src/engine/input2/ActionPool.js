const ButtonActionState = require('./ButtonActionState');
const AxisActionState = require('./AxisActionState');
const Enums = require('./Enums');

var _actions = [];
var _contexts = [];

function Action(index) {
    this.index = index;
    this.context = 0;
    this.name = '';
    this.description = '';
    this.type = 0;
}

function ActionContext(index, name) {
    this.index = index;
    this.name = name;
    this.actions = [];
}

function initialize(contexts, actions) {
    contexts.forEach(function (contextName, index) {
        _contexts[index] = new ActionContext(index, contextName);
    });
    actions.forEach(function (options, index) {
        var action = new Action(index);
        action.name = options.name;
        action.description = options.description || action.description;
        action.context = options.context || 0;
        action.type = options.type || 0;
        _actions[index] = action;
        _contexts[action.context].actions.push(action);
    })
}

function createActionStateArray() {
    var array = [];
    for (var i = 0, l = _actions.length; i < l; i++) {
        var action = _actions[i];
        if (action.type === Enums.ActionType.AXIS) {
            array[i] = new AxisActionState(action);
        } else {
            array[i] = new ButtonActionState(action);
        }
    }
    return array;
}

function getNumberOfContexts() {
    return _contexts.length;
}

function getAction(index) {
    return _actions[index];
}

function getActions() {
    return _actions;
}

module.exports = {
    initialize: initialize,
    createActionStateArray: createActionStateArray,
    getNumberOfContexts: getNumberOfContexts,
    getAction: getAction,
    getActions: getActions
};