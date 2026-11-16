import { metrics } from "../../content/site";
import { CountUp } from "@/components/count-up";

export function MetricsBand() {
  return (
    <section aria-label="Highlights" className="relative border-y border-line bg-[#0e0b09]">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.id}
            className={`group relative px-5 py-8 sm:px-8 sm:py-10 ${i % 2 === 1 ? "border-l border-line" : ""} ${
              i >= 2 ? "border-t border-line lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="sr-only">{m.label}</dt>
            <dd>
              <p className="font-serif text-[clamp(2.75rem,7vw,4.75rem)] leading-none tracking-tight text-foreground tabular-nums">
                {"prefix" in m && <span className="text-accent">{m.prefix}</span>}
                <CountUp to={m.value} decimals={"decimals" in m ? m.decimals : 0} />
                {"suffix" in m && <span className="text-accent">{m.suffix}</span>}
              </p>
              <p className="mt-3 text-sm text-foreground/85">{m.label}</p>
              <p className="mt-1 font-mono text-[11px] tracking-wide text-muted">{m.detail}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
