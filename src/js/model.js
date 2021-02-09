import Glu from "./glu";

import vertexSource from "../glsl/wireframe-vs.glsl";
import fragmentSource from "../glsl/wireframe-fs.glsl";

export default (gl, data) => {
    const program = Glu.createProgramFromSource(gl, vertexSource, fragmentSource);
    const attributes = Glu.extractAttributeLocations(gl, program);
    const uniforms = Glu.extractUniformLocations(gl, program);

    const vao = gl.createVertexArray();
    gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

    const positionAttribute = attributes["a_position"];
    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, false, 6 * 4, 0);

    const barycentricAttribute = attributes["a_barycentric"];
    gl.enableVertexAttribArray(barycentricAttribute);
    gl.vertexAttribPointer(barycentricAttribute, 3, gl.FLOAT, false, 6 * 4, 3 * 4);

    return {
        render(transform) {
            gl.useProgram(program);
            gl.uniformMatrix4fv(uniforms["u_transform"], gl.FALSE, transform);
            gl.bindVertexArray(vao);
            gl.drawArrays(gl.TRIANGLES, 0, data.length / 6);
        }
    }
};
