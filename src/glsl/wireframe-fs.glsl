#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

const vec3 WIREFRAME_COLOR = vec3(1.0, 0.49, 0.0);
const vec3 BACKGROUND_COLOR = vec3(0.24);

in vec3 v_barycentric;
out vec4 o_fragColor;

void main() {
    vec3 w = fwidth(v_barycentric);
    vec3 s = smoothstep(-w * 0.5, w, v_barycentric);
    o_fragColor = vec4(mix(WIREFRAME_COLOR, BACKGROUND_COLOR, min(s.x, min(s.y, s.z))), 1.0);
}
