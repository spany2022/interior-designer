import j1 from "@/assets/studio-2.jpg";
import j2 from "@/assets/svc-hospitality.jpg";
import j3 from "@/assets/project-5.jpg";

const TOPICS = ["Interior Trends", "Material Stories", "Lighting Design", "Small Space Design", "Luxury Living", "Architectural Details", "Behind The Project"];

/** Section 10 — magazine-style asymmetric journal. */
export function Journal() {
  return (
    <section id="journal" className="bg-warm-white py-28 md:py-40">
      <div className="mx-auto max-w-[1680px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-bronze">10 — Journal</p>
            <h2 className="display-lg mt-6">Notes on <span className="italic">Living Well.</span></h2>
          </div>
          <ul className="flex max-w-[42ch] flex-wrap gap-x-5 gap-y-2 text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
            {TOPICS.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <a href="#journal" data-cursor="READ" className="group md:col-span-7">
            <div className="overflow-hidden">
              <img src={j1} alt="Material samples arranged for a project" loading="lazy" className="aspect-7/5 w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
            </div>
            <p className="eyebrow mt-6 text-bronze">Material Stories · 8 min</p>
            <h3 className="display-md mt-3 max-w-[24ch]">Why travertine is having its quiet renaissance</h3>
          </a>
          <div className="flex flex-col gap-10 md:col-span-4 md:col-start-9 md:pt-24">
            {[
              { img: j2, tag: "Lighting Design · 6 min", t: "Designing for the hour after sunset" },
              { img: j3, tag: "Behind The Project · 5 min", t: "Modern Heritage: keeping the cornice" },
            ].map((a) => (
              <a key={a.t} href="#journal" data-cursor="READ" className="group">
                <div className="overflow-hidden">
                  <img src={a.img} alt="" loading="lazy" className="aspect-4/3 w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                </div>
                <p className="eyebrow mt-5 text-bronze">{a.tag}</p>
                <h3 className="mt-2 text-2xl">{a.t}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
