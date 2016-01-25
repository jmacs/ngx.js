import Time from './Time';
import Events from './Events';
import System from './System';

var DEFAULT_FPS = 60;
var DEFAULT_SKIP_MS = 166;

var STATE_NEW = 0;
var STATE_RUN = 1;
var STATE_STOP = 2;

var opts = null;
var state = 0;
var fps = 0;
var skip = 0;
var then = 0;
var interval = 0.0;
var delta = 0.0;
var elapsed = 0;


var updateSystem = System.update;

function start(options) {
    if(state > STATE_NEW) {

        console.log('runtime restarted');

        state = STATE_RUN;
        tick(0);

    } else if(state === STATE_NEW) {
        opts = options || Object.create(null);

        console.log('initializing runtime');

        System.initialize(opts);

        fps = opts.fps || DEFAULT_FPS;
        skip = opts.skip || DEFAULT_SKIP_MS;
        interval = 1000 / fps;
        state = STATE_RUN;

        System.transition(0, true);

        tick(0);

        console.log('runtime started');

        Events.send('runtime_start');
    }
}

function tick(now) {
    if(state === STATE_RUN) {
        requestAnimationFrame(tick);
    }

    delta = now - then;

    if (delta > interval) {
        if(delta > skip) {
            delta = skip;
        }
        then = now;
        elapsed += delta;

        Time.delta = delta;
        Time.elapsed = elapsed;

        updateSystem();
    }
}

function stop() {
    console.log('runtime stopped');
    state = STATE_STOP;
}

export default {
    start: start,
    stop: stop
};