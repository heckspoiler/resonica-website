// Varying from the vertex shader
varying vec2 vUv;

// Uniforms
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_gravityStrength; // Strength of the gravitational effect

float brightness(vec3 color) {
  return dot(color, vec3(0.2126, 0.7152, 0.0722)); // Standard luminance formula
}

void main() {

  vec4 baseColor = texture2D(u_texture, vUv);

  vec2 pixelToMouse = vUv - u_mouse;
  float distance = length(pixelToMouse);

  float colorBrightness = brightness(baseColor.rgb);

  float gravityEffect = smoothstep(0.7, 2.0, colorBrightness); 

  vec2 uvOffset = pixelToMouse * gravityEffect * u_gravityStrength / (distance + 0.01);

  vec4 finalColor = texture2D(u_texture, vUv - uvOffset);

  gl_FragColor = finalColor;
}
