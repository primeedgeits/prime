# MNVR Product Overview

> **Status:** Draft · **Updated:** 2026-09-11

## What it is

MNVR (Mobile Network Video Recorder) is an in-vehicle device for heavy vehicles such as buses. One unit combines five capabilities:

| Capability | What it does | Details |
|---|---|---|
| Video surveillance | Records video from cameras mounted on the vehicle | [Video Surveillance](product/features/video-surveillance.md) |
| GPS tracking | Reports the vehicle's location to the backend | [GPS Tracking](product/features/gps-tracking.md) |
| Vehicle health monitoring | Reads engine and vehicle data from the CAN bus | [Vehicle Health (CAN)](product/features/vehicle-health-can.md) |
| Backend communication | Two-way TCP link: the device sends data, the backend sends commands | [Backend Communication (TCP)](product/features/backend-tcp.md) |
| Voice calls | Voice communication with the vehicle | [Voice Calls](product/features/voice-calls.md) |

## How the pieces fit

The device sits in the vehicle and connects to cameras, the vehicle's CAN bus, a GNSS antenna, and audio hardware for calls. It reaches the backend server over a 4G mobile connection. See [System Architecture](product/architecture.md) for the diagram.

## Who it's for

TBD. Likely bus fleet operators and their control rooms; to confirm.

## Open questions

- Who are the target customers: public transport, private fleets, school buses, or others?
- Which regulations apply in the target market? For example, India's AIS-140 standard for public-transport vehicle tracking.
- Is the product the device only, or also the backend server and web dashboard?
- Is there a pilot customer or target vehicle model?

## Where development stands

See the [Development Log](code/dev-log.md) for the latest work and the [Roadmap](ideas/roadmap.md) for what comes next.
