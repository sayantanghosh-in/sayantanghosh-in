"use client";

import { useEffect } from "react";

const COPY_LABEL = "Copy code";
const DONE_LABEL = "Copied";
const FAIL_LABEL = "Press ⌘C";

/** Clipboard API needs a secure context; fall back for everything else. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the textarea route
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Adds a copy button to every code block.
 *
 * The markdown is injected as an HTML string, so there is no React tree to hang
 * a button off; this walks the DOM after mount instead, which keeps the page a
 * server component.
 *
 * The cleanup fully undoes the setup — button removed, flag cleared. It has to:
 * React StrictMode runs effects twice in development, and an earlier version
 * left the flag set, so the second pass bailed out and the button ended up with
 * no click listener. It worked in production and did nothing in dev.
 */
export function CodeCopy() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      ".prose pre, [data-copyable]",
    );
    const undo: Array<() => void> = [];

    targets.forEach((target) => {
      if (target.dataset["copyReady"] === "true") return;
      target.dataset["copyReady"] = "true";

      const existing = target.closest<HTMLElement>(".code-block");
      const wrapper = existing ?? document.createElement("div");
      if (!existing) {
        wrapper.className = "code-block";
        target.parentNode?.insertBefore(wrapper, target);
        wrapper.appendChild(target);
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy";
      button.setAttribute("aria-label", COPY_LABEL);
      button.textContent = COPY_LABEL;

      let timer: ReturnType<typeof setTimeout>;
      const onClick = async () => {
        const text =
          target.querySelector("code")?.textContent ?? target.textContent ?? "";
        const ok = await copyText(text.trim());

        button.textContent = ok ? DONE_LABEL : FAIL_LABEL;
        if (ok) button.dataset["copied"] = "true";

        clearTimeout(timer);
        timer = setTimeout(() => {
          button.textContent = COPY_LABEL;
          delete button.dataset["copied"];
        }, 2000);
      };

      button.addEventListener("click", onClick);
      wrapper.appendChild(button);

      undo.push(() => {
        clearTimeout(timer);
        button.removeEventListener("click", onClick);
        button.remove();
        delete target.dataset["copyReady"];
      });
    });

    return () => undo.forEach((fn) => fn());
  }, []);

  return null;
}
