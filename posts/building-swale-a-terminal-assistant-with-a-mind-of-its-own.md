---
title: "Building swale: a terminal assistant that decides what to look at"
date: "2026-09-24"
author: "Sayantan Ghosh"
category: "Engineering"
description: "Why I am building a local-first developer assistant with a real agent loop instead of another todo CLI — and what I learned about the line between a workflow and an agent."
tags: ["AI", "Agents", "TypeScript", "Open Source", "Developer Tools"]
published: false
---

I have a folder of half-finished command line tools. Most of them died the same way: I built the data model, I built the commands, and then I realised the thing I actually wanted — *just tell me what matters today* — was the part I had not built.

**swale** is the attempt to build that part first.

## The problem with another todo CLI

There is no shortage of tools that will store a todo for you. What there is a shortage of is anything that can look at your pull requests, your notes, and the fact that you have not solved a LeetCode problem in eleven days, and form an opinion.

That is not a storage problem. It is a *reasoning over your own scattered data* problem, and it only becomes tractable when the data lives in one place.

So swale keeps everything in a single local SQLite database:

- GitHub — pull requests, reviews waiting on you, CI state
- LeetCode — solved counts, streak, submission history
- Notes, todos and project costs you enter yourself

All of it on your machine. No server, no account, no sync.

## The part that makes it an agent

Here is the distinction that took me embarrassingly long to internalise:

> **A workflow is a sequence you wrote. An agent is a sequence the model wrote.**

If I build a `swale digest` command that fetches your PRs, then your todos, then formats them — that is a workflow. It runs the same steps in the same order every single time. It is fast, it is free, and it is completely predictable. That is a *feature*, not a limitation, and swale has commands exactly like that.

But when you type a question into the bare prompt, something different happens. The model gets a small set of tools and decides for itself which to call, in what order, and when it has enough to answer.

Ask it *"what should I focus on today?"* and one run might go:

1. List open pull requests
2. Notice one has failing CI
3. Fetch that specific run's checks
4. Notice it is blocking someone else
5. List today's todos
6. Answer

Tomorrow it takes a different path, because tomorrow the data is different. **I did not write that sequence, and I could not have drawn it in advance.** That is the whole test.

## Five tools, not fifteen

The temptation with a tool-calling agent is to expose everything. Every table, every filter, every endpoint — surely more capability is better?

It is not. Tool selection accuracy on a small local model falls off a cliff somewhere around six or seven tools. The model starts reaching for plausible-sounding wrong ones, and you end up debugging a prompt instead of a program.

So swale parameterises instead of multiplying:

```
list_prs({ state, needsMyReview })
get_pr({ number })
list_todos({ status, dueBefore, project })
get_stats({ source })
search({ query })
```

Five tools covering five data sources. The filtering that would have been ten narrow tools is now arguments on five broad ones.

This matters more than it sounds, because it is what lets swale run against a model on your own laptop rather than requiring an API key.

## Local-first is a constraint that improves the design

swale is built to work with Ollama. Not as a fallback — as the default assumption.

That constraint forces good decisions. You cannot stuff fifty thousand tokens of context into a 7B model, so you have to think about what the model actually needs to see. You cannot rely on perfect structured output, so you validate. You cannot afford a chatty ten-step loop for something a SQL query answers, so you keep the deterministic path deterministic.

Every one of those is a better engineering decision than the one you would make with a frontier model and a generous budget.

## Where it is going

The current shape:

- **Commands** — instant, no model, predictable. `swale todo add`, `swale pr`, `swale lc`
- **The prompt** — free text, real tool loop, variable, occasionally slow, actually useful

Next is retrieval, so `swale recall "that auth thing"` finds the note you wrote in March by meaning rather than by exact words. After that, a small terminal UI.

It is open source and very much in progress:

```bash
npx @itssayantan/swale
```

## The sibling project

swale is the second terminal tool I have shipped this year. The first was **claix**, which came from a smaller and more specific annoyance: Claude Code scatters sessions across every project you have ever opened, and there is no good way to find the one you want.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just shipped claix v0.1.0 🚀 <br><br>brew install sayantanghosh-in/tap/claix <br>⭐<a href="https://t.co/bUlNMBZ44k">https://t.co/bUlNMBZ44k</a><br><br>A terminal UI to search, organize &amp; resume your Claude Code sessions across all your projects.<br><br>Open source • single binary • zero config.<a href="https://x.com/hashtag/buildinpublic?src=hash&amp;ref_src=twsrc%5Etfw">#buildinpublic</a> <a href="https://x.com/hashtag/opensource?src=hash&amp;ref_src=twsrc%5Etfw">#opensource</a> <a href="https://t.co/ivvlthdcmy">pic.twitter.com/ivvlthdcmy</a></p>&mdash; Sayantan Ghosh (@sayantan__ghosh) <a href="https://x.com/sayantan__ghosh/status/2042206598836490673?ref_src=twsrc%5Etfw">April 9, 2026</a></blockquote>

Both come from the same place: the tools I use every day leave small gaps, and the gaps are more interesting to close than they look from the outside.

---

*swale is on [GitHub](https://github.com/sayantanghosh-in/swale). If you try it and it breaks, open an issue — it almost certainly will.*
