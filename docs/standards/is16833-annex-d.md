# IS 16833 : 2018 Annex D Summary

> **Status:** Decided · **Updated:** 2026-09-12

Digest of Annex D, "CCTV system with an in-built tracking system and integrated emergency system for buses" (pages 50–75 of the standard). This section describes only what the standard asks for. The mapping to the `minixvr` code and the executable tests are in the [IS 16833 Test Checklist](is16833-test-checklist.md).

---

## 1. Scope and system options (D-1, D-2)

The annex gives functional specifications, test requirements and the communication protocol for a bus CCTV system. Three configurations are allowed:

- Analog cameras with a mobile DVR (mDVR).
- IP cameras with a mobile NVR (mNVR).
- Hybrid DVR with a mix of analog and IP cameras when more than four channels are needed; mDVR/mNVR specifications then apply to the hybrid unit.

The MNVR product falls under the IP camera + mNVR option, so the sections below follow D-2.4 (IP camera), D-2.5 (mNVR) and D-2.6 (tracking in mNVR).

## 2. IP camera (D-2.4)

| # | Requirement |
|---|---|
| 1 | Colour camera, monochrome at night with IR on |
| 2 | Fixed 3.6 mm lens |
| 3 | Minimum 1 megapixel, 1280 × 720 |
| 4 | 1/3" CCD or CMOS progressive scan |
| 5 | H.264 video compression (printed as "H.254" in the standard) |
| 6 | G.711 or G.726 audio compression |
| 7 | 1 to 25 fps at each resolution |
| 8 | Minimum illumination 0.01 lux at F1.2 with IR off, 0 lux with IR on |
| 9 | Shutter 1/50 s to 1/100 000 s |
| 10 | Built-in IR LEDs, minimum 10 m, auto day/night |
| 11 | Rugged, vibration, shock and tamper-proof metal housing; anti-vibration multipoint locking mount |
| 12 | Built-in or separate microphone |
| 13 | ATW, AGC, WDR and BLC image enhancement |
| 14 | Powered from the mNVR by PoE |
| 15 | Automatic motion detection |
| 16 | RJ45 10/100 Ethernet |
| 17 | ONVIF Profile S |

## 3. mNVR (D-2.5)

| # | Requirement |
|---|---|
| 1 | One video output |
| 2 | 4 video channels for up to 4 cameras, 8 channels for 5 to 8 cameras |
| 3 | One audio output |
| 4 | H.264 video compression |
| 5 | G.711 or G.726 audio compression |
| 6 | Dual streams per camera, each with independent resolution and frame rate |
| 7 | Recording resolution 720p / 4CIF / 2CIF / CIF / QCIF, settable per channel and per stream |
| 8 | 1 to 25 fps per channel at 720p (50 fps total for 4 cameras, 100 fps total for 8) |
| 9 | Minimum 4 alarm inputs (NO/NC configurable) and 2 alarm outputs |
| 10 | Storage: 500 GB (up to 4 cameras) or 1 TB (5 to 8 cameras); 2.5" SATA HDD, SSD or industrial SD; anti-vibration, pluggable, removable, lockable |
| 11 | Recording modes: normal, schedule, alarm-triggered, motion detection. Alarm sources include emergency button, emergency door, brake, reversing, enclosure open |
| 12 | Event-based recording and tagging with pre-record 1 to 30 min and post-record 1 to 30 min |
| 13 | Configurable shutdown delay after ignition off, up to 24 h in hours and minutes |
| 14 | Integrated PoE switch sized for all cameras with IR on |
| 15 | LAN RJ45 (in addition to camera ports); Wi-Fi 802.11 b/g/n optional; built-in 3G module with 2G fallback on 900/1800/2100 MHz, SMS, voice, GPRS/TCP-IP data, multi-network OTA switching |
| 16 | Embedded SIM per TEC specification, 10-year life, over 1 million write cycles |
| 17 | Built-in 3-axis accelerometer and 3-axis gyroscope for rapid acceleration, sudden braking and hard turn |
| 18 | Secured (encrypted, tunnelled) data transmission to the backend, e.g. dedicated APN |
| 19 | Provide GPS data over RS232/Ethernet to other on-bus devices; receive route number from on-board devices and forward it to the backend |
| 20 | Transmission mode "always on", or turned on by emergency button, SMS, telephone or I/O alerts |
| 21 | ONVIF Profile S |
| 22 | One RS232 and one USB 2.0 |
| 23 | External GSM and GPS antennas |
| 24 | Minimum 5 configurable image quality settings |
| 25 | Tamper-proof watermark |
| 26 | Cyclic overwrite of oldest recordings; event-tagged recordings protected for a configurable 7 to 30 days |
| 27 | Vibration/shock-resistant locking connectors |
| 28 | LED indicators for power, recording and network |
| 29 | Health reporting over 2G/3G/SMS: cameras not functioning, camera tamper, storage error, storage full, video loss, camera cover; periodic images, video and snapshots at configurable resolution; detection of any component failure with alert |
| 30 | Over-the-air configuration of mNVR and cameras and OTA firmware upgrade |
| 31 | Independently configurable motion-detection zones per camera |
| 32 | Built-in RTC, drift not more than 10 s |
| 33–34 | Laptop on RJ45 opens the recorder UI in a browser at a fixed URL such as `http://dvr` with no network configuration; after login the user can search, view and download clips as .avi or .mpg for a chosen date, time and duration, and cannot delete video or change settings with that login |
| 35 | Normal operation: send health and camera images at configurable frequency over 3G. Emergency: send camera video at configurable frame rate and resolution. Without 3G, fall back to 2G for health data and to lower frame rate and resolution for emergency video |

