import { useSyncExternalStore } from "react";

/**
 * `false` on the server AND during hydration, `true` once the client has taken
 * over — so a component can render exactly what the server rendered on the first
 * pass, then adjust.
 *
 * WHY IT EXISTS. Components branched their markup on `useReducedMotion()`. The
 * server can't see a visitor's motion preference, so it rendered one tree; the
 * browser, which can, rendered another; React threw hydration error #418 and
 * re-rendered the entire page on the client (#423). Live in production on /,
 * /work and /work/glowtoure (2026-09-10), for exactly the visitors who asked for
 * less motion.
 *
 * Use it only where the difference can't be CSS — a <video> must not download
 * for reduced-motion visitors, and no stylesheet can stop a download. Anything
 * purely visual should use `motion-reduce:` / the reduced-motion CSS instead,
 * which is correct from the first paint with no second render at all.
 *
 * useSyncExternalStore rather than a useEffect + setState: it is React's own
 * hydration-safe way to read "server snapshot vs client snapshot".
 */
const subscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
