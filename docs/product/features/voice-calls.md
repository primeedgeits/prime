# Voice Calls

> **Status:** Draft · **Updated:** 2026-09-11

## Summary

Voice communication with the vehicle. Who talks to whom, and the technology used, are TBD.

## Requirements

| ID | Requirement | Status |
|---|---|---|
| CALL-1 | Voice call between the vehicle and the control room | Draft |
| CALL-2 | Backend can start a call with a TCP command | Idea |
| CALL-3 | Driver can start a call from the vehicle, for example with a button | Idea |

## Open questions

- Who calls whom: driver and control room, passengers in an emergency, or both?
- Technology: a normal mobile call through the 4G module (VoLTE), or an internet call (VoIP/SIP) over mobile data?
- Audio hardware: handset, or hands-free microphone and speaker?
- Should incoming calls be answered automatically?
- Should calls be recorded?

## Related

- [Backend Communication (TCP)](backend-tcp.md)
- [Hardware](../hardware.md)
