# minixvr (MNVR VER-1 Olectra) Software Documentation

> **Status:** Draft · **Updated:** 2026-09-12

Written from a read of the existing Qt application source (`MNVR_VER-1_OLECTRA`, not yet in a git repository). Describes what the code does today, not what is planned. Companion pages: [IS 16833 Annex D Summary](../standards/is16833-annex-d.md) and the [IS 16833 Test Checklist](../standards/is16833-test-checklist.md).

Source tree: `MNVR_VER-1_OLECTRA/` (Qt project `MNVR_VER-1.pro`, target binary `minixvr`, deployed to `mc6630/`).
Application version string: `CL_TEST1` (widget.cpp:34). Baseboard firmware expected: `VER-1.24.6`. Packet protocol version: `VER-1.24.5`.
Documented on 2026-09-12 from the code as found on disk. No git history exists for this tree.

---

## 1. What the product is

`minixvr` is the on-board application for a bus Mobile NVR (MNVR) / driver console built on the **MC6630** board (HiSilicon-class SoC using the vendor `mal` / `mpi` media libraries, Qt 4 embedded with the `-qws` window server). One binary does all of the following:

| Function | Where in code |
|---|---|
| Live multi-camera view on the HDMI/LCD (4 or 8 IP cameras) | `widget.cpp` (`Mal_VO_Setlayout`) |
| Continuous recording of 4 IP camera streams to SSD as `.ts` files, indexed in SQLite | `src/SofiaStorage/*` |
| Playback of recordings and copy to USB | `widget.cpp` (`on_pbDateSearch_clicked`, `PlayVideo`, `copyFileFromUsb`) |
| Vehicle tracking (GPS from baseboard MCU) and telemetry to up to 3 TCP servers | `worker.cpp` (`process_packet`, `tcp`, `tcp2`, `tcp3`) |
| Health, CAN, driver alert, login/logout, harsh driving and tamper packets | `worker.cpp` (`process_packet`) |
| Server-to-device messages (alerts, ad-hoc messages, schedules, login result) | `worker.cpp` (`tcp` reply parsing) |
| 4G modem management (Quectel, AT commands), RSSI, network time, IMEI/IMSI/CCID | `worker.cpp` (`process_AT`, `process_web_hookup`) |
| Remote configuration fetch (XML over HTTPS via modem) with local cache | `worker.cpp` (`process_web_hookup`) |
| OTA update of the application (FTP) and of the baseboard MCU (serial bootloader) | `widget.cpp` (`ota_download*`), `baseboard_ota.cpp` |
| USB update of application and of PIS content | `widget.cpp` (`checkUsbAndCopyFile`) |
| Passenger Information System (PIS): route selection, LED destination boards, automatic GPS-based stop announcements, in-bus LED, IDU messages, manual announcements | `worker.cpp` (`process_web_hookup` state 0), `widget.cpp` (PIS page) |
| Voice calls (GSM voice via modem AT commands; SIP/linphone code present but disabled) | `worker.cpp` (`process_VOIP`), `ecall.cpp` |
| CAN bus decoding for Olectra / Switch / Ashok Leyland vehicles and reverse-camera auto-switch on gear | `widget.cpp` (`process_can`) |
| Driver login / admin login, English/Tamil UI, N/M/P operating modes, trip km logging | `widget.cpp` |

---

## 2. Build and deployment

### 2.1 Build inputs (`MNVR_VER-1.pro`)

- Qt modules: `core gui sql network xml widgets`. C++11. Debug symbols on, binary stripped post-link.
- Compiled sources (only these are part of the product; everything under `c++/`, `src/` other than `SofiaStorage`, `C/`, `3irdpart_player` other than `XD_Player.cpp` is **legacy and not compiled**):
  - `main.cpp`, `widget.cpp/.h`, `widget.ui`, `worker.cpp/.h`, `ecall.cpp/.h`, `serialhandler.cpp/.h`, `baseboard_ota.cpp/.h`, `camcount.h`, `sleephelper.h`
  - `src/SofiaStorage/{sofiadevice,sofiadisk,sofiamanage,sofiasql,storage,storageerror,storageserver,storageserverprivate,storageserverworker}.cpp`, `utils.c`
  - `3irdpart_player/libplayer/src/XD_Player.cpp`
