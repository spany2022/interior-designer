import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Lenis smooth scroll, synced to GSAP ScrollTrigger. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let destroy: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        touchMultiplier: 1.4,
      });

      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      destroy = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    })();

    return () => destroy?.();
  }, []);

  return null;
}
