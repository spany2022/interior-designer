import { useGsap } from "@/lib/motion";
import stone from "@/assets/mat-stone.jpg";
import oak from "@/assets/mat-oak.jpg";
import linen from "@/assets/mat-linen.jpg";
import brass from "@/assets/mat-brass.jpg";
import counter from "@/assets/svc-commercial.jpg";
import panel from "@/assets/project-4.jpg";
import curtain from "@/assets/project-1.jpg";
import lamp from "@/assets/transform-final.jpg";

const MATERIALS = [
  { name: "Travertine", becomes: "Becomes a countertop", tex: stone, room: counter },
  { name: "Oak", becomes: "Becomes a wall panel", tex: oak, room: panel },
  { name: "Linen", becomes: "Becomes a curtain", tex: linen, room: curtain },
  { name: "Brass", becomes: "Becomes a pendant", tex: brass, room: lamp },
];

/** Section 05 — tactile materials drift horizontally; hover reveals the room each becomes. */
export function Materials() {
  const ref = useGsap<HTMLElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    gsap.fromTo(
      root.querySelector("[data-track]"),
      { xPercent: 6 },
      {
        xPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  return (
    <section ref={ref} className="relative overflow-hidden bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-[1680px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-bronze">05 — Material Story</p>
            <h2 className="display-lg mt-6 max-w-[14ch]">
              Every Material Has A <span className="italic">Story.</span>
            </h2>
          </div>
          <p className="body-lg max-w-[38ch]">
            Stone, wood, marble, concrete, linen, glass, metal, leather — chosen by hand, in
            daylight, for how they age.
          </p>
        </div>
      </div>

      <div data-track className="mt-20 flex gap-6 px-6 will-change-transform md:gap-10 md:px-12">
        {MATERIALS.map((m) => (
          <figure
            key={m.name}
            data-cursor="EXPLORE"
            className="group relative aspect-3/4 w-[72vw] shrink-0 overflow-hidden md:w-[26vw]"
          >
            <img
              src={m.tex}
              alt={`${m.name} texture`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
            />
            <img
              src={m.room}
              alt={`${m.name} used in a finished interior`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-warm-white">
              <span className="display-md">{m.name}</span>
              <span className="eyebrow translate-y-2 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                {m.becomes}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
