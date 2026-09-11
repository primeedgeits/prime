# MNVR documentation site

Product and code documentation for MNVR, an in-vehicle video recorder for buses. Published at https://primeedgeits.github.io/prime/ by GitHub Pages from the `main` branch.

## How it works

- `llms.txt` is the only navigation source. Each `## ` heading becomes a sidebar card; nested `- [Title](path): description` items become the collapsible tree (indent 2 spaces per level; an item without a link is a group).
- Pages are Markdown files under `docs/`. `assets/app.js` fetches and renders them in the browser (marked, highlight.js and mermaid from cdnjs).
- `.nojekyll` stops GitHub Pages from converting `.md` files to HTML, which keeps the raw Markdown fetchable. Don't delete it.

## Editing rules

- To add a page, create `docs/.../name.md` and add a line for it in `llms.txt`.
- Every page starts with `# Title` then `> **Status:** Idea|Draft|Decided · **Updated:** YYYY-MM-DD`. Update the date when you change a page.
- Write TBD for unknowns; never invent specifications. Label AI suggestions as suggestions.
- Link between pages with relative `.md` paths (for example `../code/decisions.md`); the viewer rewrites them.
- No secrets: the repo and site are public.
- At the end of a session, add an entry to the top of `docs/code/dev-log.md`, record decisions in `docs/code/decisions.md`, then commit and push.

## Previewing

Opening `index.html` straight from disk doesn't work, because browsers block `fetch` on `file://`. Serve the folder over HTTP (for example with the VS Code Live Server extension), or push and check the live site.
