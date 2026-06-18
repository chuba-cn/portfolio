"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import TravelingCar from "./TravelingCar";

/**
 * The single persistent WebGL canvas that spans the whole page, behind all
 * content. Transparent, so the CSS grid/page shows through and the car appears
 * to float in the page. Hosts the scroll-choreographed TravelingCar.
 */
const SceneCanvas = () => {
  const [dpr, setDpr] = useState(1.4);

  return (
    <Canvas
      className="!fixed inset-0"
      shadows={false}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.3, 9], fov: 32 }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.4)} />

      <ambientLight intensity={0.5} />
      <spotLight
        position={[3, 8, 5]}
        angle={0.5}
        penumbra={0.9}
        intensity={140}
        color="#ffffff"
      />
      <pointLight position={[-6, 2, 2]} intensity={28} color="#AC6AFF" />
      <pointLight position={[5, 1, -4]} intensity={16} color="#FFC876" />

      {/* Studio reflections (offline-safe, no HDRI fetch) */}
      <Environment resolution={256}>
        <Lightformer intensity={2.6} position={[0, 5, 3]} scale={[10, 5, 1]} color="#ffffff" />
        <Lightformer intensity={2.2} position={[-6, 2, 1]} scale={[3, 9, 1]} color="#AC6AFF" />
        <Lightformer intensity={1.8} position={[6, 2, -2]} scale={[3, 9, 1]} color="#FFC876" />
      </Environment>

      <Suspense fallback={null}>
        <TravelingCar />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.85} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.55} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
};

export default SceneCanvas;
