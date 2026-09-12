# IS 16833 Annex D Test Checklist for minixvr

> **Status:** Draft · **Updated:** 2026-09-12

Companion to the [minixvr Software Documentation](../code/minixvr-olectra.md) and the [IS 16833 Annex D Summary](is16833-annex-d.md). Part A maps every Annex D requirement that the software can influence to what the code actually does. Part B is the executable checklist. Hardware-only requirements (lens, IR range, IP rating, shock, EMI, etc.) are listed once in Part C as the functional smoke set that must pass after each environmental test.

Legend for the "Code status" column in Part A:
- **Y** implemented in code
- **P** partially implemented or implemented differently from the standard
- **N** not implemented in code
- **HW** depends on hardware/OS, not on `minixvr`

---

## Part A – Requirement-to-code mapping

### A1. D-2.5 mNVR functional specification

| # | IS 16833 requirement | Code status | Evidence / gap |
|---|---|---|---|
| 1 | One video output | Y | HDMI/VGA via `VoDevices` in `system.json`; `Mal_VO_Setlayout` |
| 2 | 4 ch (≤4 cams) / 8 ch (5–8 cams) video input | P | Live view supports 4 or 8; **recording fixed at 4** (`MAX_SUPPORT_CHANNLES=4`); 8-camera setting is overridden at runtime |
| 3 | One audio output | Y | `amixer` speaker (PIS audio, calls) |
| 4 | H.264 video compression | Y | `encoder.json` codec h264; muxer accepts H.264/H.265 |
| 5 | G.711 / G.726 audio | N | Audio recording disabled (`_withAudio = 0`) |
| 6 | Dual streams, independently configurable | N | Only one stream per channel is muxed; no sub-stream transmission |
| 7 | 720p/4CIF/2CIF/CIF/QCIF per channel | P | Encoder JSON is 1280×720 fixed; not configurable from UI or server |
| 8 | 1–25 fps per channel/stream | P | `Framerate: 25` fixed in JSON |
| 9 | 4 alarm inputs (NO/NC), 2 outputs | P | GPIO string from baseboard read; only bits 21, 27, 34, 59 used; no outputs driven |
| 10 | 500 GB / 1 TB removable, locked storage | HW | Code adapts cleanup thresholds to SSD size |
| 11 | Normal, schedule, alarm-triggered, motion recording | P | Normal only; schedule/motion/event hooks stubbed |
| 12 | Event pre/post recording 1–30 min | N | `makePathEvent`, `prePostCopy` disabled |
| 13 | Shutdown delay after ignition off, up to 24 h | N | No ignition-off timer in code (relies on external power control) |
| 14 | Integrated PoE switch | HW | – |
| 15 | LAN RJ45, Wi-Fi (opt), 3G/2G module with SMS, voice, data | P | Quectel module via AT; data (`quectel-CM`) and voice yes; **no SMS code** |
| 16 | Embedded SIM | HW | – |
| 17 | 3-axis accelerometer + gyroscope for harsh events | P | `Ay` from baseboard `GYRO` record: harsh accel/brake only; no rash-turn |
| 18 | Secured (encrypted) channel to backend | N | Plain TCP to servers; config over HTTPS only |
| 19 | GPS data via RS232/Ethernet to other on-bus devices; receive route number | P | Route selected locally / from server `SCH`; no GPS out to other devices |
| 20 | Transmission mode Always-On, turned on by emergency/SMS/IO | P | Always-on only |
| 21 | ONVIF Profile S | HW/`libmal` | Not in app code |
| 22 | 1 RS232, 1 USB 2.0 | Y | ttyS1, ttyUSB4, USB mass storage |
| 23 | External GSM & GPS antenna | HW | – |
| 24 | 5 configurable image settings | N | – |
| 25 | Tamper-proof watermark | N | No OSD/watermark of reg. no., camera id, time, location, speed |
| 26 | Cyclic overwrite + event-tagged retention 7–30 days | P | Cyclic overwrite by whole day (`eralietFiles`); **no event retention** |
| 27 | Vibration-resistant, locking connectors | HW | – |
| 28 | LED indicators power/recording/network | HW | On-screen icons only |
| 29 | Health parameters (camera not functioning, tamper, storage error/full, video loss, cover) | P | HEA packet has camera-live count, gps, ign, gpio; **hdd flag is wired to the ignition bit**; no storage-full flag |
| 29b | Snapshots/video to server at configurable frequency | N | – |
| 29c | Detect camera/component failure and alert | P | Camera count only |
| 30 | OTA config parameters and firmware | P | Config XML pull at boot only; firmware OTA via FTP; no on-demand parameter push |
| 31 | Motion-detection zones per camera | N | – |
| 32 | Built-in RTC, drift ≤ 10 s | P | RTC set from network time after first server contact; drift is HW |
| 33/34 | Browser download via RJ45 at `http://dvr`, user/password, .avi/.mpg, no delete | N | No web server in app (`rtspserver` lib linked but unused); export is by USB copy of `.ts` |
| 35 | Health + images normal; video on emergency; 3G→2G fallback; adaptive video | N | No video/snapshot transmission at all |

