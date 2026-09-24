import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: string;
  external?: boolean;
};

/** The small mono "All writing →" affordance. */
export function ArrowLink({ href, children, external = false }: ArrowLinkProps) {
  const className =
    "eyebrow inline-flex items-center gap-1.5 text-accent-ink transition-colors duration-200 hover:text-fg";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children} <span aria-hidden>→</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children} <span aria-hidden>→</span>
    </Link>
  );
}
