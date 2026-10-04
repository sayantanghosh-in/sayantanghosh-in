---
title: "swale v0.3.0: an agent that has to prove it did the work"
date: "2026-10-04"
author: "Sayantan Ghosh"
category: "Engineering"
description: "The agent I promised in the last release, plus the terminal dashboard it lives in. It lied to me twice before it worked, and both fixes were structural rather than a better prompt."
tags: ["Open Source", "TypeScript", "CLI", "AI", "Agents", "Local-first"]
published: true
---

<figure>
<img
  src="/media/swale-dashboard.gif"
  alt="The swale dashboard: contribution calendars for GitHub and LeetCode, open todos and this month's spending, with an agent prompt that lists todos and then marks one done"
  width="1180"
  height="1000"
/>
</figure>

```bash
npm install -g @itssayantan/swale
```

**[@itssayantan/swale on npm](https://www.npmjs.com/package/@itssayantan/swale)** · **[source on GitHub](https://github.com/sayantanghosh-in/swale)**

---

## What shipped

I ended the [v0.2.0 post](/blog/swale-v0-2-0-github-leetcode-and-a-local-llm) by saying the next interesting part was a tool loop: a small set of tools over your own data, and a model that decides which to call. That is this release.

Running `swale` with no arguments now opens a dashboard — both contribution calendars, your open todos, this month's spending, and a prompt wired to an agent that can read and change all of it. It runs against whatever model you configured, which for me is `qwen2.5:7b` on my own laptop.

Everything in this post is that model. No frontier API, nothing left the machine.

## It lied to me, twice

This is the part worth writing down, because neither fix was "write a better prompt".

**It claimed writes it never made.** I asked it to record an expense. It replied:

> Expense added: 450 INR for lunch.

Nothing had been added. It had called no tool at all — it pattern-matched a plausible confirmation and said it. The database was untouched, the output gave no hint of that, and I only noticed because I happened to check.

That is the worst possible failure for a tool whose whole job is to be trusted with your records. Rewording the instructions helped and did not fix it. What fixed it was removing the option:

```ts
prepareStep: ({ stepNumber }) =>
  stepNumber === 0 ? { toolChoice: "required" } : {},
```

The first step of every turn must call a tool. The model cannot answer from nothing, because it is not allowed to speak first. If it tries anyway, the SDK raises `ToolChoiceViolationError` and swale reports the refusal rather than passing the fiction along.

**It invented UUIDs.** Asked to mark a todo done, it would make one up, get `TODO_NOT_FOUND`, and apologise. Told to call `list_todos` first, it announced the plan and then stopped.

Asking a model for an identifier it has not read is asking it to invent one. A 7B model obliges every time. So the write tools stopped asking:

```ts
set_todo_status({ match: "blog post", status: "done" });
```

`match` is a few words from the todo; the tool does the lookup itself. Ids still work when there is one. The interface now matches how a person actually refers to things, which is a better tool design regardless of model size.

## The thing I got wrong last time

In the v0.2.0 post I wrote that the tool surface would stay capped at around five, because "selection accuracy on a small local model falls off a cliff past six or so".

This release ships thirteen.

The prediction was wrong, but not for the reason I would have guessed. Selection accuracy was fine. What actually degrades on a small model is not _choosing_ between many tools — it is choosing correctly when the tools overlap or when the right one needs an argument the model has to invent. Thirteen tools with sharp, non-overlapping descriptions behave better than five tools that each do three things.

The other half of it: a tool's error message is a prompt. A tool result goes straight back into the conversation, so this

```ts
{
  error: "TODO_NOT_FOUND",
  hint: "Ids cannot be guessed. Call list_todos and use the id from its output.",
}
```

self-corrects inside the same loop, where a bare `TODO_NOT_FOUND` makes the model give up and apologise. Writing error messages for the model, not for a log file, bought me more reliability than cutting the tool count would have.

## Forcing a tool call broke saying hello

Every guardrail has a cost and this one arrived quickly. With step zero required to call something, _"how are you?"_ had nothing legitimate to call. It failed the check every time and came back as a warning about nothing being saved — for a question that asked for nothing to be saved.

The fix is a tool whose only job is to say that no data is needed:

```ts
respond_directly: tool({
  description:
    "Answer from your own knowledge, without reading " +
    "or changing anything. Only for conversation. " +
    "Never when asked to add, update, finish or delete.",
  ...
})
```

Conversation now satisfies the forced call honestly. It is a weaker promise than before — a model could call `respond_directly` and still claim it saved something — but that was always reachable through any read tool. Forcing a call only ever removed the "answered from literally nothing" case, and it still removes it.

## Queueing, and stopping

<figure>
<img
  src="/media/swale-queue.gif"
  alt="Two prompts sent in a row: the second waits while the first runs, esc stops the first mid-answer, and the queued one starts immediately"
  width="1180"
  height="1000"
  loading="lazy"
/>
</figure>

A local model takes ten to twenty seconds a turn, which is long enough that being locked out of the input is annoying. So you can keep typing. Prompts queue and run in order, and the one waiting is shown above the prompt so you can see what is pending.

`esc` stops whatever is in flight. Anything already streamed is kept, the turn is marked `Stopped.`, and the next one begins.

That one had a subtlety I would have shipped broken if I had only tested the happy path: **an aborted stream ends rather than throwing.** My first version only handled the abort in the `catch`, so the turn returned normally with partial text and looked like a short successful answer. The success path has to check `signal.aborted` too.

## Why the conversation is not in a box

The dashboard is [Ink](https://github.com/vadimdemedes/ink), which is React rendering to the terminal. Finished turns are handed to `<Static>`, which writes them once and never repaints them, so they become ordinary terminal scrollback. Your mouse wheel, your scrollbar and your terminal's own text selection all work on them exactly as they would on any other command's output.

That matters for streaming too. Ink repaints its entire live frame on every change, so letting a long answer pile up there means erasing and redrawing thirty-odd lines several times a second — which reads as stutter. Replies are handed to `<Static>` a paragraph at a time, and only the paragraph still being written stays live. The split tracks code-fence depth so it never cuts a fenced block in half.

Someone will ask why selecting text does not copy automatically. It cannot: for the app to see your selection it would have to enable mouse tracking, which takes the mouse away from the terminal — native selection and scrollback selection would both stop working, and swale would have to reimplement them, worse. Every terminal already offers copy-on-select as a setting. `ctrl+y` copies the last answer for the common case.

## Moving to another machine

<figure>
<img
  src="/media/swale-backup.gif"
  alt="swale backup writing a zip, then swale restore unpacking it into a fresh data directory"
  width="1180"
  height="440"
  loading="lazy"
/>
</figure>

```bash
swale backup          # → ~/.swale/backups/swale-backup-<stamp>.zip
swale restore /path/to.zip
```

Two details that are easy to get wrong.

The snapshot is taken with `VACUUM INTO`, not a file copy. Copying a SQLite file while a connection is open can catch a half-written page; asking SQLite for the snapshot cannot.

And `config.json` is deliberately **not** in the archive. It holds your GitHub token and any API key, and all of it comes back by signing in again. That makes a backup safe to put in cloud storage — which is the whole reason to have one.

`swale restore` is also the single command that runs before sign-in, because on a new machine it has to. The onboarding hook that demands a GitHub login would otherwise block the one command you need first.

## Calendars

<figure>
<img
  src="/media/swale-v3-calendars.gif"
  alt="swale gh sync: a six-month contribution calendar with streaks, then the most recently updated repositories"
  width="1180"
  height="640"
  loading="lazy"
/>
</figure>

Six months of GitHub commits and LeetCode submissions, with current and longest streaks, in `gh sync`, `lc`, the dashboard, and the plain-text output you get when you pipe it.

GitHub has no REST endpoint for the contribution calendar, so it is GraphQL — `read:user` already covers it, no new scope.

## Four bugs worth naming

**`spawnSync` in a UI loop.** Swale polls the clipboard so it can offer to attach a screenshot. I wrote the poll with `spawnSync`, which holds the event loop for every millisecond it runs. A single `osascript` call looks cheap at 90ms. Measured back to back, under contention, they cost **over a second each** — so every 2.5 seconds the whole interface froze. That is what made typing lag and the reply stutter on a rhythm. It is `execFile` and promises now.

**`0 ?? 80` is `0`.** A terminal that reports zero columns is not a zero-column terminal, but `??` only falls back on `null` and `undefined`. The width came out as 0, a breakpoint decided the window was too narrow, and the calendars silently vanished.

**Counting newlines is not counting rows.** A line wider than the terminal wraps onto more rows, and an emoji is two cells wide while being one character long. Both were enough to push the banner off the top of a narrow window.

**LeetCode's `userCalendar` only returns the year you ask for.** Not passing a year gets you the current one, so a rolling six-month window crossing New Year silently loses half its data. It fetches two years and merges them.

## What is next

Readers for the files you can already attach.

Pasting a CSV or a screenshot works today — swale recognises it, classifies it, and shows it above the prompt. It also says `not read yet` on every one, because nothing parses them. The plumbing exists so that adding a parser is one function rather than a feature.

After that: letting the agent act on a schedule rather than only when asked. A morning digest that is worth reading is a different problem from a chat turn, and I would like to get the chat turn properly boring first.

---

```bash
npm install -g @itssayantan/swale
```

**[npm](https://www.npmjs.com/package/@itssayantan/swale)** · **[GitHub](https://github.com/sayantanghosh-in/swale)** · MIT · Node 24+

Still early, and the honest caveat stands: with a 7B model it occasionally still refuses a turn. A larger local model, or any hosted provider, follows tool instructions more reliably — `swale llm` switches in a few seconds. If it breaks, [open an issue](https://github.com/sayantanghosh-in/swale/issues).
