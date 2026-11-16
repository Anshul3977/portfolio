"use client";

import { useEffect, useRef, useState } from "react";

/** Muted looping clip that only loads and plays while on screen. */
export function DemoVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(rm);
    if (rm) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") v.preload = "auto";
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="block aspect-video w-full bg-black object-cover"
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduce}
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