## 4. Tracking function inside the mNVR (D-2.6)

| # | Requirement |
|---|---|
| 1 | Poll any operational GNSS (location, speed, heading, time) and send at 10 s or faster; IRNSS support for devices installed after 1 Sept 2017 |
| 2 | Location on demand over 3G with configurable SMS backup |
| 3 | External GPS antenna |
| 4 | Store at least 40 000 positional logs |
| 5 | Acquisition sensitivity better than −148 dBm |
| 6 | Tracking sensitivity better than −165 dBm |
| 7 | Position accuracy better than 6 m 2DRMS or 2.5 m CEP |
| 8 | Hot start under 5 s, warm start under 30 s, cold start under 40 s, measured after the recorder has booted |
| 9 | A-GPS support |
| 10 | Send serving and adjacent cell IDs and the network measurement report (NMR) |
| 11 | OTA firmware and configuration download, remote administration, and the ability to send a packet to two different IP addresses |

## 5. Emergency buttons (D-3)

Normally-closed type. Easy to press in an emergency but shaped to avoid accidental presses.

## 6. Optional add-ons (D-4)

- Driver console: 7" TFT, 400 cd/m² minimum, 800 × 480 or better, two video inputs, live view and playback, powered from the recorder.
- Wi-Fi access point on USB 2.0, 802.11 b/g/n, 10 m range, SD card backup and data export from the recorder.

## 7. Communication protocol (D-5)

### 7.1 What goes where (D-5.1)

| Data | IP 1 (transport backend) | IP 2 (emergency response backend) | When |
|---|---|---|---|
| Video | Yes | – | Only on emergency button press |
| Tracking | Yes | Yes | Continuous to IP 1; to IP 2 only during emergency |
| Health status | Yes | – | At the configured frequency |
| Image snapshots | Yes | – | At the configured frequency and resolution, up to 720p |

### 7.2 Emergency video (D-5.2.1)

On any emergency button the recorder streams the camera sub-stream to the backend at configurable frame rate and resolution for a configurable duration, with metadata: vehicle registration number (may be the recorder ID), camera ID, date and time, location and speed. The same metadata is burned into the video as a watermark.

### 7.3 Data on request (D-5.2.2)

The backend can poll the recorder to download live or recorded video and audio, searched by date and time.

### 7.4 Tracking data (D-5.2.3)

Different transmission frequencies must be supported for ignition off, ignition on and emergency (emergency overrides the others).

**Login message**, sent whenever the device connects to the server:

| Field | Sample |
|---|---|
| `$Msg.Server.Login` | start of message |
| `$DeviceName` | DL3CBM9821 (vehicle number) |
| `$IMEI` | 123456789012345 |
| `$Firmware` | 1.0.0 |
| `$Protocol` | 1.0.1 |
| `$LastValidLocation` | `$1,220714,050656,28.758963,N,77.6277844,E,25` |

**Tracking message** minimum fields, in order (the standard allows a different order after the first three, different separators, and extra fields):

