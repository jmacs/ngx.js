//todo: remove all references to these functions

Array.prototype.removeAt = function(index) {
    var arr = this;
    var len = arr.length;
    if (!len) return false;
    while (index < len) {
        arr[index] = arr[index+1];
        index++
    }
    arr.length--;
    return true;
};

Array.prototype.remove = function(value) {
    var arr = this;
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
};

Array.prototype.add = function(value) {
    this[this.length] = value;
};
