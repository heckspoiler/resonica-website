// Varying from the vertex shader
varying vec2 vUv;

// Uniforms
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_gravityStrength; // Strength of the gravitational effect
uniform float u_time; // Time variable for animation

// Function to calculate brightness
float brightness(vec3 color) {
  return dot(color, vec3(0.2126, 0.7152, 0.0722)); // Standard luminance formula
}

// Simple noise function for subtle complexity
float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 8.5453123);
}

void main() {
  // Sample the base texture color
  vec4 baseColor = texture2D(u_texture, vUv);

  // Calculate the distance from the mouse to the current fragment
  vec2 pixelToMouse = vUv - u_mouse;
  float distance = length(pixelToMouse);

  // Calculate the brightness of the base color
  float colorBrightness = brightness(baseColor.rgb);

  // Smoother and less extreme gravitational effect
  float gravityEffect = smoothstep(0.8, 0.4, colorBrightness);

  // Create a more subtle time-based wobble effect
  float timeWobble = sin(u_time * -0.3 + distance * 0.1) * 0.02;
  gravityEffect += timeWobble * 3.0;

  // Reduce the UV offset intensity for a more refined distortion
  vec2 uvOffset = pixelToMouse * gravityEffect * -.8 * u_gravityStrength / (distance + 0.1);

  // Add subtle noise to the UV offset
  uvOffset += vec2(noise(vUv * 10.0 + u_time), noise(vUv * 10.0 - u_time)) * 0.05;

  // Sample the texture with the displaced UV coordinates
  vec4 finalColor = texture2D(u_texture, vUv - uvOffset);

  gl_FragColor = finalColor;
}