| # | Field | Meaning / format |
|---|---|---|
| i | Start character | `$` |
| ii | Header | packet identifier |
| iii | Vendor ID | vendor identification |
| iv | Firmware version | e.g. 1.0.0 |
| v | Packet type | NR normal, EA emergency alert, TA tamper alert, HP health packet, IN ignition on, IF ignition off, BPD battery power disconnect, BPR battery power reconnect |
| vi | Packet status | L live, H history |
| vii | IMEI | 15 digits |
| viii | Vehicle registration number | |
| ix | Location module fix | 1 fix, 0 invalid |
| x | Date | ddmmyy from the GNSS module |
| xi | Time | hhmmss UTC from the GNSS module |
| xii–xiii | Latitude and direction | decimal degrees, at least 6 places; N/S |
| xiv–xv | Longitude and direction | decimal degrees, at least 6 places; E/W |
| xvi | Speed | km/h, one decimal |
| xvii | Heading | course over ground, degrees |
| xviii | Altitude | metres |
| xix | PDOP | |
| xx | HDOP | |
| xxi | Network operator name | |
| xxii | Ignition | 1 on, 0 off |
| xxiii | Main power status | 0 disconnected, 1 connected |
| xxiv | Emergency status | 1 on, 0 off |
| xxv | Tamper alert | C cover closed, O cover open |
| xxvi | GSM signal strength | 0 to 31 |
| xxvii–xxx | MCC, MNC, LAC, Cell ID | |
| xxxi | Digital input status | 4 inputs, 0/1 each |
| xxxii | Digital output status | 2 outputs, 0/1 each |
| xxxiii | Frame number | 000001 to 999999 |
| xxxiv | Checksum | optional |
| xxxv | End character | `*` |

Table 17 (protocol testing) adds: number of satellites, main input voltage, internal battery voltage, NMR (4 neighbouring cell IDs with LAC and signal strength), and packet types BD, BR and BL (battery disconnect, reconnect, low).

### 7.5 Health status data (D-5.2.4)

Sent at a configurable frequency with these elements: mDVR ID and name, manufacturer ID, date and time, primary and secondary IP, firmware and protocol version, IMEI, storage 1 and 2 status and memory-threshold status, recording status of cameras 1 to 8, recording status of microphones 1 to 8, ignition status, emergency button status.

### 7.6 Image data (D-5.2.5)

Snapshots from each camera at configured frequency and resolution, with vehicle registration number, camera ID, date and time and location, also watermarked into the image.

### 7.7 Alerts (D-5.3)

- Emergency button: alert plus tracking data goes immediately to the emergency response backend and is prioritised above all other traffic.
- Other alerts to the transport backend: ignition on, ignition off, camera cover, video loss, mDVR enclosure opened, harsh braking, harsh acceleration, rash turning. Table 18 adds: location update (live and history), disconnect from main battery, low battery, low battery removed, reconnect to main battery, OTA parameter change (with name, value and source), GPS box opened, emergency state on (with which button), emergency state off.
- Emergency alert on: message goes to two IP addresses simultaneously. The primary goes to the government emergency response backend (NERS/MHA) in the `EPB` format. The device keeps sending `EMR` at the configured interval until it receives `STOP_MSG`, then answers `STOP_ACK` (Fig. 11).

**EPB emergency message format** (Table 19, indicative; the government may revise it):

| Attribute | Value | Size |
|---|---|---|
| Packet header | `EPB` | 3 char |
| Message type | `EMR` emergency, `SEM` stop | 2 char |
| Vehicle ID | IMEI | 15 char |
| Packet type | `NM` normal, `SP` stored | 2 char |
| Date | YYYYMMDDhhmmss from the GPS data | 14 char |
| GPS validity | A valid, V invalid | 1 char |
| Latitude, direction | dd.mmmmmm; N/S | 12 + 1 |
| Longitude, direction | dd.mmmmmm; E/W | 12 + 1 |
| Altitude | metres | 12 |
| Speed | km/h | 6 |
| Distance | from the previous GPS point | 6 |
| Provider | G fine GPS, N coarse/network | 1 |
| Vehicle registration number | | 16 char |
| Reply number | mobile number for the test response | |
| CRC | 32-bit checksum of everything from the header to the CRC field | 8 |

### 7.8 SMS fallback (D-5.3.1)

In an emergency with no 3G/GPRS the device switches to SMS and sends the alert, health status and tracking data by SMS. The 160-character tracking SMS carries IMEI, latitude and direction, longitude and direction, fix status, speed, cell ID, LAC, date and time.

### 7.9 Configuration from the backend (D-5.4.1)

Forty-three parameters, settable per camera by camera ID for items i to xxxvi:

