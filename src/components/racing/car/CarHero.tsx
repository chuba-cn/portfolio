"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import Str14Model from "./Str14Model";

/**
 * Slowly rotates the car and tilts it toward the pointer for parallax, with a
 * gentle idle bob. Pointer is tracked at the window level since the canvas is
 * non-interactive.
 */
const CarRig = () => {
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // read live pointer via r3f state (normalized -1..1)
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;

    // Aim at the car's mass so it sits centered in frame.
    state.camera.lookAt(0, 0.55, 0);

    const t = state.clock.elapsedTime;
    // Showcase sweep between two 3/4 angles — never a flat head-on frame.
    if (spin.current) spin.current.rotation.y = -0.6 + Math.sin(t * 0.32) * 0.75;
    if (tilt.current) {
      tilt.current.position.y = Math.sin(t * 0.8) * 0.05;
      tilt.current.rotation.x = THREE.MathUtils.lerp(
        tilt.current.rotation.x,
        -0.12 + pointer.current.y * 0.12,
        0.05
      );
      tilt.current.rotation.z = THREE.MathUtils.lerp(
        tilt.current.rotation.z,
        pointer.current.x * 0.08,
        0.05
      );
    }
  });

  return (
    <group ref={tilt} rotation={[-0.05, 0, 0]}>
      <group ref={spin}>
        <Suspense fallback={null}>
          <Str14Model />
        </Suspense>
      </group>
    </group>
  );
};

const CarHero = () => {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      className="!absolute inset-0"
      shadows
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [3.0, 1.4, 4.0], fov: 32 }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />

      <ambientLight intensity={0.7} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Subtle livery-tinted rim lights — kept low so the real paint shows */}
      <pointLight position={[-4, 2, 1]} intensity={6} color="#AC6AFF" />
      <pointLight position={[3, 1, -3]} intensity={4} color="#FFC876" />

      {/* Studio reflections built from light cards — no HDRI fetch, offline-safe */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2.2}
          position={[0, 4, 2]}
          scale={[8, 4, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={2}
          position={[-4, 1, 2]}
          scale={[3, 6, 1]}
          color="#AC6AFF"
        />
        <Lightformer
          intensity={1.6}
          position={[4, 1, -2]}
          scale={[3, 6, 1]}
          color="#FFC876"
        />
      </Environment>

      <CarRig />

      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.5}
        scale={9}
        blur={2.4}
        far={4}
        color="#000000"
      />

      <EffectComposer>
        <Bloom
          intensity={0.45}
          luminanceThreshold={0.95}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.6} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
};

export default CarHero;
