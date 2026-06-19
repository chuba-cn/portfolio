"use client";

import { MutableRefObject, Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Grid,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import Str14Model from "../car/Str14Model";
import { CORNER_US, lapU } from "./lapConfig";

// The 2D Spa path (shared with the circuit map) sampled into a 3D ground curve.
const SPA_PATH =
  "M 96 78 C 84 50 128 44 132 74 C 135 96 112 104 104 122 C 96 140 104 150 122 150 L 296 96 C 324 89 346 104 342 132 C 337 164 306 168 312 196 C 318 226 296 246 262 242 L 126 232 C 90 229 74 204 86 176 C 99 146 116 116 102 92 C 96 82 90 86 96 78 Z";
const SCALE = 0.12;
const YAW_OFFSET = Math.PI / 2; // align the model's nose with the path tangent

function sampleSpaCurve(samples = 160): THREE.CatmullRomCurve3 {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", SPA_PATH);
  svg.appendChild(path);
  Object.assign(svg.style, {
    position: "absolute",
    width: "0",
    height: "0",
    overflow: "hidden",
  });
  document.body.appendChild(svg);
  const len = path.getTotalLength();
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < samples; i++) {
    const p = path.getPointAtLength((i / samples) * len);
    pts.push(new THREE.Vector3((p.x - 210) * SCALE, 0, (p.y - 145) * SCALE));
  }
  document.body.removeChild(svg);
  return new THREE.CatmullRomCurve3(pts, true, "centripetal", 0.5);
}

const Lap = ({ progress }: { progress: MutableRefObject<number> }) => {
  const car = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const curve = useMemo(() => sampleSpaCurve(), []);
  const lineGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 400, 0.16, 8, true),
    [curve]
  );
  const corners = useMemo(
    () => CORNER_US.map((u) => curve.getPointAt(u)),
    [curve]
  );

  // reusable temporaries
  const tmp = useMemo(
    () => ({
      pos: new THREE.Vector3(),
      tan: new THREE.Vector3(),
      camPos: new THREE.Vector3(),
      look: new THREE.Vector3(),
    }),
    []
  );

  useFrame(() => {
    const c = car.current;
    if (!c) return;
    const u = lapU(progress.current);

    curve.getPointAt(u, tmp.pos);
    curve.getTangentAt(u, tmp.tan).normalize();

    c.position.set(tmp.pos.x, 0, tmp.pos.z);
    c.rotation.y = Math.atan2(tmp.tan.x, tmp.tan.z) + YAW_OFFSET;

    // Chase camera: behind + above, looking into the corner.
    tmp.camPos
      .copy(tmp.pos)
      .addScaledVector(tmp.tan, -6.5)
      .add(new THREE.Vector3(0, 3.2, 0));
    camera.position.lerp(tmp.camPos, 0.08);

    tmp.look.copy(tmp.pos).addScaledVector(tmp.tan, 5).setY(0.6);
    camera.lookAt(tmp.look);
  });

  return (
    <>
      {/* Glowing racing line */}
      <mesh geometry={lineGeo}>
        <meshStandardMaterial
          color="#AC6AFF"
          emissive="#AC6AFF"
          emissiveIntensity={2.4}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Corner gates */}
      {corners.map((p, i) => (
        <mesh key={i} position={[p.x, 0.6, p.z]}>
          <torusGeometry args={[0.8, 0.06, 8, 24]} />
          <meshStandardMaterial
            color="#FFC876"
            emissive="#FFC876"
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* Car */}
      <Suspense fallback={null}>
        <group ref={car}>
          <Str14Model />
        </group>
      </Suspense>
    </>
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
      camera={{ position: [0, 4, 10], fov: 46 }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.4)} />

      <color attach="background" args={["#07060f"]} />
      <fog attach="fog" args={["#07060f", 14, 46]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 4]} intensity={1.4} />
      <pointLight position={[-8, 4, 2]} intensity={30} color="#AC6AFF" />

      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 6, 4]} scale={[12, 6, 1]} color="#ffffff" />
        <Lightformer intensity={1.6} position={[-6, 3, 1]} scale={[3, 8, 1]} color="#AC6AFF" />
      </Environment>

      {/* Ground + grid for a sense of speed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#0a0a12" roughness={0.9} metalness={0.3} />
      </mesh>
      <Grid
        position={[0, -0.01, 0]}
        args={[200, 200]}
        cellSize={1.2}
        cellThickness={0.5}
        cellColor="#1c1a2c"
        sectionSize={6}
        sectionThickness={1}
        sectionColor="#3a2f5c"
        fadeDistance={60}
        fadeStrength={1.4}
        infiniteGrid
      />

      <Lap progress={progress} />

      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.7} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </Canvas>
  );
};

export default TrackScene;