- Main stream: resolution, image quality, bitrate, bitrate type, max bitrate, frame rate, I-frame interval (bitrate items are mNVR only).
- Sub-stream (used for emergency transmission): the same seven settings.
- Video recording on/off, audio recording on/off, camera display name.
- Schedule recording on/off and per-weekday start and end times.
- Video expiry time in days (0 means cyclic overwrite only).
- Motion-detection recording on/off, sensitivity and area.
- Pre-record and post-record time for event triggers.
- Resolution and frequency of images sent to the backend.
- Recorder clock time; post-ignition-off duration.
- Get firmware version, protocol version, MAC address, primary IP, secondary IP, IMEI.
- Set primary IP, secondary IP, port, vehicle registration number, APN, emergency-state duration.
- Reboot/reset.
- Transmission mode (always on, or turned on by emergency button, SMS, telephone or I/O alerts).

Additional parameters: tracking transmission frequency for ignition on, ignition off and emergency states. The recorder must return a success message for each configuration update.

### 7.10 Firmware upgrade (D-5.4.2)

The backend first reads the current firmware version with the "Get firmware version" command. If it differs from the latest, the backend sends the new firmware file (mNVR firmware and IP camera firmware as applicable) over the air. The recorder returns a success message after a successful upgrade.

## 8. Type tests (D-6, Table 16)

At least three samples (S1, S2, S3) are submitted. Type approval is issued when all tests pass; on failure the authority may call for up to twice the number of samples for the failed tests.

| Sample | Tests |
|---|---|
| S1 | Image quality, camera resolution, camera IR, IP camera video compression, camera frame rate, camera audio compression, recorder video compression, recorder audio compression, recording resolution, dual stream, recording modes, video overwriting, data download, data communication, PoE, ONVIF compliance |
| S2 | Performance parametric (tri-temperature/tri-voltage), shock and vibration, ingress protection, over-voltage, high temperature, cold, damp heat, insulation resistance, thermal shock, salt spray |
| S3 | EMI/EMC, load dump pulse 5a, reverse polarity without fuse, wiring harness, high voltage, USB port overloading, endurance, free fall, protocol testing, additional mDVR/mNVR tracking tests |

## 9. Acceptance tests (D-7)

Functional testing and protocol testing only.

## 10. Test categories (D-8)

### 10.1 Functional tests (D-8.1)

| Clause | Test | Acceptance |
|---|---|---|
| D-8.1.1 | Image quality in bright spot, overall bright, low light, no light with IR | Clear images without blur or haze |
| D-8.1.2 | Camera resolution | Self-certification for 720p / 1 MP |
| D-8.1.3 | Camera IR | Switches IR on below 0.01 lux and back; clear images to 10 m |
| D-8.1.4 | IP camera video compression | H.264, MPEG-4 and M-JPEG; H.265 where claimed |
| D-8.1.5 | IP camera frame rate | 1 to 25 fps at 720p/4CIF, 2CIF, CIF, QCIF |
| D-8.1.6 | IP camera audio compression | G.711 and G.726 |
| D-8.1.7 | Recorder video compression | H.264, self-certified |
| D-8.1.8 | Recorder audio compression | G.711 or G.726, self-certified |
| D-8.1.9 | Recording resolution | 720p/4CIF, 2CIF, CIF, QCIF settable per channel |
| D-8.1.10 | Dual stream | Each stream at its own resolution and frame rate; high stream recorded, low stream transmittable |
| D-8.1.11 | Recording modes | Normal, schedule (per weekday), alarm-triggered, motion, event pre/post tagging 1 to 30 min in 1 min steps, shutdown delay up to 24 h; tested in 5 min steps over the full range. On deliberate battery cut, recording up to the break point must be preserved |
| D-8.1.12 | Video overwriting | FIFO overwrite when storage is nearly full; event-tagged video retained at least 15 days |
| D-8.1.13 | Data download | Laptop on RJ45, browser at `http://dvr`, login, search/view/download .avi or .mpg; that login cannot delete or reconfigure; a separate login exists for configuration |
| D-8.1.14 | Data communication | Transfer on 4G, 3G and 2G with automatic switching; health data continues on 2G; emergency video drops to lower frame rate and resolution when 3G is unavailable |
| D-8.1.15 | PoE | All cameras powered in all conditions including IR on |
| D-8.1.16 | ONVIF | IP cameras and mNVR Profile S compliant |
| D-8.1.17 | SIM | Embedded SIM works per protocol; SMS and GPRS/TCP-IP; on-demand and automatic OTA network switching |

### 10.2 Performance and durability (D-8.2)

