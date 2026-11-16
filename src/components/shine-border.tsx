import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ShineBorder({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-xl", className)}>
      {/* reduced motion stops the spin in globals.css */}
      <div aria-hidden="true" className="shine-border pointer-events-none absolute -inset-px rounded-[13px]" />
      <div className="relative overflow-hidden rounded-[12px] bg-elevated">{children}</div>
    </div>
  );
}
