
module.exports = function(scene) {

    scene.addEventListener('DoorOpened', function(a, b, c) {
        console.log(a);
        console.log(b);
        console.log(c);
    });

};
