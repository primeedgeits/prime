# CAN Signal Map

> **Status:** Draft · **Updated:** 2026-09-11

Which CAN messages the firmware reads, and how each one becomes a health value. Supports [Vehicle Health (CAN)](../product/features/vehicle-health-can.md).

## Bus settings

| Item | Value |
|---|---|
| Protocol | TBD (SAE J1939 likely) |
| Bitrate | TBD (J1939 commonly 250 kbit/s) |
| Mode | TBD (listen-only recommended) |
| Number of CAN channels | 2 on the MCU (CAN1 on PA11/PA12, CAN2 on PB12/PB13). The known [CAN add-on](../hardware/addons/can.md) has one SN65HVD1050 transceiver for channel 1; CAN2 is unpopulated unless a second board is fitted |

## Signals

The PGN, SPN and scaling below are standard SAE J1939 values, included as a starting point. Check them against the J1939-71 specification and confirm them on each target vehicle before relying on them. Record the vehicle in **Verified on** once confirmed.

| Health value | PGN (message) | SPN | Scaling | Unit | Verified on |
|---|---|---|---|---|---|
| Engine speed | 61444 (EEC1) | 190 | 0.125 rpm per bit | rpm | |
| Vehicle speed | 65265 (CCVS) | 84 | 1/256 km/h per bit | km/h | |
| Coolant temperature | 65262 (ET1) | 110 | 1 °C per bit, offset −40 | °C | |
| Oil pressure | 65263 (EFL/P1) | 100 | 4 kPa per bit | kPa | |
| Fuel level | 65276 (DD) | 96 | 0.4 % per bit | % | |
| Battery voltage | 65271 (VEP1) | 168 | 0.05 V per bit | V | |
| Engine hours | 65253 (HOURS) | 247 | 0.05 h per bit | h | |
| Total distance | 65248 (VD) | 245 | 0.125 km per bit | km | |
| Active fault codes | 65226 (DM1) | n/a | List of SPN and failure-mode pairs | n/a | |

## Vehicle-specific notes

Record anything specific to a make or model here: extra proprietary messages, missing values, different bitrates.

_None yet._