- Linked vendor libraries (`contrib/lib`): `mal`, `mpi`, `audio_codec`, `g7xx`, `freetype`, `XD_Stream`, `XD_Muxer`, `player`, `rtmp`, `avformat/avcodec/avutil`, `rtspserver`; (`3rdParty/lib`): `curl`, `ssh2`, `ssl`, `crypto`, `z`. Mosquitto (MQTT) is present but commented out.
- Resources: `resource.qrc` (icons under `icons/`).

### 2.2 Runtime dependencies on the board

| Item | Path / command | Used by |
|---|---|---|
| Media config (cameras, encoder, decoder, OSD, VO) | `/app/config/*.json` (copies in `config/`) | `libmal` |
| Recording root and SQLite DB | `/mnt/videos/`, `/mnt/videos/sofia.db` | storage |
| File counter (survives RTC failure) | `/mnt/videos/videoCount.txt` | storage |
| Fonts (Tamil UI) | `/mnt/fonts/*.ttf` | `install_font()` |
| Cached server config | `/mnt/config.txt` | web hookup |
| UI/config flags | `/mnt/lanconfig.txt`, `/mnt/volconfig.txt`, `/mnt/camconfig.txt`, `/mnt/canconfig.txt` | widget |
| OTA staging | `/mnt/config/minixvr`, `/mnt/minixvr`, `/mnt/baseboard.bin` | OTA |
| Trip km logs | `/mnt/km_logs/YYYY-MM-DD.log` | PIS |
| PIS content | `/mnt/videos/sda1/PIS/PIS/{ROUTEXML/RouteFile.xml, ROUTE/<route>.csv, SIGN/EXT/<route>/DIS0[1-4].bin, SIGN/BUSSTOPS/{NXT,CUR}<stop>ENG.bin, AUDIO/{NXT,APR,CUR}<stop>.mp3, IDUMSG/IDU.txt, IDUMSG/<name>.bin|.mp3}` | PIS |
| Modem AT port | `/dev/ttyUSB_AT` @ 9600 | AT / web threads |
| Baseboard MCU (GPS, GPIO, gyro, CAN, OTA) | `/dev/ttyS1` @ 115200 | AT thread, baseboard OTA |
| PIS LED boards | `/dev/ttyUSB4` @ 9600 | PIS |
| GPIOs (sysfs) | gpio3 (SIP call audio path), gpio4 (GSM call audio path) | VoIP |
| External programs | `quectel-CM`, `blkid`, `mount`, `cp`, `rm`, `reboot`, `ncftpget`, `mpg123`, `amixer`, `ffmpeg`, `killall`, `linphonec` | various |
| RTC | `/dev/rtc0` | time sync |

The `release/readme.txt` deployment note: copy `libs/*` to `/usr/lib`, copy `minixvr`, set encoder/decoder codec, stop other minixvr instances, run `./minixvr -qws`.

---

## 3. Process and thread architecture

`main()` (main.cpp) performs, in order:

1. Install SIGINT/SIGTERM handlers (call `qApp->exit(0)`).
2. `sys_cam_init()`: `Mal_SYS_Init()`, `libXD_Player_Init()`, open SQLite `/mnt/videos/sofia.db`; **only if the DB opens** does it call `Mal_Storage_Init()` + `Mal_Storage_Start()`. If the SSD is not mounted yet at start, recording never starts for this boot.
3. Create `QApplication`.
4. Spawn six `Worker` objects, each in its own `QThread`:

| Thread | Slot | Purpose |
|---|---|---|
| `thread_web` | `process_web_hookup()` | Modem init, config download, then PIS / announcement / km logging loop |
| `thread` | `process_tcp1()` | Primary server telemetry (server 1) |
| `thread1` | `process_tcp2()` | Server 2 (VTS packet only) |
| `thread2` | `process_tcp3()` | Server 3 (VTS packet only) |
| `thread_AT` | `process_AT()` | Modem RSSI/time/voice-call AT cycle + baseboard serial read + baseboard OTA |
| `thread_VOIP` | `process_VOIP()` | Voice call command dispatcher |

