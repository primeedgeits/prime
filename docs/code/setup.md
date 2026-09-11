# Setup & Build

> **Status:** Draft · **Updated:** 2026-09-11

## Device firmware

TBD once the hardware platform and tech stack are chosen. Cover:

- Toolchain and SDK to install
- How to build
- How to flash or deploy to a device
- How to view device logs

## Backend

TBD. Cover:

- Requirements (language runtime, database)
- How to run it locally
- Configuration and environment variables (keep secrets out of these docs)
- How to deploy

## Documentation site (this repository)

- Pages are Markdown files in `docs/`. The sidebar is built from `llms.txt`.
- **Preview locally:** browsers block the page from loading files when `index.html` is opened straight from disk, so serve the folder over HTTP. In VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.
- **Publish:** commit and push to `main`. GitHub Pages updates https://primeedgeits.github.io/prime/ within a minute or two.
