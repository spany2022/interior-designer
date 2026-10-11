import { MagneticLink } from "./Magnetic";

/** Section 12 — the final room. */
export function Footer() {
  return (
    <footer data-chrome="dark" className="bg-ink text-warm-white">
      <div className="mx-auto max-w-[1680px] border-t border-warm-white/10 px-6 pt-28 pb-10 md:px-12">
        <h2 className="display-xl">
          Your Space.<br />Your Story.<br /><span className="italic text-brass">Beautifully Designed.</span>
        </h2>

        <div className="mt-20 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <MagneticLink href="#consultation" data-cursor="START"
              className="inline-flex border border-brass px-10 py-5 text-[0.7rem] tracking-[0.22em] text-brass uppercase hover:bg-brass hover:text-ink">
              Start Your Project
            </MagneticLink>
          </div>
          <nav aria-label="Footer" className="md:col-span-2">
            <ul className="space-y-3 text-sm font-light text-warm-white/70">
              {[["Studio", "#studio"], ["Projects", "#projects"], ["Services", "#services"], ["Journal", "#journal"], ["Contact", "#consultation"]].map(([l, h]) => (
                <li key={l}><a href={h} className="link-underline">{l}</a></li>
              ))}
            </ul>
          </nav>
          <address className="space-y-3 text-sm font-light not-italic text-warm-white/70 md:col-span-3">
            <p>Via della Spiga 14<br />20121 Milano, Italy</p>
            <p><a href="mailto:studio@atelierterra.com" className="link-underline">studio@atelierterra.com</a></p>
            <p><a href="tel:+390200000000" className="link-underline">+39 02 0000 0000</a></p>
          </address>
          <ul className="space-y-3 text-sm font-light text-warm-white/70 md:col-span-3">
            {["Instagram", "Pinterest", "LinkedIn", "Behance"].map((s) => (
              <li key={s}><a href="#top" className="link-underline">{s} ↗</a></li>
            ))}
          </ul>
        </div>

        <div className="mt-24 flex flex-col justify-between gap-4 border-t border-warm-white/10 pt-6 text-[0.65rem] tracking-[0.18em] text-warm-white/40 uppercase md:flex-row">
          <span>© 2026 Atelier Terra Interiors</span>
          <span>Space · Light · Material · Craft</span>
        </div>
      </div>
    </footer>
  );
}
