
function MrFancyPants() {
    console.debug('I am a dynamic script');
    console.debug('global %o', global);
}

exports({
    MrFancyPants: MrFancyPants
});