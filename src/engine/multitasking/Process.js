// 0 = RUNNING
// 1 = SLEEP
// 2 = WAIT
// 3 = EXIT
// 4 = TIMED OUT
// 5 = ERROR

class Process {

    constructor() {
        this.__id = 0;
        this.__name = null;
        this.__state = null;
        this.__time = 0;
        this.__timeout = 0;
        this.__status = -1;
    }

    get id() {
        return this.__id;
    }

    get name() {
        return this.__name;
    }

    get time() {
        return this.__time;
    }

    get status() {
        return this.__status;
    }

    get timeout() {
        return this.__timeout;
    }

    get isExiting() {
        return this.__status > 2;
    }

    get state() {
        return this.__state;
    }

    initialize(id, name, main, state) {
        if (this.__status != -1) {
            throw new Error('Cannot initialize an active process');
        }
        this.__id = id;
        this.__name = name;
        this.__status = 0;
        this.__subroutine = main;
        this.__state = state;
    }

    yields(subroutine) {
        this.__timeout = 0;
        this.__status = 1;
        this.__subroutine = subroutine;
    }

    sleep(subroutine, time) {
        this.__timeout = time;
        this.__status = 1;
        this.__subroutine = subroutine;
    }

    wait(timeout) {
        this.__timeout = timeout || 10000;
        this.__status = 2;
    }

    exit() {
        this.__status = 3;
    }

    update(delta) {
        switch (this.__status) {

            //
            // RUNNING
            //
            case 0:
                this.__status = 5;
                this.__subroutine(this, this.__state);
                this.__time += delta;
                return true;

            //
            // SLEEP
            //
            case 1:
                if (this.__timeout <= 0) {
                    this.__timeout = 0;
                    this.__status = 5;
                    this.__subroutine(this, this.__state);
                    this.__time += delta;
                    return true;
                }
                this.__timeout -= delta;
                this.__time += delta;
                return true;

            //
            // WAIT
            //
            case 2:
                if (this.__timeout <= 0) {
                    this.__timeout = 0;
                    this.__status = 4;
                    this.__time += delta;
                    return true;
                }
                this.__timeout -= delta;
                this.__time += delta;
                return true;

        }

        this.__subroutine = null;
        return false;
    }
}

module.exports = Process;