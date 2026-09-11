# Working with AI Sessions

> **Status:** Decided · **Updated:** 2026-09-11

This site exists so any Claude session can continue MNVR development where the last one stopped. This page explains the ways to give a session the context, which of them can edit the docs, and how to keep the docs current.

## Addresses

| What | Address |
|---|---|
| Website (for people) | https://primeedgeits.github.io/prime/ |
| Index of all pages (for AI) | https://primeedgeits.github.io/prime/llms.txt |
| A single page as raw Markdown | https://primeedgeits.github.io/prime/docs/overview.md |
| Source repository | https://github.com/primeedgeits/prime |
| Local folder | `C:\Users\Ansari\Desktop\prime` |

Every page has a **Copy URL for Claude** button that copies its raw Markdown address. The live site updates a minute or two after every push to `main`.

## Ways to work with the docs

| Way | Needs | Can read | Can edit and publish |
|---|---|---|---|
| A. Claude Code on the web (claude.ai/code) | A browser and the GitHub account | Yes, the whole repository | Yes: it edits files and pushes or opens a pull request |
| B. Normal claude.ai chat with the GitHub connector | A claude.ai plan that allows custom connectors | Yes | Yes: it commits directly to the repository |
| C. Normal claude.ai chat, no connector | Nothing | Yes, by fetching the web addresses | No: paste its text into the files yourself |
| D. Claude Code in VS Code or the terminal | Claude Code installed on the PC | Yes, the local folder | Yes, then commit and push |

### A. Claude Code on the web (no VS Code)

1. Open https://claude.ai/code in a browser and sign in.
2. Connect the GitHub account `primeedgeits` if asked, and choose the repository `primeedgeits/prime`.
3. Type the task in the chat, for example: "Update the CAN Health checklist: the MCU decodes J1939 itself. Record the decision and add a dev-log entry."
4. It reads `CLAUDE.md` automatically, edits the files, and either pushes to `main` or opens a pull request; if it opens a pull request, merge it on GitHub and the site updates.

This is the same Claude Code as in VS Code, running in the cloud. It also works from a phone.

### B. Normal claude.ai chat with the GitHub connector

This is the way to edit from an ordinary Project chat.

1. In claude.ai go to **Settings → Connectors → Add custom connector**.
2. Enter GitHub's MCP server address: `https://api.githubcopilot.com/mcp/` and authorise it with the `primeedgeits` GitHub account.
3. Create a Project called "MNVR" and paste the block from the next section into its instructions.
4. In a chat inside that Project, enable the GitHub connector and ask for changes, for example: "Read llms.txt and the Development Log, then update the PIS audio checklist with these points: … Commit to main with a clear message."

Custom connectors are only available on some claude.ai plans; if the Connectors page has no "Add custom connector" option, use way A instead.

### C. Normal chat, read-only

Paste this at the start of the session:

```text
Before we start, read https://primeedgeits.github.io/prime/llms.txt, then read the
Product Overview, the Development Log, and the pages related to today's task.
```

The web fetch tool can summarise long pages, so for exact details such as message formats or signal tables, ask Claude to quote the content word for word. To save its edits, open the file on https://github.com/primeedgeits/prime, click the pencil icon, paste, and commit.

### D. Claude Code in VS Code or the terminal

In the Claude Code terminal, inside the product's code repository, run:

```text
/add-dir C:\Users\Ansari\Desktop\prime
```

Claude can then read the Markdown files directly and update them at the end of the session.

## Project instructions for claude.ai (paste into the Project)

```markdown
You are helping develop MNVR, an in-vehicle video recorder for buses (surveillance,
GPS tracking, CAN vehicle health, two-way TCP backend link, voice calls, passenger
information system).

All product and code documentation is in the GitHub repository primeedgeits/prime,
published at https://primeedgeits.github.io/prime/. The file llms.txt at the root
lists every page. Start every task by reading llms.txt, docs/overview.md and
docs/code/dev-log.md, then the pages relevant to the task.

Rules for editing the docs:
- Every page starts with "# Title" then "> **Status:** Idea|Draft|Decided · **Updated:** YYYY-MM-DD".
  Update the date when you change a page.
- Write TBD for unknowns; never invent specifications. Label your own suggestions as proposals.
- Record decisions in docs/code/decisions.md with the reason.
- At the end of a task add an entry at the top of docs/code/dev-log.md.
- To add a page, create docs/.../name.md and add a line for it in llms.txt
  (2-space indent per level; an item without a link is a group).
- Link between pages with relative .md paths.
- Never put passwords, keys, server addresses, customer data or prices in the docs:
  the repository and site are public.
- Commit to main with a clear message.
```

## Make it automatic in code repositories

Add this to the `CLAUDE.md` file in the product's code repository, so every Claude Code session knows where the docs are without being told:

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

## Rules that keep the docs useful

- Every page starts with a status: **Idea** (not agreed), **Draft** (being worked out), or **Decided** (agreed; build to this).
- Write **TBD** for anything unknown instead of guessing.
- Record every significant choice in [Decision Records](code/decisions.md), with the reason.
- Use full dates (2026-09-11), never "yesterday" or "last week".
- To add a page, create the Markdown file under `docs/` and add one line for it in `llms.txt`. The sidebar is built from `llms.txt`, so nothing else needs changing.

## Privacy

The repository and website are public: anyone can read these docs. Never put passwords, API keys, server addresses, customer data, prices or anything confidential here.
