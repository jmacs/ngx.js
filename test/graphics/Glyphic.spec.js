var Glyphic = _require('src/graphics/Glyphic');

var CHAR_NULL = 0;
var CHAR_H = 104;
var CHAR_I = 105;

describe('src/graphics/Glyphic', function() {

    it('should create a zero length varchar', function() {
        var varchar = new Glyphic();
        assert.equal(varchar.length, 0);
    });

    it('should create varchar with length', function() {
        var varchar = new Glyphic(4);
        assert.equal(varchar.length, 4);
    });

    it('should create varchar with null chars', function() {
        var varchar = new Glyphic(4);
        assert.equal(varchar.indexOf(0), CHAR_NULL);
        assert.equal(varchar.indexOf(1), CHAR_NULL);
        assert.equal(varchar.indexOf(2), CHAR_NULL);
        assert.equal(varchar.indexOf(3), CHAR_NULL);
        assert.equal(varchar.indexOf(4), undefined);
    });

    it('should insert string at beginning', function() {
        var varchar = new Glyphic(4);
        varchar.insertString(0, 'hi');
        assert.equal(varchar.indexOf(0), CHAR_H);
        assert.equal(varchar.indexOf(1), CHAR_I);
        assert.equal(varchar.indexOf(2), CHAR_NULL);
        assert.equal(varchar.indexOf(3), CHAR_NULL);
    });

    it('should insert string at index', function() {
        var varchar = new Glyphic(4);
        varchar.insertString(1, 'hi');
        assert.equal(varchar.indexOf(0), CHAR_NULL);
        assert.equal(varchar.indexOf(1), CHAR_H);
        assert.equal(varchar.indexOf(2), CHAR_I);
        assert.equal(varchar.indexOf(3), CHAR_NULL);
    });

    it('insert should respect length of varchar', function() {
        var varchar = new Glyphic(4);
        varchar.setString('hi');
        var text = varchar.toString();
        assert.equal(text, 'hi');
        assert.equal(text.length, 2);
    });

    it('should return the string representation', function() {
        var varchar = new Glyphic(4);
        varchar.insertString(3, 'hi');
        assert.equal(varchar.indexOf(0), CHAR_NULL);
        assert.equal(varchar.indexOf(1), CHAR_NULL);
        assert.equal(varchar.indexOf(2), CHAR_NULL);
        assert.equal(varchar.indexOf(3), CHAR_H);
    });

    it('setString() should reset value of varchar', function() {
        var varchar = new Glyphic(4);
        varchar.insert(0, CHAR_H);
        varchar.insert(1, CHAR_H);
        varchar.insert(2, CHAR_H);
        varchar.insert(3, CHAR_H);
        varchar.setString('i');
        assert.equal(varchar.indexOf(0), CHAR_I);
        assert.equal(varchar.indexOf(1), CHAR_NULL);
        assert.equal(varchar.indexOf(2), CHAR_NULL);
        assert.equal(varchar.indexOf(3), CHAR_NULL);
    });


});