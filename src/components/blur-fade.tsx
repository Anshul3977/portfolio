import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-driven reveal in pure CSS (animation-timeline: view()).
 * Browsers without support, and reduced-motion users, just see the content.
 */
export function BlurFade({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <div className={cn("reveal", className)} style={{ "--reveal-shift": `${Math.round(delay * 100)}%` } as CSSProperties}>
      {children}
    </div>
  );
}
