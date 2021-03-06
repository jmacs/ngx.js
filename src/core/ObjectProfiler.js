
function sizeOf(object){
    // initialize the list of objects and size
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
                        try {
                            if (objects[search] === objects[index][key]){
                                processed = true;
                                break;
                            }
                        } catch(err) {
                            processed = true;
                            continue;
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

module.exports = {
    sizeOf: sizeOf
};
