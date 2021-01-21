import Glu from "./glu";

import gridVsSource from "../glsl/grid-vs.glsl";
import gridFsSource from "../glsl/grid-fs.glsl";

export default gl => {
    const program = Glu.createProgramFromSource(gl, gridVsSource, gridFsSource);
    const attributes = Glu.extractAttributeLocations(gl, program);
    const uniforms = Glu.extractUniformLocations(gl, program);

    const vao = gl.createVertexArray();
    gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0]), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 2, 3, 0]), gl.STATIC_DRAW);

    const positionAttribute = attributes["a_position"];
    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

    return {
        render(transform) {
            gl.useProgram(program);
            gl.uniformMatrix4fv(uniforms["u_transform"], gl.FALSE, transform);
            gl.bindVertexArray(vao);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        }
    }
}
