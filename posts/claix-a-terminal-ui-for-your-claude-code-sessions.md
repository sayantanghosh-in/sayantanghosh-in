---
title: "claix: a terminal UI for your Claude Code sessions"
date: "2026-09-24"
author: "Sayantan Ghosh"
category: "Engineering"
description: "Claude Code scatters your sessions across every project you have ever opened, with no way to find the one you want. claix indexes them all, makes them searchable, and resumes any of them in the right directory."
tags: ["Claude Code", "Go", "Terminal", "Open Source", "Developer Tools"]
published: true
---

<figure>
<video
  src="/media/claix-demo.webm"
  poster="/media/claix-demo-poster.png"
  width="1400"
  height="800"
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  aria-label="claix demo: browsing, searching and resuming Claude Code sessions from the terminal"
>
  <source src="/media/claix-demo.webm" type="video/webm" />
  <source src="/media/claix-demo.mp4" type="video/mp4" />
</video>
<figcaption>Browse, search, tag, resume. One binary, no config.</figcaption>
</figure>

## The problem

I use Claude Code across a dozen repositories. Sessions accumulate in each one, and after a few weeks the picture looks like this:

- I remember solving something, but not which project I was in
- I remember the conversation, but not the day
- I want to pick up where I left off, and the only way is to `cd` around guessing

Claude Code stores every session locally. The data is all there. What is missing is anything that treats those sessions as a **collection** rather than a per-directory accident.

That is a small, specific, boring problem. It is also one I hit three or four times a week, which is usually the sign that something is worth building.

## What claix does

```bash
brew install sayantanghosh-in/tap/claix
claix
```

On first launch it offers to set up auto-sync hooks. Press Enter and you are done — it scans and indexes every Claude Code session across every project you have ever opened.

After that it is a list you can actually work with:

| | |
|---|---|
| **Fuzzy search** | `/` filters by title, branch, project or tag as you type |
| **Smart titles** | generated from the PR, Claude's responses, or your first message — not the filename |
| **One-key resume** | `Enter` opens Claude Code in the correct directory |
| **Tags and notes** | `t` to tag, `x` to untag, `n` to annotate |
| **Clickable PR links** | terminal hyperlinks straight to GitHub |
| **Dashboard** | activity sparkline, token usage, busiest projects |

There is also an MCP server, so Claude can tag and query your sessions mid-conversation — which is a strange and slightly recursive thing to have built, and genuinely useful.

## Why Go, and why a TUI

Three reasons, in order of how much they mattered:

**It has to start instantly.** This is a tool you reach for *because* you are interrupted. Anything with a runtime to boot — Node, Python — is already too slow for something you open twenty times a day. A Go binary is running before you have lifted your finger off Enter.

**It has to be one file.** `brew install` and you are done. No version manager, no virtualenv, no `node_modules`. The whole point is that it is there when you need it.

**The terminal is where the sessions already are.** Claude Code runs in a terminal. Switching to a browser to find a terminal session would be a strange thing to ask of anyone.

I built it with Bubble Tea, which makes a TUI feel like writing React — a model, a view, and messages that update state. If you have written a reducer you already know how it works.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just shipped claix v0.1.0 🚀 <br><br>brew install sayantanghosh-in/tap/claix <br>⭐<a href="https://t.co/bUlNMBZ44k">https://t.co/bUlNMBZ44k</a><br><br>A terminal UI to search, organize &amp; resume your Claude Code sessions across all your projects.<br><br>Open source • single binary • zero config.<a href="https://x.com/hashtag/buildinpublic?src=hash&amp;ref_src=twsrc%5Etfw">#buildinpublic</a> <a href="https://x.com/hashtag/opensource?src=hash&amp;ref_src=twsrc%5Etfw">#opensource</a> <a href="https://t.co/ivvlthdcmy">pic.twitter.com/ivvlthdcmy</a></p>&mdash; Sayantan Ghosh (@sayantan__ghosh) <a href="https://x.com/sayantan__ghosh/status/2042206598836490673?ref_src=twsrc%5Etfw">April 9, 2026</a></blockquote>

## The part that took the longest

Not the UI. Not the search. **Titles.**

A session file does not have a name. It has a directory, a timestamp, and a transcript. Showing a list of timestamps is useless — you cannot recognise your own work in `2026-04-02T14:22:09`.

So claix derives a title, in order of preference:

1. The pull request the session is associated with, if there is one
2. Something Claude said that reads like a summary of the task
3. Your first message, trimmed

The third is the fallback and it is the worst one, because first messages are often *"hey can you look at this"*. The first is the best, because a PR title is a human-written summary of exactly the thing the session was about.

Getting this hierarchy right is the difference between a list you scan and a list you squint at. It is also the kind of problem that looks trivial on a whiteboard and takes an afternoon in practice.

## Six themes, because of course

default, dracula, catppuccin, nord, gruvbox, tokyonight.

This was an hour of work and it is the feature people mention most. There is probably a lesson in that.

## Where it is going

It is at v0.1.0 — early, but the core loop works and I use it every day. Next up is better session export, and smarter grouping for projects where sessions run long.

```bash
brew install sayantanghosh-in/tap/claix
```

It is open source, MIT, and runs on macOS, Linux and Windows as a single binary. If it breaks, [open an issue](https://github.com/sayantanghosh-in/claix/issues) — at this stage it very well might.

---

*[claix on GitHub](https://github.com/sayantanghosh-in/claix) · built with [Bubble Tea](https://github.com/charmbracelet/bubbletea)*
