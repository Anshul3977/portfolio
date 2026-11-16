"use client";

import { useEffect, useRef } from "react";

export function CountUp({
  to,
  from = 0,
  decimals = 0,
  duration = 1.6,
  className,
}: {
  to: number;
  from?: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / (duration * 1000));
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = (from + (to - from) * eased).toFixed(decimals);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, from, decimals, duration]);

  // SSR renders the final value so it is correct without JS
  return (
    <span ref={ref} className={className}>
      {to.toFixed(decimals)}
    </span>
  );
}
