
function deadzone(threshold, x, y) {
    var dist = Math.sqrt(x * x + y * y);
    if (dist < threshold) return 0.0;
}

module.exports = {
    deadzone: deadzone
};