module.exports = {
    modules: [
        require('../engine/resources/Module'),
        require('../engine/composition/Module'),
        require('../engine/input/Module'),
        require('../engine/physics/Module'),
        require('../engine/graphics/Module'),
        require('../engine/actors/Module'),
        require('../engine/maps/Module'),
        require('../engine/audio/Module'),
        require('../engine/gui/Module'),
        require('../engine/multitasking/Module'),
        require('../engine/input2/Module'),
    ],
    viewport: {
        width: 1280,
        height: 720
    },
    shaders: [
        'assets/shaders/mesh.xml',
        'assets/shaders/sprite.xml'
    ],
    textures: {
        "assets/textures/smb3.png": {
            id: 0
        },
        "assets/textures/bisasam_font.png": {
            id: 3
        }
    }
};
