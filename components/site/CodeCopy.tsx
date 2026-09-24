"use client";

import { useEffect } from "react";

const COPY_TITLE = "Copy code";
const DONE_TITLE = "Copied";
const FAIL_TITLE = "Press ⌘C to copy";

const ICON_COPY = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"/><path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"/></svg>`;
const ICON_DONE = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5l10 -10"/></svg>`;

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through
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
 * Puts a copy control in every code block's header bar.
 *
 * Markdown arrives as an HTML string, so there is no React tree to attach a
 * button to; this walks the DOM after mount. Where a block has no bar yet
 * (anything from markdown) one is created, so the button always sits in its
 * own row and can never overlap wrapped code — which is what went wrong on
 * mobile when it was absolutely positioned.
 *
 * The cleanup fully reverses the setup. React StrictMode runs effects twice in
 * development, and an earlier version left its guard flag set, so the second
 * pass bailed out and the button ended up with no listener.
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

      // Wrap the block if it does not already live in one
      const existingBlock = target.closest<HTMLElement>(".code-block");
      const block = existingBlock ?? document.createElement("div");
      if (!existingBlock) {
        block.className = "code-block";
        target.parentNode?.insertBefore(block, target);
        block.appendChild(target);
      }

      // Give it a header bar if it has none
      let bar = block.querySelector<HTMLElement>(".code-block__bar");
      let createdBar = false;
      if (!bar) {
        bar = document.createElement("div");
        bar.className = "code-block__bar";
        const label = document.createElement("span");
        label.className = "code-block__label";
        // rehype-pretty-code records the fence language on the pre
        label.textContent = target.dataset["language"] ?? "";
        bar.appendChild(label);
        block.insertBefore(bar, block.firstChild);
        createdBar = true;
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy";
      button.setAttribute("aria-label", COPY_TITLE);
      button.title = COPY_TITLE;
      button.innerHTML = ICON_COPY;

      let timer: ReturnType<typeof setTimeout>;
      const onClick = async () => {
        const text =
          target.querySelector("code")?.textContent ?? target.textContent ?? "";
        const ok = await copyText(text.trim());

        button.innerHTML = ok ? ICON_DONE : ICON_COPY;
        button.setAttribute("aria-label", ok ? DONE_TITLE : FAIL_TITLE);
        button.title = ok ? DONE_TITLE : FAIL_TITLE;
        if (ok) button.dataset["copied"] = "true";

        clearTimeout(timer);
        timer = setTimeout(() => {
          button.innerHTML = ICON_COPY;
          button.setAttribute("aria-label", COPY_TITLE);
          button.title = COPY_TITLE;
          delete button.dataset["copied"];
        }, 2000);
      };

      button.addEventListener("click", onClick);
      bar.appendChild(button);

      undo.push(() => {
        clearTimeout(timer);
        button.removeEventListener("click", onClick);
        button.remove();
        if (createdBar) bar?.remove();
        delete target.dataset["copyReady"];
      });
    });

    return () => undo.forEach((fn) => fn());
  }, []);

  return null;
}
