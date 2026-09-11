# Working with AI Sessions

> **Status:** Decided · **Updated:** 2026-09-11

This site exists so any Claude session can continue MNVR development where the last one stopped. This page explains how to give a session the context, and how to keep the docs current.

## Addresses

| What | Address |
|---|---|
| Website (for people) | https://primeedgeits.github.io/prime/ |
| Index of all pages (for AI) | https://primeedgeits.github.io/prime/llms.txt |
| A single page as raw Markdown | https://primeedgeits.github.io/prime/docs/overview.md |
| Source repository | https://github.com/primeedgeits/prime |
| Local folder | `C:\Users\Ansari\Desktop\prime` |

Every page has a **Copy URL for Claude** button that copies its raw Markdown address.

## Starting a session

### Option A: give Claude the web address

Paste this at the start of the session:

```text
Before we start, read https://primeedgeits.github.io/prime/llms.txt, then read the
Product Overview, the Development Log, and the pages related to today's task.
```

This lets Claude read the docs but not change them. The web fetch tool can summarise long pages, so for exact details such as message formats or signal tables, ask Claude to quote the content word for word.

### Option B: add the docs folder to a Claude Code session

In the Claude Code terminal, inside the product's code repository, run:

```text
/add-dir C:\Users\Ansari\Desktop\prime
```

Claude can then read the Markdown files directly (always up to date, never summarised) and update them at the end of the session.

### Make it automatic

Add this to the `CLAUDE.md` file in the product's code repository, so every session knows where the docs are without being told:

```markdown
## Product documentation
MNVR product and code docs: https://primeedgeits.github.io/prime/llms.txt
(local copy: C:\Users\Ansari\Desktop\prime). Read the Product Overview and the
Development Log before starting work. At the end of a session, add a Development
Log entry and update any pages the work changed.
```

## Ending a session

Ask Claude:

```text
Update the MNVR docs: add a Development Log entry for today, update any pages
this work changed, record new decisions in Decision Records, then commit and push.
```

The live site updates a minute or two after the push.

## Rules that keep the docs useful

- Every page starts with a status: **Idea** (not agreed), **Draft** (being worked out), or **Decided** (agreed; build to this).
- Write **TBD** for anything unknown instead of guessing.
- Record every significant choice in [Decision Records](code/decisions.md), with the reason.
- Use full dates (2026-09-11), never "yesterday" or "last week".
- To add a page, create the Markdown file under `docs/` and add one line for it in `llms.txt`. The sidebar is built from `llms.txt`, so nothing else needs changing.

## Privacy

The repository and website are public: anyone can read these docs. Never put passwords, API keys, server addresses, customer data, or anything confidential here.