| Clause | Test | Conditions |
|---|---|---|
| D-8.2.1 | Performance parametric | −25 °C, room, +70 °C; 12 V system at 9/13.5/16 V, 24 V system at 18/27/32 V; 5 min stabilisation, five 1 min on / 1 min off cycles per point; powered on inside the chamber |
| D-8.2.2 | Shock | IS 9000 Part 7, 15 g half-sine, 11 ms, 9 impacts (3 per axis) |
| D-8.2.2 | Vibration | IS 9000 Part 8, 1.5 mm total amplitude, 10–55–10 Hz sweep in 1 min, 1 h per axis |
| D-8.2.3 | Ingress protection | IS/IEC 60529: cameras IP66 without audio, IP65 with audio; recorder IP54 |
| D-8.2.4 | Over-voltage | ISO 16750-2, 18 V (12 V system) or 36 V (24 V system) for 60 min on battery-fed units |
| D-8.2.5 | EMI/EMC | AIS 004 Part 3 |
| D-8.2.6 | Load dump pulse 5a | ISO 7637-2: 65 V, 4 Ω, 200 ms (12 V) or 123 V, 8 Ω, 200 ms (24 V) |
| D-8.2.7 | Reverse polarity without fuse | 14 V (12 V system) or 27 V (24 V system) reversed for 2 min |
| D-8.2.8 | Wiring harness | Flammability IS 2465; electrical AIS 028 |

After each test the device must pass the functional tests.

### 10.3 Environmental (D-8.3)

| Clause | Test | Conditions |
|---|---|---|
| D-8.3.1 | High temperature | IS 9000 Part 3 Sec 5, 70 ± 2 °C, 16 h operating, 2 h recovery |
| D-8.3.2 | Cold | IS 9000 Part 2 Sec 4, −10 ± 2 °C, 2 h operating, 2 h recovery |
| D-8.3.3 | Damp heat | IS 9000 Part 5 Sec 2, 25 to 55 °C, 95 % RH, six 24 h cycles, device off; functional test at start of cycles 2, 4 and 6 |
| D-8.3.4 | Insulation resistance | ISO 16750-2, 500 V DC after damp heat and 0.5 h rest; > 1 MΩ, no arcing |
| D-8.3.5 | Thermal shock | IS 9000 Part 14 Sec 2, 3 h per cycle, 2 cycles |
| D-8.3.6 | Salt spray | IS 10250 clause 4.8, 96 h |
| D-8.3.7 | High voltage | ISO 16750-2, 18 V or 36 V for 60 min |
| D-8.3.8 | USB port overloading | USB pin shorted to ground while on |
| D-8.3.9 | Endurance | 27 ± 2 °C, 14 V or 28 V, 100 000 on/off cycles, 10 s on, 4 s off |
| D-8.3.10 | Free fall | IS 9000 Part 7 Sec 4, 500 mm |

After each test the device must pass the functional tests.

### 10.4 Protocol testing (D-8.4)

Data received by the backend is checked against the protocol for fields and format. Three capabilities are tested: sending each message type in its specified format, receiving and applying configuration updates, and upgrading firmware over the air.

## 11. Additional tracking tests for the recorder (D-9)

Tests a to h may be done in a lab with a GNSS simulator or outdoors.

| Test | Acceptance |
|---|---|
| Location accuracy (static, and dynamic along a path) | 2.5 m CEP or 6 m 2DRMS |
| Cold-start TTFF (averaged over runs) | under 40 s at −148 dBm |
| Warm-start TTFF | under 30 s at −148 dBm |
| Hot-start TTFF | under 5 s |
| Acquisition sensitivity (lowest level allowing cold start) | −148 dBm or better |
| Tracking sensitivity (lowest level holding lock) | −165 dBm or better |
| Interference (jammer raised in 1 dB steps) | No degradation of TTFF or accuracy |
| Multipath (simulated reflections) | No degradation of TTFF or accuracy |
| SIM testing | As D-8.1.17 |
| Protocol testing for tracking data | Fields per Table 17, alerts per Table 18, emergency per Table 19 |
| Memory storage | 40 000 or more logs retained while out of GPRS coverage |

## 12. Installation guidelines (D-10)

- Minimum cameras: standard bus 3, midi bus 2, articulated bus 5, double-decker 5. Every passenger door covered so each boarding passenger is captured; overall length covered so an incident and the people involved can be identified.
- Emergency buttons: one within reach of the driver; others on both sides of the bus, within reach of passengers, no more than 3 m apart.
- Power: 8 to 32 V operating range; permanent battery line, ignition line and chassis ground; delayed shutdown after ignition off (about 1 h suggested).
- Recorder mounted out of passenger reach and sight, vibration-resistant, vandal and tamper proof.
- GPS/3G antenna cables enclosed in pipe or casing.
