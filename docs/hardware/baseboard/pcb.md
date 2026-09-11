# PCB & Fabrication

> **Status:** Draft · **Updated:** 2026-09-11 · **Source:** baseboard V2.1 fabrication drawing (last page of the schematic PDF) and the top sheet

## Layer stack

| Layer | Use |
|---|---|
| L1 | Top: components and signals |
| L2 | GND plane |
| L3 | Signals and power |
| L4 | Bottom: plane and components |

Four layers. Board thickness 55.56 mil (about 1.41 mm), tolerance ±10 %.

## Fabrication notes (as printed)

| # | Item | Value |
|---|---|---|
| 1 | Impedance control | Yes, refer to the impedance table |
| 2 | Stack-up | Per the table |
| 3 | Copper thickness | Per the table |
| 4 | Solder mask | Green |
| 5 | Silkscreen | White, non-conductive ink |
| 6 | DRC check | Yes, contact if any issues |
| 7 | RoHS | Yes, lead-free |
| 8 | PCB thickness | 55.56 mil ±10 % |
| 9 | Surface finish | ENIG (gold) |
| 10 | Remove silkscreen on pads | Yes |
| 11 | Via tenting | Yes |
| 12 | Processing edge | Yes, as per the standard |

## Controlled impedances

The impedance table lists 50 Ω single-ended and 90 Ω differential (USB) traces as microstrip on the outer layers and stripline on the inner layers, plus a 100 Ω differential option. Track widths and gaps are in the table on the drawing; read them from the PDF rather than from here.

## Mechanical

- Six mounting holes MH1–MH6. Each is connected to GND through its own 0 Ω 1206 resistor (R12–R17), so any hole can be isolated from ground by leaving the resistor off.
- Three global fiducials FM1–FM3.
- The fabrication drawing shows the board mounted on a larger bracket with additional holes (the enclosure or chassis plate).

## Test points

| Test point | Signal |
|---|---|
| TP1 | +3.3V (MCU rail) |
| TP2 | UART5-RX (MCU PD2) |
| TP3 | UART5-TX (MCU PC12) |
| TP4 | +12V |
| TP5 | GND |
| TP6 | 3V3 (codec) |
| TP7 | 1V8 (codec) |
| TP8 | +5V |
| TP9 | +3.3V_GPS |
| TP10 | +3.3V (MCU rail, at the regulator) |
| TP11 | +3.3V_GSM |

## Design conventions seen on the board

- 0 Ω resistors are used as configuration links throughout (grounding options, alternative signal sources, add-on bypasses). When debugging, check which links are fitted before trusting the schematic.
- Separate analogue ground (AGND) for the audio section, joined to GND at single points (R42, R147, 0 Ω).
- ESD protection on every external interface: USB (U1, U2, D19), RS-232 (U17), RS-485 (U20), SIM (U7), GNSS antenna (D6).