### A2. D-2.6 tracking specification

| # | Requirement | Code status | Evidence / gap |
|---|---|---|---|
| 1 | GNSS data ≤ 10 s, IRNSS | P | Interval from `server1.interval` (min 10 s enforced); IRNSS is GNSS module HW |
| 2 | Location on demand over 3G + SMS backup | N | No inbound "locate" command; no SMS |
| 3 | External GPS antenna | HW | – |
| 4 | ≥ 40 000 positional logs | N | 30 packets in RAM (`store_table[30]`), not persistent |
| 5–8 | Sensitivity −148/−165 dBm, accuracy, TTFF | HW | Verify via GPS icon (`gps_lock == 'A'`) and packet `A/V` flag |
| 9 | A-GPS | HW | – |
| 10 | Serving/adjacent cell ID + NMR | N | Not queried (no `AT+QENG`) |
| 11 | OTA firmware + config, remote admin, packet to two IPs | P | Firmware/config yes; servers 2/3 receive VTS only; no reboot/reset command |

### A3. D-5 communication protocol

| Item | Requirement | Code status | Evidence / gap |
|---|---|---|---|
| D-5.1 | Tracking to IP1 continuous, to IP2 only on emergency; video to IP1 on emergency | P | VTS to all configured servers always; no emergency-only routing |
| D-5.2.1 | Emergency video + metadata (reg no, camera id, time, location, speed) | N | – |
| D-5.2.2 | Backend polls device for live/recorded video | N | – |
| D-5.2.3 | Login message `$Msg.Server.Login,$DeviceName,$IMEI,$Firmware,$Protocol,$LastValidLocation` | P | First VTS uses header `LO` and carries IMEI + version; no vehicle number, no last-valid-location field |
| D-5.2.3 | Tracking packet minimum fields (35 fields, `$` start, `*` end) | P | Vendor `&PEIS` format: has IMEI, ign, date/time, lat/lon/dir, speed, RSSI; **missing** vendor id, packet type codes NR/EA/TA/HP/IN/IF/BPD/BPR, L/H status, vehicle reg no, fix flag as 1/0, heading, altitude, PDOP/HDOP, operator, main power, emergency status, tamper C/O, MCC/MNC/LAC/CellID, DI/DO status, frame number, checksum. Standard says composition is indicative, but fields must exist. |
| D-5.2.3 | Different send frequency for ignition ON / OFF / emergency | N | Single interval |
| D-5.2.4 | Health packet data elements (31) | P | HEA packet has a subset; see A1 #29 |
| D-5.2.5 | Image snapshots with metadata | N | – |
| D-5.3 | Emergency alert to emergency backend first, priority over all data; alerts for ign ON/OFF, camera cover, video loss, enclosure open, harsh brake/accel, rash turn | P | Harsh brake/accel (`MSG`), tamper (`PNC`) exist; ign ON/OFF only as VTS field; no camera-cover/video-loss/enclosure alerts; no priority queue |
| D-5.3 Table | `EPB` emergency format (EMR/SEM, CRC32, dual IP) | N | – |
| D-5.3.1 | SMS fallback | N | – |
| D-5.4.1 | 43 configurable parameters from backend + tracking frequencies | P | Only what is in the XML: server ip/port/interval, OTA, VoIP. No per-camera stream settings, no reg-no, APN, IP set, reboot |
| D-5.4.1 | Success message after config update | N | – |
| D-5.4.2 | Firmware upgrade with "Get firmware version" and success message | P | Version compare is device-side against XML; no success message to server (implicit via next VTS after reboot) |

