const Runtime = require('./../engine/Runtime');
const Properties = require('./Properties');

document.addEventListener('DOMContentLoaded', function() {
    console.info('DOMContentLoaded');
    Runtime.bootstrap(Properties);
});

Runtime.onModulesLoaded(function () {
    console.info('RuntimeModulesLoaded');
    Runtime.downloadScene('/assets/scenes/world.json');
});
