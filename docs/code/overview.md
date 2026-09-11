# Codebase Overview

> **Status:** Draft · **Updated:** 2026-09-11

No product code exists yet. Fill this page in as repositories are created.

## Repositories

| Repository | Contents | Stack | Link |
|---|---|---|---|
| prime | This documentation site | Markdown, HTML/CSS/JS | https://github.com/primeedgeits/prime |
| TBD | Device firmware | TBD | |
| TBD | Backend server | TBD | |
| TBD | Web dashboard | TBD | |

## Tech stack

| Area | Choice | Decision |
|---|---|---|
| Baseboard MCU | GD32F105RBT6, Arm Cortex-M3 (existing hardware) | [MCU Pin Map](../hardware/baseboard/mcu-pinmap.md) |
| MCU firmware language and toolchain | TBD (C expected; GD32 firmware library or bare-metal) | |
| MPU (application processor) | MC6630, exact part TBD | [MPU Motherboard](../hardware/mpu-board.md) |
| MPU operating system | TBD | |
| MPU application language | TBD | |
| Backend language and framework | TBD | |
| Database | TBD | |
| Dashboard framework | TBD | |

Link each choice to its entry in [Decision Records](decisions.md) once made.

## Folder structure

Document each repository's layout here once it exists. Example of the level of detail that helps a new session find its way:

```text
firmware/
  src/
    video/   camera capture and recording
    gnss/    position
    can/     CAN bus reader
    net/     TCP connection to the backend
    call/    voice calls
```

## Feature-to-code map

| Feature | Code location |
|---|---|
| [Video Surveillance](../product/features/video-surveillance.md) | TBD |
| [GPS Tracking](../product/features/gps-tracking.md) | TBD |
| [Vehicle Health (CAN)](../product/features/vehicle-health-can.md) | TBD |
| [Backend Communication (TCP)](../product/features/backend-tcp.md) | TBD |
| [Voice Calls](../product/features/voice-calls.md) | TBD |
