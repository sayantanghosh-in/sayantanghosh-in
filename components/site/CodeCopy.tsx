"use client";

import { useEffect } from "react";

const COPY_LABEL = "Copy code";
const DONE_LABEL = "Copied";

/**
 * Adds a copy button to every code block in the rendered post.
 *
 * The markdown is injected as an HTML string, so there is no React tree to hang
 * a button off. This walks the DOM once after mount instead, which keeps the
 * post itself a server component.
 */
export function CodeCopy() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>(
      ".prose pre, [data-copyable]",
    );
    const cleanups: Array<() => void> = [];

    blocks.forEach((pre) => {
      if (pre.dataset["copyReady"]) return;
      pre.dataset["copyReady"] = "true";

      let wrapper = pre.closest<HTMLElement>(".code-block");
      if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.className = "code-block";
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy";
      button.setAttribute("aria-label", COPY_LABEL);
      button.textContent = COPY_LABEL;

      let timer: ReturnType<typeof setTimeout>;
      const onClick = async () => {
        const code =
          pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = DONE_LABEL;
          button.dataset["copied"] = "true";
        } catch {
          button.textContent = "Press ⌘C";
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
          button.textContent = COPY_LABEL;
          delete button.dataset["copied"];
        }, 2000);
      };

      button.addEventListener("click", onClick);
      wrapper.appendChild(button);

      cleanups.push(() => {
        clearTimeout(timer);
        button.removeEventListener("click", onClick);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
