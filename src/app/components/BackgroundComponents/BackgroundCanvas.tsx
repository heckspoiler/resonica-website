'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Mesh,
  Texture,
  Vector3,
} from 'three';

import fragment from './shaders/background.frag';
import vertex from './shaders/background.vert';

// Import the image as a texture
import backgroundDesktop from '../../../../public/blurry2.png';
import backgroundMobile from '../../../../public/background-mobile.png';

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [background, setBackground] = useState<string>(backgroundMobile.src);

  // Mouse and position variables
  const easeFactor = useRef<number>(0.1);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const targetMousePosition = useRef<{ x: number; y: number }>({
    x: 0.5,
    y: 0.5,
  });
  const prevPosition = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    // Update background based on screen size
    const updateBackground = () => {
      if (window.innerWidth < 1020) {
        setBackground(backgroundMobile.src);
      } else {
        setBackground(backgroundDesktop.src);
      }
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);

    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, []);

  useEffect(() => {
    // Scene setup
    const scene = new Scene();

    // Orthographic camera setup
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new OrthographicCamera(
      -aspectRatio,
      aspectRatio,
      1,
      -1,
      0.1,
      1000
    );
    camera.position.z = 1; // Position the camera close to the plane

    // Texture and Shader Material setup
    const loader = new TextureLoader();
    const texture: Texture = loader.load(background);
    const shaderUniforms = {
      u_texture: { value: texture },
      u_mouse: { value: new Vector2(0.5, 0.5) },
      u_prevMouse: { value: new Vector2(0.5, 0.5) },
      u_hoverColor: { value: new Vector3(1.0, 0.0, 0.0) },
      u_gravityStrength: { value: 1.8 },
      u_time: { value: 0.0 },
    };

    const planeGeometry = new PlaneGeometry(2 * aspectRatio, 2);
    const planeMaterial = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: shaderUniforms,
    });

    // Plane mesh
    const planeMesh = new Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    // Renderer setup
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap device pixel ratio to improve performance

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Mouse event listeners
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;

      prevPosition.current = { ...targetMousePosition.current };
      targetMousePosition.current.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.current.y = (event.clientY - rect.top) / rect.height;
    };

    mountRef.current?.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animateScene = () => {
      requestAnimationFrame(animateScene);

      // Smooth animation updates
      mousePosition.current.x +=
        (targetMousePosition.current.x - mousePosition.current.x) *
        easeFactor.current;
      mousePosition.current.y +=
        (targetMousePosition.current.y - mousePosition.current.y) *
        easeFactor.current;

      // Update uniforms
      shaderUniforms.u_time.value += 0.01; // Control time increments for smoother animation
      planeMaterial.uniforms.u_mouse.value.set(
        mousePosition.current.x,
        1.0 - mousePosition.current.y
      );
      planeMaterial.uniforms.u_prevMouse.value.set(
        prevPosition.current.x,
        1.0 - prevPosition.current.y
      );

      renderer.render(scene, camera);
    };

    // Resize handling for Three.js
    const onWindowResize = () => {
      const newAspectRatio = window.innerWidth / window.innerHeight;
      camera.left = -newAspectRatio;
      camera.right = newAspectRatio;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    animateScene();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      mountRef.current?.removeEventListener('mousemove', handleMouseMove);

      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [background]); // Re-run effect when background changes

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}
