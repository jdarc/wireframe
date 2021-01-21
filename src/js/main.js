import '../css/main.css';

import Glu from "./glu";
import loadModel from "./io";
import Matrix4 from "./matrix4";
import Grid from "./grid";
import Model from "./model";

const generateTransform = (gl, angle, scale = 1.0) => {
    const world = Matrix4.concatenate(Matrix4.createRotationY(angle), Matrix4.createScale(scale, scale, scale));
    const view = Matrix4.createLookAt([0, 3.0, 5.0], [0, 0, 0], [0, 1, 0]);
    const proj = Matrix4.createPerspectiveFov(45, gl.drawingBufferWidth / gl.drawingBufferHeight, 1.0, 100.0);
    return Matrix4.concatenate(Matrix4.concatenate(proj, view), world);
};

const run = async canvas => {
    const gl = canvas.getContext('webgl2', { alpha: false, stencil: false });

    const grid = Grid(gl);
    const model = Model(gl, await loadModel("avent.obj"));

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0.24, 0.24, 0.24, 1);

    const render = timestamp => {
        const angle = timestamp / 3000;

        Glu.resizeViewport(gl);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        grid.render(generateTransform(gl, angle, 20));
        model.render(generateTransform(gl, angle))

        window.requestAnimationFrame(render);
    };

    window.requestAnimationFrame(render)
};

window.addEventListener("load", () => run(document.getElementById('viewport')));
