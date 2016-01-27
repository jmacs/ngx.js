const GET = 'GET';

// todo: refactor in favor of native fetch api
function get(url) {
    var xhr = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status < 200 || xhr.status >= 400) {
                    reject(xhr);
                } else {
                    resolve(xhr);
                }
            }
        };
        xhr.open(GET, url, true);
        xhr.send();
    });
}

export default {
    get: get
}