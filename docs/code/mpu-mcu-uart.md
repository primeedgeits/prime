# MPU ↔ MCU UART Protocol

> **Status:** Draft · **Updated:** 2026-09-11 · **Protocol version:** none yet

The link between the application processor (MPU) and the microcontroller (MCU) on the baseboard. Everything the MCU collects reaches the backend through this link, and everything the MPU wants the MCU to do goes back over it. Nothing here is decided yet; the physical layer is fixed by the hardware.

## Physical layer (fixed by the baseboard)

| Item | Value |
|---|---|
| MCU side | UART4, PC10 (TX) and PC11 (RX), 3.3 V logic |
| MPU side | A UART on the MPU board, through baseboard P1 pins 5 (MCU TX → MPU RX) and 4 (MPU TX → MCU RX) |
| Extra lines | GPIO0, GPIO1, GPIO2 (MCU PA15, PB3, PB4 ↔ P1 pins 1, 3, 8), meaning TBD |
| Baud rate | TBD (115200 is a common choice for this kind of link) |
| Flow control | None (no RTS/CTS wired) |

## What must travel MCU → MPU

| Data | Rate | Notes |
|---|---|---|
| GNSS fix: time, latitude, longitude, speed, heading, fix quality, satellites | Every fix (1 Hz typical) | Raw NMEA pass-through is the simplest first version |
| CAN parameters | Periodic, rate TBD | Decoded values, or raw frames for the MPU to decode: decide (see [CAN Signal Map](can-signals.md)) |
| Accelerometer events and samples | On event; samples TBD | Harsh braking, acceleration, cornering, impact |
| Digital input changes, SOS, tamper | On change | Debounced |
| Ignition state | On change and in heartbeat | |
| Battery voltages | Periodic | +12 V rail and battery input |
| MCU status/heartbeat | Periodic | Firmware version, uptime, error flags |

## What must travel MPU → MCU

| Command | Purpose |
|---|---|
| Configuration | CAN bit rates and filters, report intervals, input debounce, thresholds |
| Digital outputs | Set/clear output 1 and 2 |
| Status LEDs | Set LED pattern (if not handled by the MCU alone) |
| Power | "Keep power on" heartbeat and "ready to power off" request, so the MCU knows when to release REL-EN |
| Time sync | Optional; the MCU has an RTC with battery backup |
| GNSS control | Power, wake, sleep |
| RS-232 pass-through | If the RS-232 port is used by the MPU |
| Firmware update | Update the MCU over this link (TBD whether needed) |

## Message format

TBD. Claude's suggestion, not decided: a framed binary protocol, since the link carries mixed binary data at a steady rate.

| Field | Size | Description |
|---|---|---|
| Start byte | 1 | Fixed value |
| Length | 1–2 | Payload length |
| Type | 1 | Message type |
| Sequence | 1 | For acknowledgements |
| Payload | variable | |
| CRC-16 | 2 | Over everything after the start byte |

Alternatives: newline-terminated ASCII (easy to debug with a terminal, weaker error detection), or a standard such as COBS-framed binary.

## Version history

| Version | Date | Change |
|---|---|---|
| — | 2026-09-11 | Page created from the baseboard hardware; nothing defined yet |
