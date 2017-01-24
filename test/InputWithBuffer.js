
describe('Input with buffer', function() {
    var currentIndex = 0;
    var lastIndex = 0;

    // samples
    var buffer = [
        {t: 16811889, v: true},    // 0
        {t: 16811905, v: false},    // 1
        {t: 16811921, v: true},     // 2
        {t: 16811937, v: false},     // 3
        {t: 16811953, v: false},     // 4
        {t: 16811969, v: true},     // 5
        {t: 16811985, v: true},     // 6
        {t: 16812001, v: false},     // 7
        {t: 16812017, v: true},     // 8
        {t: 16812033, v: true},     // 9
        {t: 16812049, v: true},     // 10
        {t: 16812065, v: true},     // 11
        {t: 16812081, v: false}      // 12
    ];
    // prev down time
    // last up time

//double down -> can assume each element is no less than 16ms apart

// loop backwards:
//iterator = (iterator + buffer_size - 1) % buffer_size
    function setFrameIndex(x) {
        if (x = 0) {
            currentIndex = 0;
            lastIndex = 12;
        } else {
            currentIndex = x;
            lastIndex = x - 1;
        }
    }

    function getButton() {
        return buffer[lastIndex].v;
    }

    function isButtonPressed() {
        return buffer[lastIndex].v && buffer[currentIndex].v;
    }

    function isButtonUp() {
        return buffer[lastIndex].v && !buffer[currentIndex].v;
    }

    function isButtonDown() {
        return !buffer[lastIndex].v && buffer[currentIndex].v;
    }

    function isButtonDoubleDown() {
        return buffer[lastIndex].v && buffer[currentIndex].v;
    }

    function isButtonHeldTimed(ms) { // doesnt wrap
        if (!buffer[currentIndex].v) {
            return false;
        }
        for (var i = lastIndex; i--;) {
            var x = buffer[i];
            if (!x.v) return false;
            ms -= x.t;
            if (ms < 1) return true;
        }
    }

    it('isButtonPressed', function() {
        setFrameIndex(0);
        expect(isButtonPressed()).to.be.true;
    });

    it('isButtonUp', function() {
        setFrameIndex(12);
        expect(isButtonUp()).to.be.true;
    });

    it('isDown', function() {
        setFrameIndex(11);
        expect(isButtonDown()).to.be.true;
    });

    it('isButtonHold', function() {
        setFrameIndex(11);
        expect(isButtonHeldTimed(40)).to.be.true;
    });

});
var Clock = {
    delta: 16,
    now: 0
};



/*

--==--===----===-----
// ~14kb for 125 array (~2 seconds)
var samples = [
    {t: 16811889, btn:[false, true, true, true, false, false, false, true, true, false], axis:[0.25215,-1.12120, 0.12424, 0.12494214, 0.12424, 0.12494214, 0.12424, 0.12494214]},    // 0

]*/