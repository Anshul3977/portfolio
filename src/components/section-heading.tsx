import type { ReactNode } from "react";
import { BlurFade } from "@/components/blur-fade";

export function SectionHeading({
  id,
  index,
  kicker,
  children,
  aside,
}: {
  id: string;
  index: string;
  kicker: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <BlurFade>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">{index}</span>
            <span className="h-px w-8 bg-line" aria-hidden="true" />
            {kicker}
          </p>
          <h2 id={id} className="mt-5 max-w-4xl font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-tight">
            {children}
          </h2>
        </div>
        {aside}
      </div>
    </BlurFade>
  );
}
