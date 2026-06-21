/**
 * Choreography for the "Drive the street" Experience scene. Maps the pinned
 * section's scroll progress (0..1) to a position along a straight road (0..1),
 * pausing at each stop where that role's card reveals on the roadside.
 *
 * One segment per stop: the first part cruises to the stop, the rest dwells
 * there before the next segment launches forward.
 */

// Stops along the road (0 = start, 1 = far end), one per role (newest first).
export const STOP_TS = [0.16, 0.42, 0.68, 0.92];

const DRIVE_PORTION = 0.55; // first 55% of each segment drives; rest dwells
const ease = (t: number) => t * t * (3 - 2 * t);

/** Scroll progress (0..1) → position along the road (0..1). */
export function roadT(p: number): number {
  const N = STOP_TS.length;
  const clamped = Math.min(0.9999, Math.max(0, p));
  const seg = Math.min(N - 1, Math.floor(clamped * N));
  const local = clamped * N - seg;
  const prevT = seg === 0 ? 0 : STOP_TS[seg - 1];
  const targetT = STOP_TS[seg];
  if (local < DRIVE_PORTION) {
    return prevT + (targetT - prevT) * ease(local / DRIVE_PORTION);
  }
  return targetT;
}

/** Scroll progress (0..1) → active stop index, or -1 while cruising. */
export function activeStop(p: number): number {
  const N = STOP_TS.length;
  const clamped = Math.min(0.9999, Math.max(0, p));
  const seg = Math.min(N - 1, Math.floor(clamped * N));
  const local = clamped * N - seg;
  return local >= DRIVE_PORTION - 0.05 ? seg : -1;
}
