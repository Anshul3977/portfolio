"use client";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={false}
        whileInView={reduce ? {} : { y: [8, 0], opacity: [0.7, 1] }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
