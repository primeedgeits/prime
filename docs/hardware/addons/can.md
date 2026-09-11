# CAN Add-on

> **Status:** Draft · **Updated:** 2026-09-11 · **Source:** schematic "CAN SHEET" (one sheet, dated 11/01/2023 on the drawing)

A single-channel CAN transceiver board that plugs into the baseboard's P5 (MCU side) and P6 (bus side). The baseboard carries two CAN channels on those headers, but this board serves **channel 1 only**: its pins for CAN2 are not connected. A second board, or a two-channel variant, would be needed for CAN2 (open question).

Items marked **verify** are inferred from the drawing rather than printed on it.

## Facts

| Item | Value |
|---|---|
| Transceiver | U1, TI SN65HVD1050, 5 V, ISO 11898-2 high-speed CAN, up to 1 Mbit/s |
| Supply | +5 V from baseboard P5 pin 1; C1 4.7 µF, C2 100 nF |
| Mode | RS pin → R1 0 Ω → GND: high-speed mode, no slope control, no standby. The MCU cannot put the transceiver to sleep |
| Logic levels | The transceiver runs at 5 V. Its TXD input accepts the MCU's 3.3 V logic. Its RXD output drives MCU pin PA11 with 5 V logic; PA11 is 5 V-tolerant on the STM32F105 pinout, verify for the GD32F105 |
| Common-mode filter | L1 common-mode choke between the transceiver and the bus; R2 and R6 0 Ω links; C3 and C5 10 nF from each line to GND |
| Termination | Two networks are drawn: R4 120 Ω straight across the lines, and a split termination R3 + R5 (60.4 Ω each) to Vsplit with C4 10 nF to GND, where Vsplit comes from the transceiver's VREF through R7 0 Ω. Fitting both would load the bus with 60 Ω, so one is presumably not fitted. **Verify** which parts are fitted. Termination belongs only at the two ends of a bus; a device tapped into the middle of a vehicle bus should have none |
| Protection | U2 CDSOT23-SM712 TVS across the bus lines |

## Connectors

**P1, 6-pin (to baseboard P5)**

| P1 pin | Signal | Baseboard P5 pin |
|---|---|---|
| 1 | +5V | 1 +5V |
| 2 | CAN1-TX | 2 CAN1-TX (MCU PA12) |
| 3 | CAN1-RX | 3 CAN1-RX (MCU PA11) |
| 4 | not connected | 4 CAN2-TX |
| 5 | not connected | 5 CAN2-RX |
| 6 | GND | 6 GND |

**P2, 4-pin (to baseboard P6)**

| P2 pin | Signal | Baseboard P6 pin | Reaches the harness on |
|---|---|---|---|
| 1 | CAN1_P (CAN_H) | 1 CAN1_H | P13 pin 1 |
| 2 | CAN1_N (CAN_L) | 2 CAN1_L | P13 pin 3 |
| 3 | not connected | 3 CAN2_H | P13 pin 2 |
| 4 | not connected | 4 CAN2_L | P13 pin 4 |

## Notes for firmware

- Bit rate is set in the MCU's CAN controller. SAE J1939 buses run at 250 kbit/s; some vehicles use 500 kbit/s. See [CAN Signal Map](../../code/can-signals.md).
- Listen-only operation must be enforced in the MCU's CAN controller (silent mode). The transceiver has no listen-only pin, so a firmware bug could transmit onto the vehicle bus.
- Before connecting to a live vehicle, confirm the termination fitted on this board. A wrongly terminated tap can disturb the vehicle's own CAN traffic.

## Open questions

- Is a second CAN add-on fitted for channel 2 in the product? Same design?
- Which termination parts are fitted?
- Are the CAN grounds shared with the vehicle chassis, or is isolation needed?

## Source file

`docs/hardware/files/CAN-SHEET.pdf` ([open](../files/CAN-SHEET.pdf)). If the link fails, the file has not been copied into the repository yet.