---

## Part B – Test checklist

Fill **Result** with P (pass), F (fail), B (blocked) and note the build (`version` string shown in Settings → System info) and the date. Tests marked **[GAP]** are expected to fail on the current code; run them anyway to record evidence for the compliance file.

### B1. Boot and start-up

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B1.1 | Cold boot with SSD present | Power on with SSD mounted at `/mnt/videos` before `minixvr` starts | Console shows `open db success`, storage starts, recording files appear within 90 s |
| B1.2 | Boot with SSD absent / mounted late | Boot with SSD removed, insert after app is up | Document behaviour: expected no recording until reboot (`sys_cam_init` opens DB once). Storage-error visible in HEA packet (currently not, see A1 #29) |
| B1.3 | Modem bring-up | Watch console `[IMEI] =` and `[URL] =` lines | IMEI 15 digits within 30 s of boot; IMSI and CCID shown in Settings → System info |
| B1.4 | Config download | Server reachable | `[PARSE] = SERVER 1 SUCCESS`, OTA and VOIP parse success; `/mnt/config.txt` updated |
| B1.5 | Config download failure fallback | Block the vendor config host | After 5 retries the cached `/mnt/config.txt` is used; servers still configured |
| B1.6 | Corrupt cached config | Truncate `/mnt/config.txt`, block internet, reboot | App survives (no crash from `copy_data`/XML parse), server threads log "CONFIGURATION NOT FOUND" |
| B1.7 | Fonts | `/mnt/fonts` present / absent | Tamil labels render / app still starts with default font (note: `install_font` indexes `NotoSerifTamil-Regular.ttf` unconditionally) |
| B1.8 | Signal handling | `kill -TERM <pid>` | Clean exit, storage stopped, no DB rows left with `StopTime=0` (check `checkLastRecod` on next boot) |

### B2. Live view and display (D-8.1.1 support)

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B2.1 | Quad layout at start | Boot | 4-camera grid shown (camera_config forced to 4) |
| B2.2 | Camera cycle | Press camera button repeatedly | Quad → ch1 → ch2 → ch3 → ch4 → quad |
| B2.3 | 8-camera setting **[GAP]** | Settings → Camera 8, reboot | Expected by spec: 9-grid; actual: still 4 (runtime override). Record as defect |
| B2.4 | Camera loss | Unplug camera 2 | Tile shows no-video; HEA camera count drops within 15 s + next HEA send |
| B2.5 | Camera recovery | Re-plug | Tile returns; count increments |
| B2.6 | Reverse camera | Feed CAN gear = R (`18FC1621`, index-10 char `2`) | Full-screen channel 4; gear label `R`; on N/D returns to previous page and quad |
| B2.7 | Status bar | Observe for 2 min | Clock ticks, RSSI icon matches `AT+CSQ`, GPS icon matches fix, server icon green after successful send |

### B3. Recording (D-8.1.7, D-8.1.9, D-8.1.11, D-8.1.12)

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B3.1 | All 4 channels recording | Run 10 min | `/mnt/videos/YYYYMMDD/<0..3>/hhmmss_<n>.ts` per channel, new file every 60 s, `videoCount.txt` increments |
| B3.2 | File validity | Play a `.ts` on PC (ffprobe/VLC) | H.264 720p 25 fps, ~60 s, continuous timestamps |
| B3.3 | SQLite index | `sqlite3 /mnt/videos/sofia.db "select * from [YYYY-MM-DD] order by ID desc limit 8"` | Rows for each file with Size > 0 and StopTime ≠ 0 after close |
| B3.4 | Small-file cleanup | Disconnect camera, wait one split | Files < 10 KB deleted and row removed |
| B3.5 | Day change | Set clock to 23:59, wait | New day table and folder created, files continue |
| B3.6 | Cyclic overwrite | Fill SSD until free ≤ check threshold (10 GB for < 900 GB SSD) | Console `we will remove`, oldest day folder + table deleted, recording continues, stops deleting at retain threshold |
| B3.7 | Overwrite granularity **[GAP]** | Observe B3.6 | Whole day is deleted at once; IS asks FIFO by file and event-tagged retention 7–30 days |
| B3.8 | Audio **[GAP]** | Inspect `.ts` | No audio stream (spec requires G.711/G.726) |
| B3.9 | Schedule / motion / alarm modes **[GAP]** | – | Not available in UI or protocol |
| B3.10 | Pre/post event recording **[GAP]** | – | Not available |
| B3.11 | Power cut during recording (D-8.1.11 f) | Cut battery mid-file, restore | On reboot `checkLastRecod` closes open rows; previous file playable up to break point; no DB corruption |
| B3.12 | Ignition-off delay **[GAP]** | Ignition off | Code has no delay timer; verify board-level power hold covers required delay |
| B3.13 | 5 000 file stress | Run 3.5 days (4 ch × 60/h × 24 h) | No slowdown in split, no DB errors |
| B3.14 | Recording while playback | Start playback | Recording continues on all channels (check file growth) |

### B4. Playback and export (D-8.1.13)

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B4.1 | Search | Settings → Playback, channel 1, today, window covering ≥ 3 files | Table lists files fully inside the window with size, start, end |
| B4.2 | Invalid window | End ≤ start | `TIME INVALID!` shown, button re-enabled |
| B4.3 | Play | Select row, PLAY | Video plays full screen on VO; at end returns to list automatically |
| B4.4 | Back during play | Press BACK | Player closed, VO returns to live mode |
| B4.5 | Copy to USB | Insert VFAT USB, COPY | Files copied to `/mnt/usb/recording/<date>/channelN/`; label counts up; `COPY SUCCESS` |
| B4.6 | Copy with no USB | COPY | `NO USB FOUND!` |
| B4.7 | Copy with NTFS/ext4 USB | COPY | Not detected (only VFAT) – record behaviour |
| B4.8 | Browser download **[GAP]** | Connect laptop to RJ45, open `http://dvr` | Not available; IS D-8.1.13 requires it |
| B4.9 | Format **[GAP]** | Check exported files | `.ts` not `.avi/.mpg` |
| B4.10 | Delete protection | – | Viewer cannot delete recordings from UI (only admin PIS delete exists) – pass |
| B4.11 | Channel 5–8 search | Select ch 5–8 | Empty (only 4 channels recorded) – record |

### B5. GPS / tracking (D-2.6, D-9.1.1)

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B5.1 | Fix acquisition | Cold boot outdoors | GPS icon green within 40 s of baseboard providing RMC; VTS packet field switches `V`→`A` |
| B5.2 | Coordinates | Compare packet lat/lon with reference receiver | Within 6 m 2DRMS after conversion from `ddmm.mmmm` |
| B5.3 | Speed | Drive at known speed | VTS `303UP,<nnn>` = knots × 1.852 rounded down; raw knots also present |
| B5.4 | Loss of fix | Cover antenna | `V` flag, last fix not frozen (fields go empty → dummy `1300.657309,N,08012.893158,E` inserted) **[GAP: dummy coordinates should not be sent]** |
| B5.5 | RMC parse robustness | Feed RMC with missing fields via simulator | No crash; packet still framed |
| B5.6 | Announcement GPS | Route active, drive toward stop | 330 m / 200 m / 100 m triggers in order, each once |
| B5.7 | Positional log capacity **[GAP]** | Block server 1 for 1 h | Only 30 packets retained, in RAM; reboot loses them (IS: 40 000 persistent) |
| B5.8 | Stored packet replay | Restore server after B5.7 | One `SP` packet appended per successful send until store empty; order newest-first (LIFO) – record |
| B5.9 | Send interval | Set `interval=10`, `=30`, `=1` | 10 s, 30 s, and 1→forced 10 s; actual period = interval + AT cycle |
| B5.10 | Heading/altitude/DOP/cell info **[GAP]** | Inspect packet | Absent |

### B6. Telemetry protocol – server 1 (D-5.2, D-8.4, Table 17/18)

Use a TCP listener (e.g. `nc -l <port>`) as server 1 and a script to send replies.

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B6.1 | Login packet | First packet after boot | Header `&PEIS,N,VTS,LO,VER-1.24.5,<IMEI>,...`; subsequent packets `LP` |
| B6.2 | VTS structure | Capture 10 packets | Exactly: mode, VTS, LP, VER, IMEI, IGNON/IGNOFF, 0, hh:mm:ss UTC, dd/mm/yyyy, A/V, lat, N/S, lon, E/W, knots, rssi, 303UP, kmh, 0.00, 1,1,1,1,0# |
| B6.3 | UTC conversion | Compare packet time with UTC | Network local time − 5:30; seconds digit updated each cycle |
| B6.4 | Mode field | Settings → Maintenance / Pandemic | Field 2 becomes `M` / `P` in all packet types |
| B6.5 | Ignition | Toggle ignition input (gpio bit 59) | `IGNON`/`IGNOFF` and HEA ign flag follow within one cycle **[GAP: no separate IN/IF alert packets]** |
| B6.6 | CAN + HEA cadence | Count packets | CAN and HEA appended on every 6th VTS |
| B6.7 | HEA content | Decode HEA | rssi, mode, sip/adr1/adr2 config flags, mcu, hdd, gps, ign, camera count 0–4, gpio2/3/4 |
| B6.8 | HEA hdd flag **[GAP]** | Remove SSD | `hdd` flag still follows ignition, not storage (defect) |
| B6.9 | Driver alert | Alerts page → BREAKDOWN → SEND | `...,ALT,LP,...,PRE,BREAKDOWN#` appended to next VTS; history line red "OBU"; flag cleared only after send confirmed |
| B6.10 | Alert while offline | Block server, SEND, unblock | Alert sent with first successful connection (not lost) |
| B6.11 | Harsh accel / brake | Inject `GYRO` `Ay=0.5` / `-0.5` | `MSG,HARSH ACCELERATION#` / `MSG,HARSH BRAKING#` once per event |
| B6.12 | Tamper | Set GPIO4 bit (`gpio_out[34]='1'`) | `PNC,TAMPER#` sent, banner `TAMPER ALERT!` shown while active |
| B6.13 | Driver login | Login page → user/pass → LOGIN | `D_LOGIN,...,<user>,<pass>#`; reply `LOG,SUCCESS` → "Login Success", PIS page; `LOG,FAILURE` → "Login Failed" |
| B6.14 | Driver logout | LOGOUT | `D_LOGOUT` packet; schedule cleared |
| B6.15 | Admin login via server | Wrong OTP | `A_LOGIN` packet; `LOG,SUCCESS` opens Settings |
| B6.16 | Server → PRE/MSG | Reply `PRE,Return to depot#` | Alert history yellow "OCC" line; UI jumps to alerts page |
| B6.17 | Server → SCH | Reply `SCH,...,1-101A/2-102B/3-103C/4-104D/5-105E#` | PIS buttons show 101A…105E; completed counter `0/5` |
| B6.18 | Server → ADH | Reply `ADH,text#` | Stored only; nothing displayed – record |
| B6.19 | Reply > 512 bytes | Send 600-byte reply | **Risk**: `strcpy` into 512-byte buffer; watch for crash |
| B6.20 | Packet size | Fire all events in one cycle with a stored packet | Total < 1600 bytes; no truncation |
| B6.21 | No reply from server | Server accepts but never answers | Send still counted as success after 2 s timeout; flags cleared |
| B6.22 | RSSI gate | Force CSQ < 12 (attenuate) | No connection attempt, packet stored; resumes when ≥ 12 |
| B6.23 | Modem restart | Keep server unreachable for > 120 attempts (~20 min at 10 s) | `quectel-CM` relaunched; data resumes |
| B6.24 | Standard fields **[GAP]** | Compare with Table 17 | Missing fields listed in A3; record for compliance file |
| B6.25 | Checksum / frame number **[GAP]** | – | Absent |

### B7. Servers 2 and 3

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B7.1 | Configure server2 id=2, server3 id=3 | Listeners on both | Each receives the VTS string only, at its own interval |
| B7.2 | Server 2 down | Stop listener | 3 retries then skip; server 1 unaffected; no store for server 2 |
| B7.3 | id mismatch | `server2 id="5"` | "SERVER 2 CONFIGURATION NOT FOUND", no traffic |
| B7.4 | Emergency-only routing **[GAP]** | – | Spec: IP2 gets tracking only during emergency; code sends always |

### B8. Emergency (D-3, D-5.2.1, D-5.3, D-5.3.1) – all **[GAP]** unless hardware button is wired to GPIO4

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B8.1 | Emergency button input | Press NC button | Currently only GPIO4 → `PNC,TAMPER#`. Record which GPIO bit the button drives and whether the packet type is acceptable to the backend |
| B8.2 | Priority | Press during high traffic | No queue prioritisation exists |
| B8.3 | EPB / EMR format, dual IP, STOP/ACK | – | Not implemented |
| B8.4 | Video/snapshot on emergency | – | Not implemented |
| B8.5 | SMS fallback | Disable data | Not implemented |

### B9. Data communication (D-8.1.14) and SIM (D-8.1.17)

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B9.1 | 4G → 3G → 2G handover | Drive through coverage change or use attenuator | Packets continue; RSSI icon changes; no app restart |
| B9.2 | APN / PDP loss | Kill `quectel-CM` | Connection failures; auto restart after 120 fails |
| B9.3 | Modem removed / no SIM | Boot without SIM | IMEI still read; config fallback; app stable; no packets |
| B9.4 | URC interference | Receive a call while telemetry runs | **Risk**: `RING` in shared buffer corrupts RSSI/time parse (fixed offsets); check packet time/RSSI for garbage |
| B9.5 | Embedded SIM OTA switching | Per SIM vendor | Outside app code; verify data resumes after profile switch |

### B10. OTA configuration and firmware (D-5.4, D-8.4.2)

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B10.1 | Interval change | Change `server1 interval` on backend, reboot | New interval used (config only read at boot **[GAP: no live push]**) |
| B10.2 | App OTA auto | Set `otaupdate version="V2"` (≠ `CL_TEST1`), valid FTP | After first server contact, Updates frame shown, progress 10→100, reboot, new binary runs |
| B10.3 | App OTA manual | Settings → Updates → MNVR OTA | Same as B10.2 |
| B10.4 | FTP failure | Wrong password | `FILE DOWNLOAD FAILED!`, no reboot, old binary intact |
| B10.5 | Zero-byte file | Empty `minixvr` on FTP | `FILE DOWNLOAD FAILED!` |
| B10.6 | Corrupt binary **[GAP]** | Random bytes named `minixvr` | Copied and rebooted without verification → boot loop risk; must be tested with recovery plan |
| B10.7 | Baseboard OTA auto | `bb_version="VER-1.24.7"` | Downloads `upload/baseboard.bin`, MCU enters DFU, ACK/NACK log, progress to 100, telemetry pauses during update and resumes |
| B10.8 | Baseboard NACK storm **[GAP]** | Disconnect ttyS1 mid-transfer | Infinite retry; AT thread and telemetry blocked. Record time to recover (never) |
| B10.9 | Baseboard file missing | No `baseboard.bin` | `Can not open baseboard.bin`, progress 0 |
| B10.10 | Version equality | Versions equal | No update triggered; `connection_flag_auto_ota` → 2 |
| B10.11 | Success message to backend **[GAP]** | – | None sent |

### B11. USB updates

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B11.1 | MNVR from USB | VFAT USB with `minixvr`, Settings → USB update | `USB DEVICE FOUND` → `MOUNTED` → `COPYING` → `REBOOTING` |
| B11.2 | No file on USB | USB without `minixvr` | `MNVR COPY FAILED!` **then still reboots** (record as defect) |
| B11.3 | PIS from USB | USB with `PIS/` tree | Old PIS deleted, `cp -rv` progress, `COPY FILES FINISHED`, routes reload |
| B11.4 | PIS USB missing | No USB | Old PIS already deleted before check (defect: data loss) – record |
| B11.5 | USB banner | Insert/remove USB anywhere | `USB CONNECTED!` / `USB DISCONNECTED!` banner for one refresh |

### B12. Time and RTC (D-2.5 #32)

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B12.1 | Auto sync | Boot with wrong RTC, wait for first server send | System clock and `/dev/rtc0` set to network time |
| B12.2 | Manual set | Settings → date/time → SET | Clock set; `SUCCESS...` shown |
| B12.3 | Drift | Compare after 24 h without network | ≤ 10 s |
| B12.4 | No network time | Modem returns no `+QLTS` | Packet uses system clock, seconds digit reused (`time_sec_ones`) – record |
| B12.5 | Date rollover in packet | Run across 00:00 IST and 05:30 IST | UTC date/time correct in packet |

### B13. CAN and vehicle health page

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B13.1 | Olectra speed | `18FEBF0B` data | Speed tile updates; > 250 raw → `xxxx` |
| B13.2 | SOC / voltage / current | `18FC08F4` | Tiles update; out-of-range → `xxxx` |
| B13.3 | Mileage | `18FEC117` | Kms tile |
| B13.4 | ABS/EBS | `18F0010B` | NORMAL / FAULT / COMM ERROR |
| B13.5 | Profile switch **[GAP]** | Settings → CAN mode 2/3 | Buttons set profile 0; runtime forces 0 → Switch/AL never active |
| B13.6 | CAN packet content (Olectra) | Decode CAN packet | Fields empty for Olectra (only Switch fills them) – record |
| B13.7 | No CAN | Disconnect bus | Tiles keep last value; no crash; `process_packet` does not stall (`can_event` still toggles) |

### B14. PIS (product feature, not in IS 16833)

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B14.1 | Route list | PIS page | 5 routes from `RouteFile.xml`; +/- pages; search by keyboard |
| B14.2 | Route update | Select route → UPDATE ROUTE | DIS01–04 sent to LED boards, brightness commands, progress 10→100 over ~40 s, boards show destination |
| B14.3 | Auto announcement | Drive route | NXT/APR/CUR audio and in-bus LED per stop; each stage once; WELCOME after 15 s |
| B14.4 | End trip guard | Select another route without END TRIP | Ticker `Please End Trip First` |
| B14.5 | Schedule mode | After `SCH` reply | Only scheduled routes selectable; completed trip blocked; counter increments |
| B14.6 | IDU message | IDU MSG → select → PLAY | `.bin` to LED and `.mp3` played |
| B14.7 | Manual announcement | MANUAL ANC → stop → Next/Approach/Current | Correct audio file |
| B14.8 | Volume | 25/50/75/100 % | `amixer` level changes; persists via `/mnt/volconfig.txt` |
| B14.9 | Km log | Drive 1 km | `/mnt/km_logs/<date>.log` value ≈ 1000 m; files > 7 days deleted |
| B14.10 | Missing content | Remove `.mp3` | `mpg123` error only; loop continues |
| B14.11 | Long audio | 30 s clip | Telemetry unaffected (different thread) but PIS thread blocked – next stop may be missed; record |

### B15. Voice call

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B15.1 | Outgoing | Call page → speed dial 1 | `ATD<num>;` sent, GPIO4 high, status RINGING → CALL ONGOING |
| B15.2 | Incoming | Call the SIM | UI jumps to call page `INCOMING CALL`; Connect answers (`ATA`) |
| B15.3 | Hang up | Disconnect | `AT+CHUP`, GPIO4 low, PIS volume restored |
| B15.4 | Volume | ± buttons | `AT+CLVL=1..5`, label 20–100 % |
| B15.5 | Number length | Speed-dial with 8 and 13 digits | **Risk**: fixed 15-byte write truncates/pads `ATD` string |
| B15.6 | Missed / busy | Let ring out / call busy line | `MISSED CALL` / `CALL DECLINED` |

### B16. Login, security and settings persistence

| ID | Test | Procedure | Expected |
|---|---|---|---|
| B16.1 | Admin OTP | Compute the time-based code (formula in `on_pbLogin_6_clicked`, widget.cpp); enter as user and password | Settings opens; expires after 5 min |
| B16.2 | Master password | Enter the hard-coded master value from source as user and password | Settings opens (record as security finding) |
| B16.3 | Keypad mapping | Press 0, ., hi, /, * | `D`, `0`, `R`, `B`, `A` (driver) / `C` for hi (admin) |
| B16.4 | Language persistence | Tamil, reboot | Tamil retained via `/mnt/lanconfig.txt` |
| B16.5 | Plain-text credentials **[GAP]** | Sniff TCP | Passwords visible in `D_LOGIN`/`A_LOGIN` |
| B16.6 | Unencrypted channel **[GAP]** | Sniff TCP | Telemetry in clear (IS D-2.5 #18) |

### B17. Robustness and long-run

| ID | Test | Procedure | Expected / what to measure |
|---|---|---|---|
| B17.1 | 72 h soak | Full system, server reachable | No crash; memory of `minixvr` (`/proc/<pid>/status VmRSS`) sampled hourly – expect growth from socket leak in `tcp()`; record slope |
| B17.2 | CPU load | `top` at idle | Expect 3 busy threads near 100 % (spin loops); record; check UI stays responsive |
| B17.3 | Server flapping | Toggle server every 30 s for 2 h | No stuck flags; store/replay consistent |
| B17.4 | Rapid button presses | Mash UPDATE ROUTE / COPY / OTA buttons | No re-entrancy crash (`delaySeconds` pumps events) |
| B17.5 | Serial noise | Inject garbage on ttyS1 | No crash; RMC/GPIO parse recovers |
| B17.6 | Config XML with long attributes | 300-char `url` | **Risk**: 250-byte holder overflow in `copy_data` |
| B17.7 | Power cycling | 100 cycles, 60 s on / 10 s off | Boots every time; DB intact; file counter monotonic |
| B17.8 | Watchdog / recovery | Kill `minixvr` | Document whether init restarts it (out of app scope) |

---

## Part C – Functional smoke set after each hardware/environmental test (D-8.2, D-8.3)

Run this 15-minute set after Performance-parametric (tri-temp/tri-volt), shock/vibration, IP, over-voltage, EMI/EMC, load dump, reverse polarity, high/cold/damp-heat, thermal shock, salt spray, high voltage, USB short, endurance and free-fall tests:

1. B1.1 boot and recording start
2. B2.1 quad live view, all cameras present
3. B3.1 one new file per channel after 60 s
4. B4.3 play the last file
5. B5.1 GPS fix within 40 s
6. B6.2 one valid VTS packet received by server 1
7. B6.7 one HEA packet with camera count 4
8. B12.1 clock correct
9. B15.1 one voice call
10. B11.5 USB detect banner (after USB port overload test)

## Part D – Installation checks (D-10)

| ID | Check |
|---|---|
| D1 | Camera count and coverage per bus type (3 standard, 2 midi, 5 articulated/double-decker); doors covered |
| D2 | Emergency buttons NC, one at driver, others ≤ 3 m apart; confirm which GPIO input they drive and that the software emits a packet on press (B8.1) |
| D3 | Power: permanent B+, ignition line, chassis ground; verify ignition bit 59 follows the key |
| D4 | mNVR out of passenger reach; tamper input (GPIO4) wired to enclosure switch |
| D5 | GPS/GSM antenna cables in conduit |
| D6 | SSD locked and mounted before `minixvr` starts (see B1.2) |
