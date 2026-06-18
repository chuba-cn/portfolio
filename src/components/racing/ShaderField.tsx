"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./shaders/circuitField";

/**
 * The animated fullscreen quad. Updates time / aspect / cursor / theme uniforms
 * each frame. Cheap: a single fragment pass at capped DPR.
 */
const FieldPlane = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  // Cursor in 0..1, smoothed toward the real pointer for a lagged glow.
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uDark: { value: 1 },
    }),
    []
  );

  // Track the pointer at the window level (the canvas itself is non-interactive).
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: PointerEvent) => {
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const u = uniforms;
    u.uTime.value += delta;
    u.uAspect.value = size.width / size.height;
    mouse.current.lerp(target.current, Math.min(1, delta * 3));
    u.uMouse.value.copy(mouse.current);
    u.uDark.value = document.documentElement.classList.contains("dark") ? 1 : 0;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

const ShaderField = () => {
  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      frameloop="always"
      style={{ pointerEvents: "none" }}
      orthographic
      camera={{ position: [0, 0, 1] }}
    >
      <FieldPlane />
    </Canvas>
  );
};

export default ShaderField;
