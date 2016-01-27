import ColliderScript from '../../world/collision/ColliderScript';

var script = ColliderScript.create(200);

script.onEnter = function(player, other) {
    console.log('200 enter');
};

script.onCollision = function(player, other, info) {
    console.log('200 stay');

    if (info.right || info.left) {
        player.position[0] += info.x;
    } else if (info.top || info.bottom) {
        player.position[1] += info.y;
    }
};

script.onExit = function(player, other) {
    console.log('200 exit');
};
