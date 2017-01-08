var Process = _require('src/process/Process');

describe('src/process/Process', function() {
    var _process, _state, _identity = 0;

    beforeEach(function() {
        _state = {
            mainWasCalled: 0,
            step2WasCalled: 0,
            step3WasCalled: 0,
            step4WasCalled: 0,
            step5WasCalled: 0,
            shouldThrowInMain: false,
            shouldExitInMain: false
        };
        _process = new Process();
        _process.initialize(++_identity, 'mock', main, _state);
    });

    it('should initialize in the default state', function() {
        assert.equal(_process.id, _identity);
        assert.equal(_process.status, 0);
        assert.equal(_process.time, 0);
        assert.equal(_process.name, 'mock');
        assert.equal(_process.state, _state);
    });

    describe('main (yield)', function() {

        it('should call main on 1st update', function() {
            tick(1);
            assert.equal(_state.mainWasCalled, 1);
        });

        it('should return true after update', function() {
            var result = tick(1);
            assert.equal(result, true);
        });

        it('should not exit after main', function() {
            tick(1);
            assert.equal(_process.isExiting, false);
        });

        it('should increment time after main', function() {
            tick(1);
            assert.equal(_process.time, 16);
        });

        it('should increment time after main', function() {
            tick(1);
            assert.equal(_process.time, 16);
        });

        it('should set status to 5 on error', function() {
            _state.shouldThrowInMain = true;
            try {
                tick(1);
            } catch (ex) { }
            assert.equal(_process.status, 5);
        });

        it('should set status to 3 on normal exit', function() {
            _state.shouldExitInMain = true;
            tick(1);
            assert.equal(_process.status, 3);
        });

    });

    describe('step2 (yield)', function() {

        it('should call step2 on 2nd update', function() {
            tick(2);
            assert.equal(_state.step2WasCalled, 1);
        });

        it('should return true after update', function() {
            var result = tick(2);
            assert.equal(result, true);
        });

        it('should not exit after step2', function() {
            tick(2);
            assert.equal(_process.isExiting, false);
        });

        it('should increment time after step2', function() {
            tick(2);
            assert.equal(_process.time, 32);
        });

    });

    describe('step3 (delay)', function() {

        it('should call step3 on 3rd update', function() {
            tick(3);
            assert.equal(_state.step3WasCalled, 1);
        });

        it('should return true after update', function() {
            var result = tick(3);
            assert.equal(result, true);
        });

        it('should not exit after step3', function() {
            tick(3);
            assert.equal(_process.isExiting, false);
        });

        it('should increment time after step3', function() {
            tick(3);
            assert.equal(_process.time, 48);
        });

        it('should sleep after step 3', function() {
            tick(3);
            assert.equal(_process.timeout, 32);
        });

        it('should delay execution of step4 after step3', function() {
            tick(4);
            assert.equal(_process.time, 64);
            assert.equal(_process.timeout, 16);
            assert.equal(_state.step4WasCalled, 0);
        });

        it('should execute step4 after delay', function() {
            tick(6);
            assert.equal(_process.time, 96);
            assert.equal(_state.step4WasCalled, true);
        });

        it('should set default wait timeout of 10 seconds', function() {
            tick(6);
            assert.equal(_process.timeout, 10000);
        });

        it('should set status to 4 on timeout', function() {
            tick(650);
            assert.equal(_process.status, 4);
        });

    });

    function tick(times) {
        for (var i = 0; i < times; i++) {
            if (!_process.update(16)) {
                return false;
            }
        }
        return true;
    }

    //
    // subroutines
    //

    function main(process, state) {
        if (state.shouldThrowInMain) {
            throw new Error('error in main()');
        }
        if (state.shouldExitInMain) {
            return process.exit();
        }
        state.mainWasCalled++;
        process.yields(step2);
    }

    function step2(process, state) {
        state.step2WasCalled++;
        process.yields(step3);
    }

    function step3(process, state) {
        state.step3WasCalled++;
        process.sleep(step4, 32);
    }

    function step4(process, state) {
        state.step4WasCalled++;
        process.wait();
    }

});