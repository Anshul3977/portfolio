"use client";
import { useEffect, useRef } from "react";
export function DemoVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !media.matches && !document.hidden)
        video.play().catch(() => {});
      else video.pause();
    };
    // Video posters fetch eagerly even with preload="none". Defer offscreen
    // previews so they do not compete with the hero's critical resources.
    const posterObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.poster = poster;
        posterObserver.disconnect();
      }
    }, { rootMargin: "300px" });
    posterObserver.observe(video);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        sync();
      },
      { threshold: [0.0, 0.5] },
    );
    observer.observe(video);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      posterObserver.disconnect();
      video.pause();
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [poster]);
  return (
    <video
      ref={ref}
      width="1280"
      height="720"
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
    >
      {src.endsWith(".webm") && <source src={src} type="video/webm" />}
      <source src={src.replace(/\.webm$/, ".mp4")} type="video/mp4" />
    </video>
  );
}
