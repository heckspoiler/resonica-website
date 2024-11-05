varying vec2 vUv;
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform vec2 u_prevMouse;
uniform vec3 u_hoverColor; 
uniform float u_hoverStrength; 

void main() {
    vec2 gridUV = floor(vUv * vec2(80.0, 80.0)) / vec2(80.0, 80.0);
    vec2 centerOfPixel = gridUV + vec2(1.0 / 80.0, 1.0 / 80.0);

    vec2 mouseDirection = u_mouse - u_prevMouse;
    vec2 pixelToMouseDirection = centerOfPixel - u_mouse;

    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.5, 0.1, pixelDistanceToMouse); 

    vec2 uvOffset = strength * -mouseDirection * 0.4;
    vec2 uv = vUv - uvOffset;

    vec4 baseColor = texture2D(u_texture, uv);

    vec3 hoverEffectColor = mix(baseColor.rgb, u_hoverColor, strength * u_hoverStrength);

    gl_FragColor = vec4(u_hoverColor, 1.0); // This should make everything red

}
