import Color from './Color';

class Varchar {

    constructor(length) {
        if (!length || length <= 0) length = 0;
        this.__chars = [];
        this.__length = length;
        this.clear();
    }

    get length() {
        return this.__length;
    }

    indexOf(index) {
        return this.__chars[index];
    }

    setString(text) {
        var len = text.length;
        var chars = this.__chars;
        for (var i = 0, l = this.__length; i < l; i++) {
            if (i < len) {
                chars[i] = text.charCodeAt(i);
            } else {
                chars[i] = 0;
            }
        }
    }

    insert(index, code) {
        if (index < this.__length) {
            this.__chars[index] = code;
        }
    }

    insertString(index, text) {
        var max = this.__length - 1;
        for (var i = 0, l = text.length; i < l; i++) {
            var n = index + i;
            if (n > max) break;
            this.__chars[index + i] = text.charCodeAt(i);
        }
    }

    toString() {
        var text = '';
        var chars = this.__chars;
        for (var i = 0; i < this.__length; i++) {
            var code = chars[i];
            if (code > 0) {
                text += String.fromCharCode(code);
            }
        }
        return text;
    }

    clear() {
        var chars = this.__chars;
        for (var i = 0, l = this.__length; i < l; i++) {
            chars[i] = 0;
        }
    }
}

Varchar.parseString = function(value) {
    var len = value.length;
    var varchar = new Varchar(len);
    var chars = varchar.__chars;
    for (var i = 0; i < len; i++) {
        chars[i] = value.charCodeAt(i);
    }
    varchar.__length = len;
    return varchar;
};

export default Varchar;