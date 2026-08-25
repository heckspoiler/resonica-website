// Varying from the vertex shader
varying vec2 vUv;

// Uniforms
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_aspect;
uniform float u_gravityStrength; // Strength of the gravitational effect
uniform float u_speed; // Smoothed cursor speed in screen units per second
uniform float u_time;

// Function to calculate brightness
float brightness(vec3 color) {
  return dot(color, vec3(0.2126, 0.7152, 0.0722)); // Standard luminance formula
}

// Improved smoothed noise function
float smoothNoise(vec2 st) {
    vec2 i = floor(st); // Integer part
    vec2 f = fract(st); // Fractional part

    // Four corners in 2D of a grid cell
    float a = fract(sin(dot(i, vec2(12.9898, 78.233))) * 43758.5453123);
    float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453123);
    float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453123);
    float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453123);

    // Smooth interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);

    // Mix the four corners
    return mix(a, b, u.x) + (c - a) * u.y + (d - b - c + a) * u.x * u.y;
}

void main() {
  // Sample the base texture color
  vec4 baseColor = texture2D(u_texture, vUv);

  // Vector from the mouse to the current fragment; the distance is
  // aspect-corrected so the falloff is a circle on screen, not an ellipse
  vec2 pixelToMouse = vUv - u_mouse;
  float dist = length(pixelToMouse * vec2(u_aspect, 1.0));

  // Calculate the brightness of the base color
  float colorBrightness = brightness(baseColor.rgb);

  // Smoother and less extreme gravitational effect
  float gravityEffect = smoothstep(0.8, 0.4, colorBrightness);

  // Create a more subtle and slower time-based wobble effect
  float timeWobble = sin(u_time / 10.0 + dist * 0.1) * 0.005; // Reduced amplitude and slower frequency
  gravityEffect += timeWobble * 0.5; // Reduced influence of the wobble effect

  // Velocity boost: fast cursor sweeps pull up to 2x harder; at rest the
  // boost is 1.0 so the idle feel stays at the baseline
  float speedBoost = 1.0 + min(u_speed * 0.5, 1.0);

  // Reduce the UV offset intensity for a more refined and subtle distortion
  vec2 gravityOffset = pixelToMouse * gravityEffect * -0.4 * u_gravityStrength * speedBoost / (dist + 0.1);

  // Add very subtle noise to the UV offset
  vec2 uvOffset = gravityOffset + vec2(smoothNoise(vUv * 10.0 + u_time), smoothNoise(vUv * 10.0 - u_time)) * 0.02; // Reduced noise contribution

  // Chromatic aberration: R and B sample with a shifted multiple of the
  // mouse-driven offset only (the noise grain stays colorless), giving a
  // prismatic fringe that scales with the pull strength and cursor speed;
  // where the pull is zero the samples coincide and the image is untouched
  float r = texture2D(u_texture, vUv - uvOffset - gravityOffset * 0.075).r;
  vec4 base = texture2D(u_texture, vUv - uvOffset);
  float b = texture2D(u_texture, vUv - uvOffset + gravityOffset * 0.075).b;

  gl_FragColor = vec4(r, base.g, b, base.a);
}
