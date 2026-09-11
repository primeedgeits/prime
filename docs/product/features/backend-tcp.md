# Backend Communication (TCP)

> **Status:** Draft · **Updated:** 2026-09-11

## Summary

The device keeps a TCP connection to the backend server over 4G. The link works both ways:

- **Device → backend:** location, health data, events and alarms, device status.
- **Backend → device:** commands such as configuration changes, video requests and call control.

## Requirements

| ID | Requirement | Status |
|---|---|---|
| TCP-1 | Keep a persistent connection and reconnect automatically when it drops | Draft |
| TCP-2 | Send telemetry and events from the device to the backend | Draft |
| TCP-3 | Receive commands from the backend and acknowledge each one | Draft |
| TCP-4 | Store messages while offline and send them after reconnecting | Idea |
| TCP-5 | Encrypt the connection and authenticate each device | TBD |

## Open questions

- Message format: a custom binary protocol, text/JSON, or an existing standard? Options include JT/T 808 (with JT/T 1078 for video), widely used by vehicle terminals, or the protocol required by AIS-140 where that applies.
- Is the connection encrypted with TLS?
- How does a device prove its identity (for example IMEI plus a secret key)?
- Heartbeat interval?
- Does video use this connection or a separate one?
- What is the backend built with?

## Related

- [Device ↔ Backend TCP Protocol](../../code/tcp-protocol.md): message-level specification
- [System Architecture](../architecture.md)
