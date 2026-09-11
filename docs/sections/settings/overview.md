# Settings Management: Overview

> **Status:** Idea · **Updated:** 2026-09-11

## Known so far

Given by the product owner: **no settings requirements yet**; they will be described later.

Everything below is a proposal for what the other sections will need, so that settings are designed once rather than per section. Delete or edit freely.

## Proposed principles

- One settings store on the MPU, with the MCU's settings pushed to it over UART at boot and on change.
- Every setting has a default, a valid range, a scope (device, route, vehicle profile) and a version.
- Settings can be changed from the touch screen (with a technician PIN) and from the backend; the device reports its full settings snapshot and version after any change.
- Changes that affect a running trip apply at trip end unless forced.
- Backup and restore of settings to a USB drive; factory reset with confirmation.

## Proposed settings areas

- [ ] **Device identity:** vehicle ID, registration number, fleet, depot, device serial
- [ ] **Network:** APN, primary and backup servers, ports, TLS, FTP server and credentials, heartbeat and reporting intervals
- [ ] **Cameras and recording:** per-channel enable, names, resolution, frame rate, bitrate, codec, segment length, overlay, ignition-off recording time
- [ ] **Storage:** retention, event lock duration, format
- [ ] **Events:** pre/post durations, channels per trigger, harsh-driving thresholds, SOS behaviour
- [ ] **PIS:** languages, volumes and schedule, approach and arrival radii, board configuration, content version
- [ ] **CAN:** bit rates, vehicle profile, listen-only, thresholds, reporting intervals
- [ ] **Power:** power-hold time after ignition off, low-battery cut-off
- [ ] **Display:** brightness, dim/off timers, default layout
- [ ] **Users and access:** driver login, technician PIN, what each role can change
- [ ] **Time:** time zone, GPS time sync
- [ ] **Maintenance:** firmware versions, logs, diagnostics, reboot, factory reset

## Related

- [Backend Communication](../backend/overview.md) (remote configuration)
- [Camera Management](../camera/overview.md), [PIS Management](../pis/overview.md), [CAN Health Monitoring](../can-health/overview.md)
