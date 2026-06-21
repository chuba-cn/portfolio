"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * Loads the Toro Rosso STR14 glTF, auto-fits it to a consistent world size,
 * centers it on X/Z and stands it on the ground plane (y = 0) so the rig can
 * spin it in place and the contact shadow lands correctly.
 *
 * Model: "2019 F1 Toro Rosso STR14" by OUTPISTON (Sketchfab), CC-BY-NC-SA-4.0.
 */
const MODEL_URL = "/models/str14/scene.gltf";
const TARGET_SIZE = 3.8; // longest dimension in world units

const Str14Model = () => {
  const { scene } = useGLTF(MODEL_URL);

  const model = useMemo(() => {
    const root = scene.clone(true);

    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const scale = TARGET_SIZE / Math.max(size.x, size.y, size.z);
    root.scale.setScalar(scale);
    // Centre on X/Z, drop onto the ground plane.
    root.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale
    );

    root.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    return root;
  }, [scene]);

  return <primitive object={model} />;
};

useGLTF.preload(MODEL_URL);

export default Str14Model;
