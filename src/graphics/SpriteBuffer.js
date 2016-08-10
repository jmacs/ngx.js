var Graphics = require('./Graphics.js');
var ResourceManager = require('../core/ResourceManager');

const gl = Graphics.getContext();
const GL_FLOAT = gl.FLOAT;
const GL_ARRAY_BUFFER = gl.ARRAY_BUFFER;
const GL_STATIC_DRAW = gl.STATIC_DRAW;
const GL_ELEMENT_ARRAY_BUFFER = gl.ELEMENT_ARRAY_BUFFER;
const GL_TRIANGLES = gl.TRIANGLES;
const GL_UNSIGNED_SHORT = gl.UNSIGNED_SHORT;
const GL_TEXTURE0 = gl.TEXTURE0;
const GL_TEXTURE_2D = gl.TEXTURE_2D;

const VERTEX_PER_SPRITE = 32;
const INDICES_PER_SPRITE = 6;
const SPRITES_PER_BATCH = 128;

const VERTEX_BUFFER_LENGTH = SPRITES_PER_BATCH * VERTEX_PER_SPRITE;
const INDEX_BUFFER_LENGTH = SPRITES_PER_BATCH * INDICES_PER_SPRITE;

var cache = Object.create(null);

class SpriteBuffer {

    constructor() {
        this.program = ResourceManager.get('program', 'sprite');

        this.a_position = gl.getAttribLocation(this.program, 'a_position');
        this.a_color = gl.getAttribLocation(this.program, 'a_color');
        this.a_texcoord = gl.getAttribLocation(this.program, 'a_texcoord');

        this.u_model = gl.getUniformLocation(this.program, 'u_model');
        this.u_projection = gl.getUniformLocation(this.program, 'u_projection');
        this.u_image0 = gl.getUniformLocation(this.program, 'u_image0');

        this.vbuffer = gl.createBuffer();
        this.ibuffer = gl.createBuffer();

        this.index = 0;
        this.activeTexture = null;
        this.array = new Float32Array(VERTEX_BUFFER_LENGTH);
        var indices = new Uint16Array(INDEX_BUFFER_LENGTH);

        /*
         element draw order
            triangle1 [ 0 > 1 > 2 ]
            triangle2 [ 2 > 1 > 3 ]
             1 --------- 3
             |			|
             |			|
             0 --------- 2
         */

        for (var i=0; i < INDEX_BUFFER_LENGTH; i++) {
            indices[i * INDICES_PER_SPRITE    ] = i * 4;
            indices[i * INDICES_PER_SPRITE + 1] = i * 4 + 1;
            indices[i * INDICES_PER_SPRITE + 2] = i * 4 + 2;
            indices[i * INDICES_PER_SPRITE + 3] = i * 4 + 2;
            indices[i * INDICES_PER_SPRITE + 4] = i * 4 + 1;
            indices[i * INDICES_PER_SPRITE + 5] = i * 4 + 3;
        }

        this.indices = indices;
    }

    draw(position, width, height, tile, color) {
        if (this.index * VERTEX_PER_SPRITE >= VERTEX_BUFFER_LENGTH) {
            this.flush();
        }

        var tex = tile.tex;

        // flush then swap the active texture
        if (tex != this.activeTexture) {
            if (this.index > 0) this.flush();
            var texture = Graphics.getTexture(tex);
            if (texture) {
                gl.activeTexture(GL_TEXTURE0);
                gl.bindTexture(GL_TEXTURE_2D, texture);
                gl.uniform1i(this.u_image0, 0);
                this.activeTexture = tex;
            } else {
                this.activeTexture = null;
            }
        }

        var x = position[0];
        var y = position[1];

        var r = color.r;
        var g = color.g;
        var b = color.b;
        var a = color.a;

        var v = this.array;
        var i = this.index * VERTEX_PER_SPRITE;
        this.index++;

        // vertex 0 - bottom left
        v[i    ] = x;
        v[i + 1] = y;

        v[i + 2] = tile.x1; // 0 -> 0
        v[i + 3] = tile.y1; // 0 -> 1

        v[i + 4] = r;
        v[i + 5] = g;
        v[i + 6] = b;
        v[i + 7] = a;

        // vertex 1 - top left
        v[i + 8] = x;
        v[i + 9] = y + height;

        v[i + 10] = tile.x2; // 0 -> 0
        v[i + 11] = tile.y2; // 1 -> 0

        v[i + 12] = r;
        v[i + 13] = g;
        v[i + 14] = b;
        v[i + 15] = a;

        // vertex 2 - bottom right
        v[i + 16] = x + width;
        v[i + 17] = y;

        v[i + 18] = tile.x3; // 1 -> 1
        v[i + 19] = tile.y3; // 0 -> 1

        v[i + 20] = r;
        v[i + 21] = g;
        v[i + 22] = b;
        v[i + 23] = a;

        // vertex 3 - top right
        v[i + 24] = x + width;
        v[i + 25] = y + height;

        v[i + 26] = tile.x4; // 1 -> 1
        v[i + 27] = tile.y4; // 1 -> 0

        v[i + 28] = r;
        v[i + 29] = g;
        v[i + 30] = b;
        v[i + 31] = a;
    }

    enable(modelViewMatrix, projectionMatrix) {
        gl.useProgram(this.program);

        gl.bindBuffer(GL_ARRAY_BUFFER, this.vbuffer);

        // position
        gl.enableVertexAttribArray(this.a_position);
        gl.vertexAttribPointer(this.a_position, 2, GL_FLOAT, false, 32, 0);

        // texcoord
        gl.enableVertexAttribArray(this.a_texcoord);
        gl.vertexAttribPointer(this.a_texcoord, 2, GL_FLOAT, false, 32, 8);

        // color
        gl.enableVertexAttribArray(this.a_color);
        gl.vertexAttribPointer(this.a_color, 4, GL_FLOAT, false, 32, 16);

        // set uniforms
        gl.uniformMatrix4fv(this.u_model, false, modelViewMatrix);
        gl.uniformMatrix4fv(this.u_projection, false, projectionMatrix);
    }

    flush() {
        if (this.activeTexture != null) {
            // send the vertices to the gpu
            gl.bufferData(GL_ARRAY_BUFFER, this.array, GL_STATIC_DRAW);

            // draw the vertices in the specified order
            gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, this.ibuffer);
            gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, this.indices, GL_STATIC_DRAW);
            gl.drawElements(GL_TRIANGLES, this.index * INDICES_PER_SPRITE, GL_UNSIGNED_SHORT, 0);
        }
        // reset the index for the next draw call
        this.index = 0;
    }

    destroy() {
        gl.deleteBuffer(this.ibuffer);
        gl.deleteBuffer(this.vbuffer);
        this.array.length = 0;
        this.indices.length = 0;
        this.program = null;
        this.activeTexture = null;
        this.a_color = null;
        this.a_position = null;
        this.a_texcoord = null;
        this.u_image0 = null;
        this.u_model = null;
        this.u_projection = null;
    }
}

function getBuffer(id) {
    return cache[id] || null;
}

function createBuffer(id) {
    if (cache[id]) return cache[id];
    var buffer = new SpriteBuffer(id);
    cache[id] = buffer;
    return buffer;
}

module.exports = {
    getBuffer: getBuffer,
    createBuffer: createBuffer
};
