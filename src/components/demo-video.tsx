"use client";

import { useEffect, useRef, useState } from "react";

/** Muted looping clip. The file is requested only once the frame is near the viewport. */
export function DemoVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(rm);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
        else if (!rm) v.pause();
      },
      { rootMargin: "250px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !near || reduce) return;
    v.play().catch(() => {});
  }, [near, reduce]);

  return (
    <video
      ref={ref}
      className="block aspect-video w-full bg-black object-cover"
      poster={near ? poster : undefined}
      muted
      loop
      playsInline
      preload="none"
      controls={reduce}
      aria-label={alt}
    >
      {near ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
