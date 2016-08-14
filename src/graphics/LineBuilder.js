
function buildGrid(x, y, gridx, gridy, size) {
    var lines = [];
    var xl = gridx * size;
    var yl = gridy * size;
    var sx = 0;
    var sy = 0;
    var tx = 0;
    var ty = 0;
    for (var iy = 0; iy < gridy + 1; iy++) {
        sx = 0;
        sy = iy * size;
        tx = xl;
        ty = sy;
        lines.push(sx);
        lines.push(sy);
        lines.push(tx);
        lines.push(ty);
    }
    for (var ix = 0; ix < gridx + 1; ix++) {
        sx = ix * size;
        sy = 0;
        tx = sx;
        ty = yl;
        lines.push(sx);
        lines.push(sy);
        lines.push(tx);
        lines.push(ty);
    }

    return lines;
}

module.exports = {
    buildGrid: buildGrid
};
