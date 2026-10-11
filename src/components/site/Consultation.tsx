import { useState, type FormEvent } from "react";
import { MagneticButton } from "./Magnetic";

const field =
  "peer w-full border-0 border-b border-warm-white/25 bg-transparent pt-6 pb-3 text-base font-light text-warm-white outline-none transition-colors duration-500 placeholder:text-transparent focus:border-brass";
const label =
  "pointer-events-none absolute top-6 left-0 text-[0.7rem] tracking-[0.18em] text-warm-white/50 uppercase transition-all duration-500 peer-focus:top-0 peer-focus:text-brass peer-[:not(:placeholder-shown)]:top-0";

function Field({ name, text, type = "text", required }: { name: string; text: string; type?: string; required?: boolean }) {
  return (
    <div className="relative">
      <input id={name} name={name} type={type} required={required} placeholder={text} className={field} />
      <label htmlFor={name} className={label}>{text}</label>
    </div>
  );
}

/** Section 11 — consultation as a quiet conversation, not a form. */
export function Consultation() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="consultation" data-chrome="dark" className="relative overflow-hidden bg-ink py-28 text-warm-white md:py-40">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 h-[50rem] w-[50rem] rounded-full opacity-25 blur-3xl animate-pulse"
        style={{ background: "radial-gradient(circle, var(--color-brass), transparent 65%)", animationDuration: "7s" }} />

      <div className="relative mx-auto grid max-w-[1680px] gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-brass">11 — Begin</p>
          <h2 className="display-lg mt-6">Let&rsquo;s Create A Space Worth Coming <span className="italic">Home To.</span></h2>
          <p className="mt-8 max-w-[40ch] text-base leading-relaxed font-light text-warm-white/65">
            Tell us about your space, your lifestyle and what you imagine for it. We&rsquo;ll take it from there.
          </p>
          <a href="mailto:studio@atelierterra.com?subject=Consultation" className="link-underline mt-10 inline-block text-[0.7rem] tracking-[0.22em] text-brass uppercase">
            Book A Consultation ↗
          </a>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {sent ? (
            <div className="flex h-full flex-col justify-center animate-fade-in">
              <p className="eyebrow text-brass">Received</p>
              <p className="display-md mt-5">Thank you. A designer will be in touch within two working days.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-10 md:grid-cols-2">
              <Field name="name" text="Name" required />
              <Field name="email" text="Email" type="email" required />
              <Field name="phone" text="Phone" type="tel" />
              <Field name="location" text="Location" />
              <div className="relative">
                <select name="type" defaultValue="" className={`${field} appearance-none [&>option]:bg-ink`} aria-label="Project type">
                  <option value="" disabled>Project type</option>
                  {["Residential", "Villa", "Apartment", "Commercial", "Hospitality", "Turnkey"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <Field name="area" text="Approximate area (m²)" />
              <div className="relative md:col-span-2">
                <select name="budget" defaultValue="" className={`${field} appearance-none [&>option]:bg-ink`} aria-label="Budget range">
                  <option value="" disabled>Budget range</option>
                  {["Under €100k", "€100k – €250k", "€250k – €500k", "€500k +"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="relative md:col-span-2">
                <textarea id="desc" name="desc" rows={3} placeholder="Project description" className={`${field} resize-none`} />
                <label htmlFor="desc" className={label}>Project description</label>
              </div>
              <div className="md:col-span-2">
                <MagneticButton type="submit" data-cursor="START"
                  className="bg-brass px-10 py-5 text-[0.7rem] tracking-[0.22em] text-ink uppercase hover:bg-warm-white">
                  Start Your Project
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
