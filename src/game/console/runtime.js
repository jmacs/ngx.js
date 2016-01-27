import System from './../../core/GameClock';

window.cmd = window.cmd || Object.create(null);

function toFloat(value) {
    var n = parseFloat(value);
    if (isNaN(n)) return 0.0;
    return n;
}

function spawn(name, x, y) {
    var entity = Entity.spawn(name);
    if (x || y) {
        entity.position[0] = toFloat(x);
        entity.position[1] = toFloat(y);
    }
    return entity;
}


function sizeof(object){

    // initialise the list of objects and size
    var objects = [object];
    var size    = 0;

    // loop over the objects
    for (var index = 0; index < objects.length; index ++){

        // determine the type of the object
        switch (typeof objects[index]){

            // the object is a boolean
            case 'boolean': size += 4; break;

            // the object is a number
            case 'number': size += 8; break;

            // the object is a string
            case 'string': size += 2 * objects[index].length; break;

            // the object is a generic object
            case 'object':

                // if the object is not an array, add the sizes of the keys
                if (Object.prototype.toString.call(objects[index]) != '[object Array]'){
                    for (var key in objects[index]) size += 2 * key.length;
                }

                // loop over the keys
                for (var key in objects[index]){

                    // determine whether the value has already been processed
                    var processed = false;
                    for (var search = 0; search < objects.length; search ++){
                        if (objects[search] === objects[index][key]){
                            processed = true;
                            break;
                        }
                    }

                    // queue the value to be processed if appropriate
                    if (!processed) objects.push(objects[index][key]);

                }

        }

    }

    // return the calculated size
    return size;
}

function printLocalStorageSpace(){
    var total = 0;
    for (var x in localStorage) {
        var amount = (localStorage[x].length * 2) / 1024;
        total += amount;
        console.log( x + " = " + amount.toFixed(2) + " KB");
    }
    console.log( "Total: " + total.toFixed(2) + " KB");
}

cmd.inspect = function() {
  console.table(System.inspect());
};

cmd.start = System.start;
cmd.stop = System.stop;