5. `install_font()`, `system("quectel-CM &")` (start modem data connection), create and show `Widget`, enter event loop.
6. On exit: stop storage, release player and media layer.

A seventh thread is created internally by the storage module (`StorageServerPrivate` → `StorageServerWorker::run()`), plus a disk-cleanup thread (`CleanDiskWork`).

### 3.1 Thread interaction model

All inter-thread state is **plain global variables** (declared in `worker.cpp`/`widget.cpp`, exported through `worker.h`/`widget.h`). Five `QMutex` objects exist (`imei_mutex`, `network_mutex`, `time_mutex`, `gps_mutex`, `string_mutex`) and are used for the IMEI, RSSI, time strings, GPS/GPIO/CAN raw strings and the packet-build section. Everything else (flags such as `voip_flag`, `login_stat`, `alert_msg_state`, `update_flag`, `route_update_flag`, `play_stat`, `can_event`, the shared serial `buffer[2048]`) is unsynchronised.

Sequencing between threads is done with "control" integers and busy-wait loops:

- `process_AT` sets `tcp_process_control = 0` once per cycle after it has read the baseboard; `process_tcp1` may then send one packet. This makes telemetry cadence dependent on the AT cycle (~1.1 s) and the configured interval.
- `process_packet()` contains `while(!can_event);` — it spins until the GUI thread has run `process_can()` on the latest CAN strings.
- `process_tcp1/2/3` are `while(true)` loops with no sleep; they spin at 100 % CPU when idle.

---

## 4. Modem and configuration bring-up (`process_web_hookup`, state 1)

Serial `/dev/ttyUSB_AT` at 9600. A timed state machine (`web_process_control` 0x00–0x09) issues:

| Step | AT command | Result used |
|---|---|---|
| 0x00/0x01 | `AT+CGSN` | IMEI = `buffer[10..24]` when `buffer[6]=='N'`; sets `connection_imei_flag` |
| 0x02 | `AT+CFUN=1`, `AT+CRC=1`, `AT+QAUDMOD=2`, `AT+QDAI=3,0,0,4,0`, `AT+QAUDLOOP=0`, `AT+CLVL=5`, `AT+CIMI`, `AT+CCID`, `AT+QHTTPCFG="contextid",1` | IMSI = `buffer[10..24]`, CCID = `buffer[17..36]` |
| 0x03–0x05 | `AT+QHTTPCFG="responseheader",0`, `AT+QIACT=1`, `AT+QHTTPURL=49,80` | PDP context activation |
| 0x06 | URL `https://<vendor host>/know/<IMEI>` | Config endpoint (IMEI patched into fixed offsets 34–48 of the URL string) |
| 0x07–0x09 | `AT+QHTTPGET=10`, `AT+QHTTPREAD=80` | Response body in `buffer` |

The body is scanned with `find_substr` for the XML elements `server1`, `server2`, `server3`, `otaupdate `, `voip_config `; each element is copied (up to the first `>`) and parsed with `QDomDocument` into:

```
Server_struct { id, status, url, port, interval, protocol, duration, ip, depo_name, fleet_no }
ota_struct    { id, version, bb_version, status, username, password, ip, port, path, active }
voip_struct   { voip_url, voip_username, voip_password, speed_dial_1..6, speed_dial_name_1..6 }
```

If the word `server` is found in the response, the raw buffer is saved to `/mnt/config.txt` and the AT thread is released (`at_process_control = 0`). After 5 failed attempts the cached `/mnt/config.txt` is loaded instead and the system proceeds offline-configured. Server threads only run when `server_N.id == N`.

---

## 5. Telemetry cycle (`process_AT`)

A ~1 s state machine (`at_process_control` 0x00–0x08):

