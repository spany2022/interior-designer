import { useGsap } from "@/lib/motion";
import { MagneticLink } from "./Magnetic";
import heroImg from "@/assets/hero-living.jpg";

/**
 * Section 01 — cinematic hero. Scroll pushes the camera forward into the
 * interior while the typography drifts with it; a soft light follows the
 * pointer across the room.
 */
export function Hero() {
  const ref = useGsap<HTMLDivElement>(({ gsap, root, reduced }) => {
    const img = root.querySelector<HTMLElement>("[data-hero-img]")!;
    const type = root.querySelectorAll<HTMLElement>("[data-hero-type] > *");
    const veil = root.querySelector<HTMLElement>("[data-hero-veil]")!;

    gsap.set(img, { scale: 1.12 });
    const intro = gsap.timeline({ delay: reduced ? 0 : 1.9 });
    intro
      .to(img, { scale: 1, duration: reduced ? 0 : 2.4, ease: "power2.out" })
      .from(
        type,
        {
          yPercent: 115,
          duration: reduced ? 0 : 1.5,
          ease: "power3.out",
          stagger: 0.09,
        },
        reduced ? 0 : 0.2,
      );

    if (reduced) return;

    // Scroll = camera movement: push in, lift the type, dim into the next room.
    gsap
      .timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      })
      .to(img, { scale: 1.22, yPercent: 6, ease: "none" }, 0)
      .to("[data-hero-type]", { yPercent: -55, opacity: 0.15, ease: "none" }, 0)
      .to(veil, { opacity: 0.78, ease: "none" }, 0);

    // Pointer-follow architectural light.
    const light = root.querySelector<HTMLElement>("[data-hero-light]")!;
    const onMove = (e: PointerEvent) => {
      gsap.to(light, {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        duration: 1.6,
        ease: "power3.out",
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  });

  return (
    <section ref={ref} id="top" data-chrome="dark" className="relative h-screen overflow-hidden">
      <div data-hero-img className="absolute inset-0 will-change-transform">
        <img
          src={heroImg}
          alt="Sunlit luxury living room with travertine walls, linen sofa and oak floors"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
      </div>

      <div
        data-hero-light
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(38rem 38rem at 50% 45%, color-mix(in oklab, var(--color-brass) 55%, transparent), transparent 70%)",
        }}
      />
      <div
        data-hero-veil
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-ink) 55%, transparent) 0%, transparent 32%, color-mix(in oklab, var(--color-ink) 78%, transparent) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1680px] flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
        <div data-hero-type className="text-warm-white">
          <div className="overflow-hidden">
            <p className="eyebrow pb-5 text-brass">Interior Architecture · Est. 2009</p>
          </div>
          <h1 className="display-xl max-w-[16ch]">
            <span className="block overflow-hidden">
              <span className="block">Spaces Designed</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block italic">Around You.</span>
            </span>
          </h1>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="overflow-hidden">
              <p className="max-w-[46ch] text-[0.95rem] leading-relaxed font-light text-warm-white/75">
                We transform interiors into thoughtful, timeless environments designed to be lived
                in.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 overflow-hidden">
              <MagneticLink
                href="#projects"
                data-cursor="VIEW"
                className="inline-flex border border-warm-white/40 px-8 py-4 text-[0.7rem] tracking-[0.22em] text-warm-white uppercase hover:bg-warm-white hover:text-ink"
              >
                Explore Our Work
              </MagneticLink>
              <MagneticLink
                href="#consultation"
                data-cursor="START"
                className="inline-flex px-2 py-4 text-[0.7rem] tracking-[0.22em] text-brass uppercase"
              >
                Start Your Project ↗
              </MagneticLink>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-8 z-10 hidden items-center gap-3 text-warm-white/50 md:right-12 md:flex">
        <span className="eyebrow">Scroll</span>
        <span className="h-16 w-px bg-warm-white/30" />
      </div>
    </section>
  );
}
