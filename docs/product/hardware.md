# Hardware

> **Status:** Draft · **Updated:** 2026-09-11

## Components

| Component | Purpose | Choice | Notes |
|---|---|---|---|
| Main processor (SoC) | Runs the firmware and encodes video | TBD | Needs hardware video encoding for all camera channels |
| Camera inputs | Connect the cameras | TBD | AHD or IP; see [Video Surveillance](features/video-surveillance.md) |
| Storage | Keeps recordings | TBD | Must survive vibration and heat; SSD or SD handle vibration better than HDD |
| 4G modem | Data link to the backend; possibly voice | TBD | Needs voice support if calls use the mobile network |
| GNSS receiver | Position | TBD | |
| CAN interface | Reads vehicle data | TBD | Number of CAN channels TBD |
| Audio | Microphone and speaker for calls | TBD | |
| Power supply | Runs from the vehicle battery | TBD | Buses usually have 24 V systems; plan for a wide input range, ignition-controlled power on/off and safe shutdown |
| Inputs and outputs | Ignition sense, panic button, door sensors | TBD | |

## Environment

| Requirement | Value |
|---|---|
| Operating temperature | TBD |
| Vibration and shock | TBD |
| Dust and water protection | TBD |
| Electrical and EMC standards | TBD |

## Open questions

- Build custom hardware, or start from an existing MNVR board or module?
- Target cost per unit?
