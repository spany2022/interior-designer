import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Architectural loader: blueprint lines draw a room plan, light floods in,
 * panels part to reveal the site. Short by design.
 */
export function Loader() {
  const [phase, setPhase] = useState<"draw" | "open" | "done">("draw");

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase("done");
      return;
    }
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("open"), 1700);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div aria-hidden className="fixed inset-0 z-[100] flex">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="relative h-full w-1/2 bg-ink transition-transform duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            transform:
              phase === "open" ? `translateX(${i === 0 ? "-101%" : "101%"})` : "translateX(0)",
          }}
        />
      ))}

      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-500"
        style={{ opacity: phase === "open" ? 0 : 1 }}
      >
        <svg width="160" height="120" viewBox="0 0 160 120" fill="none" className="text-brass">
          <g
            stroke="currentColor"
            strokeWidth="0.75"
            style={{
              strokeDasharray: 620,
              strokeDashoffset: 620,
              animation: "terra-draw 1.5s cubic-bezier(0.22,1,0.36,1) forwards",
            }}
          >
            <rect x="8" y="8" width="144" height="104" />
            <path d="M8 76h58M66 76V8M66 44h86" />
            <rect x="86" y="58" width="44" height="30" />
            <circle cx="30" cy="34" r="10" />
          </g>
        </svg>
        <span className="eyebrow text-taupe">Atelier Terra</span>
      </div>

      <style>{`@keyframes terra-draw { to { stroke-dashoffset: 0; } }`}</style>
    </div>
  );
}
