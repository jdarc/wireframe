#version 300 es

uniform mat4 u_transform;

in vec3 a_position;
in vec3 a_barycentric;

out vec3 v_barycentric;

void main() {
    v_barycentric = a_barycentric;
    gl_Position = u_transform * vec4(a_position, 1.0);
}
