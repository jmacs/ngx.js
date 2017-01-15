class Color {}

Color.create = function() {
    var out = new Float32Array(4);
    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    return out;
};

Color.set = function(out, r, g, b, a) {
    out[0] = r;
    out[1] = g;
    out[2] = b;
    out[3] = a;
    return out;
};

Color.clone = function(color) {
    var out = new Float32Array(4);
    out[0] = color[0];
    out[1] = color[1];
    out[2] = color[2];
    out[3] = color[3];
    return out;
};

Color.copy = function(out, color) {
    out[0] = color[0];
    out[1] = color[1];
    out[2] = color[2];
    out[3] = color[3];
    return out;
};

Color.fromRGB = function(out, r, g, b) {
    const x = 255.0;
    out[0] = r / x;
    out[1] = g / x;
    out[2] = b / x;
    return out;
};

Color.fromRGBA = function(out, r, g, b, a) {
    const x = 255.0;
    out[0] = r / x;
    out[1] = g / x;
    out[2] = b / x;
    out[3] = a / x;
    return out;
};

Color.fromHex = function(out, hex) {
    const x = 255.0;
    out[0] = (hex >> 16) / x;
    out[1] = (hex >> 8 & 0xFF) / x;
    out[2] = (hex >> 8 & 0xFF) / x;
    return out;
};

module.exports = Color;