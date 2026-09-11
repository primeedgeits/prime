# Amplifier Add-on (50 W)

> **Status:** Draft · **Updated:** 2026-09-11 · **Source:** schematic "AMPLIFIER 50W" (one sheet, PCB drawing, board stack report)

A small class-D amplifier board that plugs into the baseboard (inputs on baseboard P3, outputs back on P4) and drives the passenger speakers and the driver speaker. See [Audio Paths](../baseboard/audio.md) for how audio reaches it.

Items marked **verify** are inferred from the drawing rather than printed on it.

## Facts

| Item | Value |
|---|---|
| Amplifier IC | U1, TI TPA3116D2 stereo class-D, used as two bridge-tied (BTL) channels |
| Supply | +12 V from the baseboard (+12Vout) through D1 SS54 Schottky (reverse-polarity protection) → PVCC. Bulk capacitors C2 and C25, 470 µF |
| Power LED | D2 through R1 1 kΩ |
| Board size | 56 × 33 mm, two mounting holes at the corners |
| Layer stack | The "Board Stack Report" page in the PDF is blank; layer count TBD |
| Connectors | P2 (6-pin input) and P1 (6-pin output) |

## Channels

| Amplifier channel | Input | Level control | Output filter | Output pins | Speaker |
|---|---|---|---|---|---|
| Right | INR_P and INL_P (announcement audio from the baseboard) summed through R4 and R5, 0 Ω (verify) | R6 10 kΩ trimmer | L1, L2 10 µH with 680 nF | R_SPKR_P (P1 pin 1) and L_SPKR_N (P1 pin 4) | Passenger speakers |
| Left | DRV_SPK_P (call audio from the baseboard codec) | R11 10 kΩ trimmer | L3, L4 10 µH with 680 nF | DRIVER_SPKR_P/N (P1 pins 5–6) | Driver speaker |

The passenger output is one mono bridged channel. R_SPKR_N (P1 pin 2) and L_SPKR_P (P1 pin 3) are joined by R8 (0 Ω), so the channel appears across pins 1 and 4 with pins 2–3 as a mid-point: two passenger speakers wired in series (one across pins 1–2, one across 3–4), or a single speaker across pins 1–4. **Verify** with the installation.

DRV_SPK_N is tied to the amplifier ground through R14 (0 Ω), so the call audio is treated as single-ended and the codec's CALL_SPK_N is grounded at the amplifier (verify).

Each output also has a Zobel network (3.3 Ω with 10 nF: R3/C6, R7/C9, R12/C20, R15/C22) and 1000 pF to ground.

## Configuration pins

| Pin | Setting | Effect |
|---|---|---|
| GAIN/SLV (8) | Divider R9 100 kΩ to GVDD, R10 39 kΩ to GND | Gain per the TPA3116D2 datasheet table for this ratio; look it up and record it here |
| PLIMIT (6) | Tied to GVDD (7) | Power limiting off |
| MUTE (12) | R13 100 kΩ to GND | Never muted by the board; the baseboard has no mute line to it |
| SDZ (2), FAULTZ (3) | Pulled up through R2 100 kΩ | Always enabled; the fault output is not read |
| AM0, AM1, AM2 (15, 14, 13) | R16–R18 0 Ω to GND | Switching-frequency select, all low |
| MODSEL (1) | GND | Modulation mode select |
| SYNC (16) | Not connected | |
| Bootstrap | C7, C13, C15, C21 0.22 µF | |

Because there is no mute or enable line, the amplifier is live whenever +12Vout is present. Pops at power-up or source switching would have to be handled on the baseboard side (verify whether this is a problem in practice).

Claude's note: the board is called 50 W, which is the TPA3116D2's rating at about 21 V. At the 12 V supply the datasheet figures are nearer 15 W per channel into 4 Ω. Check the speaker impedance and the loudness the bus needs.

## Connectors

**P2, input (cable from baseboard P3)**

| P2 pin | Signal | From baseboard P3 |
|---|---|---|
| 1 | +12V | +12Vout (pin 1) |
| 2 | GND | GND (pin 2) |
| 3 | INR_P | ANNOUNCE_R (pin 5) |
| 4 | INL_P | ANNOUNCE_L (pin 3) |
| 5 | DRV_SPK_P | CALL_SPK_P (pin 6) |
| 6 | DRV_SPK_N | CALL_SPK_N (pin 7) |

The baseboard header has 7 pins and this board has 6, so the cable is not pin-for-pin. Verify the mapping above against a real cable.

**P1, output (cable to baseboard P4)**

| P1 pin | Signal | Baseboard P4 pin |
|---|---|---|
| 1 | R_SPKR_P | 1 SPK_R_P |
| 2 | R_SPKR_N | 2 SPK_R_N |
| 3 | L_SPKR_P | 3 SPK_L_P |
| 4 | L_SPKR_N | 4 SPK_L_N |
| 5 | DRIVER_SPKR_P | 5 DRIVER_SPK_P |
| 6 | DRIVER_SPKR_N | 6 DRIVER_SPK_N |

Same order on both ends. From P4 the signals go to the harness on P14 pins 1–6.

## Open questions

- Speaker impedance and count on each output.
- Are the two trimmers set at manufacture or adjusted on site?
- Layer count of the board.

## Source file

`docs/hardware/files/AMPLIFIER-50W.pdf` ([open](../files/AMPLIFIER-50W.pdf)). If the link fails, the file has not been copied into the repository yet.
