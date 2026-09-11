# Voice Calls

> **Status:** Draft · **Updated:** 2026-09-11

## Summary

Voice communication with the vehicle. Who talks to whom is TBD.

## Hardware

The baseboard has a complete call audio path: the 4G module's PCM interface ↔ ALC5616 codec ↔ audio switches ↔ external microphone and the driver speaker through the amplifier add-on. The codec is configured by the 4G module over I2C. The MPU selects call mode with the CALL-SW and AMP_SW lines. Calls are therefore cellular voice calls made through the 4G module (VoLTE or circuit-switched, depending on the module and network). A VoIP call would instead use the USB audio path to the MPU. See [Audio Paths](../../hardware/baseboard/audio.md).

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
- [Audio Announcements](../../sections/pis/audio-announcements.md) (calls take priority over announcements)
