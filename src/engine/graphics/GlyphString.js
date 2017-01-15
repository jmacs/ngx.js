class GlyphString {}

GlyphString.create = function(length) {
    var out = new Int16Array(length);
    for (var i = 0; i < length; i++) {
        out[i] = 0;
    }
    return out;
};

GlyphString.setString = function(out, str) {
    var max = str.length;
    for (var i = 0, l = out.length; i < l; i++) {
        if (i < max)  {
            out[i] = str.charCodeAt(i);
        } else {
            out[i] = 0;
        }
    }
    return out;
};

GlyphString.insertString = function(out, offset, str) {
    var max = str.length;
    for (var i = offset, l = out.length; i < l; i++) {
        if (i >= max) break;
        out[i] = str.charCodeAt(i);
    }
    return out;
};

GlyphString.toString = function(source) {
    var text = '';
    for (var i = 0, l = source.length; i < l; i++) {
        var code = source[i];
        if (code > 0) {
            text += String.fromCharCode(code);
        }
    }
    return text;
};

GlyphString.clear = function(source) {
    for (var i = 0, l = source.length; i < l; i++) {
        source[i] = 0;
    }
};

GlyphString.parseString = function(str) {
    var len = str.length;
    var out = new Int16Array(length);
    for (var i = 0; i < len; i++) {
        out[i] = str.charCodeAt(i);
    }
    return out;
};

module.exports = GlyphString;