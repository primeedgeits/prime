# Decision Records

> **Status:** Decided · **Updated:** 2026-09-11

One entry per significant decision, newest first. Don't rewrite old entries: when a decision changes, add a new entry and mark the old one "Replaced by DEC-00X".

Template:

```markdown
## DEC-000: Title

- **Date:** YYYY-MM-DD
- **Status:** Accepted / Replaced by DEC-00X
- **Context:** the problem or question that led to this
- **Decision:** what was chosen
- **Reason:** why, and which alternatives were rejected
- **Consequences:** what this affects
```

---

## DEC-002: Two-processor architecture (MPU + MCU)

- **Date:** recorded 2026-09-11 (the design predates these docs)
- **Status:** Accepted (existing design)
- **Context:** The device must do heavy work (video, display, networking) and also real-time, always-on work (ignition sensing, power hold, CAN, GNSS, vehicle I/O).
- **Decision:** An application processor (MC6630) on the motherboard handles display, cameras, announcements and the backend link. A GD32F105 microcontroller on the baseboard handles power, GNSS, CAN, sensors and I/O, and feeds the MPU over UART.
- **Reason:** Inferred, confirm with the user: real-time and low-power tasks are more reliable on a microcontroller, and the MCU can manage power-up and safe shutdown of the MPU.
- **Consequences:** Two firmware/software stacks, and a UART protocol between them that must be designed and versioned ([MPU ↔ MCU UART Protocol](mpu-mcu-uart.md)).

## DEC-001: Documentation in Markdown on GitHub Pages

- **Date:** 2026-09-11
- **Status:** Accepted
- **Context:** Development will happen across many Claude sessions. Each new session needs the product context and the current state of the code without it being explained again.
- **Decision:** Keep all product and code documentation as Markdown files in the `primeedgeits/prime` repository, published with GitHub Pages. `llms.txt` lists every page and also builds the website's sidebar.
- **Reason:** Markdown is easy for both people and AI to read and edit. Plain files need no build step. `llms.txt` gives an AI assistant one address from which it can find everything. GitHub Pages hosting is free.
- **Consequences:** The docs are public. A new page appears in the sidebar only after it's added to `llms.txt`.
