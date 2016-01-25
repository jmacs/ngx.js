import Events from '../../core/Events.js';
import Processor from '../../core/Processor.js';

const EXIT = 0;
const ADD_TEN = 1;
const SEND_EVENT = 2;

Processor.define('dummy_proc', function(def) {

    def.initialize = function(scope) {
        console.debug('dummy_proc:initialize');
        scope.foo = 0;
        return ADD_TEN;
    };

    def[ADD_TEN] = function(scope, proc) {
        scope.foo += 1;
        console.debug('dummy_proc:add_ten -> foo=%s', scope.foo);
        if(scope.foo >= 30) {
            return SEND_EVENT;
        }
        proc.sleep(1000);
        return ADD_TEN;
    };

    def[SEND_EVENT] = function(scope) {
        console.debug('dummy_proc:send_event');
        Events.send('dummy_event', {foo: scope.foo});
        return EXIT;
    };

    def.destroy = function(scope) {
        console.debug('dummy_proc:destroy');
        scope.bar = 0;
    };

});
