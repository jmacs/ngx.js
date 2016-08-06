import EntityStore from '../../core/EntityStore';
import Aspect from '../../core/Aspect';
import Stage from '../Stage';
import SpatialIndex from './SpatialIndex';
import Viewport from '../../graphics/Viewport.js';
import LineBuilder from '../../graphics/LineBuilder.js';
import LineBuffer from '../../graphics/LineBuffer.js';

const ASPECT_ID = 'world.collision';

const GRID_SHIFT = 6;   // 64x64
const GRID_WIDTH = 8;   // 512
const GRID_HEIGHT = 8;  // 512

var lineBuffer;
var debugGrid;

function onStart() {
    SpatialIndex.build(GRID_SHIFT, GRID_WIDTH, GRID_HEIGHT);
    lineBuffer = LineBuffer.createBuffer(0);
    EntityStore.addFilter(ASPECT_ID, filterEntity);
}

function onStop() {
    EntityStore.removeFilter(ASPECT_ID);
}

function filterEntity(entity) {
    return entity.box;
}

function onUpdate() {
    SpatialIndex.clearObjects();
    var entities = EntityStore.getCache(ASPECT_ID);
    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        SpatialIndex.insertObject(entity.box.sync());
    }
    SpatialIndex.broadphase();
}

function onStageEnter() {
    debugGrid = LineBuilder.buildGrid(0, 0,
        Stage.pixelWidth() >> GRID_SHIFT,
        Stage.pixelHeight() >> GRID_SHIFT,
        Math.pow(2, GRID_SHIFT)
    );
}

function onDraw() {
    if (debugGrid) {

        lineBuffer.enable(
            Viewport.getModelViewMatrix(),
            Viewport.getProjectionMatrix()
        );

        lineBuffer.drawLines(debugGrid);

        lineBuffer.flush();
    }
}

export default Aspect.create({
    id: ASPECT_ID,
    onStageEnter: onStageEnter,
    onUpdate: onUpdate,
    onStart: onStart,
    onStop: onStop,
    onDraw: onDraw
});
