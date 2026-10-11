import { useEffect, useRef } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Loads gsap + ScrollTrigger on the client only and runs `setup` inside a
 * gsap.context scoped to the returned ref. Returns cleanly on unmount.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: {
    gsap: typeof import("gsap").gsap;
    ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
    root: T;
    reduced: boolean;
  }) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const root = ref.current;
      if (cancelled || !root) return;
      const reduced = prefersReducedMotion();
      const ctx = gsap.context(() => setup({ gsap, ScrollTrigger, root, reduced }), root);
      cleanup = () => ctx.revert();
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
