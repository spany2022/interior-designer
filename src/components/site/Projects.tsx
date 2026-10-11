import { useGsap } from "@/lib/motion";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

const PROJECTS = [
  { t: "The Quiet Residence", loc: "Kyoto, Japan", type: "Private Residence", area: "320 m²", year: "2025", note: "A house that lowers its voice.", img: p1 },
  { t: "Casa Terra", loc: "Mallorca, Spain", type: "Villa", area: "540 m²", year: "2024", note: "Clay, arches and the long afternoon.", img: p2 },
  { t: "Urban Monolith", loc: "New York, USA", type: "Penthouse", area: "410 m²", year: "2024", note: "Stone as shelter above the city.", img: p3 },
  { t: "The Oak House", loc: "Copenhagen, Denmark", type: "Family Home", area: "280 m²", year: "2023", note: "One timber, a thousand textures.", img: p4 },
  { t: "Modern Heritage", loc: "Paris, France", type: "Apartment", area: "190 m²", year: "2023", note: "Respect the cornice. Rewrite the room.", img: p5 },
  { t: "The Minimal Villa", loc: "Milos, Greece", type: "Villa", area: "460 m²", year: "2022", note: "One window. The whole Aegean.", img: p6 },
];

/** Section 06 — pinned horizontal walk through six architectural worlds. */
export function Projects() {
  const ref = useGsap<HTMLElement>(({ gsap, root }) => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.querySelector<HTMLElement>("[data-track]")!;
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      root.querySelectorAll<HTMLElement>("[data-pimg]").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.2, xPercent: -6 },
          {
            scale: 1,
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement!,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    });
  });

  return (
    <section ref={ref} id="projects" className="relative overflow-hidden bg-background md:h-screen">
      <div
        data-track
        className="flex flex-col gap-20 px-6 py-28 md:h-full md:flex-row md:items-center md:gap-[6vw] md:px-[6vw] md:py-0"
      >
        <div className="shrink-0 md:w-[30vw]">
          <p className="eyebrow text-bronze">06 — Signature Projects</p>
          <h2 className="display-lg mt-6">
            Six Rooms. <span className="italic">Six Worlds.</span>
          </h2>
          <p className="body-lg mt-8 max-w-[34ch]">
            Walk through a selection of recent work — each a different answer to the same question:
            how should this place feel?
          </p>
        </div>

        {PROJECTS.map((p, i) => (
          <article key={p.t} className="shrink-0 md:w-[38vw]" data-cursor="OPEN">
            <div className="relative aspect-4/5 overflow-hidden md:h-[68vh] md:aspect-auto">
              <img
                data-pimg
                src={p.img}
                alt={`${p.t} — ${p.type} in ${p.loc}`}
                loading="lazy"
                width={1200}
                height={1504}
                className="h-full w-full object-cover will-change-transform"
              />
              <span className="font-display absolute top-5 left-5 text-warm-white/80">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <h3 className="display-md">{p.t}</h3>
                <p className="font-display mt-2 text-lg italic text-taupe">{p.note}</p>
              </div>
              <dl className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-1 text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
                <dt>Loc</dt><dd className="text-foreground">{p.loc}</dd>
                <dt>Type</dt><dd className="text-foreground">{p.type}</dd>
                <dt>Area</dt><dd className="text-foreground">{p.area}</dd>
                <dt>Year</dt><dd className="text-foreground">{p.year}</dd>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
