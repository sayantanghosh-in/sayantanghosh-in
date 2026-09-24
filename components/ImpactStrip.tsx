import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";

type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const metrics: Metric[] = [
  {
    value: 80,
    suffix: "%",
    label: "fewer tokens per request, after re-architecting the agent tool catalogue",
  },
  {
    value: 20,
    suffix: "",
    label: "engineers saving 2–4 hrs a week via a native MCP server",
  },
  {
    value: 12,
    prefix: "$",
    suffix: "k/yr",
    label: "licensing removed by replacing JIRA company-wide",
  },
  {
    value: 9,
    suffix: " yrs",
    label: "across five companies — frontend, backend, then AI",
  },
];

export function ImpactStrip() {
  return (
    <section className="border-b border-line bg-bg-band">
      <div className="container-page">
        <div className="rails grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Reveal
              key={metric.label}
              delay={index * 60}
              className="bg-bg-band px-5 py-8 sm:px-6"
            >
              <p className="numeral text-4xl text-accent-ink sm:text-5xl">
                <Counter
                  to={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </p>
              <p className="mt-3 text-sm text-fg-2">{metric.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
