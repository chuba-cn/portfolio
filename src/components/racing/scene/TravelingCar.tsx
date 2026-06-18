"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Str14Model from "../car/Str14Model";

/**
 * The persistent protagonist. The car follows a smooth curved path driven by
 * page scroll — staged right in the hero, then swooping across to the left for
 * the About section — banking into the turn, scaling, and parallaxing to the
 * cursor. Built to extend: add stations + curve points to choreograph the rest
 * of the lap.
 */

// Station keyframes (rotation + scale). Position comes from the curve below.
const STATIONS = [
  { id: "hero", rotY: -0.6, scale: 1.0 },
  { id: "about", rotY: 0.5, scale: 1.12 },
];

// Curve the car travels: hero (right) → arc up-and-over → About (left).
const CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(2.6, -0.2, 0),
  new THREE.Vector3(0.8, 1.2, 0.6),
  new THREE.Vector3(-1.1, 0.1, 0.8),
]);

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const lerp = THREE.MathUtils.lerp;
const clamp = THREE.MathUtils.clamp;

const TravelingCar = () => {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const anchorEnd = useRef(1000);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const calcAnchors = () => {
      const about = document.getElementById("about");
      anchorEnd.current = about
        ? Math.max(1, about.offsetTop - window.innerHeight * 0.5)
        : window.innerHeight;
    };
    calcAnchors();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", calcAnchors);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", calcAnchors);
    };
  }, []);

  useFrame(() => {
    const g = group.current;
    if (!g) return;

    const raw = clamp(window.scrollY / anchorEnd.current, 0, 1);
    const t = smoothstep(raw);
    // Past About (until the rest of the lap is choreographed) the car recedes
    // into the distance so it doesn't clutter the lower sections.
    const past = clamp(
      (window.scrollY - anchorEnd.current) / (window.innerHeight * 1.2),
      0,
      1
    );

    // Position along the curve + cursor parallax + exit recede.
    CURVE.getPoint(t, tmp);
    tmp.x += pointer.current.x * 0.3;
    tmp.y += pointer.current.y * 0.2;
    tmp.z -= past * 7;
    g.position.lerp(tmp, 0.1);

    // Heading interpolation + parallax.
    const rotY =
      lerp(STATIONS[0].rotY, STATIONS[1].rotY, t) + pointer.current.x * 0.15;
    g.rotation.y = lerp(g.rotation.y, rotY, 0.1);

    // Bank into the turn from the path tangent.
    const tan = CURVE.getTangent(t);
    g.rotation.z = lerp(g.rotation.z, -tan.x * 0.28, 0.08);

    // Scale (shrinking as it recedes past About).
    const sc = lerp(STATIONS[0].scale, STATIONS[1].scale, t) * (1 - past * 0.6);
    g.scale.setScalar(lerp(g.scale.x, sc, 0.1));
  });

  return (
    <group ref={group} position={[2.6, -0.2, 0]} scale={1}>
      <Str14Model />
    </group>
  );
};

export default TravelingCar;
