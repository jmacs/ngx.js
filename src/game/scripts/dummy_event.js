import Events from '../../core/Events.js';

Events.on('dummy_event', function(args) {
    console.debug('dummy_event!!', args);
});