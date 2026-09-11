# Power & Ignition

> **Status:** Draft · **Updated:** 2026-09-11 · **Source:** baseboard V2.1 schematic, sheets "POWER RELAY" and "POWER SUPPLY"

## Power input (J6)

J6 is an 8-pin Molex Micro-Fit (430450822) with two shield pins. Its signals are B+, B−, V_IGN (ignition), Vin, +12V, +12Vout and GND.

How it appears to work (**verify**): B+ passes through two parallel Schottky diodes (D22, D23, B540) for reverse-polarity protection and a 5KP36CA TVS (D24) for transients, and becomes **Vin**. Vin leaves the board on J6 to an **external converter**; the MCU sheet labels the +12 V rail "+12Vin from Converter" and Vin "BATT+ Voltage Sense". The converter's output returns on J6 as **+12V**. Buses have 24 V electrical systems, so the converter is presumably 24 V → 12 V. B− is tied to board GND through R117 (0 Ω).

## Ignition relay (K1)

+12V → K1 contacts → **+12Vout**, the switched rail that powers everything else: the 5 V buck converter, the MPU board (P11), the +12 V OUT connector (P12), the amplifier add-on (P3), the digital outputs and P14 pin 10.

The relay coil is driven by Q5, which turns on when **either**:

- **V-IGNsense** is present (ignition on), through D27, or
- **REL-EN** (MCU pin PA8) is high, through D26.

So the system powers up when the ignition is turned on, and the MCU can hold power after ignition-off by keeping REL-EN high, giving the MPU time to finish recording and uploads and shut down cleanly. When REL-EN drops with the ignition off, the relay opens and everything except the ignition-sense circuit loses power. D25 (1N4007) is the coil flyback diode.

## Ignition sense

V_IGN → fuse F3 → TVS D20 (5KP36CA) → U21 LM2596S-3.3 buck converter → **V-IGNsense**, a 3.3 V rail present only while the ignition is on. It feeds:

- MCU **PA1** directly (ignition present).
- MCU **PA0-WKUP** as **WAKEUP**, through one of two 0 Ω links: R66 (direct, active-high) or R71 (through inverting transistor Q2, active-low, with 10 kΩ pull-up R70). **Verify** which link is fitted; it sets the polarity the firmware must expect.
- The relay coil driver, as above.

## Rails

| Rail | Source | Regulator | Enabled by | Feeds | Budget printed on the top sheet |
|---|---|---|---|---|---|
| +12V | External converter via J6 | — | — | Relay contacts, PWR_LED, battery ADC | |
| +12Vout | +12V through K1 | — | Ignition or REL-EN | 5 V buck, MPU board (P11), P12, amplifier add-on (P3), digital outputs (COMM_VCC via R98 0 Ω), P14 pin 10 | |
| +5V | +12Vout | U24 TPS5450 buck, L5 10 µH, C113 390 µF | Always (JP2 grounds ENA to disable, verify) | USB hub, CM108B, CP2102N and RS-485, monitor (P10 via F1), external USB (via F2), CAN add-on (P5), all 3.3 V LDOs | USB hub 150 mA |
| +3.3V (MCU rail) | +5V | U26 TLV75733 | MCU_PWR_EN via Q7 (from P1 pin 7, verify) | MCU, MPU-6050, RS-232, DIG IO pull-ups, audio switches, SWD header | MCU 150 mA, audio switch 200 mA, DIG IO 100 mA, gyro 3.8 mA, RS-232 1 mA |
| +3.3V_GPS | +5V | U25 TLV75733 | GPS_PWR_EN (MCU PA7) via Q6 | GNSS module, GNSS backup-battery charging | 150 mA |
| +3.3V_GSM | +5V | U27 MIC29302, 3 A LDO | GSM_PWR_EN (from P1 pin 6, MPU) via Q8 | 4G module, SIM switch, WWAN LED | 3 A |
| 3V3 (codec) | +5V | U22 TPS73033 | Always | ALC5616 | |
| 1V8 (codec) | +5V | U23 TPS73018 | Always | ALC5616 core | |
| V-IGNsense | V_IGN | U21 LM2596S-3.3 | Ignition | Ignition sense, relay | |
| 5V_EXT | +5V through F2 | — | — | External USB power (P7, P13 pin 12) | |

Note on MCU power: if MCU_PWR_EN really comes from the MPU (P1 pin 7 per the PCB netlist, **verify**), the MPU can switch the MCU off, and the MCU cannot act as an always-on supervisor before the MPU has booted. This matters for the power-up sequence and for who holds the relay during shutdown.

Claude's note (not from the schematic): U27 drops 5 V to 3.3 V linearly, so at the module's peak transmit current it dissipates up to about 5 W. Worth checking thermally.

## Battery monitoring (MCU ADC)

| ADC input | Measures | Divider | Protection |
|---|---|---|---|
| PA4 (INT-BATT) | +12V rail (converter output) | R72 100 kΩ / R76 10 kΩ, ratio 1/11 | D13 1N4728A 3.3 V zener, D11 |
| PA5 (EXT-BATT) | Vin (battery after reverse protection) | R73 100 kΩ / R77 10 kΩ, ratio 1/11 | D14 1N4728A 3.3 V zener, D12 |

With a 3.3 V ADC reference the full scale is about 36 V, and one 12-bit step is about 8.9 mV at the input. Vin also drives the PWR_LED through Q9 (hardware only; lights whenever battery input is present).

## Backup batteries

- **BT1**: GNSS backup supply (V_BCKP) for warm starts; charged from +3.3V_GPS through D7 and R57 1 kΩ.
- **BT2**: MCU VBAT (RTC and backup registers), through D8.

## Fuses and protection

| Ref | Protects | Rating as printed |
|---|---|---|
| F1 | +5 V to the monitor (P10 pin 1) | "6V .5A 1A" |
| F2 | +5 V to external USB (5V_EXT) | "6V .5A 1A" |
| F3 | Ignition input | not printed |
| D20, D24 | 5KP36CA TVS on the ignition and battery inputs | |
| D22, D23 | B540 Schottky reverse protection on B+ | |
| L1, L2 | Common-mode chokes on the hub input and external USB | |

## Open questions

- Confirm the external converter: part, input range, output current.
- Confirm who drives MCU_PWR_EN.
- Define the shutdown sequence: how long the MCU holds REL-EN after ignition-off, and how the MPU signals that it has finished.
