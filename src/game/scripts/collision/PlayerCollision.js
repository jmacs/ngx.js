var BoxFunctions = require('../../../world/collision/BoxFunctions');

function onCollisionEnter(self, other) {
    console.log('200 enter');
}

function onCollisionStay(self, other) {
    console.log('200 stay');
    BoxFunctions.blockEntityMovement(self, other);
}

function onCollisionExit(self, other) {
    console.log('200 exit');
}

module.exports = {
    name: 'PlayerCollision',
    CollisionEnter: onCollisionEnter,
    CollisionStay: onCollisionStay,
    CollisionExit: onCollisionExit
};
