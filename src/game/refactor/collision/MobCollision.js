
function onCollisionEnter(self, other) {
    console.log('100 enter');
}

function onCollisionStay(self, other) {
    console.log('100 stay');
}

function onCollisionExit(self, other) {
    console.log('100 exit');
}

module.exports = {
    name: 'MobCollision',
    CollisionEnter: onCollisionEnter,
    CollisionStay: onCollisionStay,
    CollisionExit: onCollisionExit
};
