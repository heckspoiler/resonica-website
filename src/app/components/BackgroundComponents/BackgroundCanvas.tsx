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
  Clock,
} from 'three';

import fragment from './shaders/background.frag';
import vertex from './shaders/background.vert';

// Imported (not referenced by URL) so the files get hashed, long-cached URLs
import backgroundDesktop from '../../../../public/background-desktop.webp';
import backgroundMobile from '../../../../public/background-mobile.webp';

const MOBILE_BREAKPOINT = 1020;
// Smoothing applied to the mouse position, expressed per 60fps-frame and
// converted with delta time below so the feel is identical on any refresh rate
const EASE_FACTOR = 0.1;

export default function BackgroundCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const [background, setBackground] = useState<string | null>(null);

  // Scene setup — runs once; texture swaps happen without rebuilding the context
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new Scene();

    // Fullscreen quad: the camera frustum is fixed at -1..1 and aspect is
    // handled in the shader, so resizing never leaves gaps around the plane
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.z = 1;

    const shaderUniforms = {
      u_texture: { value: null as Texture | null },
      u_mouse: { value: new Vector2(0.5, 0.5) },
      u_aspect: { value: window.innerWidth / window.innerHeight },
      u_gravityStrength: { value: 1.8 },
      u_speed: { value: 0.0 },
      u_time: { value: 0.0 },
    };

    const planeGeometry = new PlaneGeometry(2, 2);
    const planeMaterial = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: shaderUniforms,
    });
    materialRef.current = planeMaterial;

    const planeMesh = new Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    // Antialiasing is off: a fullscreen textured quad has no geometry edges
    // for MSAA to smooth, so it would only cost fill rate
    const renderer = new WebGLRenderer({ antialias: false });
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap device pixel ratio to improve performance
    mount.appendChild(renderer.domElement);

    // Listen on window: the canvas sits behind the page content, so events on
    // the mount div itself never fire while the cursor is over content
    const mousePosition = new Vector2(0.5, 0.5);
    const targetMousePosition = new Vector2(0.5, 0.5);
    const prevMousePosition = new Vector2(0.5, 0.5);
    let smoothedSpeed = 0;
    const handleMouseMove = (event: MouseEvent) => {
      targetMousePosition.set(
        event.clientX / window.innerWidth,
        event.clientY / window.innerHeight
      );
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new Clock();
    renderer.setAnimationLoop(() => {
      // Clamp delta so a backgrounded tab doesn't jump on return
      const delta = Math.min(clock.getDelta(), 0.1);

      // Frame-rate independent easing, equivalent to the 60fps EASE_FACTOR
      const ease = 1 - Math.pow(1 - EASE_FACTOR, delta * 60);
      mousePosition.lerp(targetMousePosition, ease);

      // Cursor speed in screen units per second, measured on the eased
      // position so it is already jitter-free. Asymmetric smoothing: quick
      // to pick up a sweep, slow to settle back when the cursor stops.
      const frameSpeed =
        prevMousePosition.distanceTo(mousePosition) / Math.max(delta, 1e-4);
      prevMousePosition.copy(mousePosition);
      const attackOrRelease = frameSpeed > smoothedSpeed ? 0.15 : 0.05;
      smoothedSpeed +=
        (frameSpeed - smoothedSpeed) *
        (1 - Math.pow(1 - attackOrRelease, delta * 60));
      shaderUniforms.u_speed.value = smoothedSpeed;

      shaderUniforms.u_time.value += delta * 0.6; // 0.01 per frame at 60fps
      shaderUniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);

      renderer.render(scene, camera);
    });

    const onWindowResize = () => {
      shaderUniforms.u_aspect.value = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', handleMouseMove);

      renderer.setAnimationLoop(null);
      shaderUniforms.u_texture.value?.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      renderer.dispose();
      materialRef.current = null;
      mount.removeChild(renderer.domElement);
    };
  }, []);

  // Pick the image variant for the viewport
  useEffect(() => {
    const updateBackground = () => {
      setBackground(
        window.innerWidth < MOBILE_BREAKPOINT
          ? backgroundMobile.src
          : backgroundDesktop.src
      );
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);

    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, []);

  // Load the texture and swap it into the running material
  useEffect(() => {
    if (!background) return;

    let cancelled = false;
    new TextureLoader().load(background, (texture) => {
      const material = materialRef.current;
      if (cancelled || !material) {
        texture.dispose();
        return;
      }
      const previous = material.uniforms.u_texture.value as Texture | null;
      material.uniforms.u_texture.value = texture;
      previous?.dispose();
    });

    return () => {
      cancelled = true;
    };
  }, [background]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
