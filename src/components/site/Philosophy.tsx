import { useGsap } from "@/lib/motion";
import philosophyImg from "@/assets/philosophy.jpg";

/** Section 02 — design manifesto, editorial split with a masked image reveal. */
export function Philosophy() {
  const ref = useGsap<HTMLElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    const frame = root.querySelector<HTMLElement>("[data-frame]")!;
    const img = root.querySelector<HTMLElement>("[data-frame] img")!;

    gsap.fromTo(
      frame,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        ease: "power3.inOut",
        duration: 1.6,
        scrollTrigger: { trigger: frame, start: "top 85%" },
      },
    );
    gsap.fromTo(
      img,
      { scale: 1.28 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    gsap.from(root.querySelectorAll("[data-stagger] > *"), {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: root, start: "top 65%" },
    });
  });

  return (
    <section ref={ref} id="philosophy" className="relative bg-background py-28 md:py-40">
      <div className="mx-auto grid max-w-[1680px] items-center gap-14 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5 md:col-start-1">
          <div data-frame className="overflow-hidden">
            <img
              src={philosophyImg}
              alt="Travertine side table and ceramic vessel against a sunlit plaster wall"
              loading="lazy"
              width={1024}
              height={1344}
              className="aspect-3/4 w-full object-cover will-change-transform"
            />
          </div>
          <p className="font-display mt-5 text-lg italic text-taupe">
            — light is the first material
          </p>
        </div>

        <div data-stagger className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-brass">02 — Philosophy</p>
          <h2 className="display-lg mt-8 max-w-[22ch]">
            We Don&rsquo;t Decorate Spaces. We Shape <span className="italic">Experiences.</span>
          </h2>
          <div className="mt-10 max-w-[52ch] space-y-6">
            <p className="body-lg">
              Every space begins with understanding how it should feel — the hour the sun reaches
              the floor, the way a room holds a conversation, the weight of a door in the hand.
            </p>
            <p className="body-lg">
              We combine architecture, material, light and functionality to create interiors that
              are deeply personal and intentionally timeless.
            </p>
          </div>
          <dl className="mt-14 grid grid-cols-3 gap-8 border-t border-border pt-8">
            {[
              ["17", "Years of practice"],
              ["140+", "Spaces delivered"],
              ["9", "Countries"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-4xl md:text-5xl">{n}</dt>
                <dd className="mt-2 text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
