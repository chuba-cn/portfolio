"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Str14Model from "../car/Str14Model";

/**
 * The persistent protagonist — "The Lap". The car follows a smooth centripetal
 * Catmull-Rom curve through one keyframe per section, driven by page scroll. It
 * weaves side to side (arriving in each section's negative space / behind its
 * glassy panels), banks into the turns, scales, and parallaxes to the cursor.
 *
 * Each section centering in the viewport = the car arriving at that station.
 */
type Station = {
  id: string;
  pos: [number, number, number];
  rotY: number;
  scale: number;
};

const STATIONS: Station[] = [
  { id: "hero", pos: [2.6, -0.2, 0.0], rotY: -0.6, scale: 1.0 },
  { id: "about", pos: [-1.3, 0.1, 0.6], rotY: 0.5, scale: 1.12 },
  { id: "services", pos: [2.0, 0.3, -0.6], rotY: -0.5, scale: 0.95 },
  { id: "stack", pos: [-2.0, -0.1, 0.4], rotY: 0.6, scale: 1.05 },
  { id: "work", pos: [2.3, 0.2, -1.2], rotY: -0.4, scale: 0.85 },
  { id: "experience", pos: [-1.7, 0.0, 0.2], rotY: 0.4, scale: 0.95 },
  { id: "contact", pos: [0.0, 0.1, 1.4], rotY: 0.0, scale: 1.25 },
];

const CURVE = new THREE.CatmullRomCurve3(
  STATIONS.map((s) => new THREE.Vector3(...s.pos)),
  false,
  "centripetal",
  0.5
);

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const lerp = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;

const TravelingCar = () => {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const anchors = useRef<number[]>([]);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const tan = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const calc = () => {
      anchors.current = STATIONS.map((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return i * window.innerHeight;
        return i === 0 ? 0 : Math.max(1, el.offsetTop - window.innerHeight * 0.45);
      });
    };
    calc();
    // Recalc once layout/fonts settle.
    const t = setTimeout(calc, 600);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", calc);
    };
  }, []);

  useFrame(() => {
    const g = group.current;
    const A = anchors.current;
    const N = STATIONS.length;
    if (!g || A.length < N) return;

    const y = window.scrollY;

    // Which segment are we in?
    let i = 0;
    while (i < N - 2 && y >= A[i + 1]) i++;
    const localRaw = clamp((y - A[i]) / Math.max(1, A[i + 1] - A[i]), 0, 1);
    const localT = smoothstep(localRaw);
    const globalT = clamp((i + localT) / (N - 1), 0, 1);

    // Position along the curve + cursor parallax.
    CURVE.getPoint(globalT, tmp);
    tmp.x += pointer.current.x * 0.3;
    tmp.y += pointer.current.y * 0.2;
    g.position.lerp(tmp, 0.1);

    // Heading + bank + scale.
    const a = STATIONS[i];
    const b = STATIONS[i + 1];
    const rotY = lerp(a.rotY, b.rotY, localT) + pointer.current.x * 0.15;
    g.rotation.y = lerp(g.rotation.y, rotY, 0.1);

    CURVE.getTangent(globalT, tan);
    g.rotation.z = lerp(g.rotation.z, -tan.x * 0.25, 0.08);

    const sc = lerp(a.scale, b.scale, localT);
    g.scale.setScalar(lerp(g.scale.x, sc, 0.1));
  });

  return (
    <group ref={group} position={STATIONS[0].pos}>
      <Str14Model />
    </group>
  );
};

export default TravelingCar;
