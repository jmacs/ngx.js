var ColliderScript = require('../../world/collision/ColliderScript');

var collision = ColliderScript.create(100);

collision.onEnter = function(mob, other) {
    console.log('100 enter');
};

collision.onCollision = function(mob, other) {
    console.log('100 stay');
};

collision.onExit = function(mob, other) {
    console.log('100 exit');
};
