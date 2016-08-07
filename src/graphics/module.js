var GameClock = require('../core/GameClock');
var Scene = require('../core/Scene');
var Entity = require('../core/Entity');
var Assets = require('../core/Assets');
var Graphics = require('./Graphics');
var Viewport = require('./Viewport');

// shaders
var SpriteVert = require('./shaders/sprite.vert.glsl');
var SpriteFrag = require('./shaders/sprite.frag.glsl');
var MeshVert = require('./shaders/mesh.vert.glsl');
var MeshFrag = require('./shaders/mesh.frag.glsl');

// aspects
var AnimationAspect = require('./AnimationAspect');
var SpriteAspect = require('./SpriteAspect');
var DebugAspect = require('./DebugAspect');
var ViewportAspect = require('./../world/CameraAspect');

// components
var SpriteComponent = require('./SpriteComponent');
var AnimationComponent = require('./AnimationComponent');

// loaders
var ImageLoader = require('./ImageLoader');
var TilesetLoader = require('./TilesetLoader');
var AnimationLoader = require('./AnimationLoader');
var GlyphLoader = require('./GlyphLoader');

GameClock.addEventListener('GameClockLoaded', function() {
    Graphics.createProgram(0, SpriteVert, SpriteFrag);
    Graphics.createProgram(1, MeshVert, MeshFrag);

    Viewport.initialize({width: 1280, height: 720});

    Entity.registerComponents([
        SpriteComponent,
        AnimationComponent
    ]);

    Assets.registerLoaders([
        ImageLoader,
        TilesetLoader,
        AnimationLoader,
        GlyphLoader
    ]);

    Scene.registerAspects([
        AnimationAspect,
        SpriteAspect,
        DebugAspect,
        ViewportAspect
    ]);

    Scene.setViewport(Viewport);
});