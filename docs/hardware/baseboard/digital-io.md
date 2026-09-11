# Digital I/O & Sensors

> **Status:** Draft · **Updated:** 2026-09-11 · **Source:** baseboard V2.1 schematic, sheets "DIG IO", "GYRO-ACC", "MCU" and the top sheet

## Isolated digital inputs (4)

| Item | Value |
|---|---|
| Connector | P14 pins 15 (DIG_IN1), 16 (DIG_IN2), 13 (DIG_IN3), 14 (DIG_IN4) |
| Field side | Each input → 2 kΩ, 2512 package (R85–R88) → optocoupler LED in U14 TCMT4100 → DIG_IN_GND. 100 nF filter capacitors C80–C83 |
| MCU side | Phototransistor pulls MCU pins PC0–PC3 low; 10 kΩ pull-ups R81–R84 to +3.3V. Active = low (verify) |
| Isolation | DIG_IN_GND is tied to board GND through R89 (0 Ω). Remove R89 for galvanic isolation |
| Input voltage | 2 kΩ series suits 12 V or 24 V signals (about 6 mA or 12 mA through the LED) |
| Extra | DIG_IN1 is also wired to MIC-SW (P14 pin 9) through R23 (0 Ω), so a push-to-talk switch on the microphone is read as input 1 |

Typical uses (TBD): door open/close, brake, indicator, panic buttons, driver-mode switches.

## Digital outputs (2)

| Item | Value |
|---|---|
| Connector | P14 pins 11 (DIG_OUT1) and 12 (DIG_OUT2) |
| MCU side | PC6/PC7 → 100 Ω (R90/R91) → optocoupler LED in U15 TCMT4100 |
| Field side | Optocoupler output drives N-MOSFETs Q3/Q4 with 10 kΩ gate pull-downs; the outputs source **COMM_VCC** (= +12Vout through R98, 0 Ω). The sheet is marked "CURRENT SOURCE TYPE": the output goes to +12 V when on (high-side switch, verify) |
| Current rating | Depends on Q3/Q4 ("NMOS-2", part TBD) |

Typical uses (TBD): buzzer, indicator lamp, external relay.

## SOS button and tamper switch

| Input | Connector | Path | MCU pin |
|---|---|---|---|
| SOS | P13 pin 10 | +12Vout → 2 kΩ R92 → U15 LED → SOS pin; the button closes SOS to GND | PB15, 10 kΩ pull-up R96, 100 nF C84 (active low, verify) |
| TAMPER | P2 pin 1 | +12Vout → 2 kΩ R95 → U15 LED → TAMPER pin; the switch closes to GND | PB14, 10 kΩ pull-up R97, 100 nF C85 |

Both are optically isolated like the digital inputs. Note that both need +12Vout, so they cannot wake the system while the relay is open.

## Status LEDs

| LED | Driven by | Meaning |
|---|---|---|
| LED1–LED5 on P8 | MCU PB5–PB9 through 200 Ω | Assigned by firmware (TBD). Suggest: power/heartbeat, GNSS fix, 4G registered, backend connected, recording |
| PWR_LED | Hardware: Q9 turns on when battery input (Vin) is present, fed from +12V through R155 1 kΩ | Power present |
| D9 green, D10 orange | MPU UART TX, RX | Activity |
| D15 green, D16 orange | RS-232 TX, RX | Activity |
| D17 green, D18 orange | RS-485 TX, RX | Activity |
| D4 green | 4G module LED_WWAN# | Network status |
| D29 blue | CM108B | USB audio active |

## Accelerometer and gyroscope (U13 MPU-6050)

| Item | Value |
|---|---|
| Interface | I2C2 on MCU PB10/PB11, 4.7 kΩ pull-ups R78/R79 |
| Address | AD0 is pulled low through R80, so the 7-bit address is 0x68 |
| Interrupt | INT is not connected; firmware must poll |
| Supply | +3.3V; VLOGIC tied to VDD; REGOUT and CPOUT capacitors fitted |
| Uses (TBD) | Harsh braking/acceleration/cornering, accident detection, tilt/tow detection, tamper (device moved) |

Claude's note: the MPU-6050 is end-of-life at InvenSense. A later board revision may need a substitute (for example ICM-20602 or LSM6DSx), which changes the driver.
