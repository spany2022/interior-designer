import { useEffect, useState } from "react";
import { MagneticLink } from "./Magnetic";

const LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Process", href: "#process" },
  { label: "Journal", href: "#journal" },
];

export function Nav() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 80);
      const mid = document.elementsFromPoint(24, 40).find((n) => !n.closest("header"));
      setDark(!!mid?.closest("[data-chrome='dark']"));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          compact ? "py-4 backdrop-blur-[2px]" : "py-7"
        } ${dark && !open ? "text-warm-white" : "text-foreground"}`}
        style={{
          backgroundColor: compact
            ? dark
              ? "color-mix(in oklab, var(--color-ink) 62%, transparent)"
              : "color-mix(in oklab, var(--color-background) 72%, transparent)"
            : "transparent",
        }}
      >
        <div className="mx-auto flex max-w-[1680px] items-center justify-between px-6 md:px-12">
          <a href="#top" className="flex flex-col leading-none" aria-label="Atelier Terra, home">
            <span className="font-display text-xl tracking-[0.18em] md:text-2xl">ATELIER</span>
            <span className="eyebrow mt-1 text-brass">Terra · Interiors</span>
          </a>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Main">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-underline text-[0.8rem] font-light tracking-[0.14em] uppercase"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <MagneticLink
              href="#consultation"
              className="hidden border border-current px-6 py-3 text-[0.7rem] tracking-[0.22em] uppercase md:inline-flex"
              data-cursor="START"
            >
              Start a Project
            </MagneticLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu — architectural panels parting */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: open ? "translateY(0)" : "translateY(-100%)" }}
        />
        <nav
          className="relative flex h-full flex-col justify-center gap-2 px-8 text-warm-white transition-opacity duration-500"
          style={{ opacity: open ? 1 : 0 }}
          aria-label="Mobile"
        >
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display-md border-b border-warm-white/10 py-4"
            >
              <span className="eyebrow mr-5 align-middle text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              {l.label}
            </a>
          ))}
          <a
            href="#consultation"
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex w-fit border border-brass px-8 py-4 text-[0.7rem] tracking-[0.22em] text-brass uppercase"
          >
            Start a Project
          </a>
        </nav>
      </div>
    </>
  );
}
