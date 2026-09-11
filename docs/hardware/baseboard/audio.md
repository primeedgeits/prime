# Audio Paths

> **Status:** Draft · **Updated:** 2026-09-11 · **Source:** baseboard V2.1 schematic, sheets "AUDIO SWITCH", "CODEC", "USB-AUDIO" and the top sheet

## Sources and sinks

| Signal | What it is | Comes from | Goes to |
|---|---|---|---|
| CM108_L / CM108_R | The MPU's sound output (announcements, alerts) | U28 CM108B USB audio, line out through 220 µF | Switch U4 |
| CM108_MIC_IN | Microphone input to the MPU | Switch U5 | U28 CM108B MICIN |
| CALL_SPK_P / CALL_SPK_N | Received call audio | U6 ALC5616 line out (LOUTL/LOUTR) | Amplifier add-on P3, and switch U4 |
| CODEC-MIC_P / CODEC-MIC_N | Microphone into the call | Switch U5 | U6 ALC5616 IN2P/IN2N with MICBIAS1 |
| ANNOUNCE_L / ANNOUNCE_R | Announcement audio to the amplifier | Switch U4 | Amplifier add-on P3 |
| MIC_P / MIC_N | External differential microphone | P14 pins 7–8 (with ESD and filtering) | Switch U5 |
| SPK_L, SPK_R | Passenger speakers. One mono bridged channel; the amplifier sums ANNOUNCE_L and ANNOUNCE_R and the two speaker outputs are wired in series (verify) | [Amplifier add-on](../addons/amplifier.md) P4 | P14 pins 1–4 |
| DRIVER_SPK | Driver speaker, fed from CALL_SPK | [Amplifier add-on](../addons/amplifier.md) P4 | P14 pins 5–6 |
| HPO_L / HPO_R | Codec headphone output | U6 | P15 header (unused, verify) |

## The two switches

Both are FSA2275 stereo 2:1 analogue switches with pull-downs on their SEL pins, so channel 1 is selected at power-up. Both SEL lines come from the MPU on P1.

| Switch | SEL line | Common side | Channel 1 | Channel 2 | Effect |
|---|---|---|---|---|---|
| U4 | AMP_SW (P1 pin 9), pull-down R20 10 kΩ | CM108_L/R (MPU audio) | ANNOUNCE_L/R | CALL_SPK_P/N | Sends MPU audio either to the amplifier's announcement input (passenger speakers) or into the call-speaker path (driver speaker) |
| U5 | CALL-SW (P1 pin 10) | MIC_P/N (external mic) | CM108_MIC_IN (single-ended; the N side is grounded through R25) | CODEC-MIC_P/N | Sends the microphone either to the MPU (recording, VoIP) or to the call codec |

Which SEL level picks which channel is not printed on the schematic. Check the FSA2275 datasheet, then record it here.

## Modes (verify on hardware)

| Mode | AMP_SW | CALL-SW | Path |
|---|---|---|---|
| Next-stop announcement | announce | any | MPU → CM108B → U4 → ANNOUNCE → amplifier → passenger speakers |
| Voice call | any | codec | Mic → U5 → ALC5616 → PCM → 4G module; 4G module → PCM → ALC5616 → CALL_SPK → amplifier → driver speaker |
| MPU audio to the driver | call | any | MPU → CM108B → U4 → CALL_SPK → amplifier → driver speaker |
| MPU records the microphone | any | CM108 | Mic → U5 → CM108B → MPU |

The microphone can also carry a push-to-talk switch: **MIC-SW** (P14 pin 9) is wired through R23 (0 Ω) to DIG_IN1, so the MCU reads it as digital input 1.

## Voice-call codec (U6 ALC5616)

- Digital audio: BCLK ← PCM-CLK, LRCK ← PCM-SYNC, DACDAT ← PCM-DOUT, ADCDAT → PCM-DIN, all from the 4G module's PCM interface (22 Ω series resistors).
- Control: I2C SDA/SCL from the 4G module (GSM_I2C), 2.2 kΩ pull-ups to 1.8 V. The 4G module, not the MCU or MPU, configures the codec (verify that the module firmware supports this codec).
- MCLK is not connected (verify the codec runs from BCLK alone).
- Supplies: 3V3 from U22 and 1V8 from U23, both always on.
- Mic bias 1.5 kΩ feed (R30/R31); input filters "close to socket".

## USB audio (U28 CM108B)

- USB from the MPU on P9 pins 4–5 (direct, not through the hub).
- 12 MHz crystal Y3. Blue LED D29 shows USB activity.
- Line out LOL/LOR → CM108_L/R. MICIN ← CM108_MIC_IN with VBIAS through 2.2 kΩ.
- The I2S/ADC/DAC serial pins are unconnected: the MPU sees a plain USB audio class device.

## Open questions

- Which physical speakers are "passenger" (SPK_L/R) and "driver" (DRIVER_SPK) in the bus installation?
- Speaker impedance and count on each amplifier output (see [Amplifier Add-on](../addons/amplifier.md)).
- SEL polarities for U4 and U5.
- The description mentions "USB to I2S"; on this schematic the USB audio chip is analogue. Is there a newer board?
- Should calls be audible to passengers (announce path) or only to the driver?
