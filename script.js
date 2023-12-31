const glcanvas = document.getElementById("canvas");
const gl = glcanvas.getContext("webgl2");

const programInfo = twgl.createProgramInfo(gl, [
  "vertexShader",
  "fragmentShader"
]);

const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
};

const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

const render = (time) => {
  twgl.resizeCanvasToDisplaySize(gl.canvas, 1);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  time *= 0.001;
  let programUniforms = {
    u_time: time * 0.5,
    u_resolution: [gl.canvas.width, gl.canvas.height]
  };

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, programUniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
};

window.addEventListener("DOMContentLoaded", (event) => {
  requestAnimationFrame(render);
});
