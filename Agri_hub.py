from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db
import joblib
import numpy as np
import requests
import warnings
from datetime import datetime

# Suppress console warnings for professional demo
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

app = Flask(__name__)
CORS(app)

# 1. INITIALIZE DATABASE & MODELS
CRED_FILENAME = "farmsense-ai-a40c6-firebase-adminsdk-fbsvc-3128cf3f4e.json"
cred = credentials.Certificate(CRED_FILENAME)
firebase_admin.initialize_app(cred, {'databaseURL': 'https://farmsense-ai-a40c6-default-rtdb.asia-southeast1.firebasedatabase.app/'})

# Ensure these files are in your project root
try:
    market_model = joblib.load('market_predictor.pkl')
    scaler = joblib.load('scaler.pkl')
except Exception as e:
    print(f"Error loading ML models: {e}")

@app.route('/recommend_crop', methods=['POST'])
def recommend_crop():
    # Validation check for payload
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request: JSON expected"}), 400
        
    lat = float(data.get('latitude', 17.0))
    lon = float(data.get('longitude', 78.0))
    current_month = datetime.now().month
    
    # 1. FETCH STREAMS
    all_crops = db.reference('crop_knowledge_base').get() or {}
    
    # Use .get() with defaults to prevent crashes if sensors are offline
    sensors = db.reference('field_sensors/live_data').get() or {"ph": 6.5, "moisture": 50, "temperature": 25.0}
    hardware_status = db.reference('security/status').get() or "IDLE"
    
    # Weather logic
    try:
        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m"
        response = requests.get(weather_url, timeout=3).json()
        future_temp = float(response['hourly']['temperature_2m'][0])
    except:
        future_temp = 25.0

    results = []
    
    # Scenario Factors
    worst_factor = 0.50
    best_factor = 0.80

    for crop_name, bio in all_crops.items():
        # A. SENSOR SUITABILITY SCORING (The "Audit Fix")
        # pH (0.3 weight), Temp (0.3 weight), Moisture (0.4 weight)
        ph = sensors.get('ph', 6.5)
        moisture = sensors.get('moisture', 50)
        temp = sensors.get('temperature', 25.0)

        ph_match = 1.0 if 6.0 <= ph <= 7.5 else 0.4
        temp_score = max(0, 1 - (abs(temp - bio.get('ideal_temp', 25)) / 10))
        moisture_score = max(0, 1 - (abs(moisture - 50) / 50)) # Target 50% moisture
        
        suitability_score = (ph_match * 0.3) + (temp_score * 0.3) + (moisture_score * 0.4)
        
        # B. COST CALCULATIONS
        init = bio.get('initial_cost', 0)
        labour = bio.get('labour_cost', 0)
        overall = init + labour
        
        # C. PRICE PREDICTION
        raw_input = np.array([[float(bio.get('crop_code', 0)), float(current_month), 1.0]])
        scaled_input = scaler.transform(raw_input) 
        predicted_price = float(market_model.predict(scaled_input)[0])
        
        # D. PROFIT SCENARIOS (Adjusted by sensor suitability)
        yield_health = suitability_score * 0.8 
        revenue_expected = (bio.get('base_yield') * yield_health) * predicted_price
        
        # E. BUILD RESPONSE
        results.append({
            'crop': crop_name,
            'suitability_score': round(suitability_score * 100, 1),
            'season': bio.get('season', 'General'),
            'sowing_window_active': current_month == bio.get('sowing_month'),
            'cost_breakdown': {'overall_cost': f"Rs. {overall}"},
            'scenarios': {'expected_profit': f"Rs. {round(revenue_expected - overall, 2)}"}
        })

    # Sort by suitability so the best crops for the specific soil appear first
    results.sort(key=lambda x: x['suitability_score'], reverse=True)
    
    return jsonify({
        "security_status": hardware_status,
        "current_field_conditions": sensors,
        "recommendations": results
    })

if __name__ == '__main__':
    # Running on 0.0.0.0 is crucial for local network testing (Phone/Hardware access)
    app.run(host='0.0.0.0', port=5000, debug=True)