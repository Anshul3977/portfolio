"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { selectedWork } from "../../content/projects";
import { site } from "../../content/site";

const OPEN_EVENT = "open-command-palette";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

function go(hash: string) {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    history.replaceState(null, "", hash);
  }
}

function open(url: string) {
  window.open(url, "_blank", "noopener");
}

export function PaletteButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {children}
    </button>
  );
}

export function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const listId = useId();

  const items = useMemo<Item[]>(
    () => [
      { id: "exp", group: "Go to", label: "Experience", run: () => go("#experience") },
      { id: "work", group: "Go to", label: "Projects", run: () => go("#work") },
      { id: "resume", group: "Go to", label: "Education & skills", run: () => go("#resume") },
      { id: "gh", group: "Go to", label: "GitHub activity", run: () => go("#github") },
      { id: "contact", group: "Go to", label: "Contact", run: () => go("#contact") },
      {
        id: "cv-ai",
        group: "Resume",
        label: "Open resume — AI engineering",
        hint: "PDF",
        run: () => open(site.resumes.ai),
      },
      {
        id: "cv-fs",
        group: "Resume",
        label: "Open resume — Full-stack",
        hint: "PDF",
        run: () => open(site.resumes.fullstack),
      },
      {
        id: "copy",
        group: "Contact",
        label: "Copy email address",
        hint: site.email,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(() => setCopied(true));
        },
      },
      { id: "mail", group: "Contact", label: "Write an email", run: () => (window.location.href = site.links.email) },
      { id: "gh-out", group: "Profiles", label: "GitHub", hint: site.links.githubHandle, run: () => open(site.links.github) },
      { id: "li", group: "Profiles", label: "LinkedIn", run: () => open(site.links.linkedin) },
      { id: "x", group: "Profiles", label: "X", hint: site.links.xHandle, run: () => open(site.links.x) },
      { id: "cf", group: "Profiles", label: "Codeforces", hint: site.links.codeforcesHandle, run: () => open(site.links.codeforces) },
      ...selectedWork.map((p) => ({
        id: `p-${p.slug}`,
        group: "Projects",
        label: p.title,
        hint: p.kind,
        run: () => go(`#${p.slug}`),
      })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.group} ${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  const show = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setCopied(false);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    restoreRef.current?.focus?.();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) hide();
        else show();
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [isOpen, show, hide]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function choose(item: Item | undefined) {
    if (!item) return;
    item.run();
    if (item.id !== "copy") hide();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  }

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) hide();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="brackets w-full max-w-lg overflow-hidden rounded-xl border border-line bg-[#120f0c] shadow-2xl shadow-black/60 [--l:14px]"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span aria-hidden="true" className="font-mono text-xs text-accent">
            ⌘K
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Jump to a section, project, resume…"
            className="h-12 w-full bg-transparent text-[15px] text-foreground placeholder:text-muted focus:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].id}` : undefined}
            aria-autocomplete="list"
          />
          <button
            type="button"
            onClick={hide}
            className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted hover:text-foreground"
          >
            ESC
          </button>
        </div>
        <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matches.</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={item.id} role="presentation">
                {header && (
                  <p role="presentation" className="px-3 pb-1 pt-3 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                    {header}
                  </p>
                )}
                <div
                  id={`${listId}-${item.id}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(item)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm ${
                    i === active ? "bg-accent/15 text-foreground" : "text-foreground/85"
                  }`}
                >
                  <span>{item.id === "copy" && copied ? "Copied ✓" : item.label}</span>
                  {item.hint && <span className="truncate font-mono text-[11px] text-muted">{item.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="border-t border-line px-4 py-2 font-mono text-[10px] tracking-wider text-muted">
          ↑↓ to move · ↵ to open · esc to close
        </p>
      </div>
    </div>
  );
}
