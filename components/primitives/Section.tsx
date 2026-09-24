import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** "band" tints the section, used to break up a long scroll. */
  tone?: "page" | "band";
  /** Sections carry their own bottom hairline unless they are last. */
  bordered?: boolean;
};

/**
 * Every top-level band on the site. Owns the container, the hairline rails and
 * the vertical rhythm, so no page has to remember the padding scale.
 */
export function Section({
  children,
  id,
  tone = "page",
  bordered = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${bordered ? "border-b border-line" : ""} ${
        tone === "band" ? "bg-bg-band" : ""
      }`}
    >
      <div className="container-page">
        <div className="rails px-4 py-16 sm:px-8 sm:py-24">{children}</div>
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <p className="eyebrow">{eyebrow}</p>
      <Tag className="display-lg scroll-enter mt-3">{title}</Tag>
      {lede ? (
        <p className="mt-4 max-w-[52ch] text-base text-fg-2">{lede}</p>
      ) : null}
    </div>
  );
}
