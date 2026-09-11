# Vehicle Health (CAN)

> **Status:** Draft · **Updated:** 2026-09-11

## Summary

Reads data from the vehicle's CAN bus to monitor the condition of the engine and vehicle, and reports it to the backend.

## Hardware

The MCU on the baseboard has two CAN controllers (CAN1 on PA11/PA12, CAN2 on PB12/PB13). The transceiver (SN65HVD1050) sits on the [CAN add-on board](../../hardware/addons/can.md) on P5/P6; the known add-on serves channel 1 only. The bus lines reach the harness on P13. The MCU reads the bus and passes parameters to the MPU over UART; the MPU processes them and sends them to the backend. Whether the MCU decodes J1939 itself or forwards raw frames is TBD. See [Communications](../../hardware/baseboard/comms.md).

## Requirements

| ID | Requirement | Status |
|---|---|---|
| CAN-1 | Read vehicle data from the CAN bus | Draft |
| CAN-2 | Report health data to the backend | Draft |
| CAN-3 | Report fault codes (DTCs) | Idea |
| CAN-4 | Raise alerts when values go outside set limits | Idea |

## Candidate health values

Values commonly available on buses that use SAE J1939. Confirm which ones each target vehicle actually sends.

- Engine speed (RPM)
- Vehicle speed
- Engine coolant temperature
- Engine oil pressure
- Fuel level
- Battery voltage
- Engine hours and total distance
- Active fault codes

The message IDs and decoding are in the [CAN Signal Map](../../code/can-signals.md).

## Open questions

- Which bus makes and models must be supported?
- Do they all use J1939, or do some use manufacturer-specific messages?
- Bus speed (J1939 commonly uses 250 kbit/s)?
- Should the device only listen on the CAN bus, or also send requests? Listen-only is safer because it can't disturb vehicle systems.
- How often should health data be reported?
- Are limits and alerts checked on the device or on the backend?

## Related

- [CAN Signal Map](../../code/can-signals.md)
- [Hardware](../hardware.md)
- [CAN Health Monitoring: Overview & Flow](../../sections/can-health/overview.md) and [Checklist](../../sections/can-health/checklist.md)
