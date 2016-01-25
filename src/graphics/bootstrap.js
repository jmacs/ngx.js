import AssetManager from '../core/AssetManager.js';
import Graphics from './Graphics.js';
import Viewport from './Viewport.js';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import TilesetLoader from './TilesetLoader.js';
import AnimationLoader from './AnimationLoader.js';

console.info('initializing webgl');
Graphics.createContext('webgl');

console.info('compiling shaders');
Graphics.createProgram(0, vertexSource, fragmentSource);

console.info('initializing viewport');
Viewport.initialize();

console.info('registering graphics loaders');
AssetManager.registerLoader(new TilesetLoader());
AssetManager.registerLoader(new AnimationLoader());