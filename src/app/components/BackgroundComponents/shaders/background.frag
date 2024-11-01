uniform sampler2D backgroundTexture;
varying vec2 vUv;

void main() {
    // Sample the color from the texture at the given UV coordinates
    vec4 bgColor = texture2D(backgroundTexture, vUv);


    // Directly output the texture color so you can see it on the screen
    gl_FragColor = bgColor; 
}
