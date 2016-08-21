var Resource = require('../core/Resource');

class GuiResource extends Resource {

    getMediaType() {
        return 'application/xml';
    }

    getResourceType() {
        return 'gui';
    }

    onAssetDownloaded(xml, asset) {
        if (isGuiValid(xml)) {
            this.set(asset, xml);
        }
    }
}

function isGuiValid(xml, asset) {
    if (!xml.children.length) {
        console.error('GUI XML document appears to be empty: %s', asset);
        return false;
    }
    if (xml.children[0].tagName.toLowerCase() !== 'gui') {
        console.error('GUI XML document is missing the <gui> tag: %s', asset);
        return false;
    }
    return true;
}

module.exports = GuiResource;