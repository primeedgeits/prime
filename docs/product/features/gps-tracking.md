# GPS Tracking

> **Status:** Draft · **Updated:** 2026-09-11

## Summary

Determines the vehicle's position with satellite positioning and reports it to the backend.

## Hardware

The GNSS receiver (Quectel L89 / L86 / LC86L footprint) is on the baseboard and is read by the MCU over USART2. The MCU forwards fixes to the MPU over UART; the MPU processes them and sends them to the backend over 4G. The receiver has a backup battery for warm starts and its power is switched by the MCU. See [Communications](../../hardware/baseboard/comms.md).

## Requirements

| ID | Requirement | Status |
|---|---|---|
| GPS-1 | Report position, speed, heading and time to the backend | Draft |
| GPS-2 | Keep positions while offline and send them when the connection returns | Idea |
| GPS-3 | Geofence and route-deviation alerts | Idea |

## Open questions

- Report interval while moving, and while parked?
- Which satellite systems: GPS only, or also NavIC, GLONASS and others?
- Required accuracy?
- Are geofences checked on the device or on the backend?
- Does position need to continue in tunnels or depots (dead reckoning)?

## Related

- [Device ↔ Backend TCP Protocol](../../code/tcp-protocol.md)
- [Hardware](../hardware.md)
- [PIS Management](../../sections/pis/overview.md) (stop announcements from position) and [Backend Communication](../../sections/backend/overview.md) (tracking packets)
