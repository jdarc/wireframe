#version 300 es

uniform mat4 u_transform;

in vec2 a_position;
out vec2 v_uv;

void main() {
    v_uv = a_position;
    gl_Position = u_transform * vec4(vec3(a_position.x, 0.0, a_position.y), 1.0);
}
