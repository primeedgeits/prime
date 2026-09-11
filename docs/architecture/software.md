# Software Architecture

> **Status:** Idea · **Updated:** 2026-09-11

**Under construction.** The product owner will define this later.

Suggested outline to fill in when ready (Claude's proposal, not decided):

- **MPU software stack:** operating system, application layers (device manager, recording, PIS, backend client, UI), inter-process communication, storage layout, update mechanism.
- **MCU firmware:** module structure (drivers, protocol, GNSS, CAN, I/O, power), scheduling model (bare-metal loop or RTOS), configuration storage, bootloader and update path.
- **Protocols:** [MPU ↔ MCU UART](../code/mpu-mcu-uart.md), [Device ↔ Backend TCP](../code/tcp-protocol.md), LED board protocol, 4G module AT command usage.
- **Backend and dashboard:** services, data model, APIs, hosting.
- **Cross-cutting:** logging, diagnostics, security, versioning, testing.

## Related

- [Hardware Architecture](hardware.md)
- [System Architecture](../product/architecture.md)
- [Codebase Overview](../code/overview.md)
