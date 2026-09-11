# PIS: LED Display Updates

> **Status:** Draft · **Updated:** 2026-09-11

Items tagged **[given]** come from the product owner. All other items are proposals: keep, edit or delete them. Tick a box when the feature is implemented and tested. Flows are on the [PIS Overview](overview.md) page.

## Boards and connection

- [ ] LED display updates are part of PIS **[given]**
- [ ] Board set: front destination board, side board, rear board, inside next-stop board (TBD which exist)
- [ ] Physical link: TBD (RS-485 from baseboard P13 is the candidate); board vendor protocol TBD
- [ ] Multiple boards addressed on one bus
- [ ] Board presence detection and fault reporting (no acknowledgement → alert)
- [ ] Boards re-sent their content automatically after a power cycle or reconnect

## Content

- [ ] Route number, destination and "via" text per board
- [ ] Languages: TBD (for example Tamil and English), alternating on a timer
- [ ] Inside board: next stop, current time, custom message
- [ ] Scrolling or paging for text longer than the board
- [ ] Font and bitmap assets managed as part of the content package
- [ ] Special states: "Not in service", "Depot", "Special", custom text entered by the driver

## Update flow

- [ ] Boards updated at trip start, on direction change, and on manual route change **[given: manual route update]**
- [ ] Inside board follows the stop pointer during the trip
- [ ] Each update confirmed by the board where the protocol supports it; retried on failure; alert after N failures
- [ ] Brightness by time of day or ambient light, where boards support it
- [ ] Preview of the board content on the touch screen before sending

## Content management

- [ ] Route and display data downloaded from the backend as versioned content packages
- [ ] Package verified before use; previous version kept as fallback
- [ ] Active content version reported to the backend
- [ ] Manual import from USB drive for depots without connectivity (proposed)

## Logging and diagnostics

- [ ] Log of every board update with time and result
- [ ] Board communication test from the technician menu
- [ ] Board status included in the device health report to the backend
