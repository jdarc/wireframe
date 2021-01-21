export default class Glu {

    static compileShader(gl, shaderSource, shaderType) {
        const shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw "shader compilation failed: " + gl.getShaderInfoLog(shader);
        }
        return shader;
    }

    static createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw ("program linking failed: " + gl.getProgramInfoLog(program));
        }
        return program;
    }

    static createProgramFromSource(gl, vertexShaderSource, fragmentShaderSource) {
        const vs = Glu.compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
        const fs = Glu.compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
        return Glu.createProgram(gl, vs, fs);
    }

    static extractAttributeLocations(gl, program) {
        const result = {};
        const count = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < count; ++i) {
            const info = gl.getActiveAttrib(program, i);
            result[info.name] = gl.getAttribLocation(program, info.name);
        }
        return result;
    }

    static extractUniformLocations(gl, program) {
        const result = {};
        const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < count; ++i) {
            const info = gl.getActiveUniform(program, i);
            result[info.name] = gl.getUniformLocation(program, info.name);
        }
        return result;
    }

    static resizeViewport(context) {
        const canvas = context.canvas;
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
            context.viewport(0, 0, canvas.width, canvas.height);
            return true;
        }
        return false;
    }
}
