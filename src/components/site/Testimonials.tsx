import { useState } from "react";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p6 from "@/assets/project-6.jpg";

const QUOTES = [
  { q: "They listened to how we live before they drew a single line. The house finally feels like ours.", n: "Elena & Marc Duval", p: "Casa Terra", l: "Mallorca", img: p2 },
  { q: "Every evening the light does something new in that kitchen. It is quietly extraordinary.", n: "Jonathan Reyes", p: "Urban Monolith", l: "New York", img: p3 },
  { q: "Restraint is the hardest thing to design. Atelier Terra made it look effortless.", n: "Sofia Karras", p: "The Minimal Villa", l: "Milos", img: p6 },
];

/** Section 09 — editorial quotes paired with their rooms. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const cur = QUOTES[i]!;

  return (
    <section data-chrome="dark" className="relative bg-charcoal py-28 text-warm-white md:py-40">
      <div className="mx-auto grid max-w-[1680px] items-center gap-14 px-6 md:grid-cols-12 md:px-12">
        <div className="relative aspect-4/5 overflow-hidden md:col-span-4">
          {QUOTES.map((x, k) => (
            <img key={x.n} src={x.img} alt={`${x.p}, ${x.l}`} loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms]"
              style={{ opacity: k === i ? 1 : 0, transform: k === i ? "scale(1)" : "scale(1.06)" }} />
          ))}
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <p className="eyebrow text-brass">09 — Voices</p>
          <p className="font-display mt-6 text-2xl italic text-taupe md:text-3xl">
            Beautiful spaces don&rsquo;t just look good. They feel right.
          </p>
          <blockquote key={i} className="display-md mt-12 animate-fade-in">
            “{cur.q}”
          </blockquote>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-warm-white/15 pt-6">
            <div>
              <p className="text-sm tracking-[0.14em] uppercase">{cur.n}</p>
              <p className="mt-1 text-xs tracking-[0.14em] text-warm-white/50 uppercase">{cur.p} · {cur.l}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-display text-lg text-warm-white/60">
                {String(i + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
              </span>
              <button type="button" aria-label="Previous testimonial" onClick={() => setI((i - 1 + QUOTES.length) % QUOTES.length)}
                className="h-12 w-12 border border-warm-white/30 transition-colors hover:border-brass hover:text-brass">←</button>
              <button type="button" aria-label="Next testimonial" onClick={() => setI((i + 1) % QUOTES.length)}
                className="h-12 w-12 border border-warm-white/30 transition-colors hover:border-brass hover:text-brass">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
