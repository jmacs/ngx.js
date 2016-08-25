var ResourceManager = require('../../core/ResourceManager');
var SpriteBuffer = require('../../graphics/SpriteBuffer');
var Renderer = require('../../graphics/Renderer');
var Color = require('../../graphics/Color');

class WorldMapRenderer extends Renderer {

    constructor(camera) {
        super();
        this.__maps = ResourceManager.getResource('map');
        this.__color = Color.create();
        this.__camera = camera;
        this.__spriteBuffer = SpriteBuffer.createBuffer(0);
        this.__cameraMin = [0,0];
        this.__cameraMax = [1000, 1000];
    }

    draw() {
        var map = this.__maps.current;
        if (!map) return;

        var camera = this.__camera;
        var buffer = this.__spriteBuffer;

        buffer.enable(
            camera.worldMatrix,
            camera.projectionMatrix
        );

        map.selectCells(
            this.__cameraMin,
            this.__cameraMax,
            this.__drawCell,
            this
        );


        buffer.flush();
    }

    __drawCell(cell, self) {
        self.__spriteBuffer.draw(
            cell.position,
            16,
            16,
            cell.tile0,
            self.__color
        );
    }

    dispose() {
        this.__cameraMin = null;
        this.__cameraMax = null;
        this.__maps = null;
        this.__color = null;
        this.__spriteBuffer = null;
        this.__camera = null;
    }

}

module.exports = WorldMapRenderer;
