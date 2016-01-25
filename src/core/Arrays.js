function push(arr, value) {
    arr[arr.length] = value;
}

function pop(arr) {
    return arr[arr.length--];
}

function removeIndex(arr, index) {
    var len = arr.length;
    if (!len) return false;
    while (index < len) {
        arr[index] = arr[index+1];
        index++
    }
    arr.length--;
    return true;
}

function removeValue(arr, value) {
    var index = arr.indexOf(value);
    if(index === -1) return false;
    var len = arr.length;
    if (!len) return false;
    while (index < len) {
        arr[index] = arr[index+1];
        index++
    }
    arr.length--;
    return true;
}

export default {
    push: push,
    pop: pop,
    removeIndex: removeIndex,
    removeValue: removeValue
}