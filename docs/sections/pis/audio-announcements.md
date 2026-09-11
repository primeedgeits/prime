# PIS: Audio Announcements

> **Status:** Draft · **Updated:** 2026-09-11

Items tagged **[given]** come from the product owner. All other items are proposals: keep, edit or delete them. Tick a box when the feature is implemented and tested. Flows are on the [PIS Overview](overview.md) page; the hardware path is on [Audio Paths](../../hardware/baseboard/audio.md).

## Sources and content

- [ ] Audio updates are part of PIS **[given]**
- [ ] Announcement source: pre-recorded audio files per stop and language, or text-to-speech (TBD)
- [ ] Languages and their order (TBD)
- [ ] Chime before each announcement
- [ ] Message library: welcome, next stop, arrived, terminal, safety, delay, diversion, custom
- [ ] Missing-audio fallback: text-to-speech or chime plus display, and an error report

## Triggers

- [ ] Automatic next-stop announcement from GPS position and the active route **[given]**
- [ ] Arrival and departure announcements (proposed)
- [ ] Welcome announcement at trip start; terminal announcement at the last stop
- [ ] Safety or informational messages at a configurable interval or stop count
- [ ] Ad-hoc message chosen by the driver from the touch screen
- [ ] Message triggered remotely by the backend (proposed)
- [ ] Manual repeat and skip by the driver

## Playback control

- [ ] Default volume; separate volumes per message type; quieter schedule at night
- [ ] Priority and interruption: voice call, then emergency/safety, then next stop, then informational
- [ ] Interrupted announcements repeated if still relevant
- [ ] Audio switch (AMP_SW) set to the announcement path during playback and restored after a call
- [ ] No repeat of the same stop announcement within a trip; hysteresis at geofence boundaries
- [ ] Public address by the driver through the microphone (proposed)
- [ ] Mute and temporary volume reduction by the driver, with automatic restore

## Content updates

- [ ] Audio files delivered in versioned content packages from the backend
- [ ] Checksum verification; previous version kept as fallback
- [ ] Storage budget for audio content defined
- [ ] Active version reported to the backend

## Logging

- [ ] Every announcement logged with time, stop, GPS position and result
- [ ] Announcement log available to the backend (proposed)
- [ ] Speaker test from the technician menu
