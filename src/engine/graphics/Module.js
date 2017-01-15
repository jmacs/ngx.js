const ResourceManager = require('../resources/ResourceManager');
const Graphics = require('./Graphics');
const GraphicsSystem = require('./GraphicsSystem');
const CameraManager = require('./CameraManager');
const Deferred = require('../Deferred');

// resources
const ShaderResource = require('./ShaderResource');
const TextureResource = require('./TextureResource');
const TileResource = require('./TileResource');
const GlyphResource = require('./GlyphMapResource');

module.exports = function GraphicsModule(runtime) {
    var properties = runtime.properties();

    Graphics.createContext('webgl');
    Graphics.setCanvasSize(
        properties.viewport.width,
        properties.viewport.height
    );

    document.body.appendChild(Graphics.getCanvas());

    ResourceManager.registerMediaLoaders([
        require('./ShaderLoader')
    ]);

    ResourceManager.registerResources([
        new TextureResource(),
        new TileResource(),
        new GlyphResource(),
        new ShaderResource()
    ]);

    runtime.onSceneLoad(bindGraphicsSystem);

    var dfd = new Deferred();

    ResourceManager.download({
        shader: properties.shaders
    }).then(function () {
        dfd.resolve();
    });

    return dfd.promise;
};

function bindGraphicsSystem(runtime, scene) {
    if (!scene.graphics) return;
    GraphicsSystem(runtime, scene);
}
