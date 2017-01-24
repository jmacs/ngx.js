var _actions = Object.create(null);

function initialize(options) {
    options.forEach(function (group, groupIndex) {
        var actionNames = Object.keys(group);
        actionNames.forEach(function (actionName) {
            var type = group[actionName];
            add(groupIndex, actionName, type);
        });
    })
}

function add(group, name, type) {
    if (!_actions[group]) {
        _actions[group] = Object.create(null);
    }
    _actions[group][name] = {
        group: group,
        name: name,
        type: type
    };
}

function get(group, name) {
    var grouping = _actions[group];
    if (!grouping) return null;
    return grouping[name];
}

module.exports = {
    initialize: initialize,
    get: get
};