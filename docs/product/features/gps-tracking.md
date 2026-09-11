# GPS Tracking

> **Status:** Draft · **Updated:** 2026-09-11

## Summary

Determines the vehicle's position with satellite positioning and reports it to the backend.

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
