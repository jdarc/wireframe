#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

const vec3 XAXIS_COLOR = vec3(0.0, 1.0, 0.0);
const vec3 ZAXIS_COLOR = vec3(1.0, 0.0, 0.0);
const vec3 GRID_COLOR = vec3(0.35);
const vec3 BACKGROUND_COLOR = vec3(0.24);

in vec2 v_uv;
out vec4 o_fragColor;

void main() {
    vec2 coord = 40.0 * v_uv;
    vec2 widths = fwidth(coord);
    vec2 grid = abs(fract(coord + 0.5) - 0.5) / widths;
    float line = clamp(min(grid.x, grid.y), 0.0, 1.0);
    vec3 c = GRID_COLOR;
    c += XAXIS_COLOR * (1.0 - step(1.0, abs(coord.x / widths.x) + 0.5));
    c += ZAXIS_COLOR * (1.0 - step(1.0, abs(coord.y / widths.y) + 0.5));
    o_fragColor = vec4(mix(c, BACKGROUND_COLOR, line), 1.0);
}
