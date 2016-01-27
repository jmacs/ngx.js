
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
    if (index === -1) return false;
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
    removeIndex: removeIndex,
    removeValue: removeValue
}