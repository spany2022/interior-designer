import { useGsap } from "@/lib/motion";
import s1 from "@/assets/studio-1.jpg";
import s2 from "@/assets/studio-2.jpg";
import s3 from "@/assets/philosophy.jpg";

/** Section 08 — the human side: overlapping editorial frames with depth parallax. */
export function Studio() {
  const ref = useGsap<HTMLElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    root.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
      const d = Number(el.dataset["depth"]);
      gsap.fromTo(
        el,
        { yPercent: d * 20 },
        { yPercent: -d * 20, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(0 0 0 100%)" }, {
        clipPath: "inset(0 0 0 0%)", duration: 1.5, ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
  });

  return (
    <section ref={ref} id="studio" className="relative overflow-hidden bg-background py-28 md:py-44">
      <div className="mx-auto max-w-[1680px] px-6 md:px-12">
        <p className="eyebrow text-bronze">08 — Studio &amp; Craft</p>
        <h2 className="display-lg mt-6 max-w-[18ch]">
          Designed By People Who Care About <span className="italic">The Details.</span>
        </h2>

        <div className="relative mt-20 grid grid-cols-12 gap-4 md:mt-28">
          <div data-depth="0.2" className="col-span-12 md:col-span-6">
            <img data-reveal src={s1} alt="Designer sketching a floor plan beside material samples" loading="lazy" className="aspect-4/5 w-full object-cover" />
          </div>
          <div data-depth="-0.5" className="col-span-8 col-start-5 -mt-24 md:col-span-5 md:col-start-8 md:mt-40">
            <img data-reveal src={s2} alt="Moodboard of travertine, oak, linen, leather and brass" loading="lazy" className="aspect-7/5 w-full object-cover" />
            <p className="font-display mt-5 text-xl italic text-taupe">
              “We choose every stone in daylight. Never from a screen.”
            </p>
          </div>
          <div data-depth="0.6" className="col-span-5 col-start-2 -mt-10 md:col-span-3 md:col-start-5 md:-mt-48">
            <img data-reveal src={s3} alt="Lighting study of a quiet room corner" loading="lazy" className="aspect-3/4 w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
