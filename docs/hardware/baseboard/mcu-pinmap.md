# MCU Pin Map (GD32F105RBT6)

> **Status:** Draft · **Updated:** 2026-09-11 · **Source:** baseboard V2.1 schematic, sheet "MCU" (U12), cross-checked with the top sheet

## The part

| Item | Value |
|---|---|
| MCU | GigaDevice GD32F105RBT6, Arm Cortex-M3, LQFP-64. Pin- and peripheral-compatible with the STM32F105RB |
| High-speed crystal | Y2, 25 MHz (not the 8 MHz many examples assume; set the PLL pre-divider accordingly) |
| Low-speed crystal | Y1, 32.768 kHz for the RTC |
| VBAT | BT2 backup battery through D8 |
| Reset | NRST: push button SW1, 10 kΩ pull-up R68, 100 nF C73 |
| Boot | BOOT0 and BOOT1 (PB2) both pulled to GND with 100 kΩ, so it boots from flash |
| Debug | SWD on P17 (SWDIO PA13, SWCLK PA14), 10 Ω series resistors |
| Supply | +3.3V rail from U26, switched by MCU_PWR_EN (see [Power & Ignition](power.md)) |

## Peripheral summary

The schematic uses STM32-style peripheral names. GigaDevice numbers them from zero, so the same pins have different names in the GD32 datasheet and firmware library. **Verify** the GD names against the GD32F105 datasheet before coding.

| Function | Pins | STM-style name (schematic) | GD32 name (verify) | Connected to |
|---|---|---|---|---|
| UART to the MPU | PC10 TX, PC11 RX | UART4 | UART3 | P1 pins 5 (TX) and 4 (RX). Activity LEDs D9 (green, TX) and D10 (orange, RX) |
| UART to the GNSS module | PA2 TX, PA3 RX | USART2 | USART1 | U11 RXD/TXD via 1 kΩ R53/R54 |
| RS-232 | PA9 TX, PA10 RX | USART1 | USART0 | U16 MAX3232 → P13 pins 9 (TX) and 7 (RX) |
| Spare UART | PC12 TX, PD2 RX | UART5 | UART4 | Test points TP3, TP2 only |
| I2C to the accelerometer | PB10 SCL, PB11 SDA | I2C2 | I2C1 | U13 MPU-6050, 4.7 kΩ pull-ups |
| CAN channel 1 | PA11 RX, PA12 TX | CAN1 | CAN0 | P5 pins 3, 2 → CAN add-on |
| CAN channel 2 | PB12 RX, PB13 TX | CAN2 | CAN1 | P5 pins 5, 4 → CAN add-on |
| ADC | PA4, PA5 | ADC IN4, IN5 | | Battery voltages, ratio 1/11 |
| SWD | PA13, PA14 | | | P17 |

## Pin-by-pin

