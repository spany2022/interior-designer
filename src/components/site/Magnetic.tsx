import { useRef, type ReactNode, type ComponentPropsWithoutRef } from "react";

function useMagnet<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  };

  return { ref, onPointerMove: onMove, onPointerLeave: onLeave };
}

const base =
  "items-center justify-center transition-[transform,background-color,color] duration-500 ease-out will-change-transform";

export function MagneticLink({
  children,
  className = "",
  ...rest
}: { children: ReactNode } & ComponentPropsWithoutRef<"a">) {
  const magnet = useMagnet<HTMLAnchorElement>();
  return (
    <a {...rest} {...magnet} className={`${base} ${className}`}>
      {children}
    </a>
  );
}

export function MagneticButton({
  children,
  className = "",
  ...rest
}: { children: ReactNode } & ComponentPropsWithoutRef<"button">) {
  const magnet = useMagnet<HTMLButtonElement>();
  return (
    <button {...rest} {...magnet} className={`inline-flex ${base} ${className}`}>
      {children}
    </button>
  );
}
