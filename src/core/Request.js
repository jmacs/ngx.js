const GET = 'GET';

function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.callback = callback;
    xhr.onreadystatechange = onReadyStateChange;
    xhr.open(GET, url, true);
    xhr.send();
}

function onReadyStateChange() {
    var xhr = this;
    var callback = xhr.callback;
    if (xhr.readyState === XMLHttpRequest.DONE) {
        callback(xhr, getError(xhr));
    }
}

function getError(xhr) {
    if(xhr.status < 200 || xhr.status >= 400) {
        return {message: 'response error ' + xhr.status + ' ' + xhr.responseURL};
    }
    return null;
}

export default {
    get: get
}