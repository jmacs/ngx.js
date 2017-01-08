var DOMParser = require('xmldom').DOMParser;
var fs = require('fs');
var path = require('path');

module.exports = function(filePath) {
    var parser = new DOMParser();
    var contents = fs.readFileSync(path.join(__root, filePath), 'utf8');
    return parser.parseFromString(contents);
};