"use client";

import { MutableRefObject, Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import Str14Model from "../car/Str14Model";
import { STOP_TS, roadT } from "./lapConfig";

const ROAD_WIDTH = 11;
const START_Z = -6; // car start (near camera)
const END_Z = -230; // far end (into the fog)
const ROAD_NEAR = 24;
const ROAD_FAR = -280;
const CAR_YAW = Math.PI; // nose points down the road (-Z)

const lerp = THREE.MathUtils.lerp;
const zAt = (t: number) => lerp(START_Z, END_Z, t);

const Markings = () => {
  // Dashed centre line.
  const dashes = useMemo(() => {
    const out: number[] = [];
    for (let z = ROAD_NEAR; z > ROAD_FAR; z -= 7) out.push(z);
    return out;
  }, []);

  return (
    <group>
      {dashes.map((z, i) => (
        <mesh key={i} position={[0, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.22, 2.6]} />
          <meshStandardMaterial color="#d8d8e0" roughness={0.6} />
        </mesh>
      ))}
      {/* Solid edge lines */}
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[s * (ROAD_WIDTH / 2 - 0.45), 0.02, (ROAD_NEAR + ROAD_FAR) / 2]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.18, ROAD_NEAR - ROAD_FAR]} />
          <meshStandardMaterial color="#cfcfd8" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const Barriers = () => {
  const len = ROAD_NEAR - ROAD_FAR;
  const z = (ROAD_NEAR + ROAD_FAR) / 2;
  return (
    <group>
      {[-1, 1].map((s) => (
        <group key={s}>
          {/* Concrete wall */}
          <mesh position={[s * (ROAD_WIDTH / 2 + 0.6), 0.5, z]}>
            <boxGeometry args={[0.4, 1, len]} />
            <meshStandardMaterial color="#1b1b22" roughness={0.9} />
          </mesh>
          {/* Red/white kerb at the road edge */}
          <mesh
            position={[s * (ROAD_WIDTH / 2 - 0.05), 0.03, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.5, len]} />
            <meshStandardMaterial color="#b23b3b" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const StopMarkers = () => {
  return (
    <group>
      {STOP_TS.map((t, i) => {
        const side = i % 2 === 0 ? 1 : -1;
        return (
          <mesh
            key={i}
            position={[side * (ROAD_WIDTH / 2 + 1.6), 1.6, zAt(t)]}
          >
            <boxGeometry args={[0.18, 3.2, 0.18]} />
            <meshStandardMaterial
              color="#AC6AFF"
              emissive="#AC6AFF"
              emissiveIntensity={2.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const Drive = ({ progress }: { progress: MutableRefObject<number> }) => {
  const car = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const camPos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const c = car.current;
    if (!c) return;
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;

    const z = zAt(roadT(progress.current));
    c.position.set(0, 0, z);
    c.rotation.y = CAR_YAW;

    // Chase camera: low and close behind for a cinematic view.
    camPos.set(
      pointer.current.x * 1.0,
      2.4 - pointer.current.y * 0.5,
      z + 6
    );
    camera.position.lerp(camPos, 0.12);

    look.set(0, 0.9, z - 14);
    camera.lookAt(look);
  });

  return (
    <Suspense fallback={null}>
      <group ref={car}>
        <Str14Model />
      </group>
    </Suspense>
  );
};

const TrackScene = ({
  progress,
}: {
  progress: MutableRefObject<number>;
}) => {
  const [dpr, setDpr] = useState(1.4);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 3.4, 3], fov: 50 }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.4)} />

      <color attach="background" args={["#08070f"]} />
      <fog attach="fog" args={["#08070f", 26, 150]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 12, 4]} intensity={1.6} />
      <pointLight position={[-6, 4, 0]} intensity={20} color="#AC6AFF" />

      <Environment resolution={128}>
        <Lightformer intensity={1.8} position={[0, 8, -10]} scale={[14, 6, 1]} color="#ffffff" />
        <Lightformer intensity={1.4} position={[-6, 3, 0]} scale={[3, 8, 1]} color="#AC6AFF" />
      </Environment>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, -120]}>
        <planeGeometry args={[400, 600]} />
        <meshStandardMaterial color="#0b0b12" roughness={0.95} />
      </mesh>

      {/* Asphalt */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, (ROAD_NEAR + ROAD_FAR) / 2]}
      >
        <planeGeometry args={[ROAD_WIDTH, ROAD_NEAR - ROAD_FAR]} />
        <meshStandardMaterial color="#26262d" roughness={0.92} metalness={0.05} />
      </mesh>

      <Markings />
      <Barriers />
      <StopMarkers />
      <Drive progress={progress} />

      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.8} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
};

export default TrackScene;
