
function deadzone(threshold, x, y) {
    var dist = Math.sqrt(x * x + y * y);
    if (dist < threshold) return false;
    return true;
}

function pair(x, y) {
    return x << 16 & 0xffff0000 | y & 0x0000ffff;
}

function depair(p) {
    return [p >> 16 & 0xFFFF, p & 0xFFFF];
}

module.exports = {
    deadzone: deadzone,
    pair: pair,
    depair: depair
};