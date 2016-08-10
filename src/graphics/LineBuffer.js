var Graphics = require('./Graphics');
var ResourceManager = require('../core/ResourceManager');

const gl = Graphics.getContext();
const GL_FLOAT = gl.FLOAT;
const GL_ARRAY_BUFFER = gl.ARRAY_BUFFER;
const GL_STATIC_DRAW = gl.STATIC_DRAW;
const GL_ELEMENT_ARRAY_BUFFER = gl.ELEMENT_ARRAY_BUFFER;
const GL_LINES = gl.LINES;
const GL_UNSIGNED_SHORT = gl.UNSIGNED_SHORT;

const VERTEX_PER_LINE = 4;
const INDICES_PER_LINE = 2;
const LINES_PER_BATCH = 1024;

const VERTEX_BUFFER_LENGTH = LINES_PER_BATCH * VERTEX_PER_LINE;
const INDEX_BUFFER_LENGTH = LINES_PER_BATCH * INDICES_PER_LINE;

var cache = Object.create(null);

class MeshBuffer {

    constructor() {
        this.program = ResourceManager.get('program', 1);

        this.a_position = gl.getAttribLocation(this.program, 'a_position');

        this.u_model = gl.getUniformLocation(this.program, 'u_model');
        this.u_projection = gl.getUniformLocation(this.program, 'u_projection');

        this.vbuffer = gl.createBuffer();
        this.ibuffer = gl.createBuffer();

        this.index = 0;
        this.array = new Float32Array(VERTEX_BUFFER_LENGTH);
        var indices = new Uint16Array(INDEX_BUFFER_LENGTH);

        for (var i=0; i < LINES_PER_BATCH; i++) {
            indices[i * INDICES_PER_LINE    ] = i * 2;
            indices[i * INDICES_PER_LINE + 1] = i * 2 + 1;
        }

        this.indices = indices;
    }

    drawLines(lines) {
        var v = this.array;
        var index = this.index;
        var count = lines.length >> 2;
        for (var l = 0; l < count; l++) {
            var i = index * VERTEX_PER_LINE;
            var j = l * VERTEX_PER_LINE;

            // line start
            v[i    ] = lines[j    ];
            v[i + 1] = lines[j + 1];

            // line end
            v[i + 2] = lines[j + 2];
            v[i + 3] = lines[j + 3];

            index++;
        }
        this.index = index;
    }

    draw(p1, p2) {
        if (this.index * VERTEX_PER_LINE >= VERTEX_BUFFER_LENGTH) {
            this.flush();
        }

        var v = this.array;
        var i = this.index * VERTEX_PER_LINE;
        this.index++;

        // line start
        v[i    ] = p1[0];
        v[i + 1] = p1[1];

        // line end
        v[i + 2] = p2[0];
        v[i + 3] = p2[1];
    }

    enable(modelViewMatrix, projectionMatrix) {
        gl.useProgram(this.program);

        gl.bindBuffer(GL_ARRAY_BUFFER, this.vbuffer);

        // position
        gl.enableVertexAttribArray(this.a_position);
        gl.vertexAttribPointer(this.a_position, 2, GL_FLOAT, false, 0, 0);

        // set uniforms
        gl.uniformMatrix4fv(this.u_model, false, modelViewMatrix);
        gl.uniformMatrix4fv(this.u_projection, false, projectionMatrix);

        //
        gl.lineWidth(1.0);
        //https://msdn.microsoft.com/en-us/library/dn302460(v=vs.85).aspx
    }

    flush() {
        // send the vertices to the gpu
        gl.bufferData(GL_ARRAY_BUFFER, this.array, GL_STATIC_DRAW);

        // draw the vertices in the specified order
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, this.ibuffer);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, this.indices, GL_STATIC_DRAW);
        gl.drawElements(GL_LINES, this.index * VERTEX_PER_LINE, GL_UNSIGNED_SHORT, 0);

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
    var buffer = new MeshBuffer(id);
    cache[id] = buffer;
    return buffer;
}

module.exports = {
    getBuffer: getBuffer,
    createBuffer: createBuffer
}