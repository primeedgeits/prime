# Glossary

> **Status:** Draft · **Updated:** 2026-09-11

| Term | Meaning |
|---|---|
| MNVR | Mobile Network Video Recorder. A video recorder built for vehicles, with a mobile network connection to send data and video to a server. |
| NVR / DVR | Network Video Recorder (records IP cameras) / Digital Video Recorder (records analog cameras). |
| AHD | Analog High Definition. HD video over coaxial cable; common for vehicle cameras. |
| IP camera | A camera that sends video over Ethernet. |
| CAN bus | Controller Area Network. The wired network that a vehicle's control units use to share data. |
| ECU | Electronic Control Unit, such as the engine or transmission controller. |
| SAE J1939 | The standard CAN protocol for trucks and buses. Defines how engine and vehicle data is encoded. |
| PGN | Parameter Group Number. Identifies a J1939 message. |
| SPN | Suspect Parameter Number. Identifies one value inside a J1939 message, such as engine speed. |
| DTC | Diagnostic Trouble Code. A fault code reported by an ECU. |
| GNSS / GPS | Satellite positioning. GPS is the US system; GNSS covers all systems (GPS, GLONASS, Galileo, BeiDou, NavIC). |
| 4G / LTE | The mobile data network the device uses to reach the backend. |
| VoLTE | Voice over LTE. Voice calls carried over a 4G network. |
| SIP | Session Initiation Protocol. A common protocol for voice calls over the internet. |
| TCP | Transmission Control Protocol. A reliable, ordered connection; used for device ↔ backend messages. |
| TLS | Encryption layer for TCP connections. |
| Heartbeat | A small periodic message that shows the device is online. |
| ACK | Acknowledgement. A reply confirming a message or command was received. |
| RTSP / RTMP | Common protocols for streaming live video. |
| H.264 / H.265 | Video compression standards. H.265 gives similar quality at a lower bitrate. |
| Geofence | A virtual boundary on a map. Crossing it triggers an alert. |
| OTA | Over-the-air. Updating device firmware remotely. |
| Ignition sense | An input that tells the device whether the vehicle's ignition is on. |
| ADAS / DMS | Advanced Driver Assistance Systems (such as collision warning) / Driver Monitoring System (such as fatigue detection). |
| AIS-140 | Indian Automotive Industry Standard for tracking devices and emergency buttons in public transport vehicles. |
| MPU | In this project: the application processor board (the "motherboard"). Not to be confused with the MPU-6050 accelerometer chip. |
| MCU | Microcontroller. Here the GD32F105RBT6 on the baseboard. |
| Baseboard | The extension board the MPU motherboard plugs into; carries power, MCU, 4G, GNSS, audio and all vehicle connectors. |
| Add-on board | A small board plugged into the baseboard: the CAN transceiver add-on and the amplifier add-on. |
| PCM / I2S | Serial digital audio interfaces. The 4G module sends call audio to the codec over PCM. |
| Codec (audio) | Chip that converts between digital and analogue audio. Here the ALC5616. |
| eSIM | A SIM soldered to the board (MFF2 package) instead of a removable card. |
| Mini PCIe | The 52-pin socket format used by the 4G module. |
| TVS | Transient voltage suppressor diode; absorbs voltage spikes from the vehicle wiring. |
| Optocoupler | Isolates a signal with an LED and light sensor, so vehicle wiring faults cannot reach the MCU. |
| LDO | Low-dropout linear regulator. |
| Buck converter | Switching regulator that steps voltage down efficiently. |
| SWD | Serial Wire Debug; the two-wire interface used to program and debug the MCU. |
| RS-485 / RS-232 | Serial standards for wired links; RS-485 is differential and multi-drop, RS-232 is point-to-point. |
| PTT | Push-to-talk switch on a microphone. |
| IMU | Inertial measurement unit: accelerometer plus gyroscope. |
| Class-D amplifier | An efficient switching audio amplifier; the TPA3116D2 on the amplifier add-on is one. |
| BTL | Bridge-tied load: a speaker driven between two amplifier outputs instead of one output and ground, for more power from a low supply voltage. |
| Bus termination | The 120 Ω resistor at each end of a CAN bus. A device in the middle of the bus should not add one. |
