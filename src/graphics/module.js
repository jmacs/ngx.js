import GameModules from '../core/GameModules';
import GameClock from '../core/GameClock';
import Entity from '../core/Entity';
import Assets from '../core/Assets';
import Graphics from './Graphics';

import SpriteVert from './shaders/sprite.vert.glsl';
import SpriteFrag from './shaders/sprite.frag.glsl';
import MeshVert from './shaders/mesh.vert.glsl';
import MeshFrag from './shaders/mesh.frag.glsl';

import './AnimationAspect';
import './SpriteAspect';
import './DebugAspect';
import './ViewportAspect';

import SpriteComponent from './SpriteComponent';
import AnimationComponent from './AnimationComponent';
import ImageLoader from './ImageLoader';
import TilesetLoader from './TilesetLoader';
import AnimationLoader from './AnimationLoader';
import GlyphLoader from './GlyphLoader';

import Varchar from './Varchar';
import Color from './Color';

GameClock.on('bootstrap', function() {
    Graphics.createProgram(0, SpriteVert, SpriteFrag);
    Graphics.createProgram(1, MeshVert, MeshFrag);

    Entity.addComponent('sprite', SpriteComponent);
    Entity.addComponent('animation', AnimationComponent);

    Assets.registerLoader('image', ImageLoader);
    Assets.registerLoader('tileset', TilesetLoader);
    Assets.registerLoader('animation', AnimationLoader);
    Assets.registerLoader('glyph', GlyphLoader);
});

GameModules.include('graphics', {
    Varchar: Varchar,
    Color: Color,
    SpriteComponent: SpriteComponent,
    AnimationComponent: AnimationComponent,
    ImageLoader: ImageLoader,
    TilesetLoader: TilesetLoader,
    AnimationLoader: AnimationLoader,
    GlyphLoader: GlyphLoader
});