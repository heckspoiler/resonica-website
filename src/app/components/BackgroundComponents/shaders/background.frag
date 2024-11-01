uniform sampler2D backgroundTexture;
varying vec2 vUv;

void main() {
    vec4 bgColor = texture2D(backgroundTexture, vUv);
    gl_FragColor = bgColor; 
}