1. Open `/dev/ttyUSB_AT`.
2. If a voice call action is pending send `ATD<num>;`, `ATA` or `AT+CHUP`; else if call volume changed send `AT+CLVL=n`; else send `AT+CSQ`.
3. After 200 ms read; RSSI = `buffer[15..16]` (the two digits of `+CSQ: nn,`). The same buffer is passed to `Callstate()` which watches for `RING`, `BUSY`, `NO CARRIER`, `NO ANSWER`, `CONNECT`, `"callsetup",3/0` and updates `voip_event` for the UI.
4. `AT+QLTS=2`; after 350 ms read local network time = `buffer[20..38]` as `YYYY/MM/DD,HH:MM:SS`.
5. Open `/dev/ttyS1` 115200, read up to 2 KB from the baseboard and extract `#`-terminated records by 4-letter prefix:
   - `G?RMC` → `gprmc_out` (NMEA RMC sentence, `gps_lock = buffer[i+17]` A/V)
   - `GPIO` → `gpio_out` (digital inputs; index 59 = ignition, 21/27/34 = GPIO2/3/4; 34 is treated as tamper)
   - `GYRO` → `gyro_out` (contains `Ay=<float>`; `Ay > 0.35` harsh acceleration, `Ay < -0.35` harsh braking)
   - CAN IDs from `can_id[]` (10 IDs per vehicle profile) → `can1_out[10]`
6. Close port, set `can_event = 0` (GUI decodes CAN), set `tcp_process_control = 0` (allow one send).
7. If `bb_update_flag` is set, run the baseboard OTA (blocks this thread until done).

---

## 6. Outbound protocol (`process_packet`, `tcp*`)

All packets are ASCII, `&PEIS,` prefix, `#` terminator, comma separated. Field 2 is the operating mode character `N` (normal), `M` (maintenance), `P` (pandemic) chosen in Settings. Field 4 is `LP` live, `LO` login (first packet before the first successful connection), `SP` stored. Field 5 is `VER-1.24.5`. Field 6 is the IMEI. Time is UTC `hh:mm:ss` and date `dd/mm/yyyy`, derived from modem network time (assumed IST, minus 5 h 30 m).

| Packet | Format |
|---|---|
| **VTS** (every interval) | `&PEIS,<mode>,VTS,<LP/LO>,VER-1.24.5,<IMEI>,IGNON|IGNOFF,0,<utc time>,<date>,<A/V>,<lat ddmm.mmmm>,<N/S>,<lon dddmm.mmmm>,<E/W>,<speed knots>,<rssi>,303UP,<speed km/h 3 digits>,0.00,1,1,1,1,0#`. GPS fields are the raw RMC fields 2–7. If RMC is empty a dummy fix `V,1300.657309,N,08012.893158,E,0,` is inserted. |
| **VTS stored** | Same with `SP`; kept in RAM `store_table[30]` when server 1 is unreachable for 4 consecutive tries; one stored packet is appended to each later successful send. |
| **CAN** (every 6th VTS) | `&PEIS,<mode>,CAN,LP,VER,<IMEI>,<time>,<date>,<odometer>,<status>,<soc>,<speed>,<gear>,<current>,1,1#` (values filled only for the Switch profile) |
| **HEA** (every 6th VTS) | `&PEIS,<mode>,HEA,LP,VER,<IMEI>,<time>,<date>,<rssi>,12,0,<mode 0/1/2>,<sip cfg 0/1>,<server1 cfg>,<server2 cfg>,<mcu>,<hdd>,<gps lock 0/1>,<ign 0/1>,08,10,0,0,0,0,<cameras live 0-8>,<gpio2>,<gpio3>,<gpio4>,00,00,0,0#` |
| **ALT PRE** (driver alert button) | `&PEIS,<mode>,ALT,LP,VER,<IMEI>,<time>,<date>,PRE,<message text>#` |
| **ALT MSG** | `...,MSG,HARSH ACCELERATION#` / `...,MSG,HARSH BRAKING#` |
| **ALT PNC** | `...,PNC,TAMPER#` |
| **D_LOGIN / D_LOGOUT / A_LOGIN** | `&PEIS,<mode>,D_LOGIN,LP,VER,<IMEI>,<time>,<date>,<user>,<password>#` |

