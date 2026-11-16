"use client";

import { useEffect, useRef } from "react";

/**
 * A detection-box "lock" that snaps around links and buttons under a fine
 * pointer. The system cursor stays visible; this is decoration only.
 */
export function TargetCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const cur = { x: -100, y: -100, w: 16, h: 16 };
    const goal = { x: -100, y: -100, w: 16, h: 16 };
    let target: Element | null = null;
    let raf = 0;
    let shown = false;

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const t = (e.target as Element).closest(
        "a[href],button,[role=option],summary,[data-target]",
      );
      target = t && !t.closest("#top canvas") ? t : null;
      if (!target) {
        goal.w = 16;
        goal.h = 16;
        goal.x = e.clientX - 8;
        goal.y = e.clientY - 8;
      }
      if (!shown) {
        shown = true;
        Object.assign(cur, goal);
      }
      // the hero canvas already tracks the pointer with its own box
      const inHero = !target && (e.target as Element).closest("#top");
      el!.style.opacity = inHero ? "0" : "1";
    }

    function onLeave() {
      shown = false;
      el!.style.opacity = "0";
    }

    function tick() {
      if (target && target.isConnected) {
        const r = target.getBoundingClientRect();
        const pad = 6;
        goal.x = r.left - pad;
        goal.y = r.top - pad;
        goal.w = r.width + pad * 2;
        goal.h = r.height + pad * 2;
      }
      const k = 0.25;
      cur.x += (goal.x - cur.x) * k;
      cur.y += (goal.y - cur.y) * k;
      cur.w += (goal.w - cur.w) * k;
      cur.h += (goal.h - cur.h) * k;
      el!.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      el!.style.width = `${cur.w}px`;
      el!.style.height = `${cur.h}px`;
      el!.dataset.locked = target ? "true" : "false";
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="brackets pointer-events-none fixed left-0 top-0 z-[70] opacity-0 transition-[opacity] duration-200 [--b:1.5px] [--l:7px] [--c:var(--accent-soft)] data-[locked=false]:[--c:color-mix(in_srgb,var(--accent)_70%,transparent)]"
    />
  );
}
