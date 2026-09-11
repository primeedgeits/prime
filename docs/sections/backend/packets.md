# Backend Communication: Packet Catalogue

> **Status:** Draft · **Updated:** 2026-09-11

What is sent, when, and what it contains. Byte-level framing lives in the [Device ↔ Backend TCP Protocol](../../code/tcp-protocol.md); this page is the functional list.

Only the tracking and health packets are confirmed to exist **[given]**; their contents are still TBD. The product owner will describe the other packets later. Rows marked "proposed" are Claude's suggestions for what a complete system usually needs.

## Device → backend

| Packet | Status | When | Proposed contents |
|---|---|---|---|
| Tracking | **[given]**, contents TBD | Every N seconds (moving/stopped intervals), on ignition change, on heading change, with events | Device ID, timestamp, latitude, longitude, speed, heading, altitude, satellites, fix quality, ignition state, odometer, active route and trip ID, battery voltages, mobile signal strength |
| Health parameters | **[given]**, contents TBD | Every M seconds and on alert | CAN values (latest/min/max/avg per value), active fault codes, stale flags, plus device health (storage, cameras, temperature) unless sent separately |
| Login | proposed | On every connection | Device ID, credentials, firmware versions (MPU, MCU), hardware revision, config version, content version |
| Heartbeat | proposed | Every H seconds | Device ID, uptime, connection statistics |
| Event / alarm | proposed | Immediately | Event type (SOS, harsh braking, impact, digital input, tamper, geofence, route deviation, video loss, storage fault, CAN alert), position, time, details |
| Trip | proposed | Trip start and end | Route, direction, driver, start/end time and position, distance, stop-by-stop arrival times |
| Upload complete | proposed | After an FTP upload | File names, sizes, checksums, event ID |
| Command ACK | proposed | After each command | Command ID, result code, message, progress for long operations |
| Status / config report | proposed | On request and after a change | Full settings snapshot and versions |
| Announcement log | proposed | Batched | Time, stop, message, result |
| MCU status | proposed | Periodic | MCU firmware version, ignition, relay, inputs, accelerometer summary, errors |

## Backend → device

| Packet | Status | Purpose | Proposed contents |
|---|---|---|---|
| Login response | proposed | Accept or reject the device | Result, server time, config version, content version |
| Heartbeat ACK | proposed | Keep-alive | |
| Event ACK | proposed | Confirm an event was stored | Event ID |
| Set configuration | proposed | Change settings | Key/value list, apply mode (now or at trip end) |
| Content update | proposed | Push routes, texts, audio | Package URL or FTP path, version, checksum, apply mode |
| Firmware update | proposed | Update MPU or MCU firmware | Target, URL, version, checksum, schedule |
| Request video | proposed | Live stream or clip | Channel(s), live or time range, stream parameters |
| Request snapshot | proposed | Still image | Channel |
| Call control | proposed | Start or end a voice call | Number or mode (call control room), auto-answer |
| Set output | proposed | Drive a digital output | Output number, state, duration |
| Play message | proposed | Trigger an announcement | Message ID or text |
| Set route | proposed | Change the active route remotely | Route, direction |
| Reboot / diagnostics | proposed | Maintenance | Target (MPU, MCU, 4G), log upload request |

## Conventions to decide

- Every packet carries the device ID, a sequence number and a timestamp.
- Every device → backend packet that matters (events, uploads, trips) is acknowledged; unacknowledged packets are resent.
- Historical (store-and-forward) packets are marked so the backend can tell live from delayed data.
- Timestamps in UTC, from the GPS clock.
- Versioning: a protocol version in the login packet so old devices and new backends can coexist.
