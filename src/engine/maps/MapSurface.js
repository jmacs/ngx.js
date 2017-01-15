var SceneNode = require('./SceneNode');
var TileBuffer = require('./TileBuffer');
var Color = require('./Color');

class MapSurface extends SceneNode {

    constructor() {
        super();
        this.__map = {selectCells: function(){}};
        this.__color = Color.create();
        this.__tileBuffer = TileBuffer.createBuffer(0);
        this.__cameraMin = [0,0];
        this.__cameraMax = [1000, 1000];
    }

    setMap(map) {
        this.__map = map;
    }

    onUpdate(state) {
        var buffer = this.__tileBuffer;

        buffer.enable(state.model, state.projection);

        this.__map.selectCells(
            this.__cameraMin,
            this.__cameraMax,
            this.__drawCell,
            this
        );


        buffer.flush();
    }

    __drawCell(cell, self) {
        self.__tileBuffer.draw(
            cell.position,
            16,
            16,
            cell.tile0,
            self.__color
        );
    }

    onDispose() {
        this.__cameraMin = null;
        this.__cameraMax = null;
        this.__map = null;
        this.__color = null;
        this.__tileBuffer = null;
        this.__camera = null;
    }

}

module.exports = MapSurface;
