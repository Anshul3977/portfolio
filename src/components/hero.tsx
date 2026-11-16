import { site } from "../../content/site";
import { VisionField } from "@/components/vision-field";
import { Magnet } from "@/components/magnet";
import { PaletteButton } from "@/components/command-palette";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <VisionField statusId="hero-status" />
        {/* legibility: fade the floor behind the text */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_60%,var(--background)_25%,transparent_70%)] max-lg:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_45%,transparent)_0%,color-mix(in_srgb,var(--background)_85%,transparent)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>

      {/* camera HUD */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-5 font-mono text-[10px] tracking-[0.18em] text-muted uppercase sm:px-8"
      >
        <span className="flex items-center gap-2">
          <span className="rec-dot inline-block size-1.5 rounded-full bg-[#e5533d]" />
          REC · CAM-01 · Nagpur
        </span>
        <span className="hidden md:inline">YOLO + ByteTrack · live</span>
        <span id="hero-status" className="tabular-nums">
          F 000000
        </span>
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-14 sm:px-8">
        <div className="rise">
          <p className="eyebrow text-accent!">
            {site.role} <span className="text-muted">· ML Eng Intern @ AIMonk Labs</span>
          </p>
        </div>

        <h1
          id="hero-heading"
          className="mt-10 font-serif text-[clamp(4.1rem,15.5vw,12.5rem)] leading-[0.84] tracking-[-0.02em] text-foreground"
        >
          <span className="relative inline-block">
            Anshul
            <span aria-hidden="true" className="lock-box brackets">
              <span className="lock-tag">person 0.99 · id 001 · AI engineer</span>
            </span>
          </span>
          <br />
          <span className="italic text-accent-soft">Palarpwar</span>
        </h1>

        <p className="mt-9 max-w-xl text-lg leading-8 text-foreground/80 sm:text-xl">
            {site.oneLiner}
          </p>

        <div className="rise [animation-delay:200ms]">
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnet>
              <a href="#work" className="btn-primary">
                See the work
              </a>
            </Magnet>
            <div className="flex items-center overflow-hidden rounded-full border border-line">
              <a
                href={site.resumes.ai}
                target="_blank"
                rel="noopener"
                className="px-4 py-[0.7rem] text-sm font-medium text-foreground transition-colors hover:bg-elevated hover:text-accent-soft"
              >
                Resume · AI
              </a>
              <span className="h-5 w-px bg-line" aria-hidden="true" />
              <a
                href={site.resumes.fullstack}
                target="_blank"
                rel="noopener"
                className="px-4 py-[0.7rem] text-sm font-medium text-foreground transition-colors hover:bg-elevated hover:text-accent-soft"
              >
                Full-stack
              </a>
            </div>
            <PaletteButton className="btn-ghost hidden! gap-2 md:inline-flex!">
              <kbd className="font-mono text-[11px] text-muted">⌘K</kbd> Jump anywhere
            </PaletteButton>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto flex w-full max-w-6xl items-center justify-between px-5 pb-6 font-mono text-[10px] tracking-[0.18em] text-muted uppercase sm:px-8"
      >
        <span className="hidden sm:inline">
          <span className="text-accent">●</span> Move your cursor — you&apos;re being tracked. Click to add a track.
        </span>
        <span className="sm:hidden">Tap the floor to add a track</span>
        <span>Scroll ↓</span>
      </div>
    </section>
  );
}
