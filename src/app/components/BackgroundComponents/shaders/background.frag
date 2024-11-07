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

// Simple noise function for added complexity
float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // Sample the base texture color
  vec4 baseColor = texture2D(u_texture, vUv);

  // Calculate the distance from the mouse to the current fragment
  vec2 pixelToMouse = vUv - u_mouse;
  float distance = length(pixelToMouse);


  float colorBrightness = brightness(baseColor.rgb);

  // Make the gravitational effect more extreme and use a wider range
  float gravityEffect = smoothstep(0.1, 1.5, colorBrightness);

  // Create a time-based wobble effect
  float timeWobble = sin(u_time * 0.5  + distance * 10.0) * 0.05;
  gravityEffect += timeWobble;

  // Amplify the UV offset for a more extreme distortion
  vec2 uvOffset = pixelToMouse * gravityEffect / 2.0 * u_gravityStrength / (distance + 0.01);

  // Add noise to make the effect more chaotic
  uvOffset += vec2(noise(vUv * 10.0 + u_time), noise(vUv * 10.0 - u_time)) * 0.05;

  // Sample the texture with the displaced UV coordinates
  vec4 finalColor = texture2D(u_texture, vUv - uvOffset);

  gl_FragColor = finalColor;
}
