"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  Grid,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import Str14Model from "./Str14Model";

type Palette = {
  bg: string;
  floor: string;
  grid: string;
  section: string;
  fog: string;
  mirror: number;
  roughness: number;
};

const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    bg: "#07060f",
    floor: "#0a0a14",
    grid: "#2a2740",
    section: "#AC6AFF",
    fog: "#07060f",
    mirror: 0.55,
    roughness: 0.85,
  },
  light: {
    bg: "#e9e8f0",
    floor: "#d6d4e2",
    grid: "#c4c2d2",
    section: "#7c5cff",
    fog: "#e9e8f0",
    mirror: 0.22,
    roughness: 0.96,
  },
};

/**
 * Guided cinematic camera: a slow auto-orbit drift, mouse parallax, and a
 * scroll-driven dolly/lift as the hero scrolls away. No manual controls, so the
 * framing is always composed. Pointer + scroll are tracked at the window level.
 */
const CameraRig = () => {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / (window.innerHeight * 0.7));
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    // Oscillate within a flattering front-3/4 arc (never behind / top-down).
    const angle = -0.4 + Math.sin(t * 0.08) * 0.5 + pointer.current.x * 0.45;
    const radius = 5.7 - s * 1.3;
    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;
    const targetY = 1.1 + pointer.current.y * -0.4 + s * 2.4;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
    camera.lookAt(0.5, 0.5 - s * 0.2, 0);
  });

  return null;
};

const Scene = ({ palette }: { palette: Palette }) => {
  return (
    <>
      <color attach="background" args={[palette.bg]} />
      <fog attach="fog" args={[palette.fog, 9, 30]} />

      <ambientLight intensity={0.45} />
      <spotLight
        position={[2, 7, 3]}
        angle={0.5}
        penumbra={0.8}
        intensity={120}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#ffffff"
      />
      <pointLight position={[-5, 2, 1]} intensity={20} color="#AC6AFF" />
      <pointLight position={[4, 1.5, -4]} intensity={12} color="#FFC876" />

      {/* Studio reflections (offline-safe, no HDRI fetch) */}
      <Environment resolution={256}>
        <Lightformer intensity={2.4} position={[0, 5, 2]} scale={[10, 5, 1]} color="#ffffff" />
        <Lightformer intensity={2} position={[-5, 2, 1]} scale={[3, 8, 1]} color="#AC6AFF" />
        <Lightformer intensity={1.6} position={[5, 2, -2]} scale={[3, 8, 1]} color="#FFC876" />
      </Environment>

      <Suspense fallback={null}>
        <group position={[0.6, 0, 0]}>
          <Str14Model />
        </group>
      </Suspense>

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <MeshReflectorMaterial
          resolution={512}
          blur={[400, 120]}
          mixBlur={1}
          mixStrength={28}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.3}
          roughness={palette.roughness}
          metalness={0.5}
          color={palette.floor}
          mirror={palette.mirror}
        />
      </mesh>

      {/* Receding grid */}
      <Grid
        position={[0, 0.012, 0]}
        args={[60, 60]}
        cellSize={0.6}
        cellThickness={0.5}
        cellColor={palette.grid}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={palette.section}
        fadeDistance={26}
        fadeStrength={1.2}
        infiniteGrid
      />

      <CameraRig />

      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.9} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.7} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </>
  );
};

const CarStage = ({ isDark }: { isDark: boolean }) => {
  const [dpr, setDpr] = useState(1.4);
  const palette = isDark ? PALETTES.dark : PALETTES.light;

  return (
    <Canvas
      className="!absolute inset-0"
      shadows
      dpr={dpr}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [4, 1.6, 5], fov: 38 }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.4)} />
      <Scene palette={palette} />
    </Canvas>
  );
};

export default CarStage;
