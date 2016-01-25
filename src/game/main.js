import Runtime from '../core/Runtime.js';
import '../graphics/bootstrap.js';
import '../input/bootstrap.js';
import '../world/bootstrap.js';
import '../game/bootstrap.js';

document.addEventListener("DOMContentLoaded", function() {
    Runtime.start({fps: 60, skip: 166});
});