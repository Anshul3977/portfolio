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

function Det({ x, y, w, h, label, soft }: { x: number; y: number; w: number; h: number; label: string; soft?: boolean }) {
  return (
    <div
      className={`brackets absolute ${soft ? "[--c:var(--accent-soft)]" : ""}`}
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
    >
      <span className="absolute -top-[18px] left-0 whitespace-nowrap bg-accent px-1.5 py-0.5 font-mono text-[9.5px] leading-none text-[#1a1208]">
        {label}
      </span>
      <span className="absolute inset-0 border border-accent/25" />
    </div>
  );
}

export function FireVisual() {
  const rows = [
    { k: "precision", v: 92.5 },
    { k: "recall", v: 89.2 },
    { k: "mAP@50", v: 94.5 },
  ];
  return (
    <Frame label="fire-vision · detect + spread">
      <div className="absolute inset-0 bg-[radial-gradient(40%_45%_at_32%_62%,#7a3511_0%,#3a1a0b_45%,transparent_75%),radial-gradient(35%_35%_at_62%_30%,#3b3632_0%,transparent_70%),linear-gradient(180deg,#14110e,#0c0a08)]" />
      <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(0deg,transparent_0_3px,rgba(0,0,0,.35)_3px_4px)]" />
      <Det x={18} y={44} w={30} h={34} label="fire 0.93" />
      <Det x={50} y={16} w={26} h={26} label="smoke 0.88" soft />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 62.5" preserveAspectRatio="none" aria-hidden="true">
        <path d="M33 60 C 40 50, 52 44, 70 38" stroke="#e2b075" strokeWidth="0.4" strokeDasharray="1.2 1" fill="none" />
        <path d="M68 36.5 l2 1.5 l-2.4 0.6" stroke="#e2b075" strokeWidth="0.4" fill="none" />
      </svg>
      <span className="absolute right-[6%] top-[52%] font-mono text-[10px] text-accent-soft">spread → NE</span>
      <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-px border-t border-line bg-line">
        {rows.map((r) => (
          <div key={r.k} className="bg-[#110e0b]/95 px-3 py-2.5">
            <p className="font-mono text-[9.5px] tracking-wider text-muted uppercase">{r.k}</p>
            <p className="font-serif text-2xl leading-tight text-foreground">{r.v}%</p>
            <div className="mt-1 h-1 rounded bg-line">
              <div className="h-1 rounded bg-accent" style={{ width: `${r.v}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function VoiceVisual() {
  const bars = Array.from({ length: 36 }, (_, i) => 18 + Math.round(Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)) * 70));
  const node = "rounded-md border border-line bg-[#16120e] px-2 py-1.5 font-mono text-[10px] text-foreground/85";
  return (
    <Frame label="voice-rag · retrieval path">
      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
        <div className="flex h-12 items-center gap-[3px]" aria-hidden="true">
          {bars.map((b, i) => (
            <span key={i} className="w-full rounded-full bg-accent/70" style={{ height: `${b}%` }} />
          ))}
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-center">
          <span className={node}>STT</span>
          <div className="grid gap-1.5">
            {["fixed", "semantic", "metadata-aware"].map((c) => (
              <div key={c} className="flex items-center gap-2">
                <span className="h-px flex-1 bg-line" />
                <span className={`${node} min-w-28`}>{c} → FAISS</span>
                <span className="h-px flex-1 bg-line" />
              </div>
            ))}
          </div>
          <span className={node}>merge</span>
        </div>
        <div className="rounded-md border border-line bg-[#16120e] p-3 text-left text-[11.5px] leading-5 text-foreground/80">
          <span className="font-mono text-[9.5px] tracking-wider text-accent uppercase">answer · guarded</span>
          <p className="mt-1">
            The passage says the ferry runs every 30 minutes <span className="text-accent-soft">[c12]</span> and stops at
            midnight <span className="text-accent-soft">[c47]</span>.
          </p>
        </div>
        <div>
          <div className="flex justify-between font-mono text-[9.5px] text-muted">
            <span>embed + search + guardrails</span>
            <span>budget &lt; 200 ms</span>
          </div>
          <div className="mt-1 h-1.5 rounded bg-line">
            <div className="h-1.5 w-[62%] rounded bg-linear-to-r from-accent to-accent-soft" />
          </div>
        </div>
      </div>
    </Frame>
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
