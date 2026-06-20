/**
 * Tiny synchronous store coordinating the single WebGL "context budget". Any
 * scene that needs the GPU to itself (the intro Hyperspeed warp, the Experience
 * drive, the Contact warp) registers a source; the page-wide car (RaceScene)
 * stands down whenever any source is active. Synchronous shared state avoids the
 * event-ordering races we'd get with CustomEvents at mount time.
 */
const sources = new Set<string>();
const listeners = new Set<() => void>();

export const carYield = {
  set(id: string, on: boolean) {
    const had = sources.has(id);
    if (on) sources.add(id);
    else sources.delete(id);
    if (had !== on) listeners.forEach((l) => l());
  },
  get active() {
    return sources.size > 0;
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};
