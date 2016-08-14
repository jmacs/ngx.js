var BoxFunctions = require('../../../world/collision/BoxFunctions');

function onCollisionEnter(player, other) {
    console.log('200 enter');
}

function onCollisionStay(player, other) {
    console.log('200 stay');
    BoxFunctions.blockEntityMovement(player, other);
}

function onCollisionExit(player, other) {
    console.log('200 exit');
}

module.exports = {
    name: 'PlayerCollision',
    onCollisionEnter: onCollisionEnter,
    onCollisionStay: onCollisionStay,
    onCollisionExit: onCollisionExit
};