Camera-live count comes from `camcount.h`: each stream callback stamps the channel; channels with a frame within the last 15 s are counted.

**Send logic to server 1 (`tcp`)**: connect only when RSSI is 12–31; `waitForConnected(1900)`; concatenate VTS + due event packets + one stored packet into one write; wait 2 s for a reply; parse reply; disconnect. On failure retry up to 3 times, then (before first login or after time sync) store the VTS packet; after 120 consecutive failures restart `quectel-CM`. Event flags (`alert_msg_state`, `logout_stat`, `acc_flag`, `brk_flag`, `tam_flag`) are cleared only after a confirmed write. `login_stat`/`login_stat1` are cleared by the server's reply.

**Servers 2 and 3 (`tcp2`, `tcp3`)** receive only the VTS string, no reply handling, no store-and-forward.

### 6.1 Inbound messages (server 1 reply)

| Reply contains | Effect |
|---|---|
| `LOG,SUCCESS` / `LOG,FAILURE` | Driver or admin login result → UI "Login Success/Failed"; success opens PIS page (driver) or Settings (admin) |
| `PRE,<text>#` or `MSG,<text>#` | Added to alert history as OCC message (yellow), UI jumps to alerts page |
| `ADH,<text>#` | Stored in `alert_adhoc` (not displayed anywhere in current code) |
| `SCH,...,<id>-<route>/<id>-<route>/...#` | Schedule of up to 5 trips; PIS route buttons show scheduled routes; completed trips tracked (`x/5`) |

---

## 7. Recording subsystem (`src/SofiaStorage`)

- `Mal_Storage_Init/Start` create `StorageServer` → worker thread → `SofiaDisk` + `SofiaManage`.
- Channels: `MAX_SUPPORT_CHANNLES = 4` (ch0–3, cameras 192.168.1.166–169 per the header comment). All 4 are enabled unconditionally (`loadSaveMode`).
- File layout: `/mnt/videos/YYYYMMDD/<ch>/hhmmss_<count>.ts` where `<count>` is a global counter persisted in `videoCount.txt` and incremented at every split, so files stay unique even if the RTC is wrong.
- Split interval: fixed 1 minute (`loadSplitTimes`). At each split every recording channel calls `XD_MuxerChangefile`.
- Data path: `Mal_Stream_Add_Callback(channel, streamCallback)` → H.264/H.265 blocks pushed to `XD_MuxerPushData`. Audio is disabled (`_withAudio = 0`); the ffmpeg RTSP audio side-record code exists but is inactive.
- SQLite index (`sofia.db`): a table per day `[yyyy-MM-dd]` with `(ID, Channel, FileName, Size, StartTime, StopTime, Type)` plus `tb_statistics_info (FileCount, Channel, TableName)`. On start `checkLastRecod` closes any rows left with `StopTime = 0` from a previous crash. Files smaller than ~10 KB are deleted and de-indexed on close.
- Overwrite policy (`SofiaDisk::slotCheckDisk`, every 10 s): thresholds scale with SSD size (retain 50 GB / check 10 GB for disks under 900 GB; 100/50 GB up to 1.5 TB; 250/100 GB above). When free space ≤ check threshold, `eralietFiles()` finds the earliest day in `tb_statistics_info`, **drops that whole day's table and deletes the whole day's directory**, repeating every 10 s until free space ≥ retain threshold. Work mode is hard-coded to "delete" (mode 0 "stop recording when full" exists but is not selectable).
- Event recording (`startEventRecord`, pre/post copy, FTP upload) is stubbed out: `makePathEvent` returns an empty string, `STORAGE_EVENT_START/STOP` are no-ops.
- Motion, schedule, and codec-change entry points exist (`STORAGE_MOTION_ON/OFF`, `STORAGE_CHANNEL_SWITCH`, `STORAGE_TIME_SPLIT`, `STORAGE_CODEC_CHANGED`) but nothing in the application posts them.

