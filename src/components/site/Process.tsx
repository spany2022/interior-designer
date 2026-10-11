import { useGsap } from "@/lib/motion";

const STEPS = [
  ["Discover", "Understanding the client, lifestyle, space and requirements."],
  ["Concept", "Developing the design language and spatial direction."],
  ["Material", "Selecting textures, finishes, furniture and lighting."],
  ["Develop", "Turning concepts into detailed architectural solutions."],
  ["Build", "Executing every detail with precision."],
  ["Reveal", "Delivering the finished space."],
];

/** Section 07 — a corridor of blueprint lines; each step arrives as you walk forward. */
export function Process() {
  const ref = useGsap<HTMLElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    gsap.fromTo(
      root.querySelector("[data-line]"),
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: root.querySelector("[data-steps]"), start: "top 60%", end: "bottom 60%", scrub: true },
      },
    );
    root.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => {
      gsap.from(el, {
        opacity: 0.12,
        x: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none reverse" },
      });
    });
  });

  return (
    <section ref={ref} id="process" className="relative bg-warm-white py-28 md:py-40">
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full text-stone" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0H0V80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />
      </svg>

      <div className="relative mx-auto grid max-w-[1680px] gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="md:sticky md:top-32 md:col-span-5 md:self-start">
          <p className="eyebrow text-bronze">07 — Process</p>
          <h2 className="display-lg mt-6">
            From First Conversation To <span className="italic">Final Detail.</span>
          </h2>
        </div>

        <ol data-steps className="relative md:col-span-6 md:col-start-7">
          <span aria-hidden className="absolute top-0 left-0 h-full w-px bg-border" />
          <span aria-hidden data-line className="absolute top-0 left-0 h-full w-px origin-top bg-brass" />
          {STEPS.map(([t, d], i) => (
            <li key={t} data-step className="relative py-12 pl-10 md:pl-16">
              <span className="absolute top-[3.6rem] -left-[3px] h-[7px] w-[7px] rotate-45 bg-brass" />
              <p className="eyebrow text-bronze">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display-md mt-3">{t}</h3>
              <p className="body-lg mt-3 max-w-[40ch]">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
