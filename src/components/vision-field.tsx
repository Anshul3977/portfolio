"use client";

import { useEffect, useRef } from "react";

/**
 * Signature hero interaction: a top-down "factory floor" where moving
 * figures are detected and tracked (YOLO-style boxes, ByteTrack-style
 * ids and trails). The visitor's pointer becomes a tracked object, and
 * clicking / tapping spawns a new track.
 */

type Track = {
  id: number;
  cls: "person" | "cart";
  x: number;
  y: number;
  tx: number;
  ty: number;
  speed: number;
  conf: number;
  phase: number;
  trail: number[];
  born: number;
};

const ACCENT = "208,138,60";
const SOFT = "226,176,117";
const FG = "243,238,230";

export function VisionField({ statusId }: { statusId?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const status = statusId ? document.getElementById(statusId) : null;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nextId = 1;
    let frame = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let lastStatus = 0;
    const floor = document.createElement("canvas");
    const tracks: Track[] = [];
    const pointer = { x: 0, y: 0, bx: 0, by: 0, active: false, seen: 0 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    // perspective: things nearer the bottom are larger
    const scaleAt = (y: number) => 0.62 + 0.55 * Math.min(1, Math.max(0, y / h));
    const minX = () => (w >= 1024 ? w * 0.5 : 0);

    function waypoint(t: Track) {
      t.tx = rand(minX() + 30, w - 30);
      t.ty = rand(h * 0.18, h * 0.95);
    }

    function spawn(x?: number, y?: number) {
      const t: Track = {
        id: nextId++,
        cls: Math.random() < 0.18 ? "cart" : "person",
        x: x ?? rand(minX() + 30, w - 30),
        y: y ?? rand(h * 0.2, h * 0.92),
        tx: 0,
        ty: 0,
        speed: rand(16, 38),
        conf: rand(0.82, 0.97),
        phase: rand(0, Math.PI * 2),
        trail: [],
        born: frame,
      };
      waypoint(t);
      tracks.push(t);
      if (tracks.length > 26) tracks.shift();
    }

    function drawFloor() {
      floor.width = Math.round(w * dpr);
      floor.height = Math.round(h * dpr);
      const f = floor.getContext("2d");
      if (!f) return;
      f.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = w > 700 ? 34 : 26;
      for (let y = gap; y < h; y += gap) {
        const s = scaleAt(y);
        for (let x = (y / gap) % 2 ? gap / 2 : 0; x < w; x += gap) {
          f.fillStyle = `rgba(${FG},${0.05 + 0.06 * s})`;
          f.fillRect(x, y, 1.2 * s, 1.2 * s);
        }
      }
      // floor lanes like a warehouse
      f.strokeStyle = `rgba(${ACCENT},0.07)`;
      f.setLineDash([6, 10]);
      f.lineWidth = 1;
      for (const r of [0.38, 0.66]) {
        f.beginPath();
        f.moveTo(minX(), h * r);
        f.lineTo(w, h * r);
        f.stroke();
      }
      f.setLineDash([]);
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFloor();
      const want = w < 640 ? 8 : w < 1100 ? 12 : 15;
      while (tracks.length < want) spawn();
      for (const t of tracks) {
        if (t.x < minX() || t.x > w || t.y > h) {
          t.x = rand(minX() + 30, w - 30);
          t.y = rand(h * 0.2, h * 0.92);
          t.trail = [];
          waypoint(t);
        }
      }
    }

    function step(dt: number) {
      for (const t of tracks) {
        const dx = t.tx - t.x;
        const dy = t.ty - t.y;
        const d = Math.hypot(dx, dy);
        if (d < 8) {
          waypoint(t);
        } else {
          const s = (t.speed * scaleAt(t.y) * dt) / d;
          t.x += dx * s;
          t.y += dy * s;
        }
        t.phase += dt * 4;
        t.conf += (Math.random() - 0.5) * 0.02;
        t.conf = Math.min(0.99, Math.max(0.71, t.conf));
        if (frame % 3 === 0) {
          t.trail.push(t.x, t.y);
          if (t.trail.length > 90) t.trail.splice(0, 2);
        }
      }
    }

    function box(
      x: number,
      y: number,
      bw: number,
      bh: number,
      color: string,
      alpha: number,
      label: string,
    ) {
      const l = Math.min(10, bw * 0.3);
      ctx!.strokeStyle = `rgba(${color},${alpha * 0.28})`;
      ctx!.lineWidth = 1;
      ctx!.strokeRect(x, y, bw, bh);
      ctx!.strokeStyle = `rgba(${color},${alpha})`;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(x, y + l);
      ctx!.lineTo(x, y);
      ctx!.lineTo(x + l, y);
      ctx!.moveTo(x + bw - l, y);
      ctx!.lineTo(x + bw, y);
      ctx!.lineTo(x + bw, y + l);
      ctx!.moveTo(x + bw, y + bh - l);
      ctx!.lineTo(x + bw, y + bh);
      ctx!.lineTo(x + bw - l, y + bh);
      ctx!.moveTo(x + l, y + bh);
      ctx!.lineTo(x, y + bh);
      ctx!.lineTo(x, y + bh - l);
      ctx!.stroke();
      ctx!.font = "500 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      const tw = ctx!.measureText(label).width + 8;
      ctx!.fillStyle = `rgba(${color},${alpha * 0.92})`;
      ctx!.fillRect(x - 0.75, y - 14, tw, 13);
      ctx!.fillStyle = `rgba(20,14,8,${alpha})`;
      ctx!.fillText(label, x + 3.5, y - 4.5);
    }

    function figure(t: Track, s: number, alpha: number) {
      ctx!.fillStyle = `rgba(${FG},${0.5 * alpha})`;
      if (t.cls === "person") {
        const bob = Math.sin(t.phase) * 1.2 * s;
        ctx!.beginPath();
        ctx!.arc(t.x, t.y - 30 * s + bob, 4.2 * s, 0, Math.PI * 2);
        ctx!.fill();
        // point-cloud torso
        for (let i = 0; i < 9; i++) {
          const py = t.y - 24 * s + (i / 8) * 22 * s + bob;
          const spread = (i < 5 ? 5.5 : 3.6) * s;
          for (let k = -1; k <= 1; k++) {
            const sw = i >= 5 ? Math.sin(t.phase + k) * 2 * s : 0;
            ctx!.fillRect(t.x + k * spread + sw, py, 1.4 * s, 1.4 * s);
          }
        }
      } else {
        ctx!.strokeStyle = `rgba(${FG},${0.4 * alpha})`;
        ctx!.lineWidth = 1;
        ctx!.strokeRect(t.x - 14 * s, t.y - 16 * s, 28 * s, 14 * s);
        ctx!.beginPath();
        ctx!.arc(t.x - 9 * s, t.y, 2.5 * s, 0, Math.PI * 2);
        ctx!.arc(t.x + 9 * s, t.y, 2.5 * s, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function render() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.drawImage(floor, 0, 0, w, h);

      // trails (ByteTrack-style history)
      for (const t of tracks) {
        const n = t.trail.length;
        if (n < 4) continue;
        ctx!.lineWidth = 1;
        for (let i = 2; i < n; i += 2) {
          const a = (i / n) * 0.35;
          ctx!.strokeStyle = `rgba(${ACCENT},${a})`;
          ctx!.beginPath();
          ctx!.moveTo(t.trail[i - 2], t.trail[i - 1]);
          ctx!.lineTo(t.trail[i], t.trail[i + 1]);
          ctx!.stroke();
        }
      }

      const sorted = [...tracks].sort((a, b) => a.y - b.y);
      for (const t of sorted) {
        const s = scaleAt(t.y);
        const fade = Math.min(1, (frame - t.born) / 30);
        figure(t, s, fade);
        const bw = (t.cls === "person" ? 24 : 36) * s;
        const bh = (t.cls === "person" ? 42 : 24) * s;
        const label = `${t.cls} ${t.conf.toFixed(2)} #${String(t.id).padStart(2, "0")}`;
        box(t.x - bw / 2, t.y - bh - 2 * s, bw, bh + 4 * s, ACCENT, 0.85 * fade, label);
      }

      if (pointer.active) {
        const size = 58;
        box(pointer.bx - size / 2, pointer.by - size / 2, size, size, SOFT, 1, "you 0.99 #00");
        ctx!.fillStyle = `rgba(${SOFT},0.9)`;
        ctx!.fillRect(pointer.bx - 1, pointer.by - 1, 2, 2);
      }
    }

    function updateStatus(now: number) {
      if (!status || now - lastStatus < 250) return;
      lastStatus = now;
      status.textContent = `F ${String(frame).padStart(6, "0")} · ${tracks.length + (pointer.active ? 1 : 0)} TRACKS`;
    }

    function loop(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      frame++;
      step(dt);
      if (pointer.active) {
        pointer.bx += (pointer.x - pointer.bx) * Math.min(1, dt * 9);
        pointer.by += (pointer.y - pointer.by) * Math.min(1, dt * 9);
      }
      render();
      updateStatus(now);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function local(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      const p = local(e);
      if (!pointer.active) {
        pointer.bx = p.x;
        pointer.by = p.y;
      }
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
    }

    function onLeave() {
      pointer.active = false;
    }

    function onDown(e: PointerEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("a,button,input,[role=dialog]")) return;
      const p = local(e);
      spawn(p.x, p.y);
      if (reduce) render();
    }

    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    const onVis = () => (document.hidden ? stop() : start());

    function boot() {
    resize();
    if (reduce) {
      for (let i = 0; i < 240; i++) {
        frame++;
        step(1 / 30);
      }
      render();
    } else {
      // warm up so trails exist on first paint
      for (let i = 0; i < 90; i++) {
        frame++;
        step(1 / 30);
      }
      render();
    }

    ro = new ResizeObserver(() => {
      resize();
      if (!running) render();
    });
    ro.observe(canvas!);
    io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas!);
    document.addEventListener("visibilitychange", onVis);
    host!.addEventListener("pointermove", onMove);
    host!.addEventListener("pointerleave", onLeave);
    host!.addEventListener("pointerdown", onDown);
    start();
    }

    // let hydration and first paint finish before the simulation boots
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const idle = ric(boot, { timeout: 1200 });

    return () => {
      cic(idle);
      stop();
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [statusId]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
