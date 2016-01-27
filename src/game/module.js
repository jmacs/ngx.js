import GameClock from '../core/GameClock';

var bootstrap = Object.create(null);

bootstrap.console = function() {
    var req = require.context('./console', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        req(key);
    });
};

bootstrap.components = function() {
    var req = require.context('./components', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        req(key);
    });
};

bootstrap.colliders = function() {
    var req = require.context('./colliders', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        req(key);
    });
};

bootstrap.coroutines = function() {
    var req = require.context('./coroutines/', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        req(key);
    });
};

bootstrap.agents = function() {
    var req = require.context('./agents/', true, /^(.*\.(js$))[^.]*$/igm);
    req.keys().forEach(function(key){
        req(key);
    });
};

GameClock.on('bootstrap', function initialize() {
    Object.keys(bootstrap).forEach(function(key) {
        bootstrap[key]();
    });
});