---

## 8. Live view, playback and USB export (`widget.cpp`)

- Live view page (stack index 2). The camera taskbar button cycles: 4-camera profile → quad `Mal_VO_Setlayout(4,0)` then single channels 0–3; 8-camera profile → 9-grid then single 0–7. At runtime `camera_config[0]` is **forced to 0x01 (4 cameras)** in `updateDateTime`, so the 8-camera setting button has no effect.
- Reverse camera: when CAN gear = R (`gear_pos == 2`) the display switches to full-screen channel 3 (Olectra) or channel 4 (Switch) and returns to the previous page on N/D.
- Playback (Settings → Playback): choose channel 1–8 (`channel_flag`), date from calendar, start/end time; query `SELECT ... FROM [yyyy-MM-dd] WHERE Channel=n`; list files fully inside the window; `PLAY` opens with `XD_PlayerOpen` on VO channel 0 in playback mode; end-of-file returns to the list.
- Copy: `COPY` copies every listed file to `/mnt/usb/recording/DATE - [yyyy-MM-dd]/channelN/` on the first VFAT USB partition (`/dev/sd[a-j]1`).

---

## 9. Settings and update mechanisms

Admin entry (taskbar button 6 → admin login page, stack 7). Credentials accepted if both user and password equal a time-based code derived from the IMEI and the current minute (valid for 5 minutes), or both equal a hard-coded master value (see `on_pbLogin_6_clicked` in widget.cpp; not reproduced here because this document is public). Otherwise an `A_LOGIN` packet is sent and the server decides.

Settings page (stack 5) frames:

| Frame | Content |
|---|---|
| frame_6 | Updates: MNVR OTA (button 17), Baseboard OTA (button 20), MNVR from USB (button 18), PIS from USB (button 19), progress bars |
| frame_9 | Server 1/2/3 URL, port, interval, protocol |
| frame_10 | VoIP account and 6 speed-dial contacts |
| frame_11 | Language (English/Tamil), manual date/time, PIS volume 25/50/75/100 % |
| frame_12 | Mode N/M/P, camera count 4/8, CAN profile 1/2/3 (all three buttons currently set profile 0) |
| frame_13 / frame_14 | Playback search / result list |
| frame_16 | System info: SSD free/total, CPU, RAM, swap, IMEI, IMSI, CCID, ignition, Ethernet link |

**Automatic OTA**: after the first successful server-1 exchange (`connection_flag_auto_ota`), if `otaupdate.bb_version` differs from `bb_version` and starts with `V`, the baseboard OTA is triggered automatically; afterwards if `otaupdate.version` differs from `version` and starts with `V`, the application OTA is triggered. The UI is forced to the Updates frame during this.

**Application OTA** (`ota_download`): `ncftpget -u user -p pass <ip> /mnt/config <path>` (plain FTP), size check > 0, `cp /mnt/config/minixvr /mnt`, then `reboot`. No hash or signature verification.

**Baseboard OTA** (`ota_download_bb` + `baseboard_ota::update_baseboard`): download `upload/baseboard.bin` to `/mnt`, then on `/dev/ttyS1`: send `$PEIS,DFU\r\n#`, wait 3 s, send `Q\r\n#` (MCU reset to bootloader), then frames `SOF 0xAA | type | pkt# (2) | len (2) | data | sum32 (4) | EOF 0xBB` — START (fw size), DATA (1024-byte chunks, 6 s wait after the first), END. Each frame waits 250 ms and checks for `AA 01 00` ACK; on NACK it retries **forever**.

**USB application update**: find first VFAT partition, mount at `/mnt/usb`, `cp /mnt/usb/minixvr /mnt`, `reboot`.

**USB PIS update**: `rm -rf /mnt/videos/sda1/PIS`, then `cp -rv /mnt/usb/PIS /mnt/videos/sda1/` with progress from the `cp -v` output, then reload route list.

**Time sync**: after the first server-1 success `update_sys_DateTime()` sets system time and RTC from the modem network time; also available manually in Settings.

---

