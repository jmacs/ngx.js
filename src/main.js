const Runtime = require('./core/Runtime');

Runtime.include([

    require('./composition/Module'),
    require('./graphics/Module'),
    require('./input/Module'),
    require('./audio/Module'),

    require('./physics/Module'),
    require('./gui/Module'),
    require('./multitasking/Module'),
    require('./actors/Module'),
    require('./maps/Module'),

    require('./temp/Module')
]);

document.addEventListener('DOMContentLoaded', function() {
    console.info('DOMContentLoaded');
    Runtime.start();
});
