class Color {

    constructor(r, g, b, a) {
        this.r = r || 0.0;
        this.g = g || 0.0;
        this.b = b || 0.0;
        this.a = a || 0.0;
    }

    copy(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    }

}

Color.fromRGB = function(r, g, b) {
    var x = 255.0;
    return new Color(r/x, g/x, b/x);
};

Color.fromRGBA = function(r, g, b, a) {
    var x = 255.0;
    return new Color(r/x, g/x, b/x, a/x);
};

Color.fromHex = function(hex) {
    var x = 255.0;
    var r = hex >> 16;
    var g = hex >> 8 & 0xFF;
    var b = hex & 0xFF;
    return new Color(r/x, g/x, b/x);
};

module.exports = Color;