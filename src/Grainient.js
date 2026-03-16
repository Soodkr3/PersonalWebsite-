import { useRef, useEffect } from "react";

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_colorBalance;
  uniform float u_warpStrength;
  uniform float u_warpFrequency;
  uniform float u_warpSpeed;
  uniform float u_warpAmplitude;
  uniform float u_blendAngle;
  uniform float u_blendSoftness;
  uniform float u_rotationAmount;
  uniform float u_noiseScale;
  uniform float u_grainAmount;
  uniform float u_grainScale;
  uniform float u_grainAnimated;
  uniform float u_contrast;
  uniform float u_gamma;
  uniform float u_saturation;
  uniform vec2 u_center;
  uniform float u_zoom;

  // Hash-based noise
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = (uv - 0.5) / u_zoom + 0.5;
    uv -= u_center * 0.5;

    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // Rotation
    float angle = u_time * u_rotationAmount * 0.001;
    float ca = cos(angle);
    float sa = sin(angle);
    p = mat2(ca, -sa, sa, ca) * p;

    // Warp
    float warpTime = u_time * u_warpSpeed;
    vec2 warp = vec2(
      sin(p.y * u_warpFrequency + warpTime) * u_warpAmplitude * 0.01,
      cos(p.x * u_warpFrequency + warpTime * 0.7) * u_warpAmplitude * 0.01
    );
    p += warp * u_warpStrength;

    // Noise-based color mixing
    float n = fbm(p * u_noiseScale + u_time * 0.1);

    // Blend angle
    float blendAngleRad = u_blendAngle * 3.14159 / 180.0;
    float directional = dot(normalize(p + 0.001), vec2(cos(blendAngleRad), sin(blendAngleRad)));
    directional = directional * 0.5 + 0.5;

    float blend = smoothstep(0.5 - u_blendSoftness * 5.0, 0.5 + u_blendSoftness * 5.0, n + directional * 0.3 + u_colorBalance * 0.5);

    vec3 color = mix(u_color1, u_color2, blend);
    float n2 = fbm(p * u_noiseScale * 1.5 - u_time * 0.08);
    color = mix(color, u_color3, smoothstep(0.3, 0.7, n2) * 0.6);

    // Contrast & gamma
    color = pow(color, vec3(u_gamma));
    color = (color - 0.5) * u_contrast + 0.5;
    color = clamp(color, 0.0, 1.0);

    // Saturation
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(lum), color, u_saturation);

    // Grain
    float grainTime = u_grainAnimated > 0.5 ? u_time * 10.0 : 0.0;
    float grain = hash(gl_FragCoord.xy * u_grainScale + grainTime) - 0.5;
    color += grain * u_grainAmount;
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

const Grainient = ({
  color1 = "#ff9ec5",
  color2 = "#5227FF",
  color3 = "#B19EEF",
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
}) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const animRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;
    glRef.current = gl;

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, FRAGMENT_SHADER);
    gl.compileShader(fs);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    // Fullscreen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    const program = programRef.current;
    if (!gl || !program) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const c3 = hexToRgb(color3);

    const render = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const t = elapsed * timeSpeed;

      gl.useProgram(program);

      const setU = (name, ...vals) => {
        const loc = gl.getUniformLocation(program, name);
        if (loc === null) return;
        if (vals.length === 1) gl.uniform1f(loc, vals[0]);
        else if (vals.length === 2) gl.uniform2f(loc, vals[0], vals[1]);
        else if (vals.length === 3) gl.uniform3f(loc, vals[0], vals[1], vals[2]);
      };

      setU("u_resolution", canvas.width, canvas.height);
      setU("u_time", t);
      setU("u_color1", ...c1);
      setU("u_color2", ...c2);
      setU("u_color3", ...c3);
      setU("u_colorBalance", colorBalance);
      setU("u_warpStrength", warpStrength);
      setU("u_warpFrequency", warpFrequency);
      setU("u_warpSpeed", warpSpeed);
      setU("u_warpAmplitude", warpAmplitude);
      setU("u_blendAngle", blendAngle);
      setU("u_blendSoftness", blendSoftness);
      setU("u_rotationAmount", rotationAmount);
      setU("u_noiseScale", noiseScale);
      setU("u_grainAmount", grainAmount);
      setU("u_grainScale", grainScale);
      setU("u_grainAnimated", grainAnimated ? 1.0 : 0.0);
      setU("u_contrast", contrast);
      setU("u_gamma", gamma);
      setU("u_saturation", saturation);
      setU("u_center", centerX, centerY);
      setU("u_zoom", zoom);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [
    color1, color2, color3, timeSpeed, colorBalance, warpStrength,
    warpFrequency, warpSpeed, warpAmplitude, blendAngle, blendSoftness,
    rotationAmount, noiseScale, grainAmount, grainScale, grainAnimated,
    contrast, gamma, saturation, centerX, centerY, zoom,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default Grainient;