## 10. Passenger Information System (`process_web_hookup` state 0, PIS page)

- Route list from `ROUTEXML/RouteFile.xml` (`<Route routeno=...><StartPoint/><DestinationPoint/>`), shown 5 at a time with paging and a keyboard search (stack 8). Scheduled routes from the server (`SCH`) replace the list when present.
- `UPDATE ROUTE` (button `pbRoute7`): sequentially sends `DIS01..DIS04.bin` and brightness commands `$PEIS,BRIGHT,8,5,<FRONT|REAR|SIDE|INBUS>\r\n#` to the LED boards on `/dev/ttyUSB4` with 10 s gaps (progress bar 10→100 %), then loads `ROUTE/<route>.csv` (`name,lat,lon,audio` lines, max 140 stops) and starts auto-announcement.
- Auto-announcement (every 1 s with a GPS fix): haversine distance to each un-played stop; ≤ 330 m plays `NXT<stop>.mp3` and sends `NXT<stop>ENG.bin` to the in-bus LED; ≤ 200 m plays `APR<stop>.mp3`; ≤ 100 m plays `CUR<stop>.mp3` and sends `CUR<stop>ENG.bin`; 15 cycles later the in-bus LED reverts to `WELCOME.bin`. Audio is played by `mpg123` synchronously (blocks the thread while playing).
- Trip km: per-second haversine increment written to `/mnt/km_logs/<today>.log`; last-7-day sum computed; files older than 7 days deleted. (Display of km on the UI is commented out.)
- Header ticker shows `<Start> -TO- <Destination>`, the first stop, next three un-played stops and the last stop, scrolled by `updatefirmware()`.
- Trip control: `END TRIP` required before selecting another route; in schedule mode a trip is marked complete when the last stop is reached and the completed count `x/5` is shown.
- IDU messages: list from `IDUMSG/IDU.txt`; selecting and `PLAY` sends `<name>.bin` to the LED and plays `<name>.mp3`.
- Manual announcement: pick a stop and press Next / Approach / Current.
- PIS speaker volume via `amixer sset Speaker <25|50|75|100>%`.

---

## 11. Voice calls

- Active implementation (`process_VOIP` + `process_AT`): GSM voice through the modem. Speed-dial 1–6 map to `voip_flag` 1, 6, 7, 8, 9, 10; answer = 2, hang-up = 3. `DoCallcall` raises GPIO4 (audio path), mutes mic/speaker via `amixer`, queues `ATD<number>;`. Incoming `RING` sets GPIO4 and switches the UI to the call page. Hang-up restores the PIS speaker volume. Call volume 1–5 → `AT+CLVL=1..5`.
- Dormant implementation (`ecall.cpp`, `VoipCall`): SIP via `linphonec` driven through a FIFO, with a generated `/mnt/Linphonerc.txt` using `voip_url/username/password`. The dispatch code for it is commented out in `process_VOIP`.

---

## 12. CAN decoding (`Widget::process_can`)

Profile selected by `can_config[0]` (0 = Olectra, 1 = Switch, 2 = Ashok Leyland). **At runtime `can_config[0]` is forced to 0 every second in `updateDateTime`, so only the Olectra profile is effective.** Raw records are ASCII: 8 hex-char CAN ID, a separator, then 16 hex chars of data starting at index 9.

Olectra IDs: `18FEBF0B` speed (×1/256 km/h), `18FC08F4` battery voltage / current / SOC, `18FEC117` mileage (×5/1000 km), `18FC1621` gear (char at index 10: 2=R, 3=N, 0/4=D), `18F0010B` ABS/EBS status. Values are shown on the Vehicle Health page (stack 4). The Switch profile additionally fills `v_odometer/v_status/v_soc/v_speed/v_gear/v_current` for the CAN packet; Olectra does not, so the CAN packet carries empty fields for Olectra.

---

## 13. UI map (`widget.ui`, `QStackedWidget`)

