import PrefabLoader from './PrefabLoader.js';

var noop = function() {};
var downloadQueue = [];
var assetLoaders = [];
var isDownloading = false;
var downloadCount = 0;
var downloaded = [];
var onDone = noop;

function registerLoader(loader) {
    assetLoaders.push(loader);
}

function getLoader(path) {
    for (var i = 0, len = assetLoaders.length; i < len; i++) {
        var loader = assetLoaders[i];
        if(loader.handles(path)) {
            return loader;
        }
    }
    console.error('no loader for path "%s"', path);
    return null;
}

function enqueue(path) {
    if(isDownloading) {
        console.error('cannot queue while downloading');
        return;
    }
    downloadQueue.push(path);
    downloadCount++;
}

function download(callback) {
    isDownloading = true;
    onDone = callback || noop;
    while(downloadQueue.length) {
        var path = downloadQueue.pop();
        var loader = getLoader(path);
        if(!loader) continue;
        loader.load(path, done);
    }
}

function done(result, err) {
    if(err) {
        downloadCount = 0;
        onDone(downloaded, err);
        onDone = noop;
        downloaded.length = 0;
    } else {
        --downloadCount;
        downloaded.push(result);
        if(downloadCount === 0) {
            onDone(downloaded, null);
            onDone = noop;
            downloaded.length = 0;
        }
    }
}

function reset() {
    downloaded.length = 0;
    isDownloading = false;
    downloadCount = 0;
}

registerLoader(new PrefabLoader());

export default {
    registerLoader: registerLoader,
    enqueue: enqueue,
    download: download,
    reset: reset
}