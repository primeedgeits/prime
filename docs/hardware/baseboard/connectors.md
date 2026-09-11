# Connectors

> **Status:** Draft · **Updated:** 2026-09-11 · **Source:** baseboard V2.1 schematic, top sheet and sub-sheets

Pinouts were read from the schematic netlist. Where the drawing is ambiguous the entry says **verify**. Always confirm against the PDF before making a cable.

## Board-to-board (MPU motherboard)

| Ref | Label | Pins | Purpose | Pinout |
|---|---|---|---|---|
| P1 | µBRD IO | 10 | Control lines and UART between MPU and MCU | 1 GPIO0 · 2 GND · 3 GPIO1 · 4 RX (MCU receives, MPU transmits) · 5 TX (MCU transmits, MPU receives) · 6 GSM_PWR_EN · 7 MCU_PWR_EN (verify) · 8 GPIO2 · 9 AMP_SW · 10 CALL-SW |
| P9 | HUB IN | 6 | Two USB host ports from the MPU | 1 HUBIN_P · 2 HUBIN_N · 3 GND · 4 USB1_AUDIO_N · 5 USB1_AUDIO_P · 6 GND. Pins 1–2 feed the hub (through choke L1); pins 4–5 feed the CM108B USB audio chip |
| P11 | µBRD PWR | 2 | +12 V to the MPU board | 1 +12Vout · 2 GND |
| J1 | VGA IN | 6 + shell | VGA from the MPU board | 1 Vsync · 2 Hsync · 3 Blue · 4 Green · 5 Red · 6 VGA_GND. Each colour has a 200 Ω series resistor (R5–R9) on the way to P10 |

## Add-on boards

The boards themselves are described on [Amplifier Add-on](../addons/amplifier.md) and [CAN Add-on](../addons/can.md), including the pin mapping at their end of each cable.

| Ref | Label | Pins | Purpose | Pinout |
|---|---|---|---|---|
| P3 | Header 7 | 7 | Amplifier add-on: power and audio inputs | 1 +12Vout · 2 GND · 3 ANNOUNCE_L · 4 (not identified, verify) · 5 ANNOUNCE_R · 6 CALL_SPK_P · 7 CALL_SPK_N |
| P4 | AMP OUT | 6 | Amplifier add-on: speaker outputs back to the baseboard, routed on to P14 | 1 SPK_R_P · 2 SPK_R_N · 3 SPK_L_P · 4 SPK_L_N · 5 DRIVER_SPK_P · 6 DRIVER_SPK_N |
| P5 | Header 6 | 6 | CAN add-on, MCU side (3.3 V logic) | 1 +5V · 2 CAN1-TX · 3 CAN1-RX · 4 CAN2-TX · 5 CAN2-RX · 6 GND |
| P6 | Header 4 | 4 | CAN add-on, bus side, routed on to P13 | 1 CAN1_H · 2 CAN1_L · 3 CAN2_H · 4 CAN2_L |

## Vehicle and peripheral connectors

| Ref | Label | Pins | Purpose | Pinout |
|---|---|---|---|---|
| J6 | Micro-Fit 430450822 | 8 + 2 shield | Vehicle power in and converter loop (verify the whole pinout) | 1 Vin (to the external converter) · 2 GND · 3 +12V (from the converter) · 4 GND · 5 B+ · 6 B− · 7 V_IGN · 8 +12Vout · S1, S2 GND |
| P13 | COM OUT | 14 (2×7) | Communications harness | 1 CAN1_H · 2 CAN2_H · 3 CAN1_L · 4 CAN2_L · 5 GND · 6 RS485_A · 7 RS232-RX · 8 RS485_B · 9 RS232-TX · 10 SOS · 11 EXT1_USB_P · 12 5V_EXT · 13 EXT1_USB_N · 14 GND |
| P14 | AUDIO & IO OUT | 16 (2×8) | Speakers, microphone, digital I/O | 1 SPK_L_P · 2 SPK_L_N · 3 SPK_R_P · 4 SPK_R_N · 5 DRIVER_SPK_P · 6 DRIVER_SPK_N · 7 MIC_P · 8 MIC_N · 9 MIC-SW · 10 +12Vout (through R22 and R11, 0 Ω) · 11 DIG_OUT1 · 12 DIG_OUT2 · 13 DIG_IN3 · 14 DIG_IN4 · 15 DIG_IN1 · 16 DIG_IN2 |
| P10 | VGA & TOUCH OUT | 10 (2×5) | Monitor: VGA, touch USB, 5 V | 1 +5V (through fuse F1) · 2 TOUCH_USB_N · 3 GND · 4 TOUCH_USB_P · 5 VGA_Vsync · 6 VGA_Hsync · 7 VGA_B · 8 VGA_G · 9 VGA_R · 10 VGA_GND |
| P7 | EXT USB OUT | 6 | External USB (hub port 4) | USB D+ and D− (EXT_USB and EXT1_USB pairs joined by 0 Ω R3/R4), +5V, GND. Pin order: verify |
| P12 | +12V OUT | 2 | Switched +12 V for an accessory | 1 +12Vout · 2 GND |
| P2 | TAMPER IN | 2 | Tamper switch (closes to GND) | 1 TAMPER · 2 GND |
| P8 | LED INDICATION | 6 | Five status LEDs driven by MCU PB5–PB9 | 1–5 LED1–LED5 (200 Ω series R5–R9, verify) · 6 GND |
| ANT1 | | coax | GNSS antenna | Centre → R55 0 Ω → module EX_ANT; D6 ESD |

## Service connectors

| Ref | Label | Pins | Purpose | Pinout |
|---|---|---|---|---|
| P17 | PROG CONN | 4 | MCU SWD programming | 1 SWCLK · 2 SWDIO · 3 GND · 4 +3.3V (through R64 0 Ω) |
| P16 | Header 3 | 3 | 4G module debug UART | 1 GSM-UART-RX · 2 GSM-UART-TX · 3 GND |
| P15 | Header 3 | 3 | Codec headphone output (not used in the product, verify) | 1 HPO_R · 2 HPO_L · 3 AGND |
| J2 | Mini PCIe, TE 1759547-1 | 52 | 4G module | USB D+/D−, USIM ×4, PCM ×4, I2C ×2, UART RX/TX, LED_WWAN#, 3.3 V ×4, GND. WAKE#, W_DISABLE# and PERST# are not connected (verify) |
| J3 | SIM holder, SIM7100-6-1-15-01-A | | Physical SIM ("SIM2"); its card-detect pin selects it over the eSIM | |
| JP1 | Jumper | 2 | Codec JD1 (jack detect) to AGND | |
| JP2 | Jumper | 2 | Shorts U24 ENA to GND, which disables the 5 V converter. Leave open for normal operation (verify) | |
| SW1 | Button | | MCU reset | |
| BT1, BT2 | Battery | | GNSS backup, MCU RTC backup | |
| TP1–TP11 | Test points | | See [PCB & Fabrication](pcb.md) | |
