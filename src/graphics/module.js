import GameClock from '../core/GameClock';
import Scene from '../core/Scene';
import Entity from '../core/Entity';
import Assets from '../core/Assets';
import Graphics from './Graphics';
import Viewport from './Viewport';

// shaders
import SpriteVert from './shaders/sprite.vert.glsl';
import SpriteFrag from './shaders/sprite.frag.glsl';
import MeshVert from './shaders/mesh.vert.glsl';
import MeshFrag from './shaders/mesh.frag.glsl';

// aspects
import AnimationAspect from './AnimationAspect';
import SpriteAspect from './SpriteAspect';
import DebugAspect from './DebugAspect';
import ViewportAspect from './../world/CameraAspect';

// components
import SpriteComponent from './SpriteComponent';
import AnimationComponent from './AnimationComponent';

// loaders
import ImageLoader from './ImageLoader';
import TilesetLoader from './TilesetLoader';
import AnimationLoader from './AnimationLoader';
import GlyphLoader from './GlyphLoader';

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