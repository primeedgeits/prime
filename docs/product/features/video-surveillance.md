# Video Surveillance

> **Status:** Draft · **Updated:** 2026-09-11

## Summary

Records video from cameras mounted on the vehicle and stores it on the device. How the backend accesses video is TBD.

## Hardware

Cameras connect to the MPU motherboard, not the baseboard, and the MPU handles all camera operations. Camera type, count and storage are TBD. See [MPU Motherboard](../../hardware/mpu-board.md).

## Requirements

| ID | Requirement | Status |
|---|---|---|
| VID-1 | Record video from several cameras at the same time | Draft |
| VID-2 | Store recordings on the device | Draft |
| VID-3 | Live view from the backend | TBD |
| VID-4 | Play back or download recorded video from the backend | TBD |

## Open questions

- How many camera channels? Bus setups commonly cover the road ahead, the driver, the doors and the passenger area.
- Camera type: AHD (coaxial) or IP (Ethernet)?
- Resolution and frame rate per channel?
- Codec: H.264 or H.265?
- Storage: HDD, SSD or SD card? How many days of recordings must be kept?
- Recording mode: continuous, event-triggered, or both?
- Is live video streamed to the backend? Over which protocol, and within what monthly mobile-data budget?
- Record cabin audio?

## Related

- [Backend Communication (TCP)](backend-tcp.md)
- [Hardware](../hardware.md)
