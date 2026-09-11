# Backend Communication: Functionality Checklist

> **Status:** Draft · **Updated:** 2026-09-11

Items tagged **[given]** come from the product owner. All other items are proposals: keep, edit or delete them. Tick a box when the feature is implemented and tested. Flows are on the [Overview & Flow](overview.md) page; packets on the [Packet Catalogue](packets.md).

## Connection

- [ ] Two-way TCP link to the backend **[given]**
- [ ] 4G module power-up, network registration and data session with configurable APN
- [ ] Primary and backup server addresses; DNS or fixed IP
- [ ] Automatic reconnect with increasing delay
- [ ] Heartbeat with dead-link detection on both sides
- [ ] Connection state shown on screen and on a status LED
- [ ] Mobile signal strength and network type reported

## Authentication and security

- [ ] Login with device ID and credentials; backend acceptance required before data flows
- [ ] TLS on the TCP link (TBD)
- [ ] Per-device credentials provisioned at manufacture; rotation by the backend
- [ ] Commands validated and authenticated
- [ ] FTP credentials per device; SFTP or FTPS considered

## Packets

- [ ] Tracking packet **[given]**, contents to be defined
- [ ] Health-parameter packet **[given]**, contents to be defined
- [ ] Other packets as described by the product owner (TBD), see the catalogue for proposals
- [ ] Every packet has device ID, sequence number and UTC timestamp
- [ ] Acknowledgement and resend for events, uploads and trip packets
- [ ] Protocol version negotiated at login

## Intervals and triggers

- [ ] Tracking interval configurable for moving and stopped states
- [ ] Extra tracking packets on ignition change, heading change and events
- [ ] Health interval configurable; immediate on alert
- [ ] Heartbeat interval configurable

## Store-and-forward

- [ ] Persistent outgoing queue that survives reboot and power loss
- [ ] Drained in order after reconnect; historical packets marked as such
- [ ] Live packets prioritised over backlog
- [ ] Queue limits by size and age, with oldest-drop policy and a report when data was dropped

## Commands

- [ ] Configuration changes applied now or at trip end, with ACK
- [ ] Content package download, verify, apply, report
- [ ] Firmware update for the MPU and for the MCU (through the MPU), with rollback on failure
- [ ] Video live stream and clip requests
- [ ] Snapshot request
- [ ] Call control
- [ ] Digital output control
- [ ] Remote announcement
- [ ] Remote route change
- [ ] Reboot and log upload

## File transfers

- [ ] Video clip upload to the backend FTP server on panic press **[given]**
- [ ] Resume of interrupted uploads; retry with back-off
- [ ] Upload-complete notification with checksums
- [ ] Snapshot and log uploads (proposed)
- [ ] Downloads verified by checksum before use

## Time

- [ ] Device clock set from GPS; server time compared at login and drift reported

## Data usage and diagnostics

- [ ] Monthly data usage counted per category (tracking, health, video, downloads) and reported
- [ ] Bandwidth caps for video
- [ ] Connection log (connects, disconnects, reasons) kept locally and available to the backend
