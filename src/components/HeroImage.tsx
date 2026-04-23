"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Hero image wrapper with gentle scroll parallax.
 * Uses rAF + translate3d for GPU-composited motion.
 * Respects prefers-reduced-motion.
 */
export default function HeroImage() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        // Dampen — ~10% of scroll distance, capped so it doesn't drift forever.
        const offset = Math.max(-40, Math.min(40, y * 0.08));
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden shadow-2xl relative z-10 will-change-transform"
    >
      <Image
        src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80"
        alt="Moderni auto za obuku vozača autoškole Pilot"
        width={1200}
        height={800}
        priority
        className="w-full h-[500px] object-cover"
      />
    </div>
  );
}
