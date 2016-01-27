import ColliderScript from '../../world/collision/ColliderScript';

var script = ColliderScript.create(100);

script.onEnter = function(mob, other) {
    console.log('100 enter');
};

script.onCollision = function(mob, other) {
    console.log('100 stay');
};

script.onExit = function(mob, other) {
    console.log('100 exit');
};
