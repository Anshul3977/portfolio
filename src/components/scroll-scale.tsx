import type { ReactNode } from "react";

export function ScrollScale({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} style={{ perspective: 1200 }}>
      <div className="scroll-tilt origin-bottom">{children}</div>
    </div>
  );
}
