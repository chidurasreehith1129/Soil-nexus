# FarmSense AI

FarmSense AI is an agricultural decision-support project that combines a Flask backend, Firebase-backed IoT data, and a machine-learning crop recommendation engine for smart farming scenarios.

## Project Overview

This project includes:
- A Flask backend for crop recommendations and API endpoints
- Firebase Realtime Database integration for live sensor and hardware data
- A simple frontend dashboard for field telemetry
- A machine-learning pipeline for market-price prediction and crop recommendations

## Project Structure

- [Agri_hub.py](Agri_hub.py) - Main Flask backend for recommendation logic
- [app.py](app.py) - Alternate Flask backend entrypoint
- [index.html](index.html) - Simple frontend dashboard UI
- [train_market_model.py](train_market_model.py) - Trains the market prediction model
- [train_model.py](train_model.py) - Additional training script for irrigation-related modeling
- [clean_data.py](clean_data.py) - Data cleaning and dataset generation helper
- [evaluate_market_model.py](evaluate_market_model.py) - Model evaluation script
- [verify_pipeline.py](verify_pipeline.py) - Firebase and dataset verification script
- [requirements.txt](requirements.txt) - Python dependencies

## Prerequisites

- Python 3.10+
- A virtual environment
- Firebase service account credentials JSON file
- Access to the Firebase Realtime Database

## Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Place your Firebase service account JSON file in the project root and ensure the filename matches the configuration used in the backend scripts.

4. Run the backend:
   ```bash
   python Agri_hub.py
   ```

5. Open the dashboard in a browser:
   - Open [index.html](index.html) directly or serve the project through a local static server.

## API Endpoint

### POST /recommend_crop
Sends crop recommendation data based on location and live field conditions.

Example payload:
```json
{
  "latitude": 17.0,
  "longitude": 78.0
}
```

Example response:
```json
{
  "security_status": "IDLE",
  "current_field_conditions": {
    "ph": 6.5,
    "moisture": 50,
    "temperature": 25.0
  },
  "recommendations": []
}
```

## Firebase Integration

The backend reads live field data and security status from Firebase Realtime Database.

Key expected paths include:
- `field_sensors/live_data`
- `security/status`
- `crop_knowledge_base`

## Model Training

To train the market predictor:
```bash
python train_market_model.py
```

## Notes

- The project is intended for demonstration and prototyping purposes.
- The recommendation engine and UI should be aligned on the same Firebase node structure for reliable live updates.
- For production use, consider adding input validation, stronger error handling, and a single canonical backend entrypoint.
