"use client";
import { useEffect, useState } from "react";
const sections = [
  "about",
  "experience",
  "projects",
  "lab",
  "education",
  "contact",
];
export function LiveControls() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const update = () => {
      let current = "about";
      for (const id of sections) {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <
          innerHeight * 0.35
        )
          current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    const initial = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <>
      <nav aria-label="Sections">
        {sections.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
          >
            <span>0{i + 1}</span>
            {id}
            <span className="nav-line" />
          </a>
        ))}
      </nav>
      <button
        className="theme-button"
        onClick={() => {
          const next = document.documentElement.dataset.theme !== "light";
          document.documentElement.dataset.theme = next ? "light" : "dark";
          try {
            localStorage.setItem("theme", next ? "light" : "dark");
          } catch {}
        }}
      >
        <span className="to-light">◑ Light mode</span>
        <span className="to-dark">◐ Dark mode</span>
      </button>
    </>
  );
}
