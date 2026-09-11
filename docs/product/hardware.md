# Hardware Overview

> **Status:** Draft · **Updated:** 2026-09-11

MNVR is built from two boards with two main processors. The **MPU motherboard** does the heavy work (display, cameras, announcements, backend communication). The **baseboard** is the extension board it plugs into: it holds the microcontroller, the 4G module, the GNSS receiver, all vehicle-facing connectors, the audio hardware and the power supply.

| Board | Processor | Responsibilities | Details |
|---|---|---|---|
| MPU motherboard | MC6630 application processor (exact part and vendor TBD) | Monitor with touch display; all camera operations; automatic next-stop announcements; receives CAN and GPS data from the MCU, processes it and sends it to the backend over 4G | [MPU Motherboard](../hardware/mpu-board.md) |
| Baseboard V2.1 | GD32F105RBT6 microcontroller (Arm Cortex-M3) | Power and ignition control; GNSS receiver; two CAN channels; accelerometer; isolated digital I/O, SOS and tamper; RS-232; forwards data to the MPU over UART. Also hosts the 4G module, SIM/eSIM, USB hub, USB-RS-485 converter, audio codec, USB audio and audio switches | [Baseboard Overview](../hardware/baseboard/overview.md) |

## How the boards connect

The MPU board and the baseboard are joined by four cables or headers on the baseboard:

| Link | Baseboard connector | Carries |
|---|---|---|
| Control and UART | P1 "µBRD IO" | MCU UART (TX/RX), three GPIOs, 4G power enable, MCU power enable (verify), audio switch controls |
| USB | P9 "HUB IN" | Two USB host ports from the MPU: one to the 4-port hub, one to the USB audio chip |
| Display | J1 "VGA IN" | VGA from the MPU, passed through to the monitor on P10 |
| Power | P11 "µBRD PWR" | Switched +12 V to the MPU board |

## Add-on boards and external parts

| Item | Where | Notes |
|---|---|---|
| CAN transceivers (2 channels) | CAN add-on board on P5/P6 | Part TBD; the MCU's CAN controllers are on the baseboard, the transceivers are not |
| Audio power amplifier | Amplifier add-on board on P3/P4 | Drives passenger speakers and the driver speaker |
| 24 V → 12 V converter | External module wired through J6 (verify) | Buses have 24 V electrical systems |
| Monitor with touch | Cable to P10 | VGA + USB touch + 5 V |
| Cameras | Connect to the MPU board | Type and count TBD |
| Speakers, microphone, digital I/O | Vehicle harness on P14 | |
| CAN, RS-485, RS-232, SOS, external USB | Vehicle harness on P13 | |
| GNSS antenna | ANT1 | |
| 4G antenna(s) | On the 4G module | |
| SIM | J3 holder, or the on-board eSIM | Physical SIM takes priority when inserted (verify) |

## Environment

| Requirement | Value |
|---|---|
| Operating temperature | TBD |
| Vibration and shock | TBD |
| Dust and water protection | TBD |
| Electrical and EMC standards | TBD |

## Open questions

- Exact MPU part number, vendor and operating system.
- Do schematics exist for the MPU motherboard, the CAN add-on and the amplifier add-on? They should be added here.
- What is the external power converter?
- Target cost per unit?
