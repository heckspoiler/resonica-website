'use client';

import React, { useRef, useEffect } from 'react';
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

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Mouse and position variables
  const easeFactor = useRef<number>(0.8);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const targetMousePosition = useRef<{ x: number; y: number }>({
    x: 0.5,
    y: 0.5,
  });
  const prevPosition = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    // Scene setup
    const scene = new Scene();

    // Camera setup
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new OrthographicCamera(
      -1,
      1,
      (1 / aspectRatio) * 1.8,
      (-1 / aspectRatio) * 1.8,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Texture and Shader Material setup
    const loader = new TextureLoader();
    const texture: Texture = loader.load(backgroundDesktop.src);
    const shaderUniforms = {
      u_texture: { value: texture },
      u_mouse: { value: new Vector2(0.5, 0.5) },
      u_prevMouse: { value: new Vector2(0.5, 0.5) },
      u_hoverColor: { value: new Vector3(1.0, 0.0, 0.0) },
      u_gravityStrength: { value: 1.0 },
      u_time: { value: 0.0 },
    };

    const planeGeometry = new PlaneGeometry(2, 2);
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
    renderer.setPixelRatio(window.devicePixelRatio);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Mouse event listeners
    const handleMouseMove = (event: MouseEvent) => {
      easeFactor.current = 0.08;
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;

      prevPosition.current = { ...targetMousePosition.current };
      targetMousePosition.current.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.current.y = (event.clientY - rect.top) / rect.height;
    };

    const handleMouseEnter = (event: MouseEvent) => {
      easeFactor.current = 0.01;
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;

      mousePosition.current.x = targetMousePosition.current.x =
        (event.clientX - rect.left) / rect.width;
      mousePosition.current.y = targetMousePosition.current.y =
        (event.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      easeFactor.current = 0.01;
      targetMousePosition.current = { ...prevPosition.current };
    };

    mountRef.current?.addEventListener('mousemove', handleMouseMove);
    mountRef.current?.addEventListener('mouseenter', handleMouseEnter);
    mountRef.current?.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animateScene = () => {
      requestAnimationFrame(animateScene);

      mousePosition.current.x +=
        (targetMousePosition.current.x - mousePosition.current.x) *
        easeFactor.current;
      mousePosition.current.y +=
        (targetMousePosition.current.y - mousePosition.current.y) *
        easeFactor.current;

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

    animateScene();

    // Resize event listener
    const onWindowResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      camera.left = -1;
      camera.right = 1;
      camera.top = (1 / aspectRatio) * 1.8;
      camera.bottom = (-1 / aspectRatio) * 1.8;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      mountRef.current?.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      mountRef.current?.removeEventListener('mouseleave', handleMouseLeave);

      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}
