import { useGsap } from "@/lib/motion";
import empty from "@/assets/transform-empty.jpg";
import mid from "@/assets/transform-mid.jpg";
import final from "@/assets/transform-final.jpg";

const STAGES = [
  {
    key: "shell",
    n: "01",
    title: "Empty Shell",
    text: "Bare concrete, raw openings, unclaimed volume. We begin by reading the light.",
  },
  {
    key: "concept",
    n: "02",
    title: "Concept & Material",
    text: "Floors laid, walls warmed, finishes chosen. The room learns its own language.",
  },
  {
    key: "final",
    n: "03",
    title: "Finished Space",
    text: "Furniture, lighting, art and air. A space that finally behaves like a home.",
  },
];

/**
 * Section 03 — scroll-driven transformation. A pinned room cross-fades and
 * un-masks through shell → concept → finished interior while the light warms.
 */
export function Transformation() {
  const ref = useGsap<HTMLElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-layer]")) as HTMLElement[] & { [k: number]: HTMLElement };
    const captions = Array.from(root.querySelectorAll<HTMLElement>("[data-caption]")) as HTMLElement[] & { [k: number]: HTMLElement };
    const warm = root.querySelector<HTMLElement>("[data-warm]")!;
    const bar = root.querySelector<HTMLElement>("[data-progress]")!;

    gsap.set(layers[1]!, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(layers[2]!, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(captions, { autoAlpha: 0, y: 24 });
    gsap.set(captions[0]!, { autoAlpha: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=320%",
        scrub: 0.8,
        pin: root.querySelector("[data-pin]"),
        anticipatePin: 1,
      },
    });

    tl.to(bar, { scaleX: 0.5, ease: "none" }, 0)
      .to(captions[0]!, { autoAlpha: 0, y: -24 }, 0.05)
      .to(layers[1]!, { clipPath: "inset(0 0% 0 0)", ease: "power2.inOut", duration: 1 }, 0.05)
      .to(captions[1]!, { autoAlpha: 1, y: 0 }, 0.45)
      .to(warm, { opacity: 0.35 }, 0.3)
      .to(bar, { scaleX: 1, ease: "none" }, 1.1)
      .to(captions[1]!, { autoAlpha: 0, y: -24 }, 1.15)
      .to(layers[2]!, { clipPath: "inset(0 0% 0 0)", ease: "power2.inOut", duration: 1 }, 1.15)
      .to(warm, { opacity: 0.6 }, 1.2)
      .to(captions[2]!, { autoAlpha: 1, y: 0 }, 1.6);
  });

  return (
    <section ref={ref} data-chrome="dark" className="relative bg-ink text-warm-white">
      <div data-pin className="relative h-screen overflow-hidden">
        {[empty, mid, final].map((src, i) => (
          <div key={i} data-layer className="absolute inset-0">
            <img
              src={src}
              alt={
                i === 0
                  ? "Empty concrete architectural shell with daylight"
                  : i === 1
                    ? "The same room mid-build with oak floors and material samples"
                    : "The finished interior at golden hour with brass pendants"
              }
              loading="lazy"
              width={1600}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        <div
          data-warm
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(15deg, color-mix(in oklab, var(--color-brass) 70%, transparent), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--color-ink) 70%, transparent), transparent 40%, color-mix(in oklab, var(--color-ink) 80%, transparent))",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1680px] flex-col justify-between px-6 py-24 md:px-12 md:py-28">
          <div>
            <p className="eyebrow text-brass">03 — The Transformation</p>
            <h2 className="display-lg mt-6 max-w-[18ch]">
              From Empty Space To <span className="italic">Timeless Living.</span>
            </h2>
          </div>

          <div className="relative h-44 md:h-40">
            {STAGES.map((s) => (
              <div key={s.key} data-caption className="absolute bottom-0 max-w-[40ch]">
                <p className="eyebrow text-brass">{s.n}</p>
                <h3 className="display-md mt-3">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed font-light text-warm-white/70">
                  {s.text}
                </p>
              </div>
            ))}
            <div className="absolute right-0 bottom-2 hidden w-56 md:block">
              <div className="h-px w-full bg-warm-white/20">
                <div data-progress className="h-px origin-left scale-x-0 bg-brass" />
              </div>
              <p className="eyebrow mt-3 text-right text-warm-white/40">Scroll to build</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
