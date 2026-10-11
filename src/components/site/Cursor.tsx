import { useEffect, useRef, useState } from "react";

/**
 * Minimal architectural cursor: a small dot that expands into a labelled disc
 * over elements carrying data-cursor="LABEL". Pointer-fine devices only.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setActive(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden items-center justify-center rounded-full border border-brass text-[9px] tracking-[0.28em] text-warm-white mix-blend-difference transition-[width,height,background-color] duration-500 ease-out md:flex"
      style={{
        width: label ? 88 : 8,
        height: label ? 88 : 8,
        backgroundColor: label ? "transparent" : "var(--color-brass)",
      }}
    >
      {label}
    </div>
  );
}
