/**
 * GLSL for the racing "circuit field" background — a subtle, animated layer of
 * diagonal speed streaks over a shimmering carbon-fibre weave, tinted in the
 * team livery (purple → amber) and lifted by a soft glow that follows the
 * cursor. Kept deliberately low-contrast so foreground text stays readable;
 * intensity is further dialled down in light mode via uDark.
 *
 * Drawn on a fullscreen clip-space quad (planeGeometry [2,2]), so the vertex
 * stage ignores the camera entirely.
 */
export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uAspect;
  uniform vec2  uMouse;   // 0..1
  uniform float uDark;    // 1.0 dark, 0.0 light

  // --- value noise + fbm -------------------------------------------------
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Aspect-correct, centered coordinates.
    vec2 uv = vUv - 0.5;
    uv.x *= uAspect;

    vec2 m = uMouse - 0.5;
    m.x *= uAspect;

    // Rotate the frame so streaks run on a racing diagonal.
    float a = -0.5;
    mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec2 q = rot * uv;

    // Two layers of diagonal speed streaks at different scales, warped by
    // flowing noise so they shimmer and scroll like a car going past.
    float flow = fbm(q * 2.0 + vec2(uTime * 0.08, 0.0));
    float s1 = sin(q.x * 22.0 + uTime * 1.4 + flow * 4.0);
    float s2 = sin(q.x * 48.0 - uTime * 0.9 + flow * 2.0);
    float streaks =
      pow(smoothstep(0.5, 1.0, abs(s1)), 1.6) * 0.7 +
      pow(smoothstep(0.7, 1.0, abs(s2)), 2.0) * 0.3;

    // Carbon-weave shimmer.
    float weave = fbm(q * 7.0 - vec2(0.0, uTime * 0.05));

    // Soft glow following the cursor, plus a tighter hot core.
    float d2 = dot(uv - m, uv - m);
    float md = exp(-d2 * 3.0) * 0.8 + exp(-d2 * 14.0) * 0.5;

    // Gentle vignette: keep the center (where copy lives) calmer than the edges.
    float vign = smoothstep(0.1, 1.1, length(uv));

    // Livery colour: purple base drifting toward amber in the weave highlights.
    vec3 purple = vec3(0.675, 0.416, 1.0); // #AC6AFF
    vec3 amber  = vec3(1.0, 0.784, 0.463); // #FFC876
    vec3 col = mix(purple, amber, smoothstep(0.35, 0.78, weave + streaks * 0.3));

    float intensity =
      streaks * (0.06 + vign * 0.10) +
      md * 0.20 +
      weave * 0.02;
    intensity *= mix(0.32, 1.0, uDark); // calmer in light mode

    gl_FragColor = vec4(col * intensity, intensity);
  }
`;
