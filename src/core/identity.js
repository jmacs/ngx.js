var id = 0;

function identity(map) {
    while(true) {
        id++;
        if(!map[id]) {
            return id;
        }
    }
}

export default identity;