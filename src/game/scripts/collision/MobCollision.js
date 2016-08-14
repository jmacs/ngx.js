
function onCollisionEnter(mob, other) {
    console.log('100 enter');
}

function onCollisionStay(mob, other) {
    console.log('100 stay');
}

function onCollisionExit(mob, other) {
    console.log('100 exit');
}

module.exports = {
    name: 'MobCollision',
    onCollisionEnter: onCollisionEnter,
    onCollisionStay: onCollisionStay,
    onCollisionExit: onCollisionExit
};
