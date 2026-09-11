# MPU Motherboard

> **Status:** Draft · **Updated:** 2026-09-11

The MPU (application processor) board is the main computer of the MNVR. It plugs into the [baseboard](baseboard/overview.md). No schematic for it has been added to these docs yet.

## Facts so far

| Item | Value |
|---|---|
| Processor | MC6630 (as described by the user; exact part number, vendor and architecture TBD) |
| Operating system | TBD |
| Form | Motherboard; the baseboard is its extension board |
| Camera interface | On this board. Camera type and count TBD |
| Storage for recordings | TBD |
| Display output | VGA, to the baseboard J1, passed through to the monitor on P10 |
| USB | Two host ports go to the baseboard on P9 (see below) |
| UART | One UART to the MCU, on P1 (3.3 V TTL, activity LEDs D9/D10 on the baseboard) |
| Control lines to the baseboard (P1) | GPIO0, GPIO1, GPIO2 (to MCU pins PA15, PB3, PB4; purpose TBD), GSM_PWR_EN (4G module power), MCU_PWR_EN (MCU power, verify), AMP_SW and CALL-SW (audio routing) |
| Power | +12 V from the baseboard P11 |

## Responsibilities

- Drive the monitor and read the touch panel.
- All camera operations: capture, recording, live view, playback.
- Automatic next-stop announcements, played through the baseboard's USB audio chip and amplifier.
- Receive CAN parameters from the MCU, process them, send them to the backend.
- Receive GPS data from the MCU, process it, send it to the backend.
- Backend communication over the 4G module (USB).
- Voice call control (4G module AT commands and audio switch selection, verify).

## USB topology: description vs schematic

The user described the MPU's two USB ports as: one directly to the monitor's touch panel, the other to the 4-port hub (USB audio, USB-to-RS-485, external USB, 4G module).

The baseboard V2.1 schematic shows a different arrangement:

| MPU USB port | Baseboard path | Device |
|---|---|---|
| Port A (P9 pins 1–2, "HUBIN") | HS8836A hub | Port 1: monitor touch (P10) · Port 2: 4G module · Port 3: CP2102N USB-RS-485 · Port 4: external USB (P7/P13) |
| Port B (P9 pins 4–5, "USB1_AUDIO") | direct | CM108B USB audio |

So on this schematic the touch panel is behind the hub and the USB audio chip is the direct connection. **Open question:** which is correct for the current build? (The schematic is dated 2023; a later revision may have swapped them.)

Also, the USB audio chip is a CM108B, which the MPU sees as a standard USB audio device with analogue output. Its I2S pins are unconnected, so "USB to I2S" in the description may refer to a different part on a newer build. Verify.

## Open questions

- Exact processor and OS. This decides the whole software stack (see [Codebase Overview](../code/overview.md)).
- Is there existing software on the MPU? Where is the code?
- Camera interface: AHD, IP, MIPI CSI? How many channels?
- Storage: SSD, SD card, eMMC? Capacity?
- Display resolution and touch controller.
- Which board holds the 4G antenna connectors?
- Does the MPU control the MCU's power (P1 pin 7)? If so, what is the power-up sequence?
