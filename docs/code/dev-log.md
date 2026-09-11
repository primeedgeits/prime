# Development Log

> **Status:** Decided · **Updated:** 2026-09-11

A record of each work session, newest first. Add an entry at the end of every session so the next one knows where things stand.

Template:

```markdown
## YYYY-MM-DD: Short title

**Done**
- ...

**Decisions**
- ... (link to Decision Records)

**Next**
- ...

**Open issues**
- ...
```

---

## 2026-09-11: Baseboard V2.1 schematic documented

**Done**
- Recorded the two-processor architecture: MC6630 MPU motherboard + baseboard V2.1 with a GD32F105RBT6 MCU.
- Wrote the hardware section from the schematic "NVR STM BASEBOARD V2_1": overview, power and ignition, MCU pin map, connectors, audio paths, communications, digital I/O, PCB.
- Updated the feature pages, architecture, glossary, code overview and CAN settings to match the hardware.
- Added a stub for the MPU ↔ MCU UART protocol.

**Decisions**
- [DEC-002: Two-processor architecture](decisions.md#dec-002-two-processor-architecture-mpu-mcu)

**Next**
- Copy the schematic PDF into `docs/hardware/files/NVR-STM-BASEBOARD-V2_1.pdf`.
- Confirm the exact MPU part, OS, and whether MPU software and MCU firmware already exist.
- Resolve the USB topology question (touch panel direct vs on the hub; USB audio chip).
- Get the MPU motherboard, CAN add-on and amplifier add-on schematics.
- Confirm items marked "verify" on the hardware pages, starting with the WAKEUP polarity, MCU_PWR_EN source and J6 pinout.

**Open issues**
- None.

## 2026-09-11: Documentation site created

**Done**
- Created the GitHub repository `primeedgeits/prime` and connected the local folder `C:\Users\Ansari\Desktop\prime`.
- Built this documentation site. The sidebar is generated from `llms.txt`, pages are Markdown files, and GitHub Pages hosts it.
- Wrote first drafts of the product overview, feature pages and code documentation templates. Most technical details are still TBD.

**Decisions**
- [DEC-001: Documentation in Markdown on GitHub Pages](decisions.md#dec-001-documentation-in-markdown-on-github-pages)

**Next**
- Answer the open questions on the feature pages: camera count and type, CAN protocol, call technology, TCP message format.
- Choose the hardware platform and the tech stack.

**Open issues**
- None.
