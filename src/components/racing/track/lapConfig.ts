/**
 * Shared choreography for the "Drive the Lap" Experience scene. Maps the pinned
 * section's scroll progress (0..1) to a position along the lap (0..1) with a
 * dwell plateau at each corner, and tells the overlay which role is active.
 *
 * One segment per corner: the first part drives to the corner, the rest dwells
 * there (car ~stopped, role card revealed) before the next segment launches.
 */

// Spa corners mapped to the four roles (newest first), as fractions of the lap.
export const CORNER_US = [0.14, 0.4, 0.63, 0.87];
export const CORNER_NAMES = ["La Source", "Les Combes", "Pouhon", "Stavelot"];

const DRIVE_PORTION = 0.55; // first 55% of each segment drives; rest dwells
const ease = (t: number) => t * t * (3 - 2 * t);

/** Scroll progress (0..1) → position along the lap (0..1). */
export function lapU(p: number): number {
  const N = CORNER_US.length;
  const clamped = Math.min(0.9999, Math.max(0, p));
  const seg = Math.min(N - 1, Math.floor(clamped * N));
  const local = clamped * N - seg;
  const prevU = seg === 0 ? 0 : CORNER_US[seg - 1];
  const targetU = CORNER_US[seg];
  if (local < DRIVE_PORTION) {
    return prevU + (targetU - prevU) * ease(local / DRIVE_PORTION);
  }
  return targetU;
}

/** Scroll progress (0..1) → active corner index, or -1 while driving. */
export function activeCorner(p: number): number {
  const N = CORNER_US.length;
  const clamped = Math.min(0.9999, Math.max(0, p));
  const seg = Math.min(N - 1, Math.floor(clamped * N));
  const local = clamped * N - seg;
  return local >= DRIVE_PORTION - 0.05 ? seg : -1;
}
