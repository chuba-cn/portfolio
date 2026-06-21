// Team-livery Hyperspeed config (purple + amber over our dark base). Frozen at
// module scope so the object identity is stable — passing a fresh object would
// re-create the whole WebGL scene every render.
export const LIVERY_HYPERSPEED = {
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5] as [number, number],
  lightStickHeight: [1.3, 1.7] as [number, number],
  movingAwaySpeed: [60, 80] as [number, number],
  movingCloserSpeed: [-120, -160] as [number, number],
  carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
  carLightsRadius: [0.05, 0.14] as [number, number],
  carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.8, 0.8] as [number, number],
  carFloorSeparation: [0, 5] as [number, number],
  colors: {
    roadColor: 0x0a0a12,
    islandColor: 0x0d0d16,
    background: 0x07060f,
    shoulderLines: 0x2a2740,
    brokenLines: 0x2a2740,
    leftCars: [0xac6aff, 0x7c3aed, 0xc247ac], // purples
    rightCars: [0xffc876, 0xff9d2e, 0xe8a13c], // ambers
    sticks: 0xac6aff,
  },
};
