# Camera Management: Functionality Checklist

> **Status:** Draft · **Updated:** 2026-09-11

Items tagged **[given]** come from the product owner. All other items are proposals drawn from common MNVR practice: keep, edit or delete them. Tick a box when the feature is implemented and tested. Flows are on the [Overview & Flow](overview.md) page.

## Camera integration

- [ ] 8 camera channels supported **[given]**
- [ ] Camera type and interface per channel: TBD (AHD, IP, MIPI)
- [ ] Per-channel enable/disable
- [ ] Per-channel resolution, frame rate and bitrate configurable
- [ ] Automatic detection of connected cameras at boot and on reconnect
- [ ] Video-loss detection per channel, with retry and alert
- [ ] Channel naming (for example: front road, driver, front door, rear door, cabin 1–3, rear)
- [ ] Image flip/mirror per channel
- [ ] Audio recording on selected channels: TBD whether required
- [ ] Night mode handling (camera-side IR) verified

## Recording

- [ ] Continuous recording of all enabled channels while the ignition is on
- [ ] Fixed-length segment files (proposal: 1–5 minutes)
- [ ] Codec: H.264 or H.265 (TBD)
- [ ] Overlay (OSD): time, vehicle ID, channel name, GPS position, speed
- [ ] Recording modes: continuous, event-only, and delayed stop after ignition off
- [ ] Recording continues N minutes after ignition off, using the MCU power hold
- [ ] Recording status shown on screen and on a status LED
- [ ] Low-resolution sub-stream recorded alongside the main stream, for fast preview and upload
- [ ] Clock set from GPS so timestamps are trustworthy

## Storage

- [ ] Storage medium and capacity: TBD (SSD, SD, eMMC)
- [ ] Loop recording: oldest unlocked segments deleted when storage is full
- [ ] Event-locked segments protected until uploaded, acknowledged and past the retention time
- [ ] Storage health monitoring (errors, write speed), alert on failure
- [ ] Power-loss safe filesystem handling; segments closed cleanly at shutdown
- [ ] Retention target: TBD days
- [ ] Format/initialise storage from settings, with confirmation
- [ ] Encryption of stored video: TBD whether required

## Event clips and FTP upload

- [ ] Panic/SOS press triggers clip creation and FTP upload to the backend **[given]**
- [ ] Other triggers (proposed): harsh braking or impact from the accelerometer, door events, backend request, geofence, tamper
- [ ] Pre-event and post-event durations configurable (proposal: 30 s and 60 s)
- [ ] Channels included per trigger configurable (for example SOS → all 8, harsh braking → front road only)
- [ ] Persistent upload queue that survives reboot and power loss
- [ ] FTP upload over the 4G link with resume of partial uploads and retry with back-off
- [ ] File naming: vehicle ID, channel, event type, event ID, start time
- [ ] Upload-complete notification to the backend with checksums; backend ACK clears the queue
- [ ] Upload priority: SOS first; bandwidth cap; uploads paused during live streaming
- [ ] Mobile data usage accounting per month
- [ ] Manual "upload this range" from the touch screen (proposed)

## Live view on the monitor

- [ ] Grid layouts: 1, 4, 8 channels
- [ ] Touch a tile for full screen; touch again to return
- [ ] Auto-cycle mode through channels
- [ ] Channel name, time and recording status shown per tile
- [ ] Rear camera shown full screen when reverse gear is engaged, via a digital input (proposed)
- [ ] Screen dims or turns off when parked; wakes on touch

## Playback and export

- [ ] Search by channel and date/time; timeline shows normal and event footage
- [ ] Play, pause, seek, fast forward, rewind, snapshot
- [ ] Multi-channel synchronous playback (proposed)
- [ ] Export a selected range and channels to a USB drive on the external USB port
- [ ] Exported files playable on a PC (standard MP4), optionally watermarked
- [ ] PIN protection for playback and export (proposed)
- [ ] Export log: who, when, which footage

## Remote access (TBD)

- [ ] Live stream of a channel on backend request (protocol and bandwidth TBD)
- [ ] Clip request by time range from the backend
- [ ] Snapshot on request
- [ ] Recording and storage status query

## Health and alerts

- [ ] Video-loss alert (screen and backend)
- [ ] Storage failure or nearly-full alert
- [ ] Recording-stalled alert (watchdog on segment writes)
- [ ] Camera tamper or lens-covered detection (proposed)
- [ ] Temperature warnings

## Configuration

- [ ] All settings above editable on the touch screen (technician PIN) and from the backend
- [ ] Settings versioned and reported to the backend
