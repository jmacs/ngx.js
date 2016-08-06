import GameClock from '../core/GameClock';
import Entity from '../core/Entity';

var bootstrap = Object.create(null);


bootstrap.components = function() {
    var req = require.context('./components', true, /^(.*\.(js$))[^.]*$/igm);
    var modules = [];
    req.keys().forEach(function(key){
        modules.push(req(key).default);
    });
    Entity.registerComponents(modules);
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

GameClock.addEventListener('GameClockLoaded', function() {
    Object.keys(bootstrap).forEach(function(key) {
        bootstrap[key]();
    });
});