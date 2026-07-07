# 🌱 FarmSense AI — Personalized Crop Advisory System

> An IoT + AI-based smart farming solution that delivers real-time, personalized crop recommendations to small and medium-scale farmers.

**Team:** Soil Nexus | **Problem:** MC-10 | **Event:** Makers Conclave 2026  
**Team ID:** N25H01A0206 | **College:** CDU | **Submission:** 02-03-2026

---

## 📌 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [System Architecture](#system-architecture)
- [Hardware Components](#hardware-components)
- [Software Stack](#software-stack)
- [Features](#features)
- [Project Timeline](#project-timeline)
- [Impact & Scalability](#impact--scalability)
- [Team](#team)

---

## Overview

FarmSense AI is a low-cost, IoT-powered advisory platform that collects real-time soil and environmental data and uses machine learning models to provide actionable crop management recommendations — all accessible via a mobile/web dashboard with SMS alerts.

**Key Metrics:**
- `>85%` Irrigation Prediction Accuracy
- `<3s` Advisory Response Time
- `< ₹3,750` Total Prototype Cost

---

## Problem Statement

Small and medium farmers in India often rely on generic advice or local guesswork for irrigation, fertilizer use, and disease control. Without real-time monitoring tools:

- Crop yields remain suboptimal
- Water is overused or mismanaged
- Disease outbreaks go undetected until too late
- Farmers face avoidable financial losses

---

## Solution

FarmSense AI addresses these gaps by combining IoT sensor data with AI-driven analysis:

- Collects real-time **soil moisture, temperature, humidity, and pH** data
- Uses **ML models** to analyze crop health and environmental patterns
- Delivers **personalized recommendations** via a dashboard and SMS alerts
- Suggests optimal **irrigation timing, fertilizer usage, and disease alerts**

---

## System Architecture

```
Soil & Weather Sensors          ESP32 Microcontroller         Cloud / Edge Processing        Farmer Interface
──────────────────────         ─────────────────────         ───────────────────────        ─────────────────
Moisture | Temp | Humidity  →  Data Aggregation & WiFi   →   AWS / Firebase + AI Model  →  Dashboard + SMS Alerts
pH Sensor
```

---

## Hardware Components

| Component | Purpose | Cost (₹) |
|---|---|---|
| ESP32 Dev Board | Microcontroller + WiFi connectivity | ₹650 |
| Capacitive Soil Moisture Sensor | Measure soil moisture levels | ₹250 |
| DHT22 Sensor | Temperature & Humidity readings | ₹400 |
| pH Sensor (Analog) | Soil acidity detection | ₹1,800 |
| 5V Power Module | Power supply | ₹300 |
| Jumper Wires & Breadboard | Prototyping | ₹350 |
| Cloud Hosting (AWS Free Tier) | AI Model Hosting | ₹0 |
| **Total Estimated Cost** | | **₹3,750** |

---

## Software Stack

| Layer | Technology |
|---|---|
| Backend & Data Processing | Python |
| Machine Learning | TensorFlow / Scikit-learn |
| Cloud Infrastructure | Firebase / AWS |
| Training Data | ICAR / Kaggle Crop Datasets (Open-source) |

---

## Features

- **Real-time Monitoring** — Live soil and environmental data from ESP32-connected sensors
- **AI-Powered Recommendations** — Personalized irrigation, fertilizer, and disease advice
- **Low-Cost Hardware** — Full prototype under ₹3,750, designed for rural affordability
- **Rural-Ready** — Optimized for low-bandwidth internet conditions
- **SMS + Dashboard Alerts** — Farmer notifications via mobile web and text
- **Scalable Architecture** — Cloud-based design supports multi-farm deployment

---

## Project Timeline

**60-Day Phased Roadmap**

| Phase | Weeks | Activities | Milestone |
|---|---|---|---|
| 1 — Research & Setup | Week 1–2 | Finalize crop use case (Tomato/Paddy), purchase components, set up ESP32, collect sample soil data | Sensors transmitting data to cloud |
| 2 — Hardware Integration | Week 3–4 | Assemble circuit, calibrate sensors, validate readings, test data transmission stability | Stable real-time data collection |
| 3 — AI Model Development | Week 5–7 | Data preprocessing, feature engineering, train irrigation prediction model, optimize parameters | AI model with >80% validation accuracy |
| 4 — Deployment & Testing | Week 8–9 | Integrate AI with dashboard & alerts, field testing, final demo preparation & documentation | Working prototype demo |

**Risk & Contingency**

> **Risk:** Inaccurate sensor readings due to soil variability  
> **Mitigation:** Sensor calibration with multiple soil samples + averaging algorithm

---

## Impact & Scalability

**Target Users:** Small & medium-scale farmers in Telangana  
**Potential Reach:** 3,000+ farmers in irrigation-dependent regions

**Projected Benefits:**
- 20–30% optimized water usage
- Reduced fertilizer costs
- Early disease warnings
- Increased crop yield

**Scalability Roadmap:**

```
Phase 1 → Local deployment in 1 village
Phase 2 → Integration with state agriculture departments
Phase 3 → SaaS model for agri-cooperatives
```

Cloud-based architecture enables seamless multi-farm deployment with minimal additional infrastructure.

---

## Team

**Team Name:** Soil Nexus

| Name | Roll No. | Branch | Role |
|---|---|---|---|
| V. Amrutha Sai | N25H01A0206 | CSE - Core | Core |
| M. Hasini | N25H01A0133 | CSE - Core | Core |
| Ch. Sreehith | N25H01A0552 | CSE - DS | Core |
| N. Sai Charan Tej | N25H01A0157 | CSE - Core | Core |
| N. Sravan Kumar Reddy | N25H01A0660 | CSE - Core | Core |

---

*Built for Makers Conclave 2026 · Problem MC-10 · CDU*
