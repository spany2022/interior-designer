import { useState } from "react";
import { useGsap } from "@/lib/motion";
import residential from "@/assets/transform-final.jpg";
import villa from "@/assets/svc-villa.jpg";
import apartment from "@/assets/project-1.jpg";
import commercial from "@/assets/svc-commercial.jpg";
import hospitality from "@/assets/svc-hospitality.jpg";
import turnkey from "@/assets/project-4.jpg";

const SERVICES = [
  { n: "01", t: "Residential Interiors", d: "Warm, personal homes shaped around daily rituals.", img: residential },
  { n: "02", t: "Luxury Villas", d: "Monumental volumes, calm proportion, landscape as backdrop.", img: villa },
  { n: "03", t: "Apartment Interiors", d: "Quiet urban sanctuaries where every centimetre is considered.", img: apartment },
  { n: "04", t: "Commercial Spaces", d: "Workplaces with the composure of a private residence.", img: commercial },
  { n: "05", t: "Hospitality Interiors", d: "Hotels and restaurants designed as lasting memories.", img: hospitality },
  { n: "06", t: "Turnkey Solutions", d: "From first sketch to the last cushion — one studio, one vision.", img: turnkey },
];

/** Section 04 — each service is a room; the background environment changes as you pass through. */
export function Services() {
  const [active, setActive] = useState(0);

  const ref = useGsap<HTMLElement>(({ ScrollTrigger, root }) => {
    root.querySelectorAll<HTMLElement>("[data-service]").forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(i),
      });
    });
  });

  return (
    <section ref={ref} id="services" data-chrome="dark" className="relative bg-ink text-warm-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {SERVICES.map((s, i) => (
          <img
            key={s.n}
            src={s.img}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-out"
            style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(1.08)" }}
          />
        ))}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--color-ink) 88%, transparent) 0%, color-mix(in oklab, var(--color-ink) 45%, transparent) 55%, transparent)",
          }}
        />
        <div className="absolute top-24 left-6 md:top-28 md:left-12">
          <p className="eyebrow text-brass">04 — Services</p>
        </div>
        <div className="absolute right-6 bottom-10 font-display text-[22vw] leading-none text-warm-white/10 md:right-12 md:text-[14vw]">
          {SERVICES[active]?.n}
        </div>
      </div>

      <div className="relative z-10 -mt-[100vh] mx-auto max-w-[1680px] px-6 md:px-12">
        {SERVICES.map((s, i) => (
          <div key={s.n} data-service className="flex min-h-[80vh] items-center">
            <div
              className="max-w-[34ch] transition-opacity duration-700"
              style={{ opacity: active === i ? 1 : 0.25 }}
            >
              <p className="eyebrow text-brass">{s.n}</p>
              <h3 className="display-lg mt-5">{s.t}</h3>
              <p className="mt-6 text-base leading-relaxed font-light text-warm-white/70">{s.d}</p>
            </div>
          </div>
        ))}
        <div className="h-[20vh]" />
      </div>
    </section>
  );
}