| Index | Page | Main controls |
|---|---|---|
| 0 | Alerts / home | 9 quick-alert buttons (ACCIDENT, THEFT, BREAKDOWN, FLAT TYRE, TAKE DIVERSION, PROTEST, TESTING 2, REWORK, OTHERS), text field, SEND, 8-line history (red = sent by driver "OBU", yellow = received "OCC") |
| 1 | PIS | 5 route buttons, paging, search, UPDATE ROUTE, END TRIP, IDU MSG, MANUAL ANC, driver login/logout, progress bar |
| 2 | Camera | Live video (Qt window is translucent over the VO plane), BACK when in playback |
| 3 | Call | 6 speed-dial buttons, Connect, Disconnect, Volume ±, status label |
| 4 | Vehicle health | 6 CAN value tiles |
| 5 | Settings | frames listed in section 9 |
| 6 | Driver login | numeric keypad (0 = `D`, dot = `0`, `hi` = `R`, `/` = `B`, `*` = `A`), OK toggles user/password box |
| 7 | Admin login | same keypad, `hi` = `C` |
| 8 | Keyboard | QWERTY for route search |

Status bar (every second): date/time, RSSI icon G1–G5 (99 = no signal), GPS icon, server-link icon, IMEI, version, camera count, CAN mode, tamper / USB connect banners (`frame_17`).

---

## 14. Code-level observations relevant to testing

These were found while reading and are listed so they can be turned into targeted test cases (see the checklist document). They are not fixes.

1. **CPU spin**: `process_tcp1/2/3` loop without sleeping; `process_packet` spins on `can_event`; baseboard-OTA ACK loops (`goto`) retry with no limit.
2. **Shared serial buffer**: `char buffer[2048]` is used by every `SerialHandler` instance and by both the AT thread and the web thread without a lock; AT responses are parsed by fixed offsets (`buffer[15]`, `buffer[20]`) which break when an unsolicited `RING`/`+CRING` arrives (enabled by `AT+CRC=1`).
3. **Socket leak**: in `Worker::tcp` the `QTcpSocket` is `new`-ed each cycle and only deleted on the failure path.
4. **Store-and-forward**: 30 packets in RAM, lost on reboot; IS 16833 asks for 40 000 persistent logs.
5. **Health packet**: `mcu` and `hdd` flags both read `gpio_out[59]` (the ignition bit), so HDD health is never actually reported.
6. **Buffer sizes**: `copy_data` copies up to 600 bytes into 250-byte holders (`server1/2/3`, `ota_server`); `strcpy(rec_data, ...)` from an unbounded socket read into 512 bytes; `writeData_rawcall(sCallbuf,15)` sends a fixed 15 bytes regardless of number length.
7. **Runtime overrides**: camera count forced to 4 and CAN profile forced to Olectra every second, overriding the settings buttons and the saved config files.
8. **Credentials**: driver and admin passwords are sent in clear text in `D_LOGIN`/`A_LOGIN`; admin has a hard-coded master value in source; FTP OTA uses plain FTP with credentials in the config XML; downloaded binaries are not verified.
9. **Reboot on update**: USB and OTA application updates reboot the board immediately after copy, while recording is active.
10. **Time base**: packet time is derived from the modem's `AT+QLTS=2` (assumed IST); GPS time from RMC is not used; when the modem time is not numeric the system clock is used instead.
11. **Recording scope**: 4 channels only, no audio, 1-minute files, whole-day deletion when the SSD is nearly full, no event-tagged retention, no motion/schedule/alarm modes, no watermark, no dual stream handling in the app (encoder JSON lists one stream per channel).
12. **Emergency handling**: there is no dedicated emergency-button path; the only inputs that generate alerts are the driver's on-screen buttons, gyro thresholds and GPIO4 (tamper). No second-IP emergency stream, no SMS fallback, no `EPB` format.
13. **Startup order**: storage starts only if `/mnt/videos/sofia.db` opens during `sys_cam_init()`, i.e. the SSD must be mounted before `minixvr` starts.
14. **Blocking UI**: `delaySeconds()` pumps the event loop while waiting, so button handlers can re-enter; `mpg123` playback blocks the PIS thread; `ncftpget` and `cp` block the GUI thread.
