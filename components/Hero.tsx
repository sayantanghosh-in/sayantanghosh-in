import Image from "next/image";
import Link from "next/link";
import { IconArrowDown, IconMail } from "@tabler/icons-react";

import { SITE, SOCIALS } from "@/lib/site";

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-page">
        <div className="rails px-4 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
          <p className="eyebrow animate-rise">
            Tech Lead · Synup · Bengaluru
          </p>

          <h1
            className="display-xl animate-rise mt-5"
            style={{ "--delay": "60ms" } as React.CSSProperties}
          >
            Sayantan Ghosh
          </h1>

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[60ch]">
              <p
                className="animate-rise text-lg text-fg sm:text-xl"
                style={{ "--delay": "120ms" } as React.CSSProperties}
              >
                I lead the team building Synup&rsquo;s AI agents — and the
                evals, tooling and inference behind them.
              </p>
              <p
                className="animate-rise mt-5 text-base text-fg-2"
                style={{ "--delay": "180ms" } as React.CSSProperties}
              >
                Nine years of turning ambiguous product bets into shipped
                systems. This year that means a production agent I took from
                research question to revenue: RAG over a SQL vector store, an
                MCP tool surface, LangSmith traces, an eval suite that gates
                every change, and open-weight models I host myself.
              </p>

              <div
                className="animate-rise mt-8 flex flex-wrap items-center gap-3"
                style={{ "--delay": "240ms" } as React.CSSProperties}
              >
                <Link
                  href="#work"
                  className="ink-sweep inline-flex items-center gap-2 rounded-md border border-fg bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors duration-200 hover:border-accent hover:text-bg"
                >
                  See the work
                  <IconArrowDown size={15} />
                </Link>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors duration-200 hover:border-line-hi hover:bg-bg-band"
                >
                  <IconMail size={15} />
                  Email me
                </a>
              </div>

              <ul
                className="animate-rise eyebrow mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
                style={{ "--delay": "300ms" } as React.CSSProperties}
              >
                <li>
                  <a
                    className="transition-colors duration-200 hover:text-fg"
                    href={SOCIALS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className="transition-colors duration-200 hover:text-fg"
                    href={SOCIALS.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    className="transition-colors duration-200 hover:text-fg"
                    href={SOCIALS.x}
                    target="_blank"
                    rel="noreferrer"
                  >
                    X
                  </a>
                </li>
                <li>
                  <Link
                    className="transition-colors duration-200 hover:text-fg"
                    href="/sayantan_ghosh_resume.pdf"
                  >
                    Résumé
                  </Link>
                </li>
              </ul>
            </div>

            <div
              className="animate-rise shrink-0"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              <Image
                alt="Sayantan Ghosh"
                src="/sayantan.png"
                width={128}
                height={128}
                priority
                sizes="128px"
                className="size-28 rounded-xl border border-line object-cover sm:size-32"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
