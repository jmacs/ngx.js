
function main(process, state) {
    console.log('main()');

    state.x = state.x || 0;
    state.i = 0;

    return process.yields(doSomethingAsync);
}

function doSomethingAsync(process) {
    console.log('doSomethingAsync()');

    setTimeout(function() {
        console.log('  done');
        return process.yields(doProcessLoop);
    }, 2000);

    console.log('  waiting...');
    return process.wait();
}

function doProcessLoop(process, state) {
    console.log('doProcessLoop() i=%s', state.i);

    state.x++;
    if (state.i > 3) {
        return process.yields(beforeExit);
    }
    state.i++;

    return process.sleep(doProcessLoop, 1000);
}

function beforeExit(process, state) {
    console.log('beforeExit()');
    console.log(state);
    process.exit();
}

module.exports = {
    name: 'Test',
    main: main,
    doSomethingAsync: doSomethingAsync,
    doProcessLoop: doProcessLoop,
    beforeExit: beforeExit
};
