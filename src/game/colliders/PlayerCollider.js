import ColliderScript from '../../world/collision/ColliderScript';
import BoxFunctions from '../../world/collision/BoxFunctions';

var script = ColliderScript.create(200);

script.onEnter = function(player, other) {
    console.log('200 enter');
};

script.onCollision = function(player, other) {
    console.log('200 stay');
    BoxFunctions.blockEntityMovement(player, other);
};

script.onExit = function(player, other) {
    console.log('200 exit');
};
