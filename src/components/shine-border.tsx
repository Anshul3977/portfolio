"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

export function ShineBorder({ children, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative rounded-xl", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-px rounded-[13px]",
          reduce ? "ring-1 ring-accent/50" : "shine-border",
        )}
      />
      <div className="relative overflow-hidden rounded-[12px] bg-elevated">
        {children}
      </div>
    </div>
  );
}