| Pin | Name | Signal | Dir | Notes |
|---|---|---|---|---|
| 1 | VBAT | VBAT | in | BT2 through D8 and R58 (0 Ω) |
| 2 | PC13-TAMPER-RTC | — | | Not connected |
| 3 | PC14-OSC32_IN | Y1 | | 32.768 kHz crystal, C69 20 pF |
| 4 | PC15-OSC32_OUT | Y1 | | 32.768 kHz crystal, C70 20 pF |
| 5 | PD0-OSC_IN | Y2 | | 25 MHz crystal, C71 30 pF |
| 6 | PD1-OSC_OUT | Y2 | | 25 MHz crystal, C72 30 pF |
| 7 | NRST | NRST | in | SW1 reset button |
| 8 | PC0 | D_IN1 | in | Isolated digital input 1, from U14 optocoupler, 10 kΩ pull-up (active low, verify) |
| 9 | PC1 | D_IN2 | in | Isolated digital input 2 |
| 10 | PC2 | D_IN3 | in | Isolated digital input 3 |
| 11 | PC3 | D_IN4 | in | Isolated digital input 4 |
| 12 | VSSA | GND | | |
| 13 | VDDA | +3.3V | | C62 10 nF + C68 1 µF between VDDA and VSSA |
| 14 | PA0-WKUP | WAKEUP | in | Ignition wake-up. Polarity depends on which 0 Ω link is fitted: R66 (direct, high = ignition on) or R71 (via Q2, low = ignition on). Verify |
| 15 | PA1 | V-IGNsense | in | 3.3 V while the ignition is on (from U21) |
| 16 | PA2 | MCU-TX(GPS) | out | USART2 TX → GNSS RXD |
| 17 | PA3 | MCU-RX(GPS) | in | USART2 RX ← GNSS TXD |
| 18 | VSS_4 | GND | | |
| 19 | VDD_4 | +3.3V | | |
| 20 | PA4 | INT-BATT | analog | +12V rail ÷ 11, via R153 0 Ω |
| 21 | PA5 | EXT-BATT | analog | Battery input (Vin) ÷ 11, via R154 0 Ω |
| 22 | PA6 | GPS_WKUP | out | GNSS module WAKE_UP pin |
| 23 | PA7 | GPS_PWR_EN | out | Enables the +3.3V_GPS regulator (U25 via Q6) |
| 24 | PC4 | — | | Not connected |
| 25 | PC5 | — | | Not connected |
| 26 | PB0 | — | | Not connected |
| 27 | PB1 | — | | Not connected |
| 28 | PB2 / BOOT1 | BOOT1 | | 100 kΩ to GND (R69) |
| 29 | PB10 | I2C_SCL | | I2C2 SCL → MPU-6050 |
| 30 | PB11 | I2C_SDA | | I2C2 SDA → MPU-6050 |
| 31 | VSS_1 | GND | | |
| 32 | VDD_1 | +3.3V | | |
| 33 | PB12 | CAN2-RX | in | CAN2 RX ← CAN add-on (P5 pin 5) |
| 34 | PB13 | CAN2-TX | out | CAN2 TX → CAN add-on (P5 pin 4) |
| 35 | PB14 | MCU-TAMPER-SW | in | Tamper input from U15 optocoupler, 10 kΩ pull-up R97 (active low, verify) |
| 36 | PB15 | MCU-SOS-SW | in | SOS button from U15 optocoupler, 10 kΩ pull-up R96 (active low, verify) |
| 37 | PC6 | D_OUT1 | out | Digital output 1: 100 Ω → U15 → Q3 |
| 38 | PC7 | D_OUT2 | out | Digital output 2: 100 Ω → U15 → Q4 |
| 39 | PC8 | — | | Not connected |
| 40 | PC9 | — | | Not connected |
| 41 | PA8 | REL-EN | out | High holds the power relay K1 closed |
| 42 | PA9 | UART(RS232)-TX | out | USART1 TX → MAX3232 |
| 43 | PA10 | UART(RS232)-RX | in | USART1 RX ← MAX3232 |
| 44 | PA11 | CAN1-RX | in | CAN1 RX ← CAN add-on (P5 pin 3) |
| 45 | PA12 | CAN1-TX | out | CAN1 TX → CAN add-on (P5 pin 2) |
| 46 | PA13 | SWDIO | | P17 pin 2 via R67 10 Ω |
| 47 | VSS_2 | GND | | |
| 48 | VDD_2 | +3.3V | | |
| 49 | PA14 | SWCLK | | P17 pin 1 via R65 10 Ω |
| 50 | PA15 | GPIO0 | | To the MPU, P1 pin 1, via R1 0 Ω. Also shown as an option for RS485-EN (verify) |
| 51 | PC10 | MCU-TX | out | UART4 TX → MPU (P1 pin 5) via R63 10 Ω; D9 green LED |
| 52 | PC11 | MCU-RX | in | UART4 RX ← MPU (P1 pin 4) via R62 10 Ω; D10 orange LED |
| 53 | PC12 | UART5-TX | out | Test point TP3 only |
| 54 | PD2 | UART5-RX | in | Test point TP2 only |
| 55 | PB3 | GPIO1 | | To the MPU, P1 pin 3, via R2 0 Ω |
| 56 | PB4 | GPIO2 | | To the MPU, P1 pin 8 |
| 57 | PB5 | LED1 | out | Status LED 1 → P8 via 200 Ω |
| 58 | PB6 | LED2 | out | Status LED 2 |
| 59 | PB7 | LED3 | out | Status LED 3 |
| 60 | BOOT0 | BOOT0 | | 100 kΩ to GND (R61) |
| 61 | PB8 | LED4 | out | Status LED 4 |
| 62 | PB9 | LED5 | out | Status LED 5 |
| 63 | VSS_3 | GND | | |
| 64 | VDD_3 | +3.3V | | |

## Notes for firmware

- **PA15, PB3 and PB4 are JTAG pins after reset** (JTDI, JTDO, NJTRST). Firmware must switch the debug port to SWD-only before using GPIO0–GPIO2. The SWD pins PA13/PA14 stay available.
- **CAN1 on PA11/PA12 excludes USB.** The MCU's USB device pins are the same pair, so the MCU has no USB.
- **ADC scaling:** input voltage = ADC voltage × 11. Both dividers are clamped by 3.3 V zeners.
- **Digital inputs, SOS and tamper are pulled up** on the MCU side and driven low through optocouplers when active (verify polarity on hardware).
- **Ignition:** read PA1 for the level and PA0 for wake-up from low-power modes. Establish the WAKEUP polarity on real hardware.
- **Power hold:** set PA8 (REL-EN) high early in boot if the system must stay on after ignition-off; drop it to power down.
- **GNSS power:** PA7 must be high before the GNSS module responds. Consider keeping BT1 in place for warm starts.
- **Meaning of GPIO0–GPIO2** between the MCU and MPU is TBD (candidates: MPU ready, data-ready interrupt, shutdown request). Define it in the [MPU ↔ MCU UART Protocol](../../code/mpu-mcu-uart.md).

## What the firmware must handle

1. Ignition sensing, relay hold and orderly power-down coordination with the MPU.
2. GNSS: power control, UART parsing (NMEA), forwarding fixes to the MPU.
3. CAN ×2: bit rate configuration, filtering, J1939 decoding or raw forwarding (see [CAN Signal Map](../../code/can-signals.md)).
4. MPU-6050: initialise over I2C, sample, detect harsh events (polling; INT is not wired).
5. Digital inputs ×4, SOS, tamper: debounce and report.
6. Digital outputs ×2, status LEDs ×5.
7. Battery voltages on the ADC, with thresholds for low-voltage warnings.
8. RS-232 on USART1 (purpose TBD).
9. The UART link to the MPU: framing, acknowledgements, configuration commands.
10. Watchdog and a bootloader or update path over the MPU link (TBD).
