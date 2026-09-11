# CAN Health Monitoring: Functionality Checklist

> **Status:** Draft · **Updated:** 2026-09-11

Items tagged **[given]** come from the product owner. All other items are proposals: keep, edit or delete them. Tick a box when the feature is implemented and tested. Flows are on the [Overview & Flow](overview.md) page.

## Bus configuration

- [ ] MCU reads vehicle parameters from CAN and forwards them to the MPU **[given]**
- [ ] Bit rate configurable per channel (250 kbit/s default for J1939; 500 kbit/s option)
- [ ] Listen-only (silent) mode by default; transmitting requires an explicit setting
- [ ] Hardware acceptance filters for the configured message IDs
- [ ] Vehicle profile selects the signal map (make, model, year)
- [ ] Second CAN channel supported by firmware, even if the add-on is not fitted
- [ ] Bus error counters and bus-off recovery handled and reported

## Parameters

- [ ] Engine speed, vehicle speed, coolant temperature, oil pressure, fuel level, battery voltage, engine hours, total distance (see the signal map)
- [ ] Active fault codes (J1939 DM1)
- [ ] Additional values per vehicle profile (proposed: fuel rate, intake temperature, brake status, door status, accelerator position, gear)
- [ ] Every value carries a timestamp and a stale flag

## Decoding and aggregation

- [ ] Decoding per the signal map, with scaling and offsets; "not available" and "error" raw values handled
- [ ] Location of decoding decided: MCU or MPU
- [ ] Aggregation per interval: latest, minimum, maximum, average
- [ ] Reporting interval to the MPU configurable (proposal: 10 s)
- [ ] Derived values: distance per trip, fuel consumed per trip, idle time (proposed)

## Thresholds and alerts

- [ ] Warning and critical limits per value, with minimum duration before an alert
- [ ] Alert events sent to the backend immediately; cleared events sent when the value recovers
- [ ] On-screen warning for the driver, with acknowledgement
- [ ] Fault code events with SPN, failure mode, occurrence count and description where known
- [ ] Alert history stored locally

## Driver display

- [ ] Vehicle health screen with live values, warnings and fault codes
- [ ] Warning banner or icon visible on every screen

## Reporting and storage

- [ ] Health packet to the backend at a configurable interval (proposal: 60 s) and on alert
- [ ] Store-and-forward when offline, with a configurable retention
- [ ] Trip summary at trip end (proposed)
- [ ] Raw frame logging mode for diagnostics, saved to storage or USB (proposed)

## Diagnostics and safety

- [ ] "CAN silent" detection and report
- [ ] Bus statistics on the technician screen: frames per second, errors, accepted IDs
- [ ] Confirmation on a real vehicle that the device does not disturb the bus (termination checked)
- [ ] Signal map verified on each supported vehicle and recorded in the "Verified on" column
