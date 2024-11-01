'use client';

import React, { useRef, useEffect } from 'react';

// three.js imports
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  TextureLoader,
  PlaneGeometry,
  ShaderMaterial,
  Texture,
  LinearMipMapLinearFilter,
  LinearFilter,
} from 'three';

import backgroundDesktop from '../../../../public/background_bevel.png';

// shader imports
import backgroundFrag from './shaders/background.frag';
import backgroundVert from './shaders/background.vert';

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // background loader

    const backgroundTexture = new TextureLoader().load(
      backgroundDesktop.src,
      (texture) => {
        texture.minFilter = LinearMipMapLinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = true;
      }
    );
    // Scene setup

    const scene: Scene = new Scene();
    const bgGeometry = new PlaneGeometry(2, 2);
    const bgMaterial = new ShaderMaterial({
      vertexShader: backgroundVert,
      fragmentShader: backgroundFrag,
      depthTest: false,
      uniforms: {
        backgroundTexture: { value: backgroundTexture },
      },
    });
    const bgMesh = new Mesh(bgGeometry, bgMaterial);
    scene.add(bgMesh);

    // Camera setup

    const camera: PerspectiveCamera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup

    const renderer: WebGLRenderer = new WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Animate with typed properties
    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}
