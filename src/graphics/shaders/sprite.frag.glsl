precision mediump float;

uniform sampler2D u_image0;

varying vec2 v_texcoord;
varying vec4 v_color;

void main(void) {
    gl_FragColor = texture2D(u_image0, vec2(v_texcoord.s, v_texcoord.t)) + v_color;
}