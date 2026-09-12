# Development Log

> **Status:** Decided · **Updated:** 2026-09-12

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

## 2026-09-12: Existing application documented and IS 16833 test checklist added

**Done**
- New page [minixvr Software Documentation](minixvr-olectra.md): full read of the existing Qt application (threads, modem bring-up, `&PEIS` packet formats, recording, playback, OTA, PIS, calls, CAN, UI map) plus 14 code observations that feed the tests.
- New "Standards & Testing" sidebar card with [IS 16833 Annex D Summary](../standards/is16833-annex-d.md) and [IS 16833 Test Checklist](../standards/is16833-test-checklist.md) (requirement-to-code mapping, about 150 test cases, post-environmental smoke set, installation checks).
- Codebase Overview now lists the existing application; Software Architecture links to it.

**Decisions**
- None. The hard-coded admin credentials and the vendor config host are deliberately not reproduced in these public pages.

**Next**
- Run the checklist on the current build and record results; the GAP-tagged cases are expected to fail.
- Put the `MNVR_VER-1_OLECTRA` source under git (with build outputs ignored).
- Decide which IS 16833 gaps (emergency path, 40 000-log store, standard packet fields, audio, event retention, browser download) go on the roadmap.

**Open issues**
- Health packet HDD flag reads the ignition bit; telemetry threads spin at 100 % CPU; primary TCP socket leaks per send; baseboard OTA retries forever on NACK.

---

## 2026-09-11: Architecture card added

**Done**
- New "Architecture" sidebar card holding System Architecture (moved from Product Documentation), a new Hardware Architecture page and a Software Architecture placeholder.
- Hardware Architecture traces each product section through the schematics: components, signal path, and the driver or firmware module on each processor, plus a driver inventory and a gaps list.

**Decisions**
- None.

**Next**
- Product owner to define the Software Architecture page.
- MPU board schematic and OS choice, which fix most TBDs on the Hardware Architecture page.

**Open issues**
- None.

## 2026-09-11: Product sections added

**Done**
- New "Product Sections" sidebar card with five areas: Camera Management, PIS Management (LED display, audio announcements), CAN Health Monitoring, Backend Communication (with a packet catalogue), Settings Management.
- Each area has a flow description and checklists. Items tagged [given] came from the product owner; everything else is a proposal for review.

**Decisions**
- None.

**Next**
- Product owner reviews the checklists: confirm, edit or delete proposed items.
- Describe the remaining backend packets and the settings requirements.
- Decide the open items listed under "Decisions needed" on each overview page (camera type and storage, LED board protocol, announcement source, CAN decoding location, backend message format).

**Open issues**
- None.

## 2026-09-11: Baseboard V2.1 schematic documented

**Done**
- Recorded the two-processor architecture: MC6630 MPU motherboard + baseboard V2.1 with a GD32F105RBT6 MCU.
- Wrote the hardware section from the schematic "NVR STM BASEBOARD V2_1": overview, power and ignition, MCU pin map, connectors, audio paths, communications, digital I/O, PCB.
- Updated the feature pages, architecture, glossary, code overview and CAN settings to match the hardware.
- Added a stub for the MPU ↔ MCU UART protocol.
- Documented the amplifier add-on (TPA3116D2) and the single-channel CAN add-on (SN65HVD1050) from their schematics.
- USB topology clarified: whether the touch panel or the USB audio chip sits on hub port 1 varies by project.

**Decisions**
- [DEC-002: Two-processor architecture](decisions.md#dec-002-two-processor-architecture-mpu-mcu)

**Next**
- Copy the three schematic PDFs into `docs/hardware/files/` (baseboard, amplifier, CAN sheet).
- Confirm the exact MPU part, OS, and whether MPU software and MCU firmware already exist.
- Get the MPU motherboard schematic.
- Confirm whether a second CAN add-on is fitted for CAN2, and which termination parts are fitted on the CAN board.
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
