import Runtime from '../core/Runtime.js';
import Entity from '../core/Entity.js';
import Processor from '../core/Processor.js';

var cmd = Object.create(null);
window.cmd = cmd;

// -----------------------------------
// Runtime
// -----------------------------------

cmd.start = Runtime.start;
cmd.stop = Runtime.stop;

// -----------------------------------
// Entity
// -----------------------------------

cmd.entity = Entity.get;
cmd.kill = Entity.kill;
cmd.spawn = function(name, x, y) {
    var entity = Entity.spawn(name);
    if((x || y) && entity.position) {
        entity.position.xy[0] = toFloat(x);
        entity.position.xy[1] = toFloat(y);
    }
    return entity;
};

// -----------------------------------
// Process
// -----------------------------------

cmd.startProcess = Processor.start;
cmd.killProcess = Processor.kill;
cmd.killAllProcess = Processor.killAll;
cmd.haltProcess = Processor.halt;
cmd.resumeProcess = Processor.resume;
cmd.suspendProcess = Processor.suspend;

// -----------------------------------
// Utils
// -----------------------------------

function toFloat(value) {
    var n = parseFloat(value);
    if(isNaN(n)) return 0.0;
    return n;
}