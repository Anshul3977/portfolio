import type { ReactNode } from "react";

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-[14px] border border-line bg-[#110e0b]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
        <span>{label}</span>
        <span className="text-muted">schematic</span>
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
    </figure>
  );
}

export function PrepKitVisual() {
  const sections = ["Company brief", "Role breakdown", "Question bank", "Flashcards", "Schedule"];
  return (
    <Frame label="prep-kit · generated kit">
      <div className="absolute inset-0 grid grid-cols-[36%_1fr]">
        <ul className="space-y-1 border-r border-line p-3 text-[11px]">
          {sections.map((s, i) => (
            <li
              key={s}
              className={`flex items-center justify-between rounded px-2 py-1.5 ${i === 4 ? "bg-accent/15 text-foreground" : "text-muted"}`}
            >
              {s}
              {i === 2 && <span className="font-mono text-[9px] text-accent">↻</span>}
            </li>
          ))}
          <li className="mt-3 px-2 font-mono text-[9px] leading-4 text-muted">
            ↻ regenerate one section · your edits stay
          </li>
        </ul>
        <div className="flex flex-col gap-3 p-3 sm:p-4">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }, (_, d) => (
              <div key={d} className={`rounded border px-1 py-1.5 text-center font-mono text-[9px] ${d === 2 ? "border-accent text-accent-soft" : "border-line text-muted"}`}>
                D{d + 1}
              </div>
            ))}
          </div>
          {[
            ["System design", "w-[78%]"],
            ["Company product deep-dive", "w-[55%]"],
            ["Behavioral · STAR", "w-[40%]"],
          ].map(([t, wd]) => (
            <div key={t} className="rounded-md border border-line bg-[#16120e] p-2.5">
              <p className="text-[11px] text-foreground/85">{t}</p>
              <div className="mt-1.5 h-1 rounded bg-line">
                <div className={`h-1 rounded bg-accent/80 ${wd}`} />
              </div>
            </div>
          ))}
          <div className="mt-auto rounded-md border border-accent/30 bg-accent/5 p-2.5 text-[11px] text-foreground/80">
            <span className="font-mono text-[9px] tracking-wider text-accent uppercase">flashcard</span>
            <p className="mt-1">What does the team&apos;s public engineering blog say about how they deploy?</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}
