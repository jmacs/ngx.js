var modules = Object.create(null);

var GameModules = function(path) {
    var result = modules, path = path.split('.');
    for (var i = 0, l = path.length; i < l; i++) {
        result = result[path[i]];
    }
    return result;
};

GameModules.include = function(name, value) {
    modules[name] = value;
};

window.GameModules = GameModules;
export default GameModules;