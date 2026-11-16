"use client";

import { useEffect, useRef, useState } from "react";

type Stage = "decode" | "detect" | "track" | "write";

const STAGES: { key: Stage; label: string; color: string }[] = [
  { key: "decode", label: "Decode", color: "#5b4a38" },
  { key: "detect", label: "Detect · YOLO", color: "#d08a3c" },
  { key: "track", label: "Track · ByteTrack", color: "#e2b075" },
  { key: "write", label: "Write · Milvus / DB", color: "#8a8073" },
];

// Schematic durations in minutes (not a real trace).
const SEQ = { decode: 3, detect: 9.5, track: 4.5, write: 2 }; // ×4 clips = 76
const PAR = { decode: 0.9, detect: 2.4, track: 1.2, write: 0.5 }; // overlapped → 6
const CLIPS = 4;
const LANE_H = 30;
const LANE_GAP = 8;

type Block = { id: string; clip: number; stage: Stage; start: number; dur: number };

function sequential(): Block[] {
  const out: Block[] = [];
  let t = 0;
  for (let c = 0; c < CLIPS; c++) {
    for (const s of STAGES) {
      out.push({ id: `${c}-${s.key}`, clip: 0, stage: s.key, start: t, dur: SEQ[s.key] });
      t += SEQ[s.key];
    }
  }
  return out;
}

function overlapped(): Block[] {
  const out: Block[] = [];
  for (let c = 0; c < CLIPS; c++) {
    let t = c * 0.333;
    for (const s of STAGES) {
      out.push({ id: `${c}-${s.key}`, clip: c, stage: s.key, start: t, dur: PAR[s.key] });
      t += PAR[s.key];
    }
  }
  return out;
}

const color = Object.fromEntries(STAGES.map((s) => [s.key, s.color])) as Record<Stage, string>;

export function PipelineChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "-120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const [mode, setMode] = useState<"before" | "after">("before");
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const a = setTimeout(() => setMode("after"), reduce ? 0 : 1100);
    return () => clearTimeout(a);
  }, [inView, reduce]);

  useEffect(() => {
    if (mode !== "after") return;
    const z = setTimeout(() => setZoom(true), reduce ? 0 : 1100);
    return () => clearTimeout(z);
  }, [mode, reduce]);

  const blocks = mode === "before" ? sequential() : overlapped();
  const axisMax = mode === "after" && zoom ? 6 : 76;
  const ticks = axisMax === 76 ? [0, 19, 38, 57, 76] : [0, 1.5, 3, 4.5, 6];

  return (
    <div ref={ref} className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Video processing · end to end</p>
          <p className="mt-2 font-serif text-5xl leading-none tracking-tight sm:text-6xl" aria-live="polite">
            <span className={mode === "before" ? "text-foreground" : "text-muted line-through decoration-1"}>76</span>
            <span className="mx-2 text-muted">→</span>
            <span className={mode === "after" ? "text-accent-soft" : "text-muted"}>6</span>
            <span className="ml-2 text-xl text-muted">min</span>
          </p>
        </div>
        <div role="group" aria-label="Pipeline mode" className="flex rounded-full border border-line p-1 font-mono text-[11px]">
          {(["before", "after"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => {
                setZoom(false);
                setMode(m);
              }}
              className={`rounded-full px-3 py-1.5 tracking-wider uppercase transition-colors ${
                mode === m ? "bg-accent text-[#1a1208]" : "text-muted hover:text-foreground"
              }`}
            >
              {m === "before" ? "Sequential" : "GPU + overlap"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between font-mono text-[10px] text-muted">
          <span>{mode === "before" ? "1 worker, one stage at a time" : "parallel GPU streams, stages overlap"}</span>
          <span>{axisMax === 6 && mode === "after" ? "zoomed ×12.7" : ""}</span>
        </div>
        <div
          className="relative overflow-hidden rounded-md border border-line bg-background/60"
          style={{ height: CLIPS * (LANE_H + LANE_GAP) + LANE_GAP }}
          role="img"
          aria-label={
            mode === "before"
              ? "Schematic: four clips processed one stage at a time, about 76 minutes total."
              : "Schematic: four clips processed on parallel GPU streams with overlapping stages, about 6 minutes total."
          }
        >
          {[0.25, 0.5, 0.75].map((f) => (
            <span key={f} className="absolute inset-y-0 w-px bg-line/70" style={{ left: `${f * 100}%` }} />
          ))}
          {mode === "after" && !zoom && (
            <span
              className="absolute inset-y-1 rounded border border-dashed border-muted/30"
              style={{ left: "0.5%", width: "99%" }}
            />
          )}
          {blocks.map((b) => (
            <span
              key={b.id}
              className="absolute rounded-[4px] transition-[left,width,top] duration-[900ms] ease-[cubic-bezier(0.34,1.2,0.4,1)] motion-reduce:transition-none"
              style={{
                left: `${(b.start / axisMax) * 100}%`,
                width: `calc(${(b.dur / axisMax) * 100}% - 2px)`,
                top: LANE_GAP + b.clip * (LANE_H + LANE_GAP),
                height: LANE_H,
                background: color[b.stage],
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] tabular-nums text-muted">
          {ticks.map((t) => (
            <span key={t}>{t}m</span>
          ))}
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted">
        {STAGES.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className="size-2.5 rounded-[2px]" style={{ background: s.color }} aria-hidden="true" />
            {s.label}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] leading-5 text-muted/80">
        Schematic of the idea, not a production trace: real runtime went from ~76 to ~6 minutes
        (~12×) with outputs checked against the original pipeline.
      </p>
    </div>
  );
}
