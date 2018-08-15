export function createVertexBuffer(gl, data) {
    const buffer = gl.createBuffer();

    if (data) {
        updateVertexBuffer(gl, buffer, data);
    }

    return buffer;
}

export function updateVertexBuffer(gl, buffer, data) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    if (data instanceof Array) {
        data = new Float32Array(data);
    }

    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
}

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

export function setVertexBuffer(gl, program, symbol, buffer, itemSize) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    const posLoc = gl.getAttribLocation(program, symbol);

    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, itemSize, gl.FLOAT, false, 0, 0);
}
