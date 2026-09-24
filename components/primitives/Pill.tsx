import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  tone?: "default" | "accent";
  as?: "li" | "span" | "div";
};

/** The mono chip used for stacks, tags and categories. */
export function Pill({ children, tone = "default", as: Tag = "li" }: PillProps) {
  return (
    <Tag
      className={`eyebrow rounded-full border px-2.5 py-1 ${
        tone === "accent"
          ? "border-accent/40 text-accent-ink"
          : "border-line text-fg-3"
      }`}
    >
      {children}
    </Tag>
  );
}

export function PillList({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((item) => (
        <Pill key={item}>{item}</Pill>
      ))}
    </ul>
  );
}
