const ITEMS = [
  "AI agents",
  "LangGraph",
  "Evals",
  "MCP",
  "RAG",
  "Self-hosted inference",
  "React",
  "TypeScript",
  "FastAPI",
  "Design systems",
] as const;

type MarqueeProps = {
  /** Degrees. Positive tilts the band down to the right. */
  tilt?: number;
  reverse?: boolean;
};

/**
 * The diagonal scrolling ribbon.
 *
 * Decorative, so it is aria-hidden — a screen reader gets nothing useful from a
 * looping list of keywords. The track is duplicated and translated by exactly
 * -50%, which is what makes the loop seamless.
 */
export function Marquee({ tilt = -2, reverse = false }: MarqueeProps) {
  const row = (
    <ul className="marquee-track" data-reverse={reverse ? "" : undefined}>
      {[0, 1].map((copy) => (
        <li key={copy} className="marquee-group">
          {ITEMS.map((item) => (
            <span key={item} className="marquee-item">
              {item}
              <span aria-hidden className="marquee-star">
                ✳
              </span>
            </span>
          ))}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden
      className="marquee"
      style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
    >
      {row}
    </div>
  );
}
