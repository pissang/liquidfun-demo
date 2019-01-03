export function createProgram(gl, vsCode, fsCode) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vsCode);
    gl.shaderSource(fragmentShader, fsCode);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    [vertexShader, fragmentShader].forEach(shader => {
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log('Shader error:', gl.getShaderInfoLog(shader));
            return null;
        }
    });

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log('Program link error');
    }
    return program;
}