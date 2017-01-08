const SceneManager = require('../core/SceneManager');
const ResourceManager = require('../core/ResourceManager');
const GraphicsManager = require('./GraphicsManager');

// resources
const ShaderResource = require('./ShaderResource');
const TextureResource = require('./TextureResource');
const TileResource = require('./TileResource');
const GlyphResource = require('./GlyphMapResource');

module.exports = function GraphicsModule() {

    GraphicsManager.initialize();

    ResourceManager.registerMediaLoaders([
        require('./ShaderLoader')
    ]);

    ResourceManager.registerResources([
        new TextureResource(),
        new TileResource(),
        new GlyphResource(),
        new ShaderResource()
    ]);

    SceneManager.registerProcessors([
        require('./WindowSceneProcessor')
    ]);
};
