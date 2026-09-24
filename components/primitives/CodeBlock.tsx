import type { ReactNode } from "react";

type CodeBlockProps = {
  children: ReactNode;
  /** Shown on the left of the bar, e.g. "bash", "Install". */
  label?: string;
};

/**
 * A code block with a header bar.
 *
 * The bar exists so the copy control never overlaps the code. An absolutely
 * positioned button worked on desktop and ran straight over wrapped text on a
 * phone; reserving a row solves it at every width instead of per-breakpoint.
 *
 * The button itself is injected by CodeCopy after mount, because the same
 * markup has to work for markdown that arrives as an HTML string.
 */
export function CodeBlock({ children, label }: CodeBlockProps) {
  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span className="code-block__label">{label}</span>
      </div>
      <code data-copyable className="code-block__body">
        {children}
      </code>
    </div>
  );
}
