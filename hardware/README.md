# FarmSense AI — Hardware Module

## 🔧 Components Used
| Component | Purpose | ESP32 Pin |
|-----------|---------|-----------|
| ESP32 Microcontroller | Main processing unit, Wi-Fi connectivity | — |
| DHT22 Sensor | Temperature & Humidity | GPIO 4 (Digital) |
| Capacitive Soil Moisture Sensor | Soil moisture level | GPIO 34 (Analog) |
| pH Sensor (Analog) | Soil pH level | GPIO 35 (Analog) |
| 5V Power Module | Stable power supply for sensors | Power Rail |

## ⚡ Circuit Setup
1. Mount the ESP32 on the breadboard
2. Connect DHT22 data pin to GPIO 4
3. Connect Soil Moisture sensor output to GPIO 34
4. Connect pH sensor output to GPIO 35
5. Power all sensors using the 5V module rail (do not draw directly from ESP32 3.3V for multiple sensors)

## 📜 Main Code File
- `esp32_sensor_node.ino`

## 🔄 What the Code Does
1. Connects to Wi-Fi (with auto-reconnect on disconnect)
2. Reads raw values from all 3 sensors
3. Takes 10 rapid readings and averages them (to reduce noise)
4. Calibrates soil moisture using `map()` function:
   - Dry air reading ≈ 3200 → 0%
   - Wet soil reading ≈ 1100 → 100%
5. Validates pH stays between 0–14 and moisture between 0–100%
6. Sends data via HTTP POST to backend server every few seconds:
7. ## 📡 Wi-Fi Configuration
Update these variables in the `.ino` file before uploading:
```cpp
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverUrl = "https://farmsense-backend.com/update_sensor";
```

## 🛠️ Required Arduino IDE Libraries

* `WiFi.h` (built-in for ESP32)
* `HTTPClient.h` (built-in for ESP32)
* `DHT sensor library` (install via Library Manager)
* `Adafruit Unified Sensor` (dependency for DHT)

## 🚀 How to Upload Code to ESP32

1. Open Arduino IDE
2. Go to **Tools > Board** → select **ESP32 Dev Module**
3. Go to **Tools > Port** → select the COM port your ESP32 is connected to
4. Click **Upload** (right arrow icon)
5. Open **Serial Monitor** (baud rate: 115200) to view live sensor readings

## ⚠️ Troubleshooting

| Issue | Fix |
|-------|-----|
| ESP32 not detected | Check USB cable, try different COM port |
| Wi-Fi not connecting | Double-check SSID/password, ensure 2.4GHz network |
| Erratic moisture readings | Re-calibrate dry/wet boundary values |
| HTTP POST failing | Verify backend URL is live and reachable |

## 📊 Data Flow
