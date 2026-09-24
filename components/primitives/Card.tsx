import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  /** "feature" is the raised treatment used for the current role. */
  variant?: "default" | "feature";
  interactive?: boolean;
  className?: string;
};

export function Card({
  children,
  variant = "default",
  interactive = false,
  className = "",
}: CardProps) {
  return (
    <article
      className={[
        "card-surface scroll-settle",
        variant === "feature" ? "overflow-hidden shadow-paper" : "",
        interactive
          ? "hover:-translate-y-0.5 hover:border-line-hi hover:shadow-lift"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </article>
  );
}

export function CardHeader({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-line bg-bg-band px-5 py-5 sm:px-7">
      {children}
    </div>
  );
}

export function CardBody({ children }: { children: ReactNode }) {
  return <div className="px-5 py-7 sm:px-7">{children}</div>;
}
