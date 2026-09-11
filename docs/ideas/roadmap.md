# Roadmap

> **Status:** Draft · **Updated:** 2026-09-11

Phase 0 is in progress. Phases 1 to 4 are a suggested order for discussion, not agreed plans.

## Phase 0: Foundations

- [x] Documentation site set up (2026-09-11)
- [ ] Answer the open questions on the feature pages
- [x] Hardware platform: two-board design exists (baseboard V2.1 with GD32F105 MCU, MPU motherboard). Documented 2026-09-11
- [ ] Confirm the MPU part, its OS, and whether MPU/MCU software already exists
- [ ] Collect the remaining schematics: MPU motherboard, CAN add-on, amplifier add-on
- [ ] Choose the tech stack for firmware and backend

## Phase 1: Connected device (suggested)

- [ ] Device connects to the backend over TCP (login, heartbeat, reconnect)
- [ ] GPS location reporting
- [ ] Basic CAN data reading

## Phase 2: Video (suggested)

- [ ] Multi-camera recording to local storage
- [ ] Live view and playback requested from the backend

## Phase 3: Voice and vehicle health (suggested)

- [ ] Voice calls
- [ ] Health alerts and fault codes

## Phase 4: Pilot (suggested)

- [ ] Install on test buses
- [ ] Field reliability testing

## Why this order

The backend connection comes first because every other feature sends its data through it. Location and CAN data are small and easy to test before tackling video, which is the heaviest part in both hardware and bandwidth.